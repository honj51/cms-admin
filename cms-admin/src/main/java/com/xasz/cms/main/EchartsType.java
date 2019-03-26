package com.xasz.cms.main;

public enum EchartsType {

	day(1, "日"), month(2, "月"), year(3, "年");

	private int code;
	private String name;

	private EchartsType(int code, String name) {
		this.code = code;
		this.name = name;
	}

	public int getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	/**
	 * 
	 * @param name
	 * @return
	 */
	public static int getCode(String name) {
		for (EchartsType orderStatus : EchartsType.values()) {
			if (orderStatus.getName().equals(name)) {
				return orderStatus.code;
			}
		}
		return 0;
	}
}
