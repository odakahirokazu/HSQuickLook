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
          "Flags": {"type": "uint", "format": "0x%08X", "status": function(v){ return ((v&0x1)==0x1) ? "error" : ((v&0x2)==0x10) ? "warning" : "safe";} },
          "Flags-status": {"source": "Flags", "type": "uint", "conversion": function(v){ return ((v&0x1)==0x1) ? "error" : ((v&0x10)==0x10) ? "warning" : "safe";} },
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
          "Flags": {"type": "uint", "format": "0x%08X", "status": function(v){ return ((v&0x1)==0x1) ? "error" : ((v&0x10)==0x10) ? "warning" : "safe";} },
          "Flags-status": {"source": "Flags", "type": "uint", "conversion": function(v){ return ((v&0x1)==0x1) ? "error" : ((v&0x10)==0x10) ? "warning" : "safe";} },
          "Count": {"type": "int", "format": "%d", "status": function(v){ return (v<1000000) ? "safe" : "warning";} },
		      "Time": {"type": "int", "format": "%d"}
        }
      },
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": 1,
	      "section": "Temperature",
	      "contents": {
          "Temperature0": {"type": "int"},
          "Temperature1": {"type": "int"},
          "Temperature2": {"type": "int"},
          "Temperature3": {"type": "int"},
          "Temperature4": {"type": "int"}
        }
      },
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": 1,
	      "section": "Temperature",
        "tableName": "Temperature_Conversion",
	      "contents": {
          "Temperature0": {source: "Temperature0", "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*v; } },
          "Temperature1": {source: "Temperature1", "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*v; } },
          "Temperature2": {source: "Temperature2", "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*v; } },
          "Temperature3": {source: "Temperature3", "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*v; } },
          "Temperature4": {source: "Temperature4", "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*v; } },
          "Average": {source: ["Temperature0", "Temperature1", "Temperature2", "Temperature3", "Temperature4"], "type": "float", format: "%5.2f C", "conversion": function(v){ return 20.0+0.01*((v[0]+v[1]+v[2]+v[3]+v[4])/5.0); } }
        }
      }
    ];
