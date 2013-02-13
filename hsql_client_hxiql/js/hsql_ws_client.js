var ws = new WebSocket(host);
var log_mode = false;

$(document).ready(function() {
  var KC_ENTER = 13;
  $('input#post').click(post);
  $('input#period').keypress(function(e) {
    // log ("key input");
    if(e.keyCode == KC_ENTER) { 
      e.preventDefault();
      post();
    }
  });
});


ws.onopen = function() {
  log("WebSocket opened.");

  if (!log_mode) {
    var target = $('div#main_tables').html("");
  }

  if (file_directory != undefined) {
    var message = '{"fileDirectory": "'+file_directory+'"}';
    ws.send(message);
  }
  
  for (var i=0; i<ql_schema.length; i++) {
    var ql = ql_schema[i];
    var collection = ql.collection;
    var fo = ql.functionalObject;
    var attrs = ql.attributeSequence;
    var block = ql.blockName;
    var period = ql.period;
    if (collection != undefined) {
      if (!log_mode) {
        var table = create_table(block, getCSSID(collection, fo, attrs, block));
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


function log(message) {
  var mes_div = $("<div />").html(message);
  $('div#log').prepend(mes_div);
};


function create_table(name, css_id) {
  var table = $("<table />").html("");
  table.attr("frame", "border");
  table.attr("rules", "all");
  table.attr("id", "table_"+css_id);
  table.addClass("ql_table");
  
  var thead = $("<thead/>").html("");
  var thead_row = $("<tr/>").html("");
  var thead_title = $("<th/>").html(name);
  thead_title.attr("colspan", "2");
  thead_title.attr("id", "table_"+css_id+"_title");
  thead_row.append(thead_title);
  thead.append(thead_row);
  
  var tbody = $("<tbody/>").html("");
  tbody.attr("id", "table_"+css_id+"_body");
  
  table.append(thead);
  table.append(tbody);
  
  return table;
}


function make_pair(key, value, type, status, format) {
  var elem_key = $("<td />").html(key);

  if (format==undefined) {
    var elem_value = $("<td />").html(value);
  } else {
    var elem_value = $("<td />").html(sprintf(format, value));
  }

  if (type!=undefined) { elem_value.addClass(type); }
  if (status!="") { elem_value.addClass(status); }

  var pair = $("<tr />").append(elem_key).append(elem_value);
  return pair;
}


function update(data) {
  var data_eval = JSON.parse( data );
  
  for (var i=0; i<ql_schema.length; i++) {
    var ql = ql_schema[i];
    var qlName = ql.collection+'/'+ql.functionalObject+'/'+ql.attributeSequence;
    if (data_eval!=[]) {
      var obj = data_eval[qlName];
    }
    // log(obj);

    if (obj==undefined) continue;

    var blocks = JSON.parse(obj)["Blocks"];
    for (var ib=0; ib<blocks.length; ib++) {
      var block = blocks[ib];
      if (block["BlockName"] != ql.blockName) continue;
      var blockData = block["Contents"];
      var cssID = getCSSID(ql.collection, ql.functionalObject, ql.attributeSequence, ql.blockName);
      var target = $('tbody#table_'+cssID+'_body').html("");
      var contents = ql.contents;
      
      for (var key in contents) {
        var value = blockData[key];
        // log(obj+" => "+key+": "+value);
        // log("Obj => "+key+": "+value);
        
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
        target.append(make_pair(key, value, type, status, format));
      }
    }
  }
};
