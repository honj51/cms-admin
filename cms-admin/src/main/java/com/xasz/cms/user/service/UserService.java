package com.xasz.cms.user.service;

import java.util.List;

import javax.inject.Inject;

import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.springframework.stereotype.Service;

import com.xasz.cms.entity.ResUserFormMap;
import com.xasz.cms.global.Constants;
import com.xasz.cms.mapper.ResUserMapper;
import com.xasz.cms.password.service.PasswordService;
import com.xasz.cms.user.entity.UserFormMap;
import com.xasz.cms.user.mapper.UserMapper;

@Service
public class UserService {
	@Inject
	private UserMapper userMapper;

	@Inject
	private ResUserMapper resUserMapper;

	@Inject
	private PasswordService passwordService;

	public List<UserFormMap> findByPage(UserFormMap userFormMap) {
		return userMapper.findByPage(userFormMap);
	}

	public List<UserFormMap> findOwners() {
		return userMapper.findOwners();
	}

	public List<UserFormMap> findRecycleByPage(UserFormMap userFormMap) {
		return userMapper.findRecycleByPage(userFormMap);
	}

	public boolean isAccountNameExists(String accountName) {
		UserFormMap searchUserFormMap = new UserFormMap();
		searchUserFormMap.put("name", accountName);
		UserFormMap userFormMap = userMapper.findByAccountName(searchUserFormMap);
		if (null == userFormMap) {
			return false;
		}
		return true;
	}

	public List<UserFormMap> findByCode(UserFormMap userFormMap) {
		return userMapper.findByCode(userFormMap);
	}

	public void recovery(UserFormMap userFormMap) throws Exception {
		userMapper.recovery(userFormMap);
	}

	public boolean add(UserFormMap userFormMap) throws Exception {
		String userId = (String) userFormMap.get("id");
		String accountName = (String) userFormMap.get("account_name");
		String roleId = (String) userFormMap.get("role_id");

		String credentialsSalt = new SecureRandomNumberGenerator().nextBytes().toHex();
		userFormMap.put("credentials_salt", credentialsSalt);
		String password = passwordService.encryptPassword(accountName, Constants.ADMIN_DEFAULT_PASS_WORD,
				credentialsSalt);
		userFormMap.put("password", password);
		userMapper.add(userFormMap);

		ResUserFormMap resUserFormMap = new ResUserFormMap();
		resUserFormMap.put("userId", userId);
		resUserFormMap.put("roleId", roleId);
		
		resUserMapper.deleteByUserId(resUserFormMap);
		resUserMapper.addUserRes(resUserFormMap);
		return true;
	}

	public boolean edit(UserFormMap userFormMap) throws Exception {
		userMapper.updateById(userFormMap);

		String userId = (String) userFormMap.get("id");
		String roleId = (String) userFormMap.get("role_id");
		ResUserFormMap resUserFormMap = new ResUserFormMap();
		resUserFormMap.put("userId", userId);
		resUserFormMap.put("roleId", roleId);

		resUserMapper.deleteByUserId(resUserFormMap);
		resUserMapper.addUserRes(resUserFormMap);
		return true;
	}

	public UserFormMap findById(String id) {
		return userMapper.findById(id);
	}

	public List<UserFormMap> findByDeptId(String deptId) {
		return userMapper.findByDeptId(deptId);
	}

	public List<UserFormMap> findOwnUsers() {
		return userMapper.findOwners();
	}

	public List<UserFormMap> findByResId(UserFormMap userFormMap) {
		return userMapper.findByResId(userFormMap);
	}

	public UserFormMap findByName(String name) {
		return userMapper.findByName(name);
	}

	public UserFormMap findByAccountName(UserFormMap userFormMap) {
		return userMapper.findByAccountName(userFormMap);
	}

	public long findByPhone(UserFormMap userFormMap) {
		return userMapper.findByPhone(userFormMap);
	}

	public List<UserFormMap> findQuantityByAccountName(UserFormMap userFormMap) {
		return userMapper.findQuantityByAccountName(userFormMap);
	}

	public List<UserFormMap> findAll(String id) {
		return userMapper.findAll(id);
	}

	public List<UserFormMap> findByRoleId(String roleId) {
		return userMapper.findByRoleId(roleId);
	}

	public void updateById(UserFormMap userFormMap) {
		userMapper.updateById(userFormMap);
	}
}
