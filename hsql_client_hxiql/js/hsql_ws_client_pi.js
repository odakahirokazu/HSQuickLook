var ws = new WebSocket(host);
var logMode = false;

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


function makePair(key, value, type, status, format) {
  var elemKey = $("<td />").html(key);

  if (format==undefined) {
    var elemValue = $("<td />").html(value);
  } else {
    var elemValue = $("<td />").html(sprintf(format, value));
  }

  if (type!=undefined) { elemValue.addClass(type); }
  if (status!="") { elemValue.addClass(status); }

  var pair = $("<tr />").append(elemKey).append(elemValue);
  return pair;
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

    // make tables
    var blocks = obj["Blocks"];
    for (var ib=0; ib<blocks.length; ib++) {
      var block = blocks[ib];
      if (block["BlockName"] != ql.blockName) continue;
      var blockData = block["Contents"];
      var cssID = getCSSID(ql.collection, ql.functionalObject, ql.attributeSequence, ql.blockName);
      var target = $('tbody#table_'+cssID+'_body').html("");
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
        target.append(makePair(key, value, type, status, format));
      }
    }
  }
};
