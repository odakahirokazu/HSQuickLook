/*******************************************************************************
 * HS Quick Look
 * 
 * Authors: Hirokazu Odaka, Soki Sakurai
 * Date: 2012-10-14 (alpha)
 * Date: 2014-04-07 (v0.5.1)
 * Date: 2014-12-20 (v0.6.1)
 * 
 ******************************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};

/* The anonymous function of this script */
(function() {
  /***************************************************************************
   * Exported variables
   */
  HSQuickLook.main = {};
  HSQuickLook.main.schema = null;

  /***************************************************************************
   * Parameters
   */
  var draggableTables = false,
      draggableGraphs = true,
      /* Basic variables */
      ws = null,
      schemaList,
      paused = false,
      sectionDisplay = true,
      titleDisplay = true,
      /* Variables about the trend graphs */
      graphs = new Object();

  /***************************************************************************
   * Main
   */
  $(document).ready(
    function() {
      $.ajaxSetup({
        cache: false
      });
      bindEventForms();
      $.getJSON("user_data/user_configuration.json")
          .done(initialize)
          .fail(function() {
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
    $("input#request-time").click(enterDLMode);

    // log-section
    $("#clear-log-button").click(clearLog);

    // display-control
    $("#display-button").click(toggleSectionDisplay);
    $("#display-title-button").click(toggleTitleDisplay);
  }

  function initialize(userConfig) {
    var title = userConfig["title"],
        host = userConfig["ws_host"],
        port = userConfig["ws_port"],
        group,
        groupHTML;

    if (title === void 0) {
      title = "HS Quick Look";
    }
    $('h1.title').html(title);
    $('title').html(title);

    if (host === void 0 || host == "") {
      host = location.hostname;
    }
    if (port === void 0) {
      host = "8080";
    }
    $("#ws-host").val(host + ":" + port);

    schemaList = userConfig["schema_list"];
    for (group in schemaList) {
      groupHTML = $("<option />").html(group).attr("value", group);
      $("#selected-group").append(groupHTML);
    }

    setCurrentTime();
    loadDataSheetList();
    openConnection();
  }

  function setCurrentTime() {
    var t = new Date();
    $('input#time0').attr("value", t.getUTCFullYear());
    $('input#time1').attr("value", t.getUTCMonth() + 1);
    $('input#time2').attr("value", t.getUTCDate());
    $('input#time3').attr("value", t.getUTCHours());
    $('input#time4').attr("value", t.getUTCMinutes());
    $('input#time5').attr("value", t.getUTCSeconds());
  }

  function loadDataSheetList() {
    var group = $("#selected-group").val(),
        schema = schemaList[group],
        target = $("#selected-data-sheet").html(""),
        title = $("<option />").html("").attr("value", "").attr("label", "Select data sheet"),
        dataSheet,
        dataSheetHTML;
    target.append(title);
    for (dataSheet in schema) {
      dataSheetHTML = $("<option />").html(dataSheet).attr("value", dataSheet);
      target.append(dataSheetHTML);
    }
  }

  function preventDefaultEnterKey(e) {
    var KC_ENTER = 13;
    if (e.keyCode == KC_ENTER) {
      e.preventDefault();
    }
  }

  /***************************************************************************
   * Log
   */
  function log(message) {
    var messageElement = $("<div />").html(message);
    $('div#log').prepend(messageElement);
  }

  function clearLog() {
    $('div#log').html('');
  }

  /***************************************************************************
   * Display
   */
  function toggleSectionDisplay() {
    if (sectionDisplay) {
      sectionDisplay = false;
      $("div#control-section").addClass("section-nodisplay");
      $("div#log-section").addClass("section-nodisplay");
      $("#display-button").html("show control");
    } else {
      sectionDisplay = true;
      $("div#control-section").removeClass("section-nodisplay");
      $("div#log-section").removeClass("section-nodisplay");
      $("#display-button").html("hide control");
    }
  }

  function toggleTitleDisplay() {
    if (titleDisplay) {
      titleDisplay = false;
      $("h1").addClass("section-nodisplay");
      $("#display-title-button").html("show title");
    } else {
      titleDisplay = true;
      $("h1").removeClass("section-nodisplay");
      $("#display-title-button").html("hide title");
    }
  }

  /***************************************************************************
   * WebSocket connection
   */
  function openConnection() {
    var host;
    closeConnection();
    host = "ws://" + $("#ws-host").val();
    ws = new WebSocket(host);

    ws.onopen = function() {
      var t = new Date();
      log("WebSocket opened at "+t.toTimeString());
      sendTimeNow();
      $("#button-connect").val("Close");
      $("#button-connect").unbind("click", openConnection);
      $("#button-connect").click(closeConnection);
    };

    ws.onclose = function() {
      var t = new Date();
      log("WebSocket closed at "+t.toTimeString());
      $("#button-connect").val("Open");
      $("#button-connect").unbind("click");
      $("#button-connect").click(openConnection);
    };

    ws.onmessage = function(e) {
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
    if (paused) {
      paused = false;
    } else {
      $("input#mode-paused").attr("disabled", false);
      sendTimeNow();
    }
  }

  function enterDLMode() {
    paused = false;
    $("input[name='mode']").val([ "mode-dl" ]);
    $("input#mode-paused").attr("disabled", true);
    sendTime();
  }

  function sendTime() {
    var year = $('input#time0').val(),
        month = $('input#time1').val(),
        day = $('input#time2').val(),
        hour = $('input#time3').val(),
        minute = $('input#time4').val(),
        second = $('input#time5').val(),
        message = '{"time": "DL ' + year + ':' + month + ':' + day + ':'
        + hour + ':' + minute + ':' + second + '"}';
    ws.send(message);
  }

  function sendTimeNow() {
    var message = '{"time": "QL" }';
    ws.send(message);
  }

  function pause() {
    paused = true;
  }

  function enterDLModeByEvent(e) {
    var KC_ENTER = 13;
    if (e.keyCode == KC_ENTER) {
      e.preventDefault();
      enterDLMode();
    }
  }

  /***************************************************************************
   * Data sheet
   */
  function loadDataSheet() {
    var groupName,
        dataSheetName = $("#selected-data-sheet").val(),
        fileName;

    if (dataSheetName == "") {
      return;
    }

    groupName = $("#selected-group").val();
    fileName = schemaList[groupName][dataSheetName];

    if (!ws) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    $("title").html(dataSheetName);
    
    resetGraphVariables();

    $.ajax({
      url : fileName,
      // dataType : 'json',
      dataType : 'script',
      success : buildDataSheet,
      error : function() {
        alert("Failed to read " + fileName + ".");
      }
    });
  }

  function buildDataSheet() {
    var ti = "-1",
        unixtime = "2112-09-03 00:00:00 UTC", /* dummy time */
        target = $('div#main-tables').html(""),
        schema = HSQuickLook.main.schema,
        i = 0,
        tableInfo,
        tableHTML;

    // display the dummy time
    $('p#time').html(unixtime + " | TI: " + ti);

    // main tables
    for (i=0; i<schema.length; i++) {
      tableInfo = schema[i];
      if (tableInfo.collection !== void 0) {
        tableHTML = createTableHTML(tableInfo);
        target.append(tableHTML);
        initializeTable(tableInfo);
        ws.send(getRequestMessage(tableInfo));
      }
    }

    if (draggableTables) {
      $(".ql_table").draggable();
    }
  }

  function updateDataSheet(data) {
    var dataEval = JSON.parse(data),
        schema,
        timeUpdated = false,
        i = 0,
        tableInfo,
        documentLabel,
        dataObject,
        ti = 0,
        unixtime = 0;
    
    if (dataEval == []) { return; }

    schema = HSQuickLook.main.schema;
    for (i=0; i<schema.length; i++) {
      tableInfo = schema[i];
      documentLabel = getDocumentLabel(tableInfo);
      dataObject = dataEval[documentLabel];
      if (dataObject !== void 0) {
        if (!timeUpdated) {
          // display time
          ti = dataObject["TI"] >>> 0;
          unixtime = dataObject["UNIXTIME"];
          $('p#time').html(unixtime + " | TI: " + ti);
          timeUpdated = true;
        }
        updateTable(tableInfo, dataObject, ti);
      }
    }
  }

  /***************************************************************************
   * Data table
   */
  function getBlockName(tableInfo) {
    return tableInfo.blockName;
  }

  function getTableName(tableInfo) {
    var tableName = tableInfo.tableName;
    if (tableName === void 0) {
      return getBlockName(tableInfo);
    }
    return tableName;
  }

  function getTableTitle(tableInfo) {
    var tableTitle = tableInfo.tableTitle;
    if (tableTitle === void 0) {
      return getTableName(tableInfo);
    }
    return tableTitle;
  }

  function getTableID(tableInfo) {
    var collection = tableInfo.collection,
        directory = tableInfo.functionalObject,
        directory1 = directory.split('/').join('_').split('.').join('_'),
        document = tableInfo.attributeSequence,
        document1 = document.split('.').join('_'),
        table = getTableName(tableInfo);
    return (collection + '-' + directory1 + '-' + document1 + '-' + table);
  }

  function getRequestMessage(tableInfo) {
    var collection = tableInfo.collection,
        directory = tableInfo.functionalObject,
        document = tableInfo.attributeSequence,
        period = tableInfo.period,
        message = '{"collection": "' + collection + '", '
        + '"functionalObject": "' + directory + '", '
        + '"attributeSequence": "' + document + '", ' + '"period": "'
        + period + '"}';
    return message;
  }

  function getDocumentLabel(tableInfo) {
    var collection = tableInfo.collection,
        directory = tableInfo.functionalObject,
        document = tableInfo.attributeSequence,
        documentLabel = collection + '/' + directory + '/' + document;
    return documentLabel;
  }

  function createTableHTML(tableInfo) {
    var tableID = getTableID(tableInfo),
        table, thead, theadRow, theadTitle, tbody;

    table = $("<table />").html("");
    table.attr("frame", "border");
    table.attr("rules", "all");
    table.attr("id", "table_" + tableID);
    table.addClass("ql_table");

    thead = $("<thead />").html("");
    theadRow = $("<tr />").html("");
    theadTitle = $("<th />").html(getTableTitle(tableInfo));
    theadTitle.attr("colspan", "2");
    theadTitle.attr("id", "table_" + tableID + "_title");
    theadRow.append(theadTitle);
    thead.append(theadRow);

    tbody = $("<tbody/>").html("");
    tbody.attr("id", "table_" + tableID + "_body");

    table.append(thead);
    table.append(tbody);

    return table;
  }

  function initializeTable(tableInfo) {
    var tableID = getTableID(tableInfo),
        contents = tableInfo.contents,
        tbody = $('tbody#table_' + tableID + '_body').html(""),
        key,
        info,
        value = 0,
        type;

    for (key in contents) {
      info = contents[key];
      value = 0;
      type = info.type;
      if (type == "image") {
        value = "<img class=\"image_new\" /><img class=\"image_old\" />";
      }
      tbody.append(makePair(key, value, info, tableID));
    }
  }

  function updateTable(tableInfo, data, ti) {
    var blocks = data["Blocks"],
        blockData = void 0,
        ib = 0,
        values, tableID, contents,
        key, info, elemID, time,
        source, value;

    for (ib=0; ib<blocks.length; ib++) {
      if (blocks[ib]["BlockName"] == tableInfo.blockName) {
        blockData = blocks[ib];
        break;
      }
    }
    if (blockData === void 0) {
      return false;
    }

    values = blockData["Contents"];
    tableID = getTableID(tableInfo);
    contents = tableInfo.contents;

    for (key in contents) {
      info = contents[key];
      if (info.type == "trend-graph") {
        elemID = tableID + "_" + key;
        time = ti/64.0;
        updateGraph(elemID, info, time, values, tableID);
      }
      else{
        if ('source' in info) {
          source = info.source;
        } else {
          source = key;
        }
        if (typeof source == "string") {
          value = values[source];
        } else {
          value = source.map(function(s) {
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
    var type = info.type,
        elemID = tableID + "_" + key,
        pair, elemKeyHTML, elemValueHTML,
        value, status, valueFormated;
    
    elemKeyHTML = $("<td />").html(key);
    if (type == "trend-graph") {
      elemValueHTML = $("<td />").attr("id", elemID).html("");
      appendTrendCurve(elemValueHTML, elemID, info, tableID);
    }
    else {
      value = convertValue(info, rawValue);
      status = valueStatus(info, value);
      valueFormated = formatValue(info, value);
      elemValueHTML = $("<td />").attr("id", elemID).html(valueFormated);
      addValueClass(elemValueHTML, status, type);
    }
    
    pair = $("<tr />").append(elemKeyHTML).append(elemValueHTML);
    return pair;
  }

  function appendTrendCurve(elemValueHTML, elemID, info, tableID) {
    var graph,
        xWidth, refreshCycle = 4,
        i = 0, plotInfo, sourceID, curve, capacity = 600,
        container,
        timeOriginHTML;

    if (graphs[elemID] !== void 0) {
      alert("appendTrendCurve(): " + elemID + " already exists.");
      return;
    }

    graph = new HSQuickLook.graph.MultiTrendCurves();
    graphs[elemID] = graph;
    graph.placeholder = "#"+elemID+"_placeholder";

    if ('options' in info) {
      if ('xWidth' in info.options) {
        xWidth = info.options.xWidth;
        capacity = xWidth;
        graph.xWidth = capacity;
      }
      if ('refreshCycle' in info.options) {
        refreshCycle = info.options.refreshCycle;
        graph.refreshCycle = refreshCycle;
      }
      if ('yRange' in info.options) {
        graph.options.yaxis.min = info.options.yRange[0];
        graph.options.yaxis.max = info.options.yRange[1];
      }
    }

    for (i=0; i<info.group.length; i++) {
      plotInfo = info.group[i];
      sourceID = tableID + "_" + plotInfo.source;
      curve = createTrendCurve(capacity, plotInfo);
      graph.addTrendCurve(sourceID, curve);
    }

    container = createPlotContainer(elemID);
    elemValueHTML.attr("id", elemID);
    elemValueHTML.append(container);
    
    timeOriginHTML = $("<div />").attr("id", elemID+"_timeorigin").html("Origin of time: ");
    timeOriginHTML.addClass("graph-timeorigin");
    timeOriginHTML.append($("<span />").attr("id", elemID+"_timeorigin_value"));
    elemValueHTML.append(timeOriginHTML);
  }

  function createTrendCurve(capacity, plotInfo) {
    var graph, options;

    graph = new HSQuickLook.graph.TrendCurve(),
    graph.setCapacity(capacity);
    graph.setRangeX([0.0, 30.0]);
    graph.setRangeY([-0.5, 10.0]);
    graph.options.xaxis.axisLabel = "Time (s)";
    graph.options.yaxis.axisLabel = "Value";
    
    if (plotInfo.mode == "diff") {
      graph.differentialMode = true;
    } else {
      graph.differentialMode = false;
    }

    if('upperBound' in plotInfo){
      graph.upperBound = plotInfo.upperBound;
    }

    if ('options' in plotInfo) {
      options = plotInfo.options;
      if (options.legend !== void 0) {
        graph.data.label = options.ledend;
      }
      if (options.color !== void 0) {
        graph.data.color = options.color;
        graph.data.points.fillColor = options.color;
      }
      if (options.pointSize !== void 0) {
        graph.data.points.radius = options.pointSize;
      }
    }

    return graph;
  }

  function addValueClass(target, status, type) {
    var statusClass;
    if (status != "") {
      statusClass = "status-" + status;
      target.addClass(statusClass);
    }
    target.addClass("type-" + type);
  }

  function updateValue(key, rawValue, info, tableID) {
    var elemID = tableID + "_" + key,
        target,
        value,
        status,
        type = info.type,
        valueFormated;
    
    if (type == "image") {
      updateImage(key, rawValue, info, tableID);
    } else if (type == "trend-graph") {
      // do nothing
    } else {
      target = $("#" + elemID);
      value = convertValue(info, rawValue);
      status = valueStatus(info, value);
      valueFormated = formatValue(info, value);
      target.html(valueFormated);
      target.removeClass();
      addValueClass(target, status, type);
    }
  }

  function updateGraph(elemID, info, time, values, tableID) {
    var graph, xValue,
        i = 0, plotInfo, source, convertedValue, sourceID, curve;

    graph = graphs[elemID];
    if (graph.timeOrigin === void 0) {
      graph.timeOrigin = time;
      $("#" + elemID + "_timeorigin_value").html(time);
    }
    xValue = time - graph.timeOrigin;

    for (i=0; i<info.group.length; i++) {
      plotInfo = info.group[i];
      source = plotInfo.source;
      convertedValue = Number(convertValue(plotInfo, values[source]));
      sourceID = tableID + "_" + source;

      curve = graph.getTrendCurve(sourceID);
      curve.pushData([xValue, convertedValue]);
      graph.adjustRangeY(curve.getLastYValue());
    }
    
    graph.adjustRangeX(xValue);
    graph.plot();
  }

  function updateImage(key, rawValue, info, tableID) {
    var elemID = tableID + "_" + key,
        target,
        value = convertValue(info, rawValue),
        image1, image2, data, data64, binaryData, mimeType,
        height, width,
        oldBlobURL, currentBlobURL, newBlobURL,
        URL;

    target = $("#" + elemID);
    target.removeClass("display_phase1").addClass("display_phase0");
    image1 = target.children("img.image_new");
    image2 = target.children("img.image_old");
    data = JSON.parse(value);
    data64 = data.data.replace(/\s/g, '');
    binaryData = atob(data64);
    mimeType = data.type;
    height = data.height;
    width = data.width;
    
    oldBlobURL = image2.attr("src");
    currentBlobURL = image1.attr("src");
    newBlobURL = createImageURL(binaryData, mimeType);
    image2.attr({
      "src" : newBlobURL,
      "height" : height,
      "width" : width
    });
    image1.removeClass("image_new").addClass("image_old");
    image2.removeClass("image_old").addClass("image_new");
    
    setTimeout(
      function() {
        target.removeClass("display_phase0").addClass(
          "display_phase1");
      }, 250);
    
    if (oldBlobURL) {
      URL = window.URL || window.webkitURL;
      URL.revokeObjectURL(oldBlobURL);
    }
  }

  function createImageURL(binaryData, mimeType) {
    var buf = new ArrayBuffer(binaryData.length),
        view = new Uint8Array(buf),
        i = 0,
        blob, URL, blobURL;
    
    for (i=0; i<view.length; i++) {
      view[i] = binaryData.charCodeAt(i);
    }
    blob = new Blob([view], {
      "type" : mimeType
    });
    URL = window.URL || window.webkitURL;
    blobURL = URL.createObjectURL(blob);
    return blobURL;
  }

  function valueStatus(info, value) {
    var status;
    if ('status' in info) {
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
    var value = rawValue,
        conversion;

    if ('conversion' in info) {
      conversion = info.conversion;
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
    var format = info.format,
        valueFormated = (format === void 0) ? value : sprintf(format, value);
    return valueFormated;
  }

  /***************************************************************************
   * Trend curve plots
   */
  function createPlotContainer(elemID) {
    var container, placeholder;
    container = $("<div />").attr("id", elemID+"_graph").addClass("graph-container");
    placeholder = $("<div />").attr("id", elemID+"_placeholder").addClass("graph-placeholder");
    container.append(placeholder);
    // dc.addClass("draggable");
    return container;
  }
  
  function resetGraphVariables() {
    delete graphs;
    graphs = new Object();
  }

})(); /* end of the anonymous function */
