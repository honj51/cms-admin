package com.xasz.cms.shiro;

import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.config.Ini;
import org.springframework.beans.factory.FactoryBean;

import com.xasz.cms.entity.ResFormMap;
import com.xasz.cms.mapper.ResourcesMapper;

/**
 * 产生责任链，确定每个url的访问权限
 * 
 */
public class ChainDefinitionSectionMetaSource implements FactoryBean<Ini.Section> {

	@Inject
	private ResourcesMapper resourcesMapper;

	// 静态资源访问权限
	private String filterChainDefinitions = null;

	public Ini.Section getObject() throws Exception {
		Ini ini = new Ini();
		// 加载默认的url
		ini.load(filterChainDefinitions);
		Ini.Section section = ini.getSection(Ini.DEFAULT_SECTION_NAME);
		// 循环Resource的url,逐个添加到section中。section就是filterChainDefinitionMap,
		// 里面的键就是链接URL,值就是存在什么条件才能访问该链接
		List<ResFormMap> resFormMaps = resourcesMapper.findAll();
		for (ResFormMap resFormMap : resFormMaps) {
			// 构成permission字符串
			if (StringUtils.isNotEmpty(resFormMap.get("resUrl") + "")
					&& StringUtils.isNotEmpty(resFormMap.get("resKey") + "")) {
				String permission = "perms[" + resFormMap.get("resKey") + "]";
				// 不对角色进行权限验证
				// 如需要则 permission = "roles[" + resources.getResKey() + "]";
				section.put(resFormMap.get("resUrl") + "", permission);
			}

		}
		// 所有资源的访问权限，必须放在最后
		section.put("/**", "authc,sysUser,user");
		return section;
	}

	/**
	 * 通过filterChainDefinitions对默认的url过滤定义
	 * 
	 * @param filterChainDefinitions
	 *            默认的url过滤定义
	 */
	public void setFilterChainDefinitions(String filterChainDefinitions) {
		this.filterChainDefinitions = filterChainDefinitions;
	}

	public Class<?> getObjectType() {
		return this.getClass();
	}

	public boolean isSingleton() {
		return false;
	}
}
