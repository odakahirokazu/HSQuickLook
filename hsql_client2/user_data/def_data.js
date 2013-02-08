//host = "ws://ibuki.local:8080";
host = "ws://localhost:8080";

ql_schema = [
  {
    "collection" : "hk",
    "functionalObject": "/HXI1.USR",
    "attributeSequence": "USR_HK",
    "period" : 1,
    "blockName" : "APP_VAL_block",
    "contents" : {
      "DE_MODE" : {"type": "int"},
      "TOUT_CNT_CPMU_HK" : {"type": "int"},
      "DERR_CNT_CPMU_HK" : {"type": "int"},
      "TOUT_CNT_APMU_HK" : {"type": "int"},
      "DERR_CNT_APMU_HK" : {"type": "int"},
      "TOUT_CNT_APMU_SCL" : {"type": "int"},
      "EVNT_RCV_CNT" : {"type": "int"},
      "EVNT_REJ_CNT" : {"type": "int"},
      "EVNT_SEL_CNT_H" : {"type": "int"},
      "EVNT_SEL_CNT_M" : {"type": "int"},
      "EVNT_SEL_CNT_L" : {"type": "int"}
    }
  },
  {
     "collection" : "hk",
     "functionalObject": "/HXI1.USR",
     "attributeSequence": "USR_HK",
     "period" : 1,
     "blockName" : "MIO1_REG_block",
     "contents" : {
       "DE_MODE" : {"type": "int"},
       "MIO1_UTI_INTER" : {"type": "int"},
       "MIO1_EDAC_ERR_CNT" : {"type": "int"}
     }
  },
  {
    "collection" : "hk",
    "functionalObject": "/HXI1.USR",
    "attributeSequence": "USR_HK",
    "period" : 1,
    "blockName" : "EVNT_CNT_block",
    "contents" : {
      "ASIC_CNT_TRAY1_P" : {"type": "int"},
      "ASIC_CNT_TRAY1_N" : {"type": "int"},
      "ASIC_CNT_TRAY2_P" : {"type": "int"},
      "ASIC_CNT_TRAY2_N" : {"type": "int"},
      "ASIC_CNT_TRAY3_P" : {"type": "int"},
      "ASIC_CNT_TRAY3_N" : {"type": "int"},
      "ASIC_CNT_TRAY4_P" : {"type": "int"},
      "ASIC_CNT_TRAY4_N" : {"type": "int"},
      "ASIC_CNT_TRAY5_PT" : {"type": "int"},
      "ASIC_CNT_TRAY5_AL" : {"type": "int"}
    }
  }
];
