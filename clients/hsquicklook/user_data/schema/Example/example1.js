HSQuickLook.main.schema =
    [
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": 1,
	      "section": "Detector_1",
	      "contents": {
		      "Detector": {"type": "string"},
		      "EventID": {"type": "int", "format": "%d"},
		      "Error": {"type": "int", "status": function(v){ return (v==0) ? "safe" : "error"; } , "format": "%d"},
          "Count": {"type": "int", "format": "%d"},
		      "Time": {"type": "int", "format": "%d"}
        }
      },
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": 1,
	      "section": "Detector_2",
	      "contents": {
		      "Detector": {"type": "string"},
	        "EventID": {"type": "int", "format": "%d"},
		      "Error": {"type": "int", "status": function(v){ return (v==0) ? "safe" : (v<=1) ? "warning" : "error"; }, "format": "%d"},
          "Count": {"type": "int", "format": "%d", "status": function(v){ return (v<1000000) ? "safe" : "warning";} },
		      "Time": {"type": "int", "format": "%d"}
        }
      }
    ];
