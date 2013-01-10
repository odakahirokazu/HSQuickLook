var ws = new WebSocket(host);

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

  var target = $('div#main_tables').html("");
  for (var i=0; i<ql_schema.length; i++) {
    var ql = ql_schema[i];
    var collection = ql.collection;
    var period = ql.period;
    var file = ql.file;
    if (collection != undefined) {
      var table = create_table(collection);
      target.append(table);
      
      if (file == undefined) {
        ws.send('{"collection": "'+collection+'", "period": '+period+'}'); 
      } else {
        ws.send('{"collection": "'+collection+'", "period": '+period+', "file": 1}');
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


function create_table(collection) {
  var table = $("<table />").html("");
  table.attr("frame", "border");
  table.attr("rules", "all");
  table.attr("id", "table_"+collection);
  table.addClass("ql_table");
  
  var thead = $("<thead/>").html("");
  var thead_row = $("<tr/>").html("");
  var thead_title = $("<th/>").html(collection);
  thead_title.attr("colspan", "2");
  thead_title.attr("id", "table_"+collection+"_title");
  thead_row.append(thead_title);
  thead.append(thead_row);
  
  var tbody = $("<tbody/>").html("");
  tbody.attr("id", "table_"+collection+"_body");
  
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
    if (data_eval!=[]) {
      var obj = data_eval[collection];
    }

    if (obj==undefined) continue;
    
    var target = $('tbody#table_'+collection+'_body').html("");
    var contents = ql.contents;
    for (var key in contents) {
      var value = JSON.parse(obj)[key];
      log(obj+" => "+key+": "+value);

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
};
