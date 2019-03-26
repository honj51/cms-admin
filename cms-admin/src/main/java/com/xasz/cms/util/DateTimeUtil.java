package com.xasz.cms.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

public class DateTimeUtil {
	/**
	 * 获取n日之前或者之后的日期
	 * 
	 * @return
	 */
	public static String format(String dateTime, String srcFormat, String destFormat) {
		SimpleDateFormat srcSimpleDateFormat = new SimpleDateFormat(srcFormat);
		Date date = null;
		try {
			date = srcSimpleDateFormat.parse(dateTime);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		if (null == date) {
			return null;
		}

		SimpleDateFormat destSimpleDateFormat = new SimpleDateFormat(destFormat);
		return destSimpleDateFormat.format(date);
	}

	/**
	 * 获取n日之前或者之后的日期
	 * 
	 * @return
	 */
	public static String getDay(int n) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, n);
		return simpleDateFormat.format(calendar.getTime());
	}

	/**
	 * 获取n月之前或者之后的月份
	 * 
	 * @return
	 */
	public static String getMonth(int n) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, n);
		return simpleDateFormat.format(calendar.getTime());
	}

	/**
	 * 获取n年之前或者之后的年份
	 * 
	 * @return
	 */
	public static String getYear(int n) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.YEAR, n);
		return simpleDateFormat.format(calendar.getTime());
	}

	/**
	 * 获取当前的年月日时
	 * 
	 * @return
	 */
	public static String getCurrentData() {
		Date date = new Date();
		// 转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		return dateFormat.format(date);
	}

	/**
	 * 获取当前的年月日时分秒
	 * 
	 * @return
	 */
	public static String getCurrentDateTime() {
		Date date = new Date();
		// 转换提日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return dateFormat.format(date);
	}

	/**
	 * 获取当前时间之后的时间
	 * 
	 * @return
	 */
	public static Date getAfterCurrentDataTime(String remindeTime) {
		Date currentTime = new Date();
		long currentMS = currentTime.getTime();
		long remindeMS = (long) (Float.valueOf(remindeTime) * 60 * 60 * 1000);
		return new Date(currentMS + remindeMS);
	}

	public static int getDiffDays(Timestamp timestamp) {
		long stime = timestamp.getTime();
		long btime = new Date().getTime();
		int days = (int) ((btime - stime) / (1000 * 60 * 60 * 24));
		return days;
	}

	/**
	 * 
	 * @return
	 */
	public static String getFirstDayOfMonth() {
		// 获取当前月第一天：
		Calendar c = Calendar.getInstance();
		c.add(Calendar.MONTH, 0);
		// 设置为1号,当前日期既为本月第一天
		c.set(Calendar.DAY_OF_MONTH, 1);

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String first = sdf.format(c.getTime());
		return first;
	}

	/**
	 * 
	 * @return
	 */
	public static String getLastDayOfMonth() {
		// 获取当前月最后一天
		Calendar ca = Calendar.getInstance();
		ca.set(Calendar.DAY_OF_MONTH, ca.getActualMaximum(Calendar.DAY_OF_MONTH));
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String last = sdf.format(ca.getTime());
		return last;
	}

	/**
	 * 
	 * @param currentDate
	 * @return
	 */
	public static String getCurrentYearMonth(String currentDate) {

		SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = sdfDay.parse(currentDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		SimpleDateFormat sdfMonth = new SimpleDateFormat("yyyy-MM");
		return sdfMonth.format(date);
	}

	/**
	 * 
	 * @param currentDate
	 * @return
	 */
	public static String getLastYearMonth(String currentDate) {

		SimpleDateFormat sdfDay = new SimpleDateFormat("yyyy-MM-dd");
		Date date = null;
		try {
			date = sdfDay.parse(currentDate);
		} catch (ParseException e) {
			e.printStackTrace();
		}

		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, -1);
		Date lastMonth = cal.getTime();
		SimpleDateFormat sdfMonth = new SimpleDateFormat("yyyy-MM");
		return sdfMonth.format(lastMonth);
	}

	/**
	 * 获取当前的年月日时分秒yyyyMMddHHmmss
	 * 
	 * @return @throws
	 */
	public static String getCurrentDateTimeNoIntervalStyle() {
		Date date = new Date();
		// 转换日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		return dateFormat.format(date);
	}

	/**
	 * 
	 * 时间格式字符串yyyy-MM-dd HH:mm:ss格式化成yyyyMMddHHmmss
	 * 
	 * @return
	 */
	public static String formatteNewDateTimeByString(String timeString) {
		SimpleDateFormat oldDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = null;
		try {
			date = oldDateFormat.parse(timeString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		return dateFormat.format(date);
	}

	/**
	 * 字符串转成日期
	 * 
	 * @return @throws
	 */
	public static Date convertToDate(String date) {
		// 转换日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Date newDate = null;
		try {
			newDate = dateFormat.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return newDate;
	}

	public static void main(String[] args) {
		String gtm = "20170401/123456";
		String result = DateTimeUtil.format(gtm, "yyyyMMdd/HHmmss", "yyyy-MM-dd HH:mm:ss");
		System.out.println(result);
	}

	/**
	 * 判断时间格式为是否为yyyy-MM-dd
	 * 
	 * @return @throws
	 */

	public static boolean isValidDate(String str) {
		boolean convertSuccess = true;
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {

			format.setLenient(false);
			format.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
			convertSuccess = false;
		}
		return convertSuccess;
	}

	/**
	 * 获取当前时间n月之前或者之后的的时间 n 为负数，当前时间之前，n 为正数 当前时间之后
	 * 
	 * @return
	 */
	public static String getTimeBeforeCurrentTimeByMonth(int n) {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());
		calendar.add(Calendar.MONTH, n);
		return format.format(calendar.getTime());
	}

	/**
	 * yyyy-MM-dd HH:mm:ss字符串转成日期
	 * 
	 * @return @throws
	 */
	public static Date stringDateconvertToDate(String date) {
		// 转换日期输出格式
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date newDate = null;
		try {
			newDate = dateFormat.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return newDate;
	}

	/**
	 * 将14位的数字日期转换为（yyyy-MM-dd HH:mm:ss）日期格式
	 * 
	 * @param date
	 * @return
	 * @throws ParseException
	 *             将异常抛到上级处理
	 */
	public static String setNumToDate(String date) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
		SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date numDate = sdf.parse(date);
		String forMatDate = sdf1.format(numDate);

		return forMatDate;
	}

	/**
	 * 获取n日之前或者之后的日期
	 * 
	 * @return
	 */
	public static String getIntervalDate(int n) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, n);
		return simpleDateFormat.format(calendar.getTime());
	}

	/**
	 * 将时间戳转换为日期
	 * 
	 * @return
	 */
	public static String stampToDate(long time) {
		String dateStr;
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date(time);
		dateStr = simpleDateFormat.format(date);
		return dateStr;
	}

	/**
	 * 10位时间戳转换成日期格式字符串
	 * 
	 * @param seconds
	 *            精确到秒的字符串
	 * @param formatStr
	 * @return
	 */
	public static String ts2DateTime(long seconds) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return sdf.format(new Date(Long.valueOf(seconds) * 1000));
	}

	public static String dateTime2TS(String strDate) throws ParseException {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = simpleDateFormat.parse(strDate);
		long ts = date.getTime();
		String result = String.valueOf(ts);
		return result;
	}

	/**
	 * 日期格式字符串转换成UNIX时间戳
	 * 
	 * @param dateStr
	 * @return
	 */
	public static String Date2UNIXTimeStamp(String dateStr) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			return String.valueOf(sdf.parse(dateStr).getTime() / 1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 将美国中部标准时间转换为yyyy-MM-dd HH:mm:ss格式
	 * 
	 * @param EEE
	 *            MMM dd HH:mm:ss z yyyy
	 * @return yyyy-MM-dd HH:mm:ss
	 */
	public static String CSTTimeToString(String dateStr) {
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy", Locale.US);
			Date date = sdf.parse(dateStr);
			sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			return sdf.format(date);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "";
	}

	/**
	 * 获取当前月第一天
	 * 
	 * @return
	 */

	public static String getCurrentMonthFirstDay() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 0);
		calendar.set(Calendar.DAY_OF_MONTH, 1);// 设置为1号,当前日期既为本月第一天
		return format.format(calendar.getTime());
	}

	/**
	 * 获取当前月最后一天
	 * 
	 * @return
	 */
	public static String getCurrentMonthLastDay() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return format.format(calendar.getTime());
	}

	/**
	 * 返回上一天的0点
	 * 
	 * @param date
	 * @return yyyy-MM-dd 00:00:00
	 */
	@SuppressWarnings("static-access")
	public static String lastDayWholePointDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(date);
		// 如果当前时间00：00：00
		if ((gc.get(gc.HOUR_OF_DAY) == 0) && (gc.get(gc.MINUTE) == 0) && (gc.get(gc.SECOND) == 0)) {
			date = new Date(date.getTime() - (24 * 60 * 60 * 1000));
			return dateFormat.format(date);
		} else {
			// 返回昨天的0点
			date = new Date(date.getTime() - gc.get(gc.HOUR_OF_DAY) * 60 * 60 * 1000 - gc.get(gc.MINUTE) * 60 * 1000
					- gc.get(gc.SECOND) * 1000 - 24 * 60 * 60 * 1000);
			return dateFormat.format(date);
		}
	}

	/**
	 * 返回当天的0点
	 * 
	 * @param date
	 * @return yyyy-MM-dd 00:00:00
	 */
	@SuppressWarnings("static-access")
	public static String todayDayWholePointDate() {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date = new Date();
		GregorianCalendar gc = new GregorianCalendar();
		gc.setTime(date);
		// 如果当前时间00：00：00
		if ((gc.get(gc.HOUR_OF_DAY) == 0) && (gc.get(gc.MINUTE) == 0) && (gc.get(gc.SECOND) == 0)) {
			date = new Date(date.getTime());
			return dateFormat.format(date);
		} else {
			// 返回昨天的0点
			date = new Date(date.getTime() - gc.get(gc.HOUR_OF_DAY) * 60 * 60 * 1000 - gc.get(gc.MINUTE) * 60 * 1000
					- gc.get(gc.SECOND) * 1000);
			return dateFormat.format(date);
		}
	}

}