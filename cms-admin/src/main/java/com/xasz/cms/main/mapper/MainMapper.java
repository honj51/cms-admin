package com.xasz.cms.main.mapper;

import java.util.List;

import com.xasz.cms.main.entity.MainFormMap;

public interface MainMapper {

	public List<MainFormMap> findStatsInfoByDay(MainFormMap mainFormMap);

	public List<MainFormMap> findStatsInfoByMonth(MainFormMap mainFormMap);

	public List<MainFormMap> findStatsInfoByYear(MainFormMap mainFormMap);

	public MainFormMap findPendingPubInfo();

	public MainFormMap pendingDriverAudit();

	public MainFormMap pendingShipperAudit();

	public MainFormMap pendingOilCardAudit();

	public MainFormMap pendingInsuranceAudit();

	public MainFormMap pendingEtcAudit();

	public MainFormMap pendingBankCardAudit();
}
