package com.xasz.cms.main.service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import com.xasz.cms.global.Constants;
import com.xasz.cms.main.entity.MainFormMap;
import com.xasz.cms.main.mapper.MainMapper;
import com.xasz.cms.util.DateTimeUtil;

@Service
public class MainService {

	@Inject
	private MainMapper mainMapper;

	public List<MainFormMap> findStatsInfosByDay(MainFormMap homeFormMap) {
		String statsDateTo = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

		homeFormMap.put("statsDateFrom", DateTimeUtil.getDay(-Constants.STATS_DAY_NUM));
		homeFormMap.put("statsDateTo", statsDateTo);

		return mainMapper.findStatsInfoByDay(homeFormMap);
	}

	public List<MainFormMap> findStatsInfosByMonth(MainFormMap homeFormMap) {
		String statsMonthTo = new SimpleDateFormat("yyyy-MM").format(new Date());

		homeFormMap.put("statsDateFrom", DateTimeUtil.getMonth(-Constants.STATS_MONTH_NUM));
		homeFormMap.put("statsDateTo", statsMonthTo);

		return mainMapper.findStatsInfoByMonth(homeFormMap);
	}

	public List<MainFormMap> findStatsInfosByYear(MainFormMap homeFormMap) {
		String statsYearTo = new SimpleDateFormat("yyyy").format(new Date());

		homeFormMap.put("statsDateFrom", DateTimeUtil.getYear(-Constants.STATS_YEAR_NUM));
		homeFormMap.put("statsDateTo", statsYearTo);

		return mainMapper.findStatsInfoByYear(homeFormMap);
	}

	public MainFormMap findPendingPubInfo() {
		return mainMapper.findPendingPubInfo();
	}

	public MainFormMap pendingDriverAudit() {
		return mainMapper.pendingDriverAudit();
	}

	public MainFormMap pendingShipperAudit() {
		return mainMapper.pendingShipperAudit();
	}

	public MainFormMap pendingOilCardAudit() {
		return mainMapper.pendingOilCardAudit();
	}

	public MainFormMap pendingInsuranceAudit() {
		return mainMapper.pendingInsuranceAudit();
	}

	public MainFormMap pendingEtcAudit() {
		return mainMapper.pendingEtcAudit();
	}

	public MainFormMap pendingBankCardAudit() {
		return mainMapper.pendingBankCardAudit();
	}

}
