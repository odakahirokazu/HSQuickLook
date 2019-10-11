HSQuickLook.main.schema =
[
{
	"collection": "main",
	"directory": "DE",
	"document": "USER_HK",
	"period": "1",
	"blockName": "Block_1",
	"contents": {
		"Detector": {"type":"string", "status":"ok"},
		"EventID": {"type":"int", "status":"ok", "format":"%d"},
		"Error": {"type":"int", "status":"get_status_error", "format":"%d"},
		"Time": {"type":"int", "status":"ok", "format":"%d"}
  }
},
{
	"collection": "main",
	"directory": "DE",
	"document": "USER_HK",
	"period": "1",
	"blockName": "Block_2",
	"contents": {
		"Detector": {"type":"string", "status":"ok"},
	  "EventID": {"type":"int", "status":"ok", "format":"%d"},
		"Error": {"type":"int", "status":"get_status_error", "format":"%d"},
		"Time": {"type":"int", "status":"ok", "format":"%d"}
  }
}
];
