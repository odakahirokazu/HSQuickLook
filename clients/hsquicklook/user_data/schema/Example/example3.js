HSQuickLook.main.schema =
    [
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": "1",
	      "section": "Detector_1",
	      "contents": {
          "Detector": {"type": "string"},
		      "EventID": {"type": "trend-graph",
                      "group": [{"source": "EventID"}],
                      "options": {"xWidth": 100 }
                     },
		      "Error": {"type": "trend-graph",
                    "group": [{"source": "Error",
                               "options": {"legend": "Error", "color": "red"}}],
                    "options": {"xWidth": 100 }
                   },
          "Count": {"type": "trend-graph",
                    "group": [{"source": "Count",
                               "options": {"legend": "Count", "color": "blue", "pointSize": 0.2}}],
                    "options": {"xWidth": 100 }
                   },
          "Count-diff": {"type": "trend-graph",
                         "group": [{"source": "Count", "mode": "diff", "upperBound": 0 }],
                         "options": {"xWidth": 100 }
                   },
          "Time": {"type": "int", "format": "%d"}
        }
      },
      {
	      "collection": "main",
	      "directory": "Detector",
	      "document": "BasicStatus",
	      "period": "1",
	      "section": "Temperature",
	      "contents": {
          "EventID": {"type": "trend-graph",
                      "group": [
                        {"source": "Temperature0", "conversion": function(v){ return 20.0+0.01*v; }, "options": {"legend": "Temperature0", "color": "black"} },
                        {"source": "Temperature1", "conversion": function(v){ return 20.0+0.01*v; }, "options": {"legend": "Temperature1", "color": "red"} },
                        {"source": "Temperature2", "conversion": function(v){ return 20.0+0.01*v; }, "options": {"legend": "Temperature2", "color": "green"} },
                        {"source": "Temperature3", "conversion": function(v){ return 20.0+0.01*v; }, "options": {"legend": "Temperature3", "color": "blue"} },
                        {"source": "Temperature4", "conversion": function(v){ return 20.0+0.01*v; }, "options": {"legend": "Temperature4", "color": "magenta"} }
                      ],
                      "options": {"xWidth": 100 }
                     }
        }
      }
    ];
