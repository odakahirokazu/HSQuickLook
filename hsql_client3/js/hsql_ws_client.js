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

  if (!log_mode) var target = $('div#main_tables').html("");
  for (var i=0; i<ql_schema.length; i++) {
    var ql = ql_schema[i];
    var collection = ql.collection;
    var fo = ql.functionalObject;
    var attr_seq = ql.attributeSequence;
    var block_name = ql.blockName;
    var period = ql.period;
    var file = ql.file;
    if (collection != undefined) {
      var css_id = (collection+'_'+fo+'_'+attr_seq+'_'+block_name).split('/').join('_').split('.').join('_');
      log(css_id);
      
      if (!log_mode) {
        var table = create_table(block_name, css_id);
        target.append(table);
      }
      
      if (file == undefined) {
        ws.send('{"collection": "'+collection+'", '
                +'"fo_name": "'+fo+'", '
                +'"attr_seq": "'+attr_seq+'", '
                +'"period": '+period+'}');
      } else {
        ws.send('{"collection": "'+collection+'",'
                +'"fo_name": "'+fo+'", '
                +'"attr_seq": "'+attr_seq+'", '
                +'"period": '+period+', "file": 1}');
      }
    }
  }
};


ws.onclose = function() {
  log("WebSocket closed.");
};


ws.onmessage = function(e) {
  log("WebSocket message: "+e.data);
  update(e.data);
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
    var collection = ql.collection;
    var fo = ql.functionalObject;
    var attr_seq = ql.attributeSequence;
    var block_name = ql.blockName;
    var name = collection+'/'+fo+'/'+attr_seq;
    if (data_eval!=[]) {
      var obj = data_eval[name];
    }

    if (obj==undefined) continue;

    var blocks = JSON.parse(obj)["Contents"];
    for (var ib=0; ib<blocks.length; ib++) {
      var block = blocks[ib];
      if (block["BlockName"] != block_name) continue;
      var blockData = block["Contents"];
      var css_id = (collection+'_'+fo+'_'+attr_seq+'_'+block_name).split('/').join('_').split('.').join('_');
      var target = $('tbody#table_'+css_id+'_body').html("");
      var contents = ql.contents;
      for (var key in contents) {
        var value = blockData[key];
        // log(obj+" => "+key+": "+value);
        // log("Obj => "+key+": "+value);
        
        if (value==undefined) continue;
        
        var s = contents[key];
        if ('status' in s) {
          var status = s.status(value);
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
