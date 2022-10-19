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
                    "group": [{"source": "Error"}],
                    "options": {"xWidth": 100 }
                   },
          "Count": {"type": "trend-graph",
                    "group": [{"source": "Count"}],
                    "options": {"xWidth": 100 }
                   },
          "Count-diff": {"type": "trend-graph",
                         "group": [{"source": "Count", "mode": "diff"}],
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
	      "section": "Detector_2",
	      "contents": {
          "Detector": {"type": "string"},
		      "EventID": {"type": "trend-graph",
                      "group": [{"source": "EventID"}],
                      "options": {"xWidth": 100 }
                     },
		      "Error": {"type": "trend-graph",
                    "group": [{"source": "Error"}],
                    "options": {"xWidth": 100 }
                   },
          "Count": {"type": "trend-graph",
                    "group": [{"source": "Count"}],
                    "options": {"xWidth": 100 }
                   },
          "Count-diff": {"type": "trend-graph",
                         "group": [{"source": "Count", "mode": "diff"}],
                         "options": {"xWidth": 100 }
                   },
          "Time": {"type": "int", "format": "%d"}
        }
      }
    ];
