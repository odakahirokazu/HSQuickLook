/************************************************************
 *   HS Quick Look
 *   
 *   Authors: Hirokazu Odaka, Soki Sakurai
 *   Date: 2012-10-14 (alpha)
 *   Date: 2014-04-07 (v0.5.1)
 * 
 ************************************************************/

/* Global variable */
var HSQuickLook = HSQuickLook || {};


/* The anonymous function of this script */
(function() {
  /************************************************************
   *   Exported variables
   */
  HSQuickLook.main = {};
  HSQuickLook.main.schema = null;


  /************************************************************
   *   Parameters
   */
  var draggableTables = false;
  var draggableGraphs = true;

  var ws = null;
  var schemaList;
  var paused = false;
  var graphs = new Array();
  var ymaxs= new Array();


  /************************************************************
   *   Main
   */
  $(document).ready(function(){
    bindEventForms();
    $.getJSON("user_data/user_configuration.json")
        .done(initialize)
        .fail(function(){ alert("User configuraion file is not found."); });
  });
                    

  /************************************************************
   *   Initialization
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
    $("input#button-clear-log").click(clearLog);
  }

  function initialize(user_config) {
    var title = user_config["title"];
    var host = user_config["ws_host"];
    var port = user_config["ws_port"];

    if (title === void 0) { title = "HS Quick Look"; }
    $('h1.title').html(title);
    $('title').html(title);

    if (host === void 0 || host == "") { host = location.host; }
    if (port === void 0) { host = "8080"; }
    $("#ws-host").val(host+":"+port);

    schemaList = user_config["schema_list"];
    for (var key in schemaList) {
      var group = $("<option />").html(key).attr("value", key);
      $("#selected-group").append(group);
    }
    
    setCurrentTime();
    loadDataSheetList();
    openConnection();
  }

  function setCurrentTime() {
    var t = new Date();
    $('input#time0').attr("value", t.getUTCFullYear());
    $('input#time1').attr("value", t.getUTCMonth()+1);
    $('input#time2').attr("value", t.getUTCDate());
    $('input#time3').attr("value", t.getUTCHours());
    $('input#time4').attr("value", t.getUTCMinutes());
    $('input#time5').attr("value", t.getUTCSeconds());    
  }

  function loadDataSheetList() {
    var group = $("#selected-group").val();
    var schema = schemaList[group];
    var target = $("#selected-data-sheet").html("");
    var title = $("<option />").html("").attr("value", "").attr("label", "Select data sheet");
    target.append(title);
    for (key in schema) {
      var dataSheet = $("<option />").html(key).attr("value", key);
      target.append(dataSheet);
    }
  }

  function preventDefaultEnterKey(e) {
    var KC_ENTER = 13;
    if(e.keyCode == KC_ENTER) { 
      e.preventDefault();
    }
  }

  /************************************************************
   *   Log
   */
  function log(message) {
    var messageElement = $("<div />").html(message);
    $('div#log').prepend(messageElement);
  }

  function clearLog() {
    $('div#log').html('');
  }


  /************************************************************
   *   WebSocket connection
   */
  function openConnection() {
    closeConnection();
    var host = "ws://"+$("#ws-host").val();
    ws = new WebSocket(host);

    ws.onopen = function() {
      log("WebSocket opened.");
      sendTimeNow();
      $("#button-connect").val("Close");
      $("#button-connect").unbind("click", openConnection);
      $("#button-connect").click(closeConnection);
    };

    ws.onclose = function() {
      log("WebSocket closed.");
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
  };

  function closeConnection() {
    if (ws) {
      ws.close();
      ws = null;
    }
  }


  /************************************************************
   *   Time control
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
    $("input[name='mode']").val(["mode-dl"]);
    $("input#mode-paused").attr("disabled", true);
    sendTime();
  }

  function sendTime() {
    var year = $('input#time0').val();
    var month = $('input#time1').val();
    var day = $('input#time2').val();
    var hour = $('input#time3').val();
    var minute = $('input#time4').val();
    var second = $('input#time5').val();
    var message = '{"time": "DL '+year+':'+month+':'+day+':'+hour+':'+minute+':'+second+'"}';
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
    if(e.keyCode == KC_ENTER) { 
      e.preventDefault();
      enterDLMode();
    }
  }


  /************************************************************
   *   Data sheet
   */
  function loadDataSheet() {
    var groupName;
    var dataSheetName = $("#selected-data-sheet").val();
    var fileName;

    if (dataSheetName == "") {
      return;
    }

    groupName = $("#selected-group").val();
    fileName = schemaList[groupName][dataSheetName];

    if (!ws) {
      alert("WebSocket is not connected. Please connect to WS server.");
      return;
    }

    for (key in graphs) {
      killGraph(key);
    }

    $("title").html(dataSheetName);
    
    $.ajax({
      url: fileName,
      // dataType : 'json',
      dataType : 'script',
      success: buildDataSheet,
      error: function(){ alert("Failed to read "+fileName+"."); }
    });
  }

  function buildDataSheet() {
    // display dummy time
    var ti = "-1";
    var unixtime = "2112-09-03 00:00:00 UTC";
    $('p#time').html(unixtime+" | TI: "+ti);

    // main tables
    var target = $('div#main-tables').html("");
    var schema = HSQuickLook.main.schema;
    for (var i=0; i<schema.length; i++) {
      var tableInfo = schema[i];
      if (tableInfo.collection !== void 0) {
        var table = createTable(tableInfo);
        target.append(table);
        initializeTable(tableInfo);
        ws.send(getRequestMessage(tableInfo));
      }
    }
    
    if (draggableTables) { $(".ql_table").draggable(); }
  }

  function updateDataSheet(data) {
    var dataEval = JSON.parse(data);
    if (dataEval==[]) return;

    var schema = HSQuickLook.main.schema;
    var timeUpdated = false;
    for (var i=0; i<schema.length; i++) {
      var tableInfo = schema[i];
      var documentLabel = getDocumentLabel(tableInfo);
      var dataObject = dataEval[documentLabel];
      if (dataObject !== void 0) {
        if (!timeUpdated) {
          // display time
          var ti = dataObject["TI"]>>>0;
          var unixtime = dataObject["UNIXTIME"];
          $('p#time').html(unixtime+" | TI: "+ti);
          timeUpdated = true;
        }
        setTimeout(displayImages, 100);
        updateTable(tableInfo, dataObject, ti);
      }
    }
  }


  /************************************************************
   *   Data table
   */
  function getBlockName(tableInfo) {
    return tableInfo.blockName;
  }

  function getTableName(tableInfo) {
    var tableName = tableInfo.tableName;
    if (tableName === void 0) { return getBlockName(tableInfo); }
    return tableName;
  }

  function getTableTitle(tableInfo) {
    var tableTitle = tableInfo.tableTitle;
    if (tableTitle === void 0) { return getTableName(tableInfo); }
    return tableTitle;
  }

  function getTableID(tableInfo) {
    var collection = tableInfo.collection;
    var directory = tableInfo.functionalObject;
    var directory1 = directory.split('/').join('_').split('.').join('_');
    var document = tableInfo.attributeSequence;
    var document1 = document.split('.').join('_');
    var table = getTableName(tableInfo);
    return (collection+'-'+directory1+'-'+document1+'-'+table);
  }

  function getRequestMessage(tableInfo) {
    var collection = tableInfo.collection;
    var directory = tableInfo.functionalObject;
    var document = tableInfo.attributeSequence;
    var period = tableInfo.period;
    var message = '{"collection": "'+collection+'", '
        +'"functionalObject": "'+directory+'", '
        +'"attributeSequence": "'+document+'", '
        +'"period": "'+period+'"}';
    return message;
  }

  function getDocumentLabel(tableInfo) {
    var collection = tableInfo.collection;
    var directory = tableInfo.functionalObject;
    var document = tableInfo.attributeSequence;
    var documentLabel = collection+'/'+directory+'/'+document;
    return documentLabel;
  }

  function createTable(tableInfo) {
    var tableID = getTableID(tableInfo);

    var table = $("<table />").html("");
    table.attr("frame", "border");
    table.attr("rules", "all");
    table.attr("id", "table_"+tableID);
    table.addClass("ql_table");
    
    var thead = $("<thead />").html("");
    var theadRow = $("<tr />").html("");
    var theadTitle = $("<th />").html(getTableTitle(tableInfo));
    theadTitle.attr("colspan", "2");
    theadTitle.attr("id", "table_"+tableID+"_title");
    theadRow.append(theadTitle);
    thead.append(theadRow);
    
    var tbody = $("<tbody/>").html("");
    tbody.attr("id", "table_"+tableID+"_body");
    
    table.append(thead);
    table.append(tbody);

    return table;
  }

  function initializeTable(tableInfo) {
    var tableID = getTableID(tableInfo);
    var contents = tableInfo.contents;

    var tbody = $('tbody#table_'+tableID+'_body').html("");
    for (var key in contents) {
      var info = contents[key];
      var value = 0;
      var type = info.type;
      if (type=="image") {
        value = "<img class=\"image_old\" />";
      }
      tbody.append(makePair(key, value, info, tableID));
    }
  }

  function updateTable(tableInfo, data, ti) {
    var blocks = data["Blocks"];
    var blockData = void 0;
    for (var ib=0; ib<blocks.length; ib++) {
      if (blocks[ib]["BlockName"] == tableInfo.blockName) {
        blockData = blocks[ib];
        break;
      }
    }
    if (blockData === void 0) {
      return false;
    }

    var values = blockData["Contents"];
    var tableID = getTableID(tableInfo);
    var contents = tableInfo.contents;
    for (var key in contents) {
      var info = contents[key];
      if ('source' in info) {
        var source = info.source;
      }
      else {
        var source = key;
      }
      if (typeof source == "string") {
        var value = values[source];
      }
      else {
        var value = source.map(function(s){ return values[s]; });
      }
      
      if (value === void 0) continue;

      updateValue(key, value, info, tableID);
      
      var fullKey = tableID+"_"+key;
      var time = ti/64.0;
      if (graphs[fullKey] !== void 0) {
        graphs[fullKey].pushData([time, Number(value)]);
        // graphs[fullKey].setXRange(ti-2900.5, ti+0.5);
        // graphs[fullKey].setYRange(-0.5, Number(value)*1.5);
        if (!graphs[fullKey].isRangeLocked()) {
          while (ymaxs[fullKey] <= Number(value) + 0.1) {
            ymaxs[fullKey] = 2*ymaxs[fullKey] + 1;
          }
          graphs[fullKey].plot([time-600.5, time+0.5], [-0.1,ymaxs[fullKey]]);
        }
      }
    }
    return true;
  }


  /************************************************************
   *   Data element
   */
  function makePair(key, rawValue, info, tableID) {
    var value = convertValue(info, rawValue);
    var status = valueStatus(info, value);
    var valueFormated = formatValue(info, value);

    var elemID = tableID+"_"+key;
    var elemKey = $("<td />").html(key);
    var elemValue = $("<td />").attr("id", elemID).html(valueFormated);
    var type = info.type;
    if (type !== void 0) {
      var graphtype = info.graphtype;
      if (graphtype) {
        if (graphtype=="trend") {
          elemKey.html("");
          var name = tableID+"_"+key;
          // var name = key;
          var test = $("<a />").html(key);
          test.attr("id", name+"_row");
          test.attr("href", "#");
          test.addClass("graph_ready");
          test.click(function() {
            showGraph(name);
            // alert(99);
          });
          elemKey.append(test);
        }
      }
    }

    addValueClass(elemValue, status, type);
    var pair = $("<tr />").append(elemKey).append(elemValue);
    return pair;
  }

  function addValueClass(target, status, type) {
    if (status != "") {
      var statusClass = "status-"+status;
      target.addClass(statusClass);
    }
    target.addClass("type-"+type);
  }

  function updateValue(key, rawValue, info, tableID) {
    var elemID = tableID+"_"+key;
    var target = $("#"+elemID);

    var value = convertValue(info, rawValue);
    var status = valueStatus(info, value);
    var type = info.type;
    if (type == "image") {
      target.removeClass("display_phase1").addClass("display_phase0");
      target.find("img").removeClass("image_new").addClass("image_old");
      target.prepend(value);
    } else {
      var valueFormated = formatValue(info, value);
      target.html(valueFormated);
      target.removeClass();
      addValueClass(target, status, type);
    }
  }

  function valueStatus(info, value) {
    if ('status' in info) {
      var status = info.status;
      if (typeof status == "function") {
        status = status(value);
      }
    } else {
      var status = "";
    }
    return status;
  }

  function convertValue(info, rawValue) {
    var value = rawValue;
    if ('conversion' in info) {
      var conversion = info.conversion;
      if (typeof conversion == "function") {
        value = conversion(value);
      }
    }
    else {
      if (info.type == "uint") {
        value = value>>>0;
      }
    }
    return value;
  }

  function formatValue(info, value) {
    var format = info.format;
    var valueFormated = (format === void 0) ? value : sprintf(format, value);
    return valueFormated;
  }


  /************************************************************
   *   Image display control
   */
  function displayImages() {
    $(".display_phase0").removeClass("display_phase0").addClass("display_phase1");
    $(".image_old").remove();
  }

  function setAllImagesOld() {
    $(".image_new").removeClass("image_new").addClass("image_old");
  }


  /************************************************************
   *   Trend curve plots
   */
  function create_plotcontainer(plotid) {
    var dc = $("<div />").attr("id", plotid+"_graph").addClass("demo-container");
    var ph = $("<div />").attr("id", plotid+"_placeholder").addClass("demo-placeholder");
    dc.append(ph);
    // dc.addClass("draggable");
    return dc;
  }

  function showGraph(key) {
    var pltarget = create_plotcontainer(key);
    if (draggableGraphs) {
      pltarget.draggable();
    }
    $("body").append(pltarget);

    var g = null;
    if(graphs[key]){
      g = graphs[key];
    }
    else{
      g = new HSQuickLook.JGraph.JGraph(HSQuickLook.JGraph.PointType.NoError, HSQuickLook.JGraph.PointType.NoError);
      g.setDataLabel(key);
      g.setCapacity(600);
      g.setPointFormat(true);
      g.setDefaultXRange(0.0,30.0);
      g.setDefaultYRange(-0.5,10.0);
      g.setQueryToPlaceholder(("#"+key+"_placeholder"));
      g.setXLabel("TI (s)");
      g.setYLabel("Value");
      graphs[key] = g;
      ymaxs[key] = 0.0;
    }

    pltarget.resizable({
      handles : "se"
    });
    pltarget.dblclick(function() {
      // g.lockRange(false);
      // g.plotInDefaultRange();
      g.plot();
    });
    pltarget.bind("dblTap", function() {
      g.plot();
    });

    g.enableRescale(true, false);
    // g.setLogScaleY(true);

    $("#"+key+"_row").unbind("click");
    $("#"+key+"_row").removeClass("graph_ready");
    $("#"+key+"_row").addClass("graph_shown");
    $("#"+key+"_row").click(function(){killGraph(key);});
  }

  function killGraph(key){
    $("#"+key+"_graph").remove();
    $("#"+key+"_row").unbind("click");
    $("#"+key+"_row").removeClass("graph_shown");
    $("#"+key+"_row").addClass("graph_ready");
    $("#"+key+"_row").click(function(){showGraph(key);});
    delete graphs[key];
  }

})(); /* end of the anonymous function */
