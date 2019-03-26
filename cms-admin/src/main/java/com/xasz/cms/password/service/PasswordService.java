package com.xasz.cms.password.service;

import java.util.Random;

import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Service;

@Service
public class PasswordService {

	public static final int pwd_length = 6;

	/**
	 * 生成密码
	 * 
	 * @param username
	 * @param password
	 * @param credentialsSalt
	 * @return
	 */
	public String encryptPassword(String username, String password, String credentialsSalt) {
		String algorithmName = "md5";
		int hashIterations = 2;
		ByteSource salt = ByteSource.Util.bytes(username + credentialsSalt);
		SimpleHash SimpleHash = new SimpleHash(algorithmName, password, salt, hashIterations);
		return SimpleHash.toHex();
	}

	public String genRandomPassword() {
		// 35是因为数组是从0开始的，26个字母+10个数字
		final int maxNum = 36;
		int i; // 生成的随机数
		int count = 0; // 生成的密码的长度
		char[] str = { 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
				't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' };

		StringBuffer pwd = new StringBuffer("");
		Random r = new Random();
		while (count < pwd_length) {
			// 生成随机数，取绝对值，防止生成负数，

			i = Math.abs(r.nextInt(maxNum)); // 生成的数最大为36-1

			if (i >= 0 && i < str.length) {
				pwd.append(str[i]);
				count++;
			}
		}

		return pwd.toString();
	}

}
