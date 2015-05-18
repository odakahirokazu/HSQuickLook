HSQuickLook.main.convertHKTemperature = function(val) {
  return -68.5153 + 0.0743332 * val;
};


HSQuickLook.main.schema = 
    [
      {
	      "collection":"hxi2",
	      "functionalObject":"/HXI2.USR",
	      "attributeSequence":"USR_HK",
	      "period":"1",
	      "blockName":"CPMU_HK_block",
	      "contents":{
		      "CPMU_TEMP1":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP2":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP3":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP4":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP5":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP6":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP7":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP8":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP9":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_TEMP10":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "CPMU_HV2":{"type":"int","status":"ok","format":"%7.2f V","conversion":function(v){ return -32.0+0.19536*v; }},
		      "CPMU_HV1":{"type":"int","status":"ok","format":"%7.2f V","conversion":function(v){ return -32.0+0.19536*v; }},
		      "CPMU_3VD":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.0013431*v; }},
		      "CPMU_5VA":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.00148079*v; }},
		      "CPMU_5VA_POL":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.00148079*v; }},
		      "CPMU_12VA_PLUS":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.0036679*v; }},
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
	      "collection":"hxi2",
	      "functionalObject":"/HXI2.USR",
	      "attributeSequence":"USR_HK",
	      "period":"1",
	      "blockName":"APMU_HK_block",
	      "contents":{
		      "APMU_TEMP1":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP2":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP3":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP4":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP5":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP6":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP7":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP8":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP9":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_TEMP10":{"type":"int","status":"ok","format":"%6.2f C","conversion":HSQuickLook.main.convertHKTemperature},
		      "APMU_HV2":{"type":"int","status":"ok","format":"%7.2f V","conversion":function(v){ return -32.0+0.19536*v; }},
		      "APMU_HV1":{"type":"int","status":"ok","format":"%7.2f V","conversion":function(v){ return -32.0+0.19536*v; }},
		      "APMU_3VD":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.0037851*v; }},
		      "APMU_5VA":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.00148079*v; }},
		      "APMU_12VA_MINUS":{source:["APMU_12VA_MINUS","APMU_12VA_PLUS"],"type":"int","status":"ok","format":"%6.2f V",
                             "conversion":function(v){
                               var apmu_12va_plus = v[1];
                               var apmu_12va_plus_volt = 0.00842491 * apmu_12va_plus;
                               return (v[0]/4095.0*5.0*16.0)-5.0*apmu_12va_plus_volt;
                             }
                            },
		      "APMU_12VA_PLUS":{"type":"int","status":"ok","format":"%6.2f V","conversion":function(v){ return 0.00842491*v; }},
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
      }
    ];
