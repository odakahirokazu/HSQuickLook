HSQuickLook.main.schema =
[
{
	"collection":"hk1",
	"functionalObject":"/HXI1.APMU",
	"attributeSequence":"APMU_HK",
	"period":"1",
	"blockName":"APMU_HK_block",
	"contents":{
		"HK_TI_CNT":{"type":"int","status":"ok","format":"%8X"},
		"HK_LOCAL_TIME":{"type":"int","status":"ok","format":"%8X"},
		"HK_MIO_SND_CNT":{"type":"int","status":"ok","format":"%4X"},
		"HK_MIO_2BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_MIO_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_RCV_CNT":{"type":"int","status":"ok","format":"%4X"},
		"HK_APMU_BIT_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_BYTE_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_CRC_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_ERR_FLG":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_BIT_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_BYTE_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
		"HK_APMU_CRC_ERR_CNT":{"type":"int","status":"get_status_error","format":"%2X"},
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
		"HK_HV2":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV1":{"type":"int","status":"ok","format":"%4X"},
		"HK_3VD":{"type":"int","status":"ok","format":"%4X"},
		"HK_5VA":{"type":"int","status":"ok","format":"%4X"},
		"HK_12VA_MINUS":{"type":"int","status":"ok","format":"%4X"},
		"HK_12VA_PLUS":{"type":"int","status":"ok","format":"%4X"},
		"HK_PWR_STAT_CSAIF2":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CSAIF1":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CSA2":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_CSA1":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_HVAPD2":{"type":"int","status":"ok","format":"%2X"},
		"HK_PWR_STAT_HVAPD1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK3":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_MSK1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSAIF3":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSAIF2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSAIF1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSA4":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSA3":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSA2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_CSA1":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_HVAPD2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CRNT_STAT_HVAPD1":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV1_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV1_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_HV2_ENA":{"type":"int","status":"ok","format":"%2X"},
		"HK_HV2_SET":{"type":"int","status":"ok","format":"%4X"},
		"HK_ADC_READ_DLY1":{"type":"int","status":"ok","format":"%4X"},
		"HK_ADC_READ_DLY2":{"type":"int","status":"ok","format":"%4X"},
		"HK_ADC_READ_DLY3":{"type":"int","status":"ok","format":"%4X"},
		"HK_ADC_READ_DLY4":{"type":"int","status":"ok","format":"%4X"},
		"HK_CSA_PWR_ENA2":{"type":"int","status":"ok","format":"%2X"},
		"HK_CSA_PWR_ENA1":{"type":"int","status":"ok","format":"%2X"},
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
