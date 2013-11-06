var ws = null;
var logMode = false;

var schemaList;

var graphs = new Array()
var ymaxs= new Array()

var drag_enabled = true;

var qlSchema=null;

function sendTimeFunc(e) {
  var KC_ENTER = 13;
  // log ("key input");
  if(e.keyCode == KC_ENTER) { 
    e.preventDefault();
    sendTime();
  }
};

function sendTime() {
  var year = $('input#time_0').val();
  var month = $('input#time_1').val();
  var day = $('input#time_2').val();
  var hour = $('input#time_3').val();
  var minute = $('input#time_4').val();
  var second = $('input#time_5').val();
  var message = '{"time": "DL '+year+':'+month+':'+day+':'+hour+':'+minute+':'+second+'"}';
  ws.send(message);    
}

function sendTimeNow() {
  var message = '{"time": "QL" }';
  ws.send(message);    
}




function connectToHost(){
  closeHostConnection();
  var host = "ws://"+$("#hostform").val();
  ws = new WebSocket(host);
  setWebsocketConfig(ws);
};

function closeHostConnection(){
  if(ws){
    ws.close();
    ws = null;
  }
};


function loadAttributeSequenceList(){
  var foname = $("#folist").val();
  var foschema = schemaList[foname];
  $("#attrseqlist").html("");
  for(key in foschema){
    var thead = $("<option/>").html(key).attr("value",key);
    $("#attrseqlist").append(thead);  
  }
}

function loadSelectedTables(){
  for(key in graphs){
    killGraph(key);
  }
  setTables($("#folist").val(), $("#attrseqlist").val());
}

function setTables(foName, attrSeqName){
  if(!ws){
    alert("Connect to ws server first.");
    return;
  }
  var fileName = schemaList[foName][attrSeqName];
  $.ajax( {
    url: fileName,
    // dataType : 'json',
    dataType : 'script',
    // success: function( data ) {
    success: function() {
      // qlSchema = data;
      var target = $('div#main_tables').html("");
      for (var i=0; i<qlSchema.length; i++) {
        var ql = qlSchema[i];
        var collection = ql.collection;
        var fo = ql.functionalObject;
        var attrs = ql.attributeSequence;
        var block = ql.blockName;
        var period = ql.period;
        if (collection != undefined) {
          if (!logMode) {
            var table = createTable(block, getCSSID(collection, fo, attrs, block));
            target.append(table);
          }
          var message = '{"collection": "'+collection+'", '
                      +'"functionalObject": "'+fo+'", '
                      +'"attributeSequence": "'+attrs+'", '
                      +'"period": "'+period+'"}';
          ws.send(message);
        }
      }
      initializeTable();
        // alert(data[0].collection);
    },
    error: function( data ) {
      alert("Getting or parsing "+fileName+" failed.");
    }
  } );  
}

$(document).ready(function() {
  $('input#post_ql').click(sendTimeNow);
  $('input#post_dl').click(sendTime);
  $('input#time_0').keypress(sendTimeFunc);
  $('input#time_1').keypress(sendTimeFunc);
  $('input#time_2').keypress(sendTimeFunc);
  $('input#time_3').keypress(sendTimeFunc);
  $('input#time_4').keypress(sendTimeFunc);
  $('input#time_5').keypress(sendTimeFunc);

  $("#connecttohost").click(connectToHost);

  // connectToHost();

  $.ajax( {
    url: "user_data/user_configuration.json",
    dataType : 'json',
    success: function( data ) {
      schemaList = data["schema_list"];
      for (var key in schemaList) {
        var filepath = schemaList[key];
        var thead = $("<option/>").html(key).attr("value",key);
        $("#folist").append(thead);
      }
      loadAttributeSequenceList();
      $("#hostform").val(data["host"]+":"+data["port"]);
      connectToHost();
    },
    error: function( data ) {
      alert(" does not exist");
    }
  } );
});


function setWebsocketConfig(ws){
  ws.onopen = function() {
    log("WebSocket opened.");

    sendTimeNow();

    $('h1#title').html("ASTRO-H Quick Look");
    $('title').html("ASTRO-H Quick Look");

    $("#connecttohost").val("close");
    $("#connecttohost").unbind("click",connectToHost);
    $("#connecttohost").click(closeHostConnection);
    // if (fileDirectory != undefined) {
    //   var message = '{"fileDirectory": "'+fileDirectory+'"}';
    //   ws.send(message);
    // }
  };


  ws.onclose = function() {
    log("WebSocket closed.");
    $("#connecttohost").val("connect");
    $("#connecttohost").unbind("click");
    $("#connecttohost").click(connectToHost);
  };


  ws.onmessage = function(e) {
    // log("WebSocket message: "+e.data);
    update(e.data);
  };
};

function getCSSID(collection, functionalObject, attributeSequence, blockName) {
  return (collection+'_'+functionalObject+'_'+attributeSequence+'_'+blockName).split('/').join('_').split('.').join('_');
};



function log(message) {
  var mes_div = $("<div />").html(message);
  $('div#log').prepend(mes_div);
//  alert(message);
};



function create_plotcontainer(plotid) {
  var dc = $("<div />").attr("id", plotid+"_graph").addClass("demo-container");
  var ph = $("<div />").attr("id", plotid+"_placeholder").addClass("demo-placeholder");
  dc.append(ph);
  // dc.addClass("draggable");
  return dc;
}

function showGraph(key) {
  var pltarget = create_plotcontainer(key);
  if (drag_enabled) {
    pltarget.draggable();
  }
  $("body").append(pltarget);

  var g = null;
  if(graphs[key]){
    g = graphs[key];
  }
  else{
    g = new JGraph(JGraph.PointType.NoError, JGraph.PointType.NoError);
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

function createTable(name, cssID) {
  var table = $("<table />").html("");
  table.attr("frame", "border");
  table.attr("rules", "all");
  table.attr("id", "table_"+cssID);
  table.addClass("ql_table");
  
  var thead = $("<thead/>").html("");
  var theadRow = $("<tr/>").html("");
  var theadTitle = $("<th/>").html(name);
  theadTitle.attr("colspan", "2");
  theadTitle.attr("id", "table_"+cssID+"_title");
  theadRow.append(theadTitle);
  thead.append(theadRow);
  
  var tbody = $("<tbody/>").html("");
  tbody.attr("id", "table_"+cssID+"_body");
  
  table.append(thead);
  table.append(tbody);

  // table.addClass("draggable");

  return table;
}


function makePair(key, value, type, status, format, parentID, graphtype) {
  var elemKey = $("<td />").html(key);

  if (format==undefined) {
    var elemValue = $("<td />").attr("id",parentID+"_"+key).html(value);
  } else {
    var elemValue = $("<td />").attr("id",parentID+"_"+key).html(sprintf(format, value));
  }

  if (type!=undefined) {
    if(graphtype){
      if(graphtype=="trend"){
        elemKey.html("");
        var name = parentID+"_"+key;
        // var name = key;
        var test = $("<a />").html(key);
        test.attr("id",name+"_row");
        test.attr("href", "#");
        test.addClass("graph_ready");
        test.click(function() {
          showGraph(name);
        // alert(99);
        });
        elemKey.append(test);
      }
    }
    elemValue.addClass(type); 
  }
  if (status!="") { elemValue.addClass(status); }

  var pair = $("<tr />").append(elemKey).append(elemValue);
  // pair.addClass("draggable");
  return pair;
}


function initializeTable() {
  for (var i=0; i<qlSchema.length; i++) {
    var ql = qlSchema[i];
    var qlName = ql.collection+'/'+ql.functionalObject+'/'+ql.attributeSequence;

    // show time
    var ti = "-1";
    var unixtime = "2112-09-03 00:00:00 UTC";
    $('p#time').html(unixtime+" | TI: "+ti);

    // make tables
    var cssID = getCSSID(ql.collection, ql.functionalObject, ql.attributeSequence, ql.blockName);
    var target = $('tbody#table_'+cssID+'_body').html("");
    var contents = ql.contents;
      
    for (var key in contents) {
        var s = contents[key];
        var value = 0;
        if ('status' in s) {
          var statusObj = s.status;
          if (typeof statusObj == "function") {
            var status = statusObj(value);
          } else {
            var status = statusObj;  
          }
        } else {
          var status = "";
        } 
        
        var format = s.format;
        var type = s.type;
        if (type=="image") {
          value = "<img class=\"image_old\" />";
        }
        var graphtype = s.graphtype;
        target.append(makePair(key, value, type, status, format, cssID, graphtype));
    }
  }
  $(".draggable").draggable();
}


function moveToPhase1() {
  $(".display_phase0").removeClass("display_phase0").addClass("display_phase1");
  $(".image_old").remove();
  setTimeout(moveToPhase2, 200);
}

function moveToPhase2() {
  $(".display_phase1").removeClass("display_phase1").addClass("display_phase2");
  $(".image_new").removeClass("image_new").addClass("image_old");
}


function update(data) {
//  $(".ql_table").draggable();
  var dataEval = JSON.parse( data );

  for (var i=0; i<qlSchema.length; i++) {
    var ql = qlSchema[i];
    var qlName = ql.collection+'/'+ql.functionalObject+'/'+ql.attributeSequence;
    if (dataEval!=[]) {
      var obj = dataEval[qlName];
    }
    if (obj==undefined) continue;

    // show time
    var ti = obj["TI"]>>>0;
    var unixtime = obj["UNIXTIME"];
    $('p#time').html(unixtime+" | TI: "+ti);

    setTimeout(moveToPhase1, 200);

    // make tables
    var blocks = obj["Blocks"];
    for (var ib=0; ib<blocks.length; ib++) {
      var block = blocks[ib];
      if (block["BlockName"] != ql.blockName) continue;
      var blockData = block["Contents"];
      var cssID = getCSSID(ql.collection, ql.functionalObject, ql.attributeSequence, ql.blockName);
      // var target = $('tbody#table_'+cssID+'_body').html("");
      var contents = ql.contents;

      for (var key in contents) {
        var value = blockData[key];
        if (value==undefined) continue;
        var s = contents[key];
        if ('status' in s) {
          var statusObj = s.status;
          if (typeof statusObj == "function") {
            var status = statusObj(value);
          } else {
            var status = statusObj;  
          }
        } else {
          var status = "";
        }
        
        var format = s.format;
        var type = s.type;
        if (type=="image") {
          $("#"+cssID+"_"+key).prepend(value);
        } else{
          $("#"+cssID+"_"+key).html(value);
        } 

        var fullkey = cssID+"_"+key;
        var time = ti/64.0;
        if (graphs[fullkey] != undefined) {
          graphs[fullkey].pushData([ time, Number(value) ]);
          // graphs[fullkey].setXRange(ti-2900.5, ti+0.5);
          // graphs[fullkey].setYRange(-0.5, Number(value)*1.5);
          if(!graphs[fullkey].isRangeLocked()){
            while(ymaxs[fullkey] <= Number(value) + 0.1){
              ymaxs[fullkey] = 2*ymaxs[fullkey] + 1;
            }
            graphs[fullkey].plot([time-600.5, time+0.5], [-0.1,ymaxs[fullkey]]);
          }
          // alert(fullkey);
        }

      }
    }
  }
};
