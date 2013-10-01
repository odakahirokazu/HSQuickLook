// host = "ws://mongoserv.astro.isas.jaxa.jp:8080";
host = "ws://localhost:8080";

var getStatusError = function(v) {
  if (v==0) return "safe";
  else return "error";
};

//fileDirectory = "HXISGDQuickLook/clients/hsql_client_hxiql/tmp";
fileDirectory = "clients/hsql_client_hxipiql/tmp";

title = "HXI-1 Camera QL";

qlSchema = [
// {
//  "collection" : "hk1",
//  "functionalObject": "/HXI1.QL",
//  "attributeSequence": "LivetimeHist",
//  "period" : 2,
//  "blockName" : "Block_images",
//  "contents" : {
//    "HXI_IMAGE" : {"type": "image"}
//  }
// },
{
 "collection" : "hk1",
 "functionalObject": "/HXI1.QL",
 "attributeSequence": "HXI_IMAGE",
 "period" : 2,
 "blockName" : "Block_images",
 "contents" : {
   "HXI_IMAGE_0" : {"type": "image"},
   "HXI_IMAGE_1" : {"type": "image"},
   "HXI_IMAGE_2" : {"type": "image"},
   "HXI_IMAGE_3" : {"type": "image"},
   "HXI_IMAGE_4" : {"type": "image"},
 }
},
{
 "collection" : "hk1",
 "functionalObject": "/HXI1.QL",
 "attributeSequence": "hist_all",
 "period" : 2,
 "blockName" : "Block_hist_all",
 "contents" : {
   "hist_all" : {"type": "image"},
   "hist_all_cmn" : {"type": "image"}
 }
},
{
 "collection" : "hk1",
 "functionalObject": "/HXI1.QL",
 "attributeSequence": "hist_asic",
 "period" : 2,
 "blockName" : "Block_hist_asic",
 "contents" : {
   "hist_asic_cmn_00" : {"type": "image"},
   "hist_asic_cmn_04" : {"type": "image"},
   "hist_asic_cmn_08" : {"type": "image"},
   "hist_asic_cmn_12" : {"type": "image"},
   "hist_asic_cmn_16" : {"type": "image"},
   "hist_asic_cmn_20" : {"type": "image"},
   "hist_asic_cmn_24" : {"type": "image"},
   "hist_asic_cmn_28" : {"type": "image"},
   "hist_asic_cmn_32" : {"type": "image"},
   "hist_asic_cmn_36" : {"type": "image"},
 }
},
];
