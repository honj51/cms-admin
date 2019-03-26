package com.xasz.cms.user.entity;

/**
 * 用户类型枚举类
 * 
 * @author rod
 *
 */
public enum UserType {

	group(0, "集团"), hotle(1, "酒店"), guesthouse(2, "宾馆"), 
	cinema(3, "影院"), property(4, "物业"), supermarket(5, "超市");

	private int code;
	private String name;

	private UserType(int code, String name) {
		this.code = code;
		this.name = name;
	}

	public int getCode() {
		return code;
	}

	public String getName() {
		return name;
	}

	public static int getCode(String name) {
		for (UserType userType : UserType.values()) {
			if (userType.getName().equals(name)) {
				return userType.code;
			}
		}
		return 0;
	}

}
