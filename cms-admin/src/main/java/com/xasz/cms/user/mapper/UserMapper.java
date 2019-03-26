package com.xasz.cms.user.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.xasz.cms.user.entity.UserFormMap;

public interface UserMapper {
	/**
	 * 分页查找数据
	 * 
	 * @param userFormMap
	 * @return
	 */
	public List<UserFormMap> findByPage(UserFormMap userFormMap);

	public List<UserFormMap> findUserByOrgId(UserFormMap userFormMap);

	public int recovery(UserFormMap userFormMap);

	public List<UserFormMap> queryUserByOrgIdAndRoleId(@Param("orgId") String orgId, @Param("roleId") String roleId);

	/**
	 * 根据id获取用户信息
	 * 
	 * @param id
	 * @return
	 */
	public UserFormMap findById(String id);

	/**
	 * 根据部门id获取用户
	 * 
	 * @param deptId
	 * @return
	 */
	public List<UserFormMap> findByDeptId(String deptId);

	/**
	 * 查找自身员工
	 * 
	 * @return
	 */
	public List<UserFormMap> findOwners();

	/**
	 * 根据用户姓名查询
	 * 
	 * @param DeliveryFormMap
	 * @return
	 */
	public List<UserFormMap> findByCode(UserFormMap userFormMap);

	/**
	 * 查找已有的用户数量
	 * 
	 * @return
	 */
	public long findUserQuantity();

	/**
	 * 根据资源ID查找用户
	 * 
	 * @param resId
	 * @return
	 */
	public List<UserFormMap> findByResId(UserFormMap userFormMap);

	/**
	 * 统计个人业绩
	 * 
	 * @param deliveryFormMap
	 * @return
	 */
	public List<UserFormMap> findPerformanceByPage(UserFormMap userFormMap);

	/**
	 * 根据名字获取用户信息
	 * 
	 * @param id
	 * @return
	 */
	public UserFormMap findByName(String name);

	/**
	 * 根据登陆用户名获取信息
	 * 
	 * @param name
	 * @return
	 */
	public UserFormMap findByAccountName(UserFormMap userFormMap);

	/**
	 * 根据电话查找数量
	 * 
	 * @param userFormMap
	 * @return
	 */
	public long findByPhone(UserFormMap userFormMap);

	/**
	 * 根据用户查名找数量
	 * 
	 * @param accountName
	 * @return
	 */
	public List<UserFormMap> findQuantityByAccountName(UserFormMap userFormMap);

	/**
	 * 查找所有用户
	 * 
	 * @param userFormMap
	 * @return
	 */
	public List<UserFormMap> findAllUserByPage(UserFormMap userFormMap);

	/**
	 * 回收站
	 * 
	 * @param DeliveryFormMap
	 * @return
	 */
	public List<UserFormMap> findRecycleByPage(UserFormMap userFormMap);

	/**
	 * 根据姓名查找
	 * 
	 * @param userFormMap
	 * @return
	 */
	public List<UserFormMap> findByNames(UserFormMap userFormMap);

	/**
	 * 查找所有用户
	 * 
	 * @return
	 */
	public List<UserFormMap> findAll(String id);

	/**
	 * 根据角色id查找用户
	 * 
	 * @param roleId
	 * @return
	 */
	public List<UserFormMap> findByRoleId(String roleId);

	/**
	 * 新增
	 * 
	 * @param userFormMap
	 */
	public void add(UserFormMap userFormMap);

	/**
	 * 根据id更新
	 * 
	 * @param userFormMap
	 */
	public void updateById(UserFormMap userFormMap);
}
