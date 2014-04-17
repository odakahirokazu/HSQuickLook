HSQuickLook.main.schema =
[
{
 "tableName" : "graph_HXI_USR_HK",
 "collection" : "hxi1",
 "functionalObject": "/HXI1.QL",
 "attributeSequence": "HK_HXI1.USR.USR_HK",
 "period" : 2,
 "blockName" : "Block_hk_HXI1.USR.USR_HK",
 "contents" : {
   "Time_Origin" : {"source":"Time_Origin" , "type": "int"},
   "rcv_cnt" : {"source":"Receive_Count" , "type": "image"}
   // "rcv_cnt" : {"source":"hk_HXI1.USR.USR_HK.EVNT_RCV_CNT" , "type": "image"}
 }
},
{
 "tableName" : "graph_HXI_SCL",
 "collection" : "hxi1",
 "functionalObject": "/HXI1.QL",
 "attributeSequence": "HK_HXI1.CAM.SCL",
 "period" : 2,
 "blockName" : "Block_hk_HXI1.CAM.SCL",
 "contents" : {
   "Time_Origin" : {"source":"Time_Origin" , "type": "int"},
   "scl_trg" : {"source":"SCL_TRG" , "type": "image"}
   // "scl_trg1" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG1" , "type": "image"},
   // "scl_trg2" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG2" , "type": "image"},
   // "scl_trg3" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG3" , "type": "image"},
   // "scl_trg4" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG4" , "type": "image"},
   // "scl_trg5" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG5" , "type": "image"},
   // "scl_trg6" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG6" , "type": "image"},
   // "scl_trg7" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG7" , "type": "image"},
   // "scl_trg8" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG8" , "type": "image"},
   // "scl_trg9" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG9" , "type": "image"},
   // "scl_trg10" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG10" , "type": "image"},
   // "scl_trg11" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG11" , "type": "image"},
   // "scl_trg12" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG12" , "type": "image"},
   // "scl_trg13" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG13" , "type": "image"},
   // "scl_trg14" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG14" , "type": "image"},
   // "scl_trg15" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG15" , "type": "image"},
   // "scl_trg16" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG16" , "type": "image"},
   // "scl_trg17" : {"source":"hk_HXI1.CAM.SCL.SCL_TRG17" , "type": "image"}
 }
}
];
