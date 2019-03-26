package com.xasz.cms.util;

import java.util.ArrayList;
import java.util.List;

/**
 * 这个是列表树形式显示的实体, 这里的字段是在前台显示所有的,可修改
 * 
 */
public class Tree {
	private String id;
	private String parent_id;
	private String name;
	private String res_key;
	private String res_url;
	private Integer level;
	private String type;
	private String description;
	private String icon;
	private Integer ishide;
	private List<Tree> children = new ArrayList<Tree>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParent_id() {
		return parent_id;
	}

	public void setParent_id(String parent_id) {
		this.parent_id = parent_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRes_key() {
		return res_key;
	}

	public void setRes_key(String res_key) {
		this.res_key = res_key;
	}

	public String getRes_url() {
		return res_url;
	}

	public void setRes_url(String res_url) {
		this.res_url = res_url;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public Integer getIshide() {
		return ishide;
	}

	public void setIshide(Integer ishide) {
		this.ishide = ishide;
	}

	public List<Tree> getChildren() {
		return children;
	}

	public void setChildren(List<Tree> children) {
		this.children = children;
	}

}
