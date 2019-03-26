package com.xasz.cms.common;

public enum Locked {

	no(0, "否"), yes(1, "是");

	private int code;
	private String name;

	private Locked(int code, String name) {
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
		for (Locked orderStatus : Locked.values()) {
			if (orderStatus.getName().equals(name)) {
				return orderStatus.code;
			}
		}
		return 0;
	}
}
