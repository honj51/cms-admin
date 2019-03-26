package com.xasz.cms.util;

import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;

import com.xasz.cms.user.entity.UserFormMap;

public class PasswordHelper {
	private RandomNumberGenerator randomNumberGenerator = new SecureRandomNumberGenerator();
	private String algorithmName = "md5";
	private int hashIterations = 2;

	public void encryptPassword(UserFormMap userFormMap) {
		String salt = randomNumberGenerator.nextBytes().toHex();
		userFormMap.put("credentials_salt", salt);
		String newPassword = new SimpleHash(algorithmName, userFormMap.get("password"),
				ByteSource.Util.bytes(userFormMap.get("account_name") + salt), hashIterations).toHex();
		userFormMap.put("password", newPassword);
	}

	/**
	 * 用现有的凭证+密码明文获得加密后的密码； 用于首页修改密码操作
	 * 
	 * @param userFormMap
	 */
	public void encryptPasswordForUpdate(UserFormMap userFormMap) {
		String salt = userFormMap.get("credentials_salt") + "";
		String newPassword = new SimpleHash(algorithmName, userFormMap.get("password"),
				ByteSource.Util.bytes(userFormMap.get("account_name") + salt), hashIterations).toHex();
		userFormMap.put("password", newPassword);
	}
}
