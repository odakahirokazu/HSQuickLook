function get_status_error(v) {
  if (v==0) { return "safe"; }
  else { return "error"; }
}

HSQuickLook.main.schema =
[
{
	"collection": "main",
	"directory": "DE",
	"document": "USER_HK",
	"period": "1",
	"blockName": "Block_1",
	"contents": {
		"Detector": {"type": "string"},
		"EventID": {"type": "int", "format": "%d"},
		"Error": {"type": "int", "status": function(v){ return (v==0) ? "safe" : "error"; } , "format": "%d"},
		"Time": {"type": "int", "format": "%d"}
  }
},
{
	"collection": "main",
	"directory": "DE",
	"document": "USER_HK",
	"period": "1",
	"blockName": "Block_2",
	"contents": {
		"Detector": {"type": "string"},
	  "EventID": {"type": "int", "format": "%d"},
		"Error": {"type": "int", "status": function(v){ return (v==0) ? "safe" : (v<=1) ? "warning" : "error"; }, "format": "%d"},
		"Time": {"type": "int", "format": "%d"}
  }
}
];
