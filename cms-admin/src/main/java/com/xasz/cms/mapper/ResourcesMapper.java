package com.xasz.cms.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.cache.annotation.Cacheable;

import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.entity.ResRoleFormMap;
import com.xasz.cms.entity.ResUserFormMap;
import com.xasz.cms.entity.UserRoleFormMap;

public interface ResourcesMapper {
	public List<ResFormMap> findChildlists(ResFormMap map);

	@Cacheable(value = "rescache", keyGenerator = "wiselyKeyGenerator")
	public List<ResFormMap> findRes(ResFormMap map);

	@Cacheable(value = "rolerescache", keyGenerator = "wiselyKeyGenerator")
	public List<ResRoleFormMap> findRoleRes(ResRoleFormMap map);

	@Cacheable(value = "selrolesrescache", keyGenerator = "wiselyKeyGenerator")
	public List<ResFormMap> findSelRolesRes(@Param("roleIds") String[] roleIds);

	public void updateSortOrder(List<ResFormMap> map);

	public List<ResFormMap> findUserResourcess(String userId);

	/**
	 * 根据角色ID获取sys_user_role
	 * 
	 * @param roleId
	 * @return
	 */
	public List<ResRoleFormMap> getTSysResRoleByRoleId(String roleId);

	public List<ResFormMap> findResourcesPage(ResFormMap resFormMap);

	public List<ResFormMap> findResByZtreeNodeName(String node_id);

	public List<ResFormMap> findByPage(ResFormMap resFormMap);

	public List<ResFormMap> findByNameAndParentId(ResFormMap resFormMap);

	public List<ResFormMap> findByParentId();

	public void updateSort(ResFormMap resFormMap);

	/**
	 * 获取全部数据
	 * 
	 * @return
	 */
	public List<ResFormMap> findAll();

	public void deleteById(String id);

	/**
	 * 
	 * @param id
	 * @return
	 */
	public ResFormMap findById(String id);

	/**
	 * 根据属性寻找
	 * 
	 * @param string
	 * @return
	 */
	public List<UserRoleFormMap> findUserRes(String string);

	/**
	 * 删除用户权限
	 * 
	 * @param uid
	 */
	public void deleteUserRes(String uid);

	/**
	 * 批量保存用户权限
	 * 
	 * @param resUserFormMaps
	 */
	public void batchSaveUserRes(List<ResUserFormMap> resUserFormMaps);

	public void addEntity(ResFormMap districtFormMap);

	public void editEntity(ResFormMap resFormMap);

	public List<ResFormMap> findByNames(ResFormMap resFormMap);

	public <T> void deleteByAttribute(String string, String string2, Class<T> class1);

	public void batchSaveA(List<ResRoleFormMap> resRoleFormMaps);

	public List<UserRoleFormMap> findByAttribute(String string, String roleId, Class<UserRoleFormMap> class1);

	public void batchSave(List<ResUserFormMap> resUserFormMaps);

}
