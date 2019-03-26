package com.xasz.cms.plugin;

import java.io.Serializable;
import java.util.List;

/**
 * //分页封装函数
 * 
 * @param <T>
 */
public class PageView<T> implements Serializable {
	/**
	 * 分页数据
	 */
	private List<T> rows;

	/**
	 * 总页数 这个数是计算出来的
	 * 
	 */
	private long total;

	/**
	 * 每页显示几条记录
	 */
	private int pageSize = 20;

	/**
	 * 默认 当前页 为第一页 这个数是计算出来的
	 */
	private int page = 1;

	/**
	 * 总记录数
	 */
	private long records;

	/**
	 * 从第几条记录开始
	 */
	private int startPage;

	/**
	 * 规定显示5个页码
	 */
	private int pagecode = 10;

	public PageView() {
	}

	/**
	 * 使用构造函数，，强制必需输入 当前页
	 * 
	 * @param pageNow
	 *            当前页
	 */
	public PageView(int page) {
		this.page = page;
		startPage = (this.page - 1) * this.pageSize;
	}

	/**
	 * 使用构造函数，，强制必需输入 每页显示数量 和 当前页
	 * 
	 * @param pageSize
	 *            每页显示数量
	 * @param pageNow
	 *            当前页
	 */
	public PageView(int pageSize, int page) {
		this.pageSize = pageSize;
		this.page = page;
	}

	public int getPagecode() {
		return pagecode;
	}

	public void setPagecode(int pagecode) {
		this.pagecode = pagecode;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getRecords() {
		return records;
	}

	public void setRecords(long records) {
		this.records = records;
	}

	public int getStartPage() {
		return startPage;
	}

	public void setStartPage(int startPage) {
		this.startPage = startPage;
	}

	public void setRowCount(long records) {
		this.records = records;
		setTotal(this.records % this.pageSize == 0 ? this.records / this.pageSize : this.records / this.pageSize + 1);
	}

}
