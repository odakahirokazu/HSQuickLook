var ws = new WebSocket(host);
var logMode = false;

var graphs = new Array()


function sendTimeFunc(e) {
  var KC_ENTER = 13;
  // log ("key input");
  if(e.keyCode == KC_ENTER) { 
    e.preventDefault();
    sendTime();
  }
};

$(document).ready(function() {
  $('input#post_ql').click(sendTimeNow);
  $('input#post_dl').click(sendTime);
  $('input#time_0').keypress(sendTimeFunc);
  $('input#time_1').keypress(sendTimeFunc);
  $('input#time_2').keypress(sendTimeFunc);
  $('input#time_3').keypress(sendTimeFunc);
  $('input#time_4').keypress(sendTimeFunc);
  $('input#time_5').keypress(sendTimeFunc);
});


ws.onopen = function() {
  log("WebSocket opened.");

  sendTimeNow();

  $('h1#title').html(title);
  $('title').html(title);

  if (!logMode) {
    var target = $('div#main_tables').html("");
  }

  if (fileDirectory != undefined) {
    var message = '{"fileDirectory": "'+fileDirectory+'"}';
    ws.send(message);
  }

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
};


ws.onclose = function() {
  log("WebSocket closed.");
};


ws.onmessage = function(e) {
  // log("WebSocket message: "+e.data);
  update(e.data);
};


function getCSSID(collection, functionalObject, attributeSequence, blockName) {
  return (collection+'_'+functionalObject+'_'+attributeSequence+'_'+blockName).split('/').join('_').split('.').join('_');
};


function post() {
  var t = $('input#period').val();
  ws.send("period: "+t);
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


function log(message) {
  var mes_div = $("<div />").html(message);
  $('div#log').prepend(mes_div);
//  alert(message);
};


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

  return table;
}

function create_plotcontainer(plotid) {
  var pltarget = $("<div />")
      .attr("id", plotid)
      .attr("style",
          "position:absolute; top:200px; left:400px;border:1px #000000 solid;")
      .addClass("jgplot").addClass("draggables").html("");
  var dc = $("<div />").attr("id", "container").addClass("demo-container");
  var ph = $("<div />").attr("id", "placeholder")
      .addClass("demo-placeholder");
  dc.append(ph);
  pltarget.append(dc);
  return pltarget;
}

function showLC(key) {
  var g = new JGraph(JGraph.PointType.NoError, JGraph.PointType.NoError);
  g.setDataLabel(key);
  g.setCapacity(300);
  g.setPointFormat(false);
  g.setDefaultXRange(0.0,30.0);
  g.setDefaultYRange(-0.5,10.5);
  var pltarget = create_plotcontainer(key);
  if (drag_enabled) {
    pltarget.draggable();
  }
  $("body").append(pltarget);

  g.setQueryToPlaceholder(("div#" + key + " #placeholder"));

  $("div#" + key + " #container").resizable({
    handles : "se"
  });
  $("div#" + key + " #container").dblclick(function() {
//    g.lockRange(false);
//    g.plotInDefaultRange();
    g.plot();
  });

   g.enableRescale(true, true);

   $("div#" + key + " #container").bind("dblTap", function() {
     g.plot();
   });

  graphs[key] = g;
}


function makePair(key, value, type, status, format, parentID) {
  var elemKey = $("<td />").html(key);

  if (format==undefined) {
    var elemValue = $("<td />").attr("id",parentID+"_"+key).html(value);
  } else {
    var elemValue = $("<td />").attr("id",parentID+"_"+key).html(sprintf(format, value));
  }

  if (type!=undefined) { elemValue.addClass(type); }
  if (status!="") { elemValue.addClass(status); }

  var pair = $("<tr />").append(elemKey).append(elemValue);
  return pair;
}


function initializeTable() {
//  $(".ql_table").draggable();
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
      target.append(makePair(key, value, type, status, format, cssID));
    }
  }
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
    var ti = obj["TI"];
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
//         alert(value);
//        target.append(makePair(key, value, type, status, format));
      }
    }
  }
};
