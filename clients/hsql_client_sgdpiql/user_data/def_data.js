// host = "ws://mongoserv.astro.isas.jaxa.jp:8080";
host = "ws://localhost:8080";

var getStatusError = function(v) {
  if (v==0) return "safe";
  else return "error";
};

// fileDirectory = "HXISGDQuickLook/hsql_client_hxiql/tmp";
fileDirectory = "clients/hsql_client_sgdpiql/tmp";

title = "SGD-1 CC QL";

qlSchema = [
{
 "collection" : "hk1",
 "functionalObject": "/SGD1.QL",
 "attributeSequence": "SGD_IMAGE",
 "period" : 4,
 "blockName" : "Block_images",
 "contents" : {
   "SGD_IMAGE_CC1" : {"type": "image"},
   "SGD_IMAGE_CC2" : {"type": "image"},
   "SGD_IMAGE_CC3" : {"type": "image"},
 }
},
{
 "collection" : "hk1",
 "functionalObject": "/SGD1.QL",
 "attributeSequence": "hist_all",
 "period" : 4,
 "blockName" : "Block_hist_all",
 "contents" : {
   "hist_all_cc1" : {"type": "image"},
   "hist_all_cc2" : {"type": "image"},
   "hist_all_cc3" : {"type": "image"},
   "hist_all_cmn_cc1" : {"type": "image"},
   "hist_all_cmn_cc2" : {"type": "image"},
   "hist_all_cmn_cc3" : {"type": "image"},
 }
},
];
