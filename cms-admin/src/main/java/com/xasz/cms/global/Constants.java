package com.xasz.cms.global;

public class Constants {
	public static final String DEFAULT_PASS_WORD = "123456";
	public static final String ADMIN_DEFAULT_PASS_WORD = "123456789";
	public static final String BROKER_DEFAULT_PASS_WORD = "123456";

	public static final String START_TIME_OF_DATE = "00:00:00";
	public static final String END_TIME_OF_DATE = "23:59:59";

	public static final String USER_TYPE_HOS = "1";
	public static final String USER_TYPE_SUP = "2";

	public static final String QUAL_FILE_TYPE_USER = "user";
	public static final String QUAL_FILE_TYPE_LEGAL = "legal";

	public final static String STATS_TYPE_YEAR = "1";
	public final static String STATS_TYPE_MONTH = "2";
	public final static String STATS_TYPE_DAY = "3";

	public final static int STATS_YEAR_NUM = 6;
	public final static int STATS_MONTH_NUM = 13;
	public final static int STATS_DAY_NUM = 15;

	public static final String SYS_PARAMETER_PLATFORM_RATE = "platFormRate";// 系统参数-平台费率参数key
	public static final String SYS_PARAMETER_PLATFORM_RATE_DEFAULT_VALUE = "0.6";// 系统参数-平台费率参数key

	public static final String PRESET_ADMIN_ROLE_ID = "1"; // 预设角色的ID - 医院初始用户
	public static final String PRESET_HOS_REGUSER_ROLE_ID = "preset_hos_reguser_id"; // 预设角色的ID
																						// -
																						// 医院初始用户
	public static final String PRESET_HOS_FORMAL_ROLE_ID = "preset_hos_formal_id"; // 预设角色的ID
																					// -
																					// 医院管理员用户
	public static final String PRESET_HOS_OPERATOR_ROLE_ID = "preset_hos_operator_id"; // 预设角色的ID
																						// -
																						// 医院操作员用户
	public static final String PRESET_SUP_REGUSER_ROLE_ID = "preset_sup_reguser_id"; // 预设角色的ID
																						// -
																						// 供应商初始用户
	public static final String PRESET_SUP_FORMAL_ROLE_ID = "preset_sup_formal_id"; // 预设角色的ID
																					// -
																					// 供应商管理员用户
	public static final String PRESET_SUP_OPERATOR_ROLE_ID = "preset_sup_operator_id"; // 预设角色的ID

	public static final int SEVEN_DAYS = 7; // -
	// 供应商操作员用户

	/** 消息状态-未读 */
	public final static int MSG_STATUS_NOREAD = 0;
	/** 消息状态-已读 */
	public final static int MSG_STATUS_READ = 1;

	/** 消息url 参数名 */
	public final static String BIZ_MSG_URL = "bizMsgUrl";

	public final static String DISTRCT_CODE_YULIN = "610800";
	public final static String YU_LIN = "榆林市";
	// 最大企业数
	public static final int MAX_COMPANY_QUANTITY = 100;
	// 最大司机数
	public static final int MAX_DRIVER_QUANTITY = 100;
	// 最大车辆数
	public static final int MAX_VEHICLE_QUANTITY = 100;
	// 最大货主
	public static final int MAX_SHIPPER_QUANTITY = 100;
	// 车队最大司机数
	public static final int MAX_CAR_TEAM_MEMBER_QUANTITY = 100;
	public static final String ZERO_DATE = "0000-00-00";
	public static final int ZERO = 0;
	// 是否支付
	public static final int IS_PAID_YES = 1;
	public static final int IS_PAID_NO = 0;
	// 是否是会员
	public static final int IS_DRIVER_MEMBER_YES = 1;
	// 加油站code前缀
	public static final String OIL_STATION_CODE_PREFIX = "M";
	// 信息部code前缀
	public static final String BROKER_COMPANY_CODE_PREFIX = "BC";
	// 经纪人code前缀
	public static final String BROKER_CODE_PREFIX = "B";
	// 转账code前缀
	public static final String TRANSFER_ACCOUNT_CODE_PREFIX = "T";
	// 司机办卡积分
	public static final long DRIVER_HANDLE_CARD = 5;

	// 批号前缀
	public static final String BACH_NO_PREFIX = "BAT";

	// 用户code前缀
	public static final String USER_CODE_PREFIX = "H";
	
	// 货主无拜访被开放的最大天数
	public static String SHIPPER_VISIT_MAX_OWN_DAYS = "shipper_visit_max_own_days";
	// 货主无成交被开放的最大天数
	public static String SHIPPER_DELIVERY_MAX_OWN_DAYS = "shipper_delivery_max_own_days";

	// 第一次接单货源创建人提成率
	public static final String DELIVERY_COMMISION_RATE_FIRST = "delivery_commision_rate_first";
	// 接单开票人提成率
	public static final String DRAWER_COMMISION_RATE = "drawer_commison_rate";
	// 接单创建人提成率
	public static final String DELIVERY_COMMISION_RATE = "delivery_commision_rate";
	// 接单货源所属人提成率
	public static final String GOODS_COMMISION_RATE = "goods_commision_rate";
	// 接单提成率(开票人/非第一次)
	public static final String DELIVERY_COMMISION_RATE_FOR_DRAWER = "delivery_commision_rate_for_drawer";

	// 货源最大货损值
	public static final String MAX_ALLOW_DAMAGE = "max_allow_damage";

	// 车辆表的首字母
	public static String VEHICLE_CODE_PREFIX = "V";
	// 删除
	public static int DELETE = 1;
	
	public static int YES = 1;
	
	public static int NO = 0;
	
	//increased_price煤价表煤价初始差值

	// increased_price煤价表煤价初始差值
	public static float INIT_INCREASED_PRICE = 0;

	// 默认装货吨位load_net_weight
	public static String DEFAULT_LOAD_NET_WEIGHT = "default_load_net_weight";
	// 默认卸货吨位
	public static String DEFAULT_UNLOAD_NET_WEIGHT = "default_unload_net_weight";
	// 平台公司code前缀
	public static final String PLATFORM_COMPANY_CODE_PREFIX = "P";
	// 平台用户code前缀
	public static final String PLATFORM_USER_CODE_PREFIX = "U";
	// 承运公司code前缀
	public static final String CARRIER_COMPANY_CODE_PREFIX = "C";
	//结算单前缀
	public static final String SETTLEMENT_CODE_PREFIX = "S";
	//支付单前缀
	public static final String PAYMENT_CODE_PREFIX = "P";
	
	// 铁路站台公司code前缀
	public static final String RAILWAY_ORG_CODE_PREFIX = "RO";
	
	// 铁路站台用户code前缀
	public static final String RAILWAY_USER_CODE_PREFIX = "RU";

	public static final String ZJXL_TOKEN = "zjxl_token";
	
	public static final String LOGINK_TOKEN = "logink_token";

	public static final String IS_DEBUG = "is_debug";
	
	//阿里云校验银行信息appcode
	public static final String BANK_CARD_APPCODE = "bank_card_appcode";
	
	//导出最大条数
	public static final String EXPORT_MAX_QUANTITY = "export_max_quantity";
}
