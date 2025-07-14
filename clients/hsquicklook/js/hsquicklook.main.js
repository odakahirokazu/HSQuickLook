/*******************************************************************************
 * HS Quick Look
 *
 * Authors: Hirokazu Odaka, Soki Sakurai
 * Date: 2012-10-14 (alpha)
 * Date: 2014-04-07 (v0.5.1)
 * Date: 2014-12-20 (v0.6.1)
 * Date: 2019-10-25 (v0.7) | change keywords
 * Date: 2022-10-19 (v1.0) | rename block to section, and tweaks
 * Date: 2023-12-09 (v1.5) | check a number type at table/graph updating
 * Date: 2025-05-28 (v1.7) | replay; UTC/local time zones; cleanup
 *
 ******************************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};

/* The anonymous function of this script */
(function () {
  /***************************************************************************
   * Exported variables
   */
  HSQuickLook.main = {};
  HSQuickLook.main.schema = null;

  /***************************************************************************
   * Parameters
   */
  var tableDraggable = false,
    graphRangeResetEnable = true,
    /* Basic variables */
    ws = null,
    schemaList,
    paused = false,
    controlDisplay = true,
    titleDisplay = true,
    timeScaling = 1.0 / 64,
    time1 = new Date(),
    /* Variables about the trend graphs */
    graphs = new Object();

  /***************************************************************************
   * Main
   */
  $(document).ready(function () {
    $.ajaxSetup({
      cache: false,
    });
    bindEventForms();
    $.getJSON("user_data/user_configuration.json")
      .done(initialize)
      .fail(function () {
        alert("User configuraion file is not found.");
      });
  });

  /***************************************************************************
   * Initialization
   */
  function bindEventForms() {
    // ws-form
    $("input#button-connect").click(openConnection);
    $("input#ws-host").keypress(preventDefaultEnterKey);

    // contents-form
    $("select#selected-group").change(loadDataSheetList);
    $("select#selected-data-sheet").change(loadDataSheet);

    // mode-form
    $("input#mode-ql").click(enterQLMode);
    $("input#mode-paused").click(pause);

    // time-form
    $("input#time0").keypress(enterDLModeByEvent);
    $("input#time1").keypress(enterDLModeByEvent);
    $("input#time2").keypress(enterDLModeByEvent);
    $("input#time3").keypress(enterDLModeByEvent);
    $("input#time4").keypress(enterDLModeByEvent);
    $("input#time5").keypress(enterDLModeByEvent);
    $("input#request-data").click(enterDLMode);
    $("input#reset-time").click(setCurrentTime);

    // replay-form
    $("input#replay-data").click(enterReplayMode);

    // title and control panels
    $("#display-button").click(toggleControlDisplay);
    $("#display-title-button").click(toggleTitleDisplay);
    $("#draggable-button").click(toggleDraggable);
    $("#clear-log-button").click(clearLog);
  }

  function initialize(userConfig) {
    let title = userConfig["title"],
      host = userConfig["ws_host"],
      port = userConfig["ws_port"],
      tiScaling = userConfig["ti_scaling"];

    if (title === void 0) {
      title = "HS Quick Look";
    }
    $("h1.title").html(title);
    $("title").html(title);

    if (host === void 0 || host == "") {
      host = location.hostname;
    }
    if (port === void 0) {
      host = "8080";
    }
    $("#ws-host").val(host + ":" + port);

    if (tiScaling !== void 0) {
      if (tiScaling == 0) {
        alert("Invalid user configuration: TI scaling is set to 0.");
      } else {
        timeScaling = 1.0 / tiScaling;
      }
    }

    schemaList = userConfig["schema_list"];
    for (let group in schemaList) {
      const groupHTML = $("<option />").html(group).attr("value", group);
      $("#selected-group").append(groupHTML);
    }

    initializeManuBar();
    setCurrentTime();
    loadDataSheetList();
    openConnection();
  }

  function initializeManuBar() {
    if (titleDisplay) {
      $("#display-title-button").addClass("menu-button-on");
    } else {
      $("#display-title-button").removeClass("menu-button-on");
    }

    if (controlDisplay) {
      $("#display-button").addClass("menu-button-on");
    } else {
      $("#display-button").removeClass("menu-button-on");
    }
  }

  function setCurrentTime() {
    const t = new Date();
    const utcFlag = $("input#utc-flag").prop("checked");

    if (utcFlag) {
      $("input#time0").val(t.getUTCFullYear());
      $("input#time1").val(t.getUTCMonth() + 1);
      $("input#time2").val(t.getUTCDate());
      $("input#time3").val(t.getUTCHours());
      $("input#time4").val(t.getUTCMinutes());
      $("input#time5").val(t.getUTCSeconds());
    } else {
      $("input#time0").val(t.getFullYear());
      $("input#time1").val(t.getMonth() + 1);
      $("input#time2").val(t.getDate());
      $("input#time3").val(t.getHours());
      $("input#time4").val(t.getMinutes());
      $("input#time5").val(t.getSeconds());
    }
  }

  function loadDataSheetList() {
    const group = $("#selected-group").val();
    const schema = schemaList[group];
    let target = $("#selected-data-sheet").html("");
    for (let dataSheet in schema) {
      const dataSheetHTML = $("<option />")
        .html(dataSheet)
        .attr("value", dataSheet);
      target.append(dataSheetHTML);
    }
  }

  function preventDefaultEnterKey(e) {
    const KC_ENTER = 13;
    if (e.keyCode == KC_ENTER) {
      e.preventDefault();
    }
  }

  /***************************************************************************
   * Log
   */
  function log(message) {
    const messageElement = $("<div />").html(message);
    $("div#log").prepend(messageElement);
  }

  function clearLog() {
    $("div#log").html("");
  }

  /***************************************************************************
   * Display
   */
  function toggleControlDisplay() {
    if (controlDisplay) {
      controlDisplay = false;
      $("div#control-panel").addClass("panel-nodisplay");
      $("div#log-panel").addClass("panel-nodisplay");
      $("#display-button").removeClass("menu-button-on");
    } else {
      controlDisplay = true;
      $("div#control-panel").removeClass("panel-nodisplay");
      $("div#log-panel").removeClass("panel-nodisplay");
      $("#display-button").addClass("menu-button-on");
    }
  }

  function toggleTitleDisplay() {
    if (titleDisplay) {
      titleDisplay = false;
      $("h1.title").addClass("panel-nodisplay");
      $("#display-title-button").removeClass("menu-button-on");
    } else {
      titleDisplay = true;
      $("h1.title").removeClass("panel-nodisplay");
      $("#display-title-button").addClass("menu-button-on");
    }
  }

  function toggleDraggable() {
    if (tableDraggable) {
      tableDraggable = false;
      $("#draggable-button").removeClass("menu-button-on");
      $(".data-table").draggable("disable");
    } else {
      tableDraggable = true;
      $("#draggable-button").addClass("menu-button-on");
      $(".data-table").draggable("enable");
    }
  }

  /***************************************************************************
   * WebSocket connection
   */
  function openConnection() {
    closeConnection();
    let host = "ws://" + $("#ws-host").val();
    ws = new WebSocket(host);

    ws.onopen = function () {
      const t = new Date(),
        utcFlag = $("input#utc-flag").prop("checked"),
        timeString = utcFlag ? t.toUTCString() : t.toString();
      log("WebSocket opened at " + timeString);
      sendTimeNow();
      $("#button-connect").val("Close");
      $("#button-connect").unbind("click", openConnection);
      $("#button-connect").click(closeConnection);
      $("#status-connection").html("Open");
      $("#status-connection").addClass("status-button-on");
      $("#status-view").html("Realtime");
      $("#status-view").addClass("status-button-view-realtime");
      loadDataSheet();
    };

    ws.onclose = function () {
      const t = new Date(),
        utcFlag = $("input#utc-flag").prop("checked"),
        timeString = utcFlag ? t.toUTCString() : t.toString();
      log("WebSocket closed at " + timeString);
      $("#button-connect").val("Open");
      $("#button-connect").unbind("click");
      $("#button-connect").click(openConnection);
      $("#status-connection").html("Close");
      $("#status-connection").removeClass("status-button-on");
      $("#status-view").html("mode");
      $("#status-view").removeClass("status-button-view-realtime");
    };

    ws.onmessage = function (e) {
      // log("WebSocket message: "+e.data);
      if (!paused) {
        updateDataSheet(e.data);
      }
    };
  }

  function closeConnection() {
    if (ws) {
      ws.close();
      ws = null;
    }
  }

  /***************************************************************************
   * Time control
   */
  function enterQLMode() {
    if (ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("input[name='mode']").val(["mode-ql"]);
    $("input#mode-paused").attr("disabled", false);
    $("#status-view").html("Realtime");
    $("#status-view").addClass("status-button-view-realtime");
    sendTimeNow();
    paused = false;
  }

  function enterDLMode() {
    if (ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("input[name='mode']").val(["mode-dl"]);
    $("input#mode-paused").attr("disabled", true);
    $("#status-view").html("Historical");
    $("#status-view").removeClass("status-button-view-realtime");
    clearGraphData();
    getTime();
    sendTime();
    paused = false;
  }

  async function enterReplayMode() {
    if (ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("input[name='mode']").val(["mode-dl"]);
    $("input#mode-paused").attr("disabled", true);
    $("#status-view").html("Replay");
    $("#status-view").removeClass("status-button-view-realtime");
    clearGraphData();
    getTime();
    sendTime();
    paused = false;
    while (time1 < new Date()) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const period = $("input#replay-period").val();
      time1.setTime(time1.getTime() + period * 1000);
      sendTime();
    }
    enterQLMode();
  }

  function getTime() {
    const year = $("input#time0").val(),
      month = $("input#time1").val(),
      day = $("input#time2").val(),
      hour = $("input#time3").val(),
      minute = $("input#time4").val(),
      second = $("input#time5").val();
    const utcFlag = $("input#utc-flag").prop("checked");
    if (utcFlag) {
      time1.setUTCFullYear(year);
      time1.setUTCMonth(month - 1);
      time1.setUTCDate(day);
      time1.setUTCHours(hour);
      time1.setUTCMinutes(minute);
      time1.setUTCSeconds(second);
    } else {
      time1.setFullYear(year);
      time1.setMonth(month - 1);
      time1.setDate(day);
      time1.setHours(hour);
      time1.setMinutes(minute);
      time1.setSeconds(second);
    }
  }

  function sendTime() {
    const year = time1.getUTCFullYear(),
      month = time1.getUTCMonth() + 1,
      day = time1.getUTCDate(),
      hour = time1.getUTCHours(),
      minute = time1.getUTCMinutes(),
      second = time1.getUTCSeconds();
    const message =
      '{"time": "DL ' +
      year +
      ":" +
      month +
      ":" +
      day +
      ":" +
      hour +
      ":" +
      minute +
      ":" +
      second +
      '"}';
    ws.send(message);
  }

  function sendTimeNow() {
    const message = '{"time": "QL" }';
    ws.send(message);
  }

  function pause() {
    if (ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("#status-view").html("Pause");
    $("#status-view").removeClass("status-button-view-realtime");
    paused = true;
  }

  function enterDLModeByEvent(e) {
    const KC_ENTER = 13;
    if (e.keyCode == KC_ENTER) {
      e.preventDefault();
      enterDLMode();
    }
  }

  /***************************************************************************
   * Data sheet
   */
  function loadDataSheet() {
    const dataSheetName = $("#selected-data-sheet").val();
    if (dataSheetName == "") {
      return;
    }

    const groupName = $("#selected-group").val();
    const fileName = schemaList[groupName][dataSheetName];

    if (ws.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("title").html(dataSheetName);
    $("h1.title").html(dataSheetName);

    resetGraphVariables();

    $.ajax({
      url: fileName,
      // dataType : 'json',
      dataType: "script",
      success: buildDataSheet,
      error: function () {
        alert("Failed to read " + fileName + ".");
      },
    });
  }

  function buildDataSheet() {
    const ti = "-1",
      time = "2112-09-03 00:00:00 UTC" /* dummy time */,
      schema = HSQuickLook.main.schema;
    let target = $("div#main-tables").html("");

    // display the dummy time
    $("p#time").html(time + " | TI: " + ti);

    // main tables
    for (let i = 0; i < schema.length; i++) {
      const tableInfo = schema[i];
      if (tableInfo.collection !== void 0) {
        const tableHTML = createTableHTML(tableInfo);
        target.append(tableHTML);
        initializeTable(tableInfo);
        ws.send(getRequestMessage(tableInfo));
      }
    }

    // draggable
    $(".data-table").draggable();
    if (tableDraggable) {
      $("#draggable-button").addClass("menu-button-on");
    } else {
      $("#draggable-button").removeClass("menu-button-on");
      $(".data-table").draggable("disable");
    }

    // range-reset
    if (graphRangeResetEnable) {
      $(".graph-placeholder").dblclick(function () {
        const elemID = this.id.replace("-placeholder", "");
        let graph = graphs[elemID];
        graph.resetRangeY();
      });
    }
  }

  function updateDataSheet(dataJSON) {
    const data = JSON.parse(dataJSON);
    if (data == []) {
      return;
    }

    const schema = HSQuickLook.main.schema;
    const utcFlag = $("input#utc-flag").prop("checked");
    let timeUpdated = false,
      ti = -1;

    for (let i = 0; i < schema.length; i++) {
      const tableInfo = schema[i],
        documentLabel = getDocumentLabel(tableInfo),
        documentData = data[documentLabel];
      if (documentData !== void 0) {
        if (!timeUpdated) {
          // display time
          ti = documentData["__ti__"];
          const unixtime = documentData["__unixtime__"],
            time = new Date(unixtime * 1000),
            timeString = utcFlag ? time.toUTCString() : time.toString();
          $("p#time").html(
            timeString + " | TI: " + ti + " | Time: " + ti * timeScaling,
          );
          timeUpdated = true;
        }
        updateTable(tableInfo, documentData, ti);
      }
    }
  }

  /***************************************************************************
   * Data table
   */
  function getSectionName(tableInfo) {
    return tableInfo.section;
  }

  function getTableName(tableInfo) {
    const tableName = tableInfo.tableName;
    if (tableName === void 0) {
      return getSectionName(tableInfo);
    }
    return tableName;
  }

  function getTableTitle(tableInfo) {
    const tableTitle = tableInfo.tableTitle;
    if (tableTitle === void 0) {
      return getTableName(tableInfo);
    }
    return tableTitle;
  }

  function getTableID(tableInfo) {
    const collection = tableInfo.collection,
      directory = tableInfo.directory,
      directory1 = directory.split("/").join("_").split(".").join("_"),
      document = tableInfo.document,
      document1 = document.split(".").join("_"),
      table = getTableName(tableInfo);
    return collection + "-" + directory1 + "-" + document1 + "-" + table;
  }

  function getRequestMessage(tableInfo) {
    const collection = tableInfo.collection,
      directory = tableInfo.directory,
      document = tableInfo.document,
      period = tableInfo.period,
      message =
        '{"collection": "' +
        collection +
        '", ' +
        '"directory": "' +
        directory +
        '", ' +
        '"document": "' +
        document +
        '", ' +
        '"period": "' +
        period +
        '"}';
    return message;
  }

  function getDocumentLabel(tableInfo) {
    const collection = tableInfo.collection,
      directory = tableInfo.directory,
      document = tableInfo.document,
      documentLabel = collection + "/" + directory + "/" + document;
    return documentLabel;
  }

  function createTableHTML(tableInfo) {
    const tableID = getTableID(tableInfo);

    let table = $("<table />").html("");
    table.attr("frame", "border");
    table.attr("rules", "all");
    table.attr("id", "table-" + tableID);
    table.addClass("data-table");

    let thead = $("<thead />").html("");
    let theadRow = $("<tr />").html("");
    let theadTitle = $("<th />").html(getTableTitle(tableInfo));
    theadTitle.attr("colspan", "2");
    theadTitle.attr("id", "table-" + tableID + "-title");
    theadRow.append(theadTitle);
    thead.append(theadRow);

    let tbody = $("<tbody/>").html("");
    tbody.attr("id", "table-" + tableID + "-body");

    table.append(thead);
    table.append(tbody);

    return table;
  }

  function initializeTable(tableInfo) {
    const tableID = getTableID(tableInfo),
      contents = tableInfo.contents;
    let tbody = $("tbody#table-" + tableID + "-body").html("");

    for (let key in contents) {
      const info = contents[key],
        type = info.type;
      let value = 0;
      if (type == "image") {
        value = '<img class="image-new" /><img class="image-old" />';
      }
      tbody.append(makePair(key, value, info, tableID));
    }
  }

  function updateTable(tableInfo, data, ti) {
    const sections = data["__sections__"];
    let sectionData = void 0;

    for (let ib = 0; ib < sections.length; ib++) {
      if (sections[ib]["__section__"] == tableInfo.section) {
        sectionData = sections[ib];
        break;
      }
    }
    if (sectionData === void 0) {
      return false;
    }

    const values = sectionData["__contents__"],
      tableID = getTableID(tableInfo),
      contents = tableInfo.contents;

    for (let key in contents) {
      const info = contents[key];
      if (info.type == "trend-graph") {
        const elemID = tableID + "-" + key;
        const time = ti * timeScaling;
        updateGraph(elemID, info, time, values, tableID);
      } else {
        let source, value;
        if ("source" in info) {
          source = info.source;
        } else {
          source = key;
        }
        if (typeof source == "string") {
          value = values[source];
        } else {
          value = source.map(function (s) {
            return values[s];
          });
        }

        if (value === void 0) {
          continue;
        }
        updateValue(key, value, info, tableID);
      }
    }

    return true;
  }

  /***************************************************************************
   * Data element
   */
  function makePair(key, rawValue, info, tableID) {
    const type = info.type,
      elemID = tableID + "-" + key;
    const elemKeyHTML = $("<td />")
      .attr("id", elemID + "-key")
      .html(key);
    let elemValueHTML;

    if (type == "trend-graph") {
      elemValueHTML = $("<td />").attr("id", elemID).html("");
      appendTrendCurve(elemValueHTML, elemID, info, tableID);
    } else {
      const value = convertValue(info, rawValue),
        status = valueStatus(info, value),
        valueFormated = formatValue(info, value);
      elemValueHTML = $("<td />").attr("id", elemID).html(valueFormated);
      addValueClass(elemValueHTML, status, type);
    }

    const pair = $("<tr />").append(elemKeyHTML).append(elemValueHTML);
    return pair;
  }

  function appendTrendCurve(elemValueHTML, elemID, info, tableID) {
    if (graphs[elemID] !== void 0) {
      alert("appendTrendCurve(): " + elemID + " already exists.");
      return;
    }

    let graph = new HSQuickLook.graph.MultiTrendCurves();
    graphs[elemID] = graph;
    graph.placeholder = "#" + elemID + "-placeholder";

    let capacity = 600,
      frameOption;
    if ("options" in info) {
      if ("xWidth" in info.options) {
        const xWidth = info.options.xWidth,
          capacity = xWidth;
        graph.xWidth = capacity;
      }
      if ("refreshCycle" in info.options) {
        const refreshCycle = info.options.refreshCycle;
        graph.refreshCycle = refreshCycle;
      }
      if ("yRange" in info.options) {
        graph.layout.yaxis.range = info.options.yRange;
      }
      if ("frame" in info.options) {
        frameOption = info.options.frame;
      }
    }

    for (let i = 0; i < info.group.length; i++) {
      const plotInfo = info.group[i],
        sourceID = tableID + "-" + plotInfo.source,
        curve = createTrendCurve(capacity, plotInfo);
      graph.addTrendCurve(sourceID, curve);
    }

    const container = createGraphContainer(elemID, frameOption);
    elemValueHTML.attr("id", elemID);
    elemValueHTML.append(container);

    let timeOriginHTML = $("<div />")
      .attr("id", elemID + "-timeorigin")
      .html("Origin of time: ");
    timeOriginHTML.addClass("graph-timeorigin");
    timeOriginHTML.append(
      $("<span />").attr("id", elemID + "-timeorigin-value"),
    );
    elemValueHTML.append(timeOriginHTML);
  }

  function createTrendCurve(capacity, plotInfo) {
    let graph = new HSQuickLook.graph.TrendCurve();
    graph.setCapacity(capacity);
    graph.setRangeX([0.0, 30.0]);
    graph.setRangeY([-0.5, 10.0]);
    graph.layout.xaxis.title = "Time (s)";
    graph.layout.yaxis.title = "Value";

    if (plotInfo.mode == "diff") {
      graph.differentialMode = true;
    } else {
      graph.differentialMode = false;
    }

    if ("upperBound" in plotInfo) {
      graph.upperBound = plotInfo.upperBound;
    }

    if ("options" in plotInfo) {
      let options = plotInfo.options;
      if (options.legend !== void 0) {
        graph.data.name = options.legend;
      }
      if (options.color !== void 0) {
        graph.data.line.color = options.color;
        graph.data.marker.color = options.color;
      }
      if (options.pointSize !== void 0) {
        graph.data.marker.size = options.pointSize;
      }
    }

    return graph;
  }

  function addValueClass(target, status, type) {
    let statusClass;
    if (status != "") {
      statusClass = "value-status-" + status;
      target.addClass(statusClass);
    }
    target.addClass("value-type-" + type);
  }

  function updateValue(key, rawValue, info, tableID) {
    const elemID = tableID + "-" + key,
      type = info.type;

    if (type == "image") {
      updateImage(key, rawValue, info, tableID);
    } else if (type == "trend-graph") {
      // do nothing
    } else {
      let target = $("#" + elemID);
      const value = convertValue(info, rawValue),
        status = valueStatus(info, value),
        valueFormated = formatValue(info, value);
      target.html(valueFormated);
      target.removeClass();
      addValueClass(target, status, type);
    }
  }

  function updateGraph(elemID, info, time, values, tableID) {
    let graph = graphs[elemID];
    if (graph.timeOrigin === void 0) {
      graph.timeOrigin = time;
      $("#" + elemID + "-timeorigin-value").html(time);
    }

    const xValue = time - graph.timeOrigin;

    for (let i = 0; i < info.group.length; i++) {
      const plotInfo = info.group[i],
        source = plotInfo.source,
        yValueRaw = values[source],
        yValue = Number(convertValue(plotInfo, yValueRaw));

      if (yValue != Number.NaN) {
        const sourceID = tableID + "-" + source;
        let curve = graph.getTrendCurve(sourceID);
        curve.pushData([xValue, yValue]);
        if (graph.drawn === false) {
          graph.adjustRangeY(yValue);
        }
      }
    }

    graph.adjustRangeX(xValue);
    graph.plot();
  }

  function updateImage(key, rawValue, info, tableID) {
    const elemID = tableID + "-" + key,
      value = convertValue(info, rawValue);

    let target = $("#" + elemID);
    target.removeClass("display-phase1").addClass("display-phase0");
    let image1 = target.children("img.image-new"),
      image2 = target.children("img.image-old");

    const data = JSON.parse(value),
      data64 = data.data.replace(/\s/g, ""),
      binaryData = atob(data64),
      mimeType = data.type,
      height = data.height,
      width = data.width;

    const oldBlobURL = image2.attr("src"),
      currentBlobURL = image1.attr("src"),
      newBlobURL = createImageURL(binaryData, mimeType);

    image2.attr({
      src: newBlobURL,
      height: height,
      width: width,
    });
    image1.removeClass("image-new").addClass("image-old");
    image2.removeClass("image-old").addClass("image-new");

    setTimeout(function () {
      target.removeClass("display-phase0").addClass("display-phase1");
    }, 250);

    if (oldBlobURL) {
      let URL = window.URL || window.webkitURL;
      URL.revokeObjectURL(oldBlobURL);
    }
  }

  function createImageURL(binaryData, mimeType) {
    const buf = new ArrayBuffer(binaryData.length),
      view = new Uint8Array(buf);

    for (let i = 0; i < view.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([view], {
      type: mimeType,
    });
    const URL = window.URL || window.webkitURL;
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
  }

  function valueStatus(info, value) {
    let status;
    if ("status" in info) {
      status = info.status;
      if (typeof status == "function") {
        status = status(value);
      }
    } else {
      status = "";
    }
    return status;
  }

  function convertValue(info, rawValue) {
    let value = rawValue;
    if ("conversion" in info) {
      const conversion = info.conversion;
      if (typeof conversion == "function") {
        value = conversion(value);
      }
    } else {
      if (info.type == "uint") {
        value = value >>> 0;
      }
    }
    return value;
  }

  function formatValue(info, value) {
    const type = info.type,
      format = info.format;
    if (format === void 0) {
      return value;
    }

    if (!checkNumberType(value, type)) {
      return "____";
    }

    return sprintf(format, value);
  }

  function checkNumberType(value, type) {
    if (
      type == "number" ||
      type == "int" ||
      type == "uint" ||
      type == "float"
    ) {
      if (typeof value != "number") {
        return false;
      }
    }
    return true;
  }

  /***************************************************************************
   * Trend curve plots
   */
  function createGraphContainer(elemID, frameOption) {
    let container = $("<div />")
      .attr("id", elemID + "-graph")
      .addClass("graph-container");
    if (frameOption !== void 0) {
      container.css("width", frameOption.width);
      container.css("height", frameOption.height);
    }

    let placeholder = $("<div />")
      .attr("id", elemID + "-placeholder")
      .addClass("graph-placeholder");
    container.append(placeholder);
    return container;
  }

  function resetGraphVariables() {
    delete graphs;
    graphs = new Object();
  }

  function clearGraphData() {
    for (let graph of Object.values(graphs)) {
      graph.clearData();
    }
  }
})(); /* end of the anonymous function */
