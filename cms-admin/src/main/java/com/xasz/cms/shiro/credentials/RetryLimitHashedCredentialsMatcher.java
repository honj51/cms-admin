package com.xasz.cms.shiro.credentials;

import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.util.ByteSource;

public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

	/**
	 * build user password
	 */
	public String buildCredentials(String userName, String password, String credentialsSalt) {
		SimpleAuthenticationInfo authenticationInfo = new SimpleAuthenticationInfo(userName, password,
				ByteSource.Util.bytes(userName + credentialsSalt), userName);
		AuthenticationToken token = new UsernamePasswordToken(userName, password);
		return super.hashProvidedCredentials(token, authenticationInfo).toString();
	}
}
