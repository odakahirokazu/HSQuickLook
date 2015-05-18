HSQuickLook.main.schema = [
  {
    "collection": "hxi2",
    "directory": "/HXI2.USR",
    "document": "USR_HK",
    "period": "1",
    "tableName": "USR_HK_CAM",
    "blockName": "APP_VAL_block",
    "contents": {
      "Event_count": {
        "type": "trend-graph",
        "group": [
          {"source":"EVNT_DERR_SIZE", "mode":"diff", "upperBound":(1<<16), "options":{"legend":"EVNT_DERR_diff", "color":"black", "pointSize":0.5}},
          {"source":"EVNT_RCV_CNT", "mode": "diff", "upperBound":(1<<16), "options":{"legend":"EVNT_RCV_diff", "color":"red"}},
          {"source":"EVNT_REJ_CNT", "mode": "diff", "upperBound":(1<<16), "options":{"legend": "EVNT_REJ_diff", "color":"blue"}}
        ],
        "options": { "xWidth": 600 }
      },
      "Event_tlm_count" : {
        "type": "trend-graph",
        "group": [
          {"source":"EVNT_SEL_CNT_H", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"High", "color":"red"}},
          {"source":"EVNT_SEL_CNT_M", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"Middle", "color":"green"}},
          {"source":"EVNT_SEL_CNT_L", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"low", "color":"blue"}}
        ],
        "options": { "xWidth": 1200 }
      },
      "event_tlm_rej": {
        "type": "trend-graph",
        "group": [
          {"source":"EVNT_TLM_REJ_CNT_H", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"High", "color":"red"}},
          {"source":"EVNT_TLM_REJ_CNT_M", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"Middle", "color":"green"}},
          {"source":"EVNT_TLM_REJ_CNT_L", "mode":"diff", "upperBound":Math.pow(2, 32), "options":{"legend":"low", "color":"blue"}}
        ],
        "options": { "xWidth": 1200 }
      }
    }
  }
];
