HSQuickLook.main.schema =
[
{
	"collection":"sgd1",
	"directory":"/SGD1.CPMU",
	"document":"CPMU_HK",
	"period":"1",
	"blockName":"CPMU_HK_block",
	"contents":{
		"HK_TI_CNT":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME":{"type":"int","status":"ok","format":"%8X"},
		"HK_MIO_SND_CNT":{"type":"int","status":"ok","format":"%4X"},
		"HK_MIO_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_RCV_CNT":{"type":"int","status":"ok","format":"%4X"},
		"HK_CPMU_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_BIT_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_BYTE_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_CPMU_CRC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_TEMP1":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP2":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP3":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP4":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP5":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP6":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP7":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP8":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP9":{"type":"int","status":"ok","format":"%4X"},
		"HK_TEMP10":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV4":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV3":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV2":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV1":{"type":"int","status":"ok","format":"%4X"},
		"HK_3VD":{"type":"int","status":"ok","format":"%4X"},
		"HK_5VA":{"type":"int","status":"ok","format":"%4X"},
		"HK_5VA_POL":{"type":"int","status":"ok","format":"%4X"},
		"HK_12VA_PLUS":{"type":"int","status":"ok","format":"%4X"},
		"HK_PWR_STAT_CC9":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC8":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC7":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC6":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC5":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC4":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC3":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC2":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CC1":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_HV2":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_HV1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK3":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC8":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC7":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC6":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC5":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC4":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC3":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CC1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_HV2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_HV1":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV1_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV1_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV2_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV3_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV3_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV4_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV4_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV5V_ENA2":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV5V_ENA1":{"type":"int","status":"ok","format":"%2X"},
		"HK_TI_INTER1":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME1_1":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME1_2":{"type":"int","status":"ok","format":"%8X"},
		"HK_TI_INTER2":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME2_1":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME2_2":{"type":"int","status":"ok","format":"%8X"},
		"HK_TI_INTER3":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME3_1":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME3_2":{"type":"int","status":"ok","format":"%8X"},
		"HK_TI_INTER4":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME4_1":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME4_2":{"type":"int","status":"ok","format":"%8X"}
	}
}
];
