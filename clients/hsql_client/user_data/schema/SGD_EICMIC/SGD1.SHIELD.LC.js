HSQuickLook.main.schema = [
  {
    "collection": "sgd1",
    "functionalObject": "/SGD1.APMU1",
    "attributeSequence": "APMU_SCL",
    "period": "1",
    "tableName": "APMU_scalers",
    "blockName": "APMU_SCL_block",
    "contents": {
      "Event_count": {
        "type": "trend-graph",
        "group": [
          {
            "source": "SCL_FBGO1", "mode": "diff",
            "options": { "legend": "1", "color": "black", "pointSize": 0.5 }
          },
          {
            "source": "SCL_FBGO2", "mode": "diff",
            "options": { "legend": "2", "color": "red", "pointSize": 0.5 }
          }
        ],
        "options" : {"xWidth" : 600}
      }
    }
  }
];
