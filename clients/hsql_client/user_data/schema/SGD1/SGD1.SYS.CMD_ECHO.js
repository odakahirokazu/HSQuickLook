HSQuickLook.main.schema =
[
{
	"collection":"hk1",
	"functionalObject":"/SGD1.SYS",
	"attributeSequence":"CMD_ECHO",
	"period":"1",
	"blockName":"CMD_ECHO_HEADER",
	"contents":{
		"CMD_ECHO_RCV_CNT":{"type":"int","status":"ok","format":"%2X"},
		"CMD_ECHO_REJ_CNT":{"type":"int","status":"ok","format":"%2X"},
		"CMD_ECHO_REJ_CODE":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hk1",
	"functionalObject":"/SGD1.SYS",
	"attributeSequence":"CMD_ECHO",
	"period":"1",
	"blockName":"TC_PKT",
	"contents":{
		"CMD_ECHO_SPP_HEADER":{"type":"int","status":"ok","format":"%12X"},
		"CMD_ECHO_SMCP_HEADER":{"type":"int","status":"ok","format":"%4X"},
		"CMD_ECHO_OPID":{"type":"int","status":"ok","format":"%4X"},
		"CMD_ECHO_PARAM":{"type":"binary","status":"ok"}
	}
}
];
