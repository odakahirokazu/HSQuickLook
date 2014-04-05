HSQuickLook.main.schema =
[
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"APP_VAL_block",
	"contents":{
		"DE_MODE":{"type":"int","status":"ok","format":"%2X"},
		"TOUT_CNT_CPMU_HK":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_CPMU_HK":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_APMU_HK":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_APMU_HK":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_APMU_SCL":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_APMU_SCL":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_APMU_HIST":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_APMU_HIST":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_APMU_GRB":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_APMU_GRB":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_SCL":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_SCL":{"type":"int","status":"get_status_error","format":"%2X"},
		"TOUT_CNT_ASICREG":{"type":"int","status":"ok","format":"%2X"},
		"DERR_CNT_ASICREG":{"type":"int","status":"get_status_error","format":"%2X"},
		"DERR_CNT_EVNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"EVNT_DERR_SIZE":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_RCV_CNT":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_REJ_CNT":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_SEL_CNT_H":{"type":"int","status":"ok","format":"%8X"},
		"EVNT_SEL_CNT_M":{"type":"int","status":"ok","format":"%8X"},
		"EVNT_SEL_CNT_L":{"type":"int","status":"ok","format":"%8X"},
		"EVNT_TLM_REJ_CNT_H":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_TLM_REJ_CNT_M":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_TLM_REJ_CNT_L":{"type":"int","status":"ok","format":"%4X"},
		"EVNT_TIME":{"type":"int","status":"ok","format":"%8X"},
		"LOAD_CNT":{"type":"int","status":"ok","format":"%2X"},
		"CAL_BUSY":{"type":"int","status":"ok","format":"%2X"},
		"CHARGE":{"type":"int","status":"ok","format":"%2X"},
		"ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"ERR_TSK_ID":{"type":"int","status":"ok","format":"%2X"},
		"ERR_CODE":{"type":"int","status":"ok","format":"%4X"},
		"ERR_DETAIL":{"type":"int","status":"ok","format":"%4X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"MIO1_REG_block",
	"contents":{
		"MIO1_UTI_INTER":{"type":"int","status":"ok","format":"%8X"},
		"MIO1_EDAC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"MIO1_EDAC_ERR_LTIME":{"type":"int","status":"ok","format":"%8X"},
		"MIO1_EDAC_ERR_LADD":{"type":"int","status":"ok","format":"%8X"},
		"MIO1_RMAP_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"MIO1_RMAP_ERR_LADD":{"type":"int","status":"ok","format":"%8X"},
		"MIO1_RMAP_ERR_LTIME":{"type":"int","status":"ok","format":"%8X"},
		"CPMU_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_BIT_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_BYTE_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_CRC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"CPMU_SND_CNT":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_CC3_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CC2_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CC1_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_DSSD_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CDTE_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_FANOUT_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CC23_PON":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CAM_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_2BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_2BIT_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_BIT_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_BYTE_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_CRC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"APMU_SND_CNT":{"type":"int","status":"ok","format":"%4X"},
		"APMU_CSA_IF_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_APD_CSA2_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_APD_CSA1_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV_APD2_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV_APD1_PON":{"type":"int","status":"ok","format":"%2X"},
		"APMU_IF_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_IF_ENA":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"MIO2_REG_block",
	"contents":{
		"MIO2_UTI_INTER":{"type":"int","status":"ok","format":"%8X"},
		"MIO2_EDAC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"MIO2_EDAC_ERR_LTIME":{"type":"int","status":"ok","format":"%8X"},
		"MIO2_EDAC_ERR_LADD":{"type":"int","status":"ok","format":"%8X"},
		"MIO2_RMAP_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"MIO2_RMAP_ERR_LADD":{"type":"int","status":"ok","format":"%8X"},
		"MIO2_RMAP_ERR_LTIME":{"type":"int","status":"ok","format":"%8X"},
		"MIO2_MODE":{"type":"int","status":"ok","format":"%2X"},
		"MIO2_ASIC_STUP_RB":{"type":"int","status":"ok","format":"%2X"},
		"MIO2_ASIC_STUP_LD":{"type":"int","status":"ok","format":"%2X"},
		"FANOUT_IF_ENA":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"CPMU_HK_block",
	"contents":{
		"CPMU_TEMP1":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP2":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP3":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP4":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP5":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP6":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP7":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP8":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP9":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_TEMP10":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_HV4":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_HV3":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_HV2":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_HV1":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_3VD":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_5VA":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_5VA_POL":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_12VA_PLUS":{"type":"int","status":"ok","format":"%4X"},
		"CPMU_PWR_STAT_CAM9":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM8":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM7":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM6":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM5":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM4":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM3":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM2":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_CAM1":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_HV2":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_PWR_STAT_HV1":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM8":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM7":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM6":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM5":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM4":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM3":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM2":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_CAM1":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_HV2":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_CRNT_STAT_HV1":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CAM_SI_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CAM_CDTE_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CC23_SI_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV_CC23_CDTE_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV5V2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"CPMU_HV5V1_ENA":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"APMU_HK_block",
	"contents":{
		"APMU_TEMP1":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP2":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP3":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP4":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP5":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP6":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP7":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP8":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP9":{"type":"int","status":"ok","format":"%4X"},
		"APMU_TEMP10":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HV2":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HV1":{"type":"int","status":"ok","format":"%4X"},
		"APMU_3VD":{"type":"int","status":"ok","format":"%4X"},
		"APMU_5VA":{"type":"int","status":"ok","format":"%4X"},
		"APMU_12VA_MINUS":{"type":"int","status":"ok","format":"%4X"},
		"APMU_12VA_PLUS":{"type":"int","status":"ok","format":"%4X"},
		"APMU_PWR_STAT_CSAIF2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_PWR_STAT_CSAIF1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_PWR_STAT_CSA2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_PWR_STAT_CSA1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_PWR_STAT_HVAPD2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_PWR_STAT_HVAPD1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSAIF3":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSAIF2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSAIF1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSA4":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSA3":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSA2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_CSA1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_HVAPD2":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CRNT_STAT_HVAPD1":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV_APD1_ENA":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV_APD2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CSA2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"APMU_CSA1_ENA":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV5V2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"APMU_HV5V1_ENA":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"APMU_SCL_block",
	"contents":{
		"APMU_HIT_PAT1":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT2":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT3":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT4":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT5":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT6":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT7":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT8":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT9":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT10":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT11":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT12":{"type":"int","status":"ok","format":"%4X"},
		"APMU_HIT_PAT13":{"type":"int","status":"ok","format":"%4X"}
	}
},
{
	"collection":"hk2",
	"functionalObject":"/HXI2.USR",
	"attributeSequence":"USR_HK",
	"period":"1",
	"blockName":"EVNT_CNT_block",
	"contents":{
		"ASIC_CNT_TRAY1_P":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY1_N":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY2_P":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY2_N":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY3_P":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY3_N":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY4_P":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY4_N":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY5_PT":{"type":"int","status":"ok","format":"%4X"},
		"ASIC_CNT_TRAY5_AL":{"type":"int","status":"ok","format":"%4X"}
	}
}
];
