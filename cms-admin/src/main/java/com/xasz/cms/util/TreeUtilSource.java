package com.xasz.cms.util;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.lang.StringUtils;

/**
 * 把一个list集合,里面的bean含有 parentId 转为树形式
 *
 */
public class TreeUtilSource {

	/**
	 * 根据父节点的ID获取所有子节点
	 * 
	 * @param list
	 *            分类表
	 * @param typeId
	 *            传入的父节点ID
	 * @return String
	 */
	public List<Tree> getChildTreeObjects(List<Tree> list, String parentId) {
		List<Tree> returnList = new ArrayList<Tree>();
		for (Iterator<Tree> iterator = list.iterator(); iterator.hasNext();) {
			Tree t = (Tree) iterator.next();
			// 一、根据传入的某个父节点ID,遍历该父节点的所有子节点
			if (StringUtils.isNotBlank(t.getParent_id()) && StringUtils.isNotBlank(parentId)
					&& t.getParent_id().equals(parentId)) {
				recursionFn(list, t);
				returnList.add(t);
			}
		}
		return returnList;
	}

	/**
	 * 递归列表
	 * 
	 * @param list
	 * @param TreeObject
	 */
	private void recursionFn(List<Tree> list, Tree t) {
		List<Tree> childList = getChildList(list, t);// 得到子节点列表
		t.setChildren(childList);
		for (Tree tChild : childList) {
			if (hasChild(list, tChild)) {// 判断是否有子节点
				// returnList.add(TreeObject);
				Iterator<Tree> it = childList.iterator();
				while (it.hasNext()) {
					Tree n = (Tree) it.next();
					recursionFn(list, n);
				}
			}
		}
	}

	// 得到子节点列表
	private List<Tree> getChildList(List<Tree> list, Tree t) {

		List<Tree> tlist = new ArrayList<Tree>();
		Iterator<Tree> it = list.iterator();
		while (it.hasNext()) {
			Tree n = (Tree) it.next();
			if (StringUtils.isNotBlank(n.getParent_id()) && StringUtils.isNotBlank(t.getId())
					&& n.getParent_id().equals(t.getId())) {
				tlist.add(n);
			}
		}
		return tlist;
	}

	List<Tree> returnList = new ArrayList<Tree>();

	/**
	 * 根据父节点的ID获取所有子节点
	 * 
	 * @param list
	 *            分类表
	 * @param typeId
	 *            传入的父节点ID
	 * @param prefix
	 *            子节点前缀
	 */
	public List<Tree> getChildTreeObjects(List<Tree> list, String typeId, String prefix) {
		if (list == null)
			return null;
		for (Iterator<Tree> iterator = list.iterator(); iterator.hasNext();) {
			Tree node = (Tree) iterator.next();
			// 一、根据传入的某个父节点ID,遍历该父节点的所有子节点
			if (StringUtils.isNotBlank(node.getParent_id()) && StringUtils.isNotBlank(typeId)
					&& node.getParent_id().equals(typeId)) {
				recursionFn(list, node, prefix);
			}
			// 二、遍历所有的父节点下的所有子节点
			/*
			 * if (node.getParent_id()==0) { recursionFn(list, node); }
			 */
		}
		return returnList;
	}

	private void recursionFn(List<Tree> list, Tree node, String p) {
		List<Tree> childList = getChildList(list, node);// 得到子节点列表
		if (hasChild(list, node)) {// 判断是否有子节点
			returnList.add(node);
			Iterator<Tree> it = childList.iterator();
			while (it.hasNext()) {
				Tree n = (Tree) it.next();
				n.setName(p + n.getName());
				recursionFn(list, n, p + p);
			}
		} else {
			returnList.add(node);
		}
	}

	// 判断是否有子节点
	private boolean hasChild(List<Tree> list, Tree t) {
		return getChildList(list, t).size() > 0 ? true : false;
	}

	// 本地模拟数据测试
	public void main(String[] args) {
		/*
		 * long start = System.currentTimeMillis(); List<TreeObject>
		 * TreeObjectList = new ArrayList<TreeObject>();
		 * 
		 * TreeObjectUtil mt = new TreeObjectUtil(); List<TreeObject>
		 * ns=mt.getChildTreeObjects(TreeObjectList,0); for (TreeObject m : ns)
		 * { System.out.println(m.getName());
		 * System.out.println(m.getChildren()); } long end =
		 * System.currentTimeMillis(); System.out.println("用时:" + (end - start)
		 * + "ms");
		 */
	}

}
