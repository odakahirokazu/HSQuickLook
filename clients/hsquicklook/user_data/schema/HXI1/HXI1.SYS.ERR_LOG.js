HSQuickLook.main.schema =
[
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"ELOG_HEADER",
	"contents":{
		"ELOG_BLK_REQ":{"type":"int","status":"ok","format":"%2X"}
	}
},
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"SYS_SW",
	"contents":{
		"ELOG_ALERT_ID":{"type":"int","status":"ok","format":"%4X"},
		"ELOG_BLK_NO":{"type":"int","status":"ok","format":"%4X"},
		"ELOG_L32TI":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TASK_ID":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_ADDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_RESULT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_ARG1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_ARG2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_ARG3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SYSCALL_ARG4":{"type":"int","status":"ok","format":"%8X"}
	}
},
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"SH4",
	"contents":{
		"ELOG_SH4_R0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R4":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R6":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R7":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R8":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R9":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R10":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R11":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R12":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R13":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R14":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_R15":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_MACH":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_MACL":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_PR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPSCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPUL":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_SR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_SSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_SPC":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_GBR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_VBR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_SGR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_DBR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR4":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR6":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR7":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR8":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR9":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR10":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR11":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR12":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR13":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR14":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SH4_FPR15":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_VCR_L":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_VCR_H":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_MIM":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_SCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_STR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_COC":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_SDRA0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_SDRA1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_ESR_1ST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_ESR_LAST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_EAR_1ST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_EAR_LAST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_EDT_1ST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_EDT_LAST":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_SDMR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMI_SDMR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_VCR_L":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_VCR_H":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_MDCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_A0MCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_A1MCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_A2MCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_A3MCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_FEMI_A4MCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_VCR_L":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_VCR_H":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_COMMON":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_SAR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_DAR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CNT0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CTRL0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_STAT0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_SAR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_DAR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CNT1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CTRL1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_STAT1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_SAR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_DAR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CNT2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CTRL2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_STAT2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_SAR3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_DAR3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CNT3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_CTRL3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_STAT3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_DMA_EXG":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_PTEH":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_PTEL":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_PTEA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_TTB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_TEA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_MMU_UCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CACHE_CCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CACHE_QACR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CACHE_QACR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EXCP_TRA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EXCP_EXPEVT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EXCP_INTEVT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BARA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BAMRA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BBRA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BASRA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BARB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BAMRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BBRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BASRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BDRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BDMRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UBC_BRCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG_FRQCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG_STBCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG_WTCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG_WTCSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG_STBCR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_R64CNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RSECCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RMINCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RHRCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RWKCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RDAYCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RMONCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RYRCNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RSECAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RMINAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RHRAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RWKAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RDAYAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RMONAR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RCR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_RTC_RCR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC_ICR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC_IPRA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC_IPRB":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC_IPRC":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC_IPRD":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TOCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TSTR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TSTR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCOR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCNT0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCOR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCNT1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCOR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCNT2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_TUR_TCPR2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCSMR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCBRR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCSCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCFTDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCFSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCFRDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCFCR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCFDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCSPTR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_SCI_SCLSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UDI_SDIR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UDI_SDDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_UDI_SDINT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_PVR_PVR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_PVR_CVR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_PVR_PRR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EMU_SDSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_PBR_VCR_H":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_PBR_VCR_L":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EPBR_VCR_H":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_EPBR_VCR_L":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC2_INTPRI00":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC2_INTREQ00":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_INTC2_INTMASK00":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG2_CLKSTP00":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG2_CLKSTPACK00":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CPG2_FRQCR3":{"type":"int","status":"ok","format":"%8X"}
	}
},
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"CPU_RMAP",
	"contents":{
		"ELOG_CPU_RMAP":{"type":"binary","status":"ok"}
	}
},
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"CPU_IF_FPGA",
	"contents":{
		"ELOG_CIF_FPGA_VER":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_SW_VER":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_ECSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEC0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEC1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEFA0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BELA0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEFA1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BELA1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEFA3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BELA3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BEFA5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E2BELA5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEC0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEC1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEFA0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BELA0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEFA1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BELA1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEFA3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BELA3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BEFA5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_FEMI_E1BELA5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_INV_ACC_CSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_INV_ACC_ADDR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_NMI_CSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_WDT_CSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_WDT_CNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GPR_HK":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GPR0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GPR1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_SPW_P4_LA_DK":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_IRL0_CSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_RYBY_CHK":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_P_INI_SEL_ISL":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_DBG_OSL1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_SPW_P4_CSR":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH4":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH6":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_EPH_LEN":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_DBG_MODE":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_STAT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_TIMEOUT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSC_INT_ENA":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSC_FLG":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSC_DMA_GRT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD2":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD3":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD4":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD5":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD6":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD7":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD8":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_CMD9":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_PKT_CNT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HSODC_TPA_LEN":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GCOLL_ACK":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GCOLL_FLG":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GCOLL_TLM_SIZE":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_GCOLL_TLM_FMT":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HK_REG0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HK_REG1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_USR_REG0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_USR_REG1":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_SIP":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HW_CMD0":{"type":"int","status":"ok","format":"%8X"},
		"ELOG_CIF_HW_CMD1":{"type":"int","status":"ok","format":"%8X"}
	}
},
{
	"collection":"hxi1",
	"functionalObject":"/HXI1.SYS",
	"attributeSequence":"ERR_LOG",
	"period":"1",
	"blockName":"RESERVED",
	"contents":{
		"ELOG_RESERVED":{"type":"binary","status":"ok"}
	}
}
];