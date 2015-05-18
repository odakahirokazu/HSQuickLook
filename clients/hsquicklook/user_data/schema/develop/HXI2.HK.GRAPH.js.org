HSQuickLook.main.schema =
[
{
 "tableName" : "graph_HXI_USR_HK",
 "collection" : "hxi2",
 "functionalObject": "/HXI2.QL",
 "attributeSequence": "HK_HXI2.USR.USR_HK",
 "period" : 4,
 "blockName" : "Block_hk_HXI2.USR.USR_HK",
 "contents" : {
   "Time_Origin" : {"source":"Time_Origin" , "type": "int"},
   "rcv_cnt" : {"source":"Event_Receive_Count" , "type": "image"},
   "tlm_sel_cnt" : {"source":"Event_Select_Count" , "type": "image"},
   "tlm_rej_cnt" : {"source":"Event_TLM_Reject_Count" , "type": "image"},
   "cpmu_temp" : {"source":"CPMU_Temp" , "type": "image"},
   "cpmu_hv" : {"source":"CPMU_HV" , "type": "image"},
   "cpmu_v" : {"source":"CPMU_V" , "type": "image"},
   "apmu_temp" : {"source":"APMU_Temp" , "type": "image"},
   "apmu_hv" : {"source":"APMU_HV" , "type": "image"},
   "apmu_v" : {"source":"APMU_V" , "type": "image"}
 }
},
{
 "tableName" : "graph_HXI_SCL",
 "collection" : "hxi2",
 "functionalObject": "/HXI2.QL",
 "attributeSequence": "HK_HXI2.CAM.SCL",
 "period" : 4,
 "blockName" : "Block_hk_HXI2.CAM.SCL",
 "contents" : {
   "Time_Origin" : {"source":"Time_Origin" , "type": "int"},
   "scl_trg" : {"source":"SCL_TRG" , "type": "image"},
   "scl_veto_atMIO2" : {"source":"SCL_FBGO_MIO2" , "type": "image"},
   "scl_time" : {"source":"SCL_Time" , "type": "image"}
 }
},
{
 "tableName" : "graph_HXI_APMU_SCL",
 "collection" : "hxi2",
 "functionalObject": "/HXI2.QL",
 "attributeSequence": "HK_HXI2.APMU.APMU_SCL",
 "period" : 8,
 "blockName" : "Block_hk_HXI2.APMU.APMU_SCL",
 "contents" : {
   "Time_Origin" : {"source":"Time_Origin" , "type": "int"},
   "scl_fbgo" : {"source":"SCL_FBGO" , "type": "image"},
   "scl_hitpat" : {"source":"SCL_HIT_PAT" , "type": "image"},
   "scl_ud" : {"source":"SCL_UD" , "type": "image"},
   "scl_sud" : {"source":"SCL_SUD" , "type": "image"}
 }
}
];
