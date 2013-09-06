host = "ws://localhost:8080";

file_directory = "hsql_client/tmp";

ql_schema = [
  {
    "collection" : "main",
    "functionalObject": "DE",
    "attributeSequence": "USER_HK",
    "period" : 1,
    "blockName" : "Block_1",
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
  }
,
  {
    "collection" : "main",
    "functionalObject": "DE",
    "attributeSequence": "USER_HK",
    "period" : 1,
    "blockName" : "Block_2",
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
  }
  ,
  {
    "collection" : "image",
    "functionalObject": "ANALYSIS",
    "attributeSequence": "IMAGES",
    "period" : 1,
    "blockName" : "Block_images",
    "contents" : {
      "HXI_IMAGE" : {"type": "image"}
    }
  }
];
