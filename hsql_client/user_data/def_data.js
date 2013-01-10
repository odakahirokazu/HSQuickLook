host = "ws://192.168.1.1:8080";

var scaler_status =  function(v) {
  if (v < 20.0) return "safe";
  else if (v < 40.0) return "warning";
  else return "error";
};

ql_schema = [
  {
    "collection" : "main",
    "period" : 1,
    "contents" : {
      "Detector" : {"type": "string"},
      "EventID" : {"type": "int", "status": function() {return "ok";} },
      "CountRate" : {
        "type": "float",
        "format": "%.1f",
        "status": function(v) {
          if (v < 20.0) return "safe";
          else if (v < 40.0) return "warning";
          else return "error";
        }
      },
      "Error" : {
        "type": "int",
        "status": function(v) {
          if (v>0) return "error";
          else return "ok";
        }
      },
      "Time" : {
        "type" : "int"
      }
    }
  },

  {
    "collection" : "scaler",
    "period" : 2,
    "contents" : {
      "Scaler 1" : {"type": "int", "format": "%3d", "status": scaler_status },
      "Scaler 2" : {"type": "int", "format": "%3d", "status": scaler_status },
      "Scaler 3" : {"type": "int", "format": "%3d", "status": scaler_status },
      "Scaler 10" : {"type": "int", "format": "%3d", "status": scaler_status }
    }
  },

  {
    "collection" : "image",
    "period" : 10,
    "file" : 1,
    "contents" : {
      "Image" : {"type": "image" }
    }
  }
];
