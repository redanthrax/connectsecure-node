import { IExecuteFunctions } from 'n8n-workflow';
import { IDataObject, INodeExecutionData } from 'n8n-workflow';

import { ConnectSecure } from './Interfaces';
import { toNodeApiError } from '../errors';
import * as customApi from './customApi';
import * as companyAgents from './companyAgents';
import * as companyGetUninstallSecret from './companyGetUninstallSecret';
import * as companyResetAgents from './companyResetAgents';
import * as companyAppBaselinePlanAssets from './companyAppBaselinePlanAssets';
import * as companyAppBaselinePlanCompany from './companyAppBaselinePlanCompany';
import * as companyAppBaselinePlanGlobal from './companyAppBaselinePlanGlobal';
import * as companyApplicationBaselineRules from './companyApplicationBaselineRules';
import * as reportQueriesApplicationCount from './reportQueriesApplicationCount';
import * as reportQueriesApplicationVulnerabilitiesPatchingAssetDetails from './reportQueriesApplicationVulnerabilitiesPatchingAssetDetails';
import * as reportQueriesApplicationVulnerabilitiesV2 from './reportQueriesApplicationVulnerabilitiesV2';
import * as reportQueriesAssetCriticalVulnerabilities from './reportQueriesAssetCriticalVulnerabilities';
import * as reportQueriesAssetPortsView from './reportQueriesAssetPortsView';
import * as reportQueriesAssetSecurityReportData from './reportQueriesAssetSecurityReportData';
import * as reportQueriesAssetSoftware from './reportQueriesAssetSoftware';
import * as assetAssetStats from './assetAssetStats';
import * as assetAssetView from './assetAssetView';
import * as reportQueriesAssetWiseVulnerabilities from './reportQueriesAssetWiseVulnerabilities';
import * as assetAssets from './assetAssets';
import * as reportQueriesAssetsByApplication from './reportQueriesAssetsByApplication';
import * as reportQueriesAssetsByApplicationSuppressed from './reportQueriesAssetsByApplicationSuppressed';
import * as companyBulkDeprecate from './companyBulkDeprecate';
import * as reportQueriesCertInfoView from './reportQueriesCertInfoView';
import * as reportQueriesCompaniesByApplication from './reportQueriesCompaniesByApplication';
import * as reportQueriesCompaniesByApplicationSuppressed from './reportQueriesCompaniesByApplicationSuppressed';
import * as reportQueriesCompaniesByProblemGroup from './reportQueriesCompaniesByProblemGroup';
import * as reportQueriesCompaniesByProblemGroupSuppressed from './reportQueriesCompaniesByProblemGroupSuppressed';
import * as reportQueriesComplianceCount from './reportQueriesComplianceCount';
import * as reportQueriesDistinctAgentsName from './reportQueriesDistinctAgentsName';
import * as reportQueriesDistinctAssetIp from './reportQueriesDistinctAssetIp';
import * as reportQueriesDistinctAssetName from './reportQueriesDistinctAssetName';
import * as reportQueriesDistinctDiscoveredProtocols from './reportQueriesDistinctDiscoveredProtocols';
import * as reportQueriesDistinctOs from './reportQueriesDistinctOs';
import * as reportQueriesDistinctPlatform from './reportQueriesDistinctPlatform';
import * as reportQueriesDistinctSoftware from './reportQueriesDistinctSoftware';
import * as reportQueriesDistinctTags from './reportQueriesDistinctTags';
import * as reportQueriesExternalAssetExternalscan from './reportQueriesExternalAssetExternalscan';
import * as reportQueriesExternalAssetPortsData from './reportQueriesExternalAssetPortsData';
import * as reportQueriesExternalAssetSslAttack from './reportQueriesExternalAssetSslAttack';
import * as reportQueriesExternalAssetSslCiphers from './reportQueriesExternalAssetSslCiphers';
import * as reportQueriesExternalAssetVulnerabilities from './reportQueriesExternalAssetVulnerabilities';
import * as assetGetAssetRemediationPlan from './assetGetAssetRemediationPlan';
import * as reportQueriesGetAssetsByProblem from './reportQueriesGetAssetsByProblem';
import * as reportQueriesGetAssetsProblem from './reportQueriesGetAssetsProblem';
import * as companyGetPatchSettings from './companyGetPatchSettings';
import * as reportQueriesGetRemediateRecords from './reportQueriesGetRemediateRecords';
import * as reportQueriesGetRemediation from './reportQueriesGetRemediation';
import * as reportQueriesLightweightAssets from './reportQueriesLightweightAssets';
import * as reportQueriesNotificationTicketsView from './reportQueriesNotificationTicketsView';
import * as reportQueriesOsPendingPatches from './reportQueriesOsPendingPatches';
import * as reportQueriesOsPendingPatchesCompanies from './reportQueriesOsPendingPatchesCompanies';
import * as reportQueriesPortsAssetsDetails from './reportQueriesPortsAssetsDetails';
import * as reportQueriesPortsCount from './reportQueriesPortsCount';
import * as reportQueriesPortsView from './reportQueriesPortsView';
import * as reportQueriesProblemGroupSummary from './reportQueriesProblemGroupSummary';
import * as reportQueriesProblemGroupSummaryAssetCompanyCount from './reportQueriesProblemGroupSummaryAssetCompanyCount';
import * as reportQueriesProblemsInfo from './reportQueriesProblemsInfo';
import * as reportQueriesProblemsRemediationsSummary from './reportQueriesProblemsRemediationsSummary';
import * as reportQueriesProblemsSslForAsset from './reportQueriesProblemsSslForAsset';
import * as reportQueriesProblemsSummary from './reportQueriesProblemsSummary';
import * as reportQueriesProblemsSummaryAssetDetails from './reportQueriesProblemsSummaryAssetDetails';
import * as reportQueriesProblemsSummaryGroupByCompanies from './reportQueriesProblemsSummaryGroupByCompanies';
import * as reportQueriesProblemsSummaryTag from './reportQueriesProblemsSummaryTag';
import * as reportQueriesRegistryProblemsCompany from './reportQueriesRegistryProblemsCompany';
import * as reportQueriesRegistryProblemsRemediation from './reportQueriesRegistryProblemsRemediation';
import * as reportQueriesRegistryProblemsRemediationAssetDetails from './reportQueriesRegistryProblemsRemediationAssetDetails';
import * as reportQueriesRegistryProblemsSummary from './reportQueriesRegistryProblemsSummary';
import * as reportQueriesRemediateRecords from './reportQueriesRemediateRecords';
import * as getDataRemediateRecordsAsset from './getDataRemediateRecordsAsset';
import * as reportQueriesRemediateRecordsAssets from './reportQueriesRemediateRecordsAssets';
import * as getDataRemediateRecordsCompanies from './getDataRemediateRecordsCompanies';
import * as reportQueriesRemediateRecordsCompanies from './reportQueriesRemediateRecordsCompanies';
import * as reportQueriesRemediateRecordsDays from './reportQueriesRemediateRecordsDays';
import * as getDataRemediateRecordsGlobal from './getDataRemediateRecordsGlobal';
import * as reportQueriesRemediatedRegistrySolutionPlan from './reportQueriesRemediatedRegistrySolutionPlan';
import * as reportQueriesRemediationCompanies from './reportQueriesRemediationCompanies';
import * as getDataRemediationPlanAsset from './getDataRemediationPlanAsset';
import * as reportQueriesRemediationPlanAssetDetails from './reportQueriesRemediationPlanAssetDetails';
import * as reportQueriesRemediationPlanAssetDetailsByEpss from './reportQueriesRemediationPlanAssetDetailsByEpss';
import * as reportQueriesRemediationPlanAssetEpssDetails from './reportQueriesRemediationPlanAssetEpssDetails';
import * as reportQueriesRemediationPlanByCompany from './reportQueriesRemediationPlanByCompany';
import * as getDataRemediationPlanCompanies from './getDataRemediationPlanCompanies';
import * as getDataRemediationPlanGlobal from './getDataRemediationPlanGlobal';
import * as reportQueriesRemediationPlanIncludeCompany from './reportQueriesRemediationPlanIncludeCompany';
import * as reportQueriesRemediationPlanIncludeCompanyDays from './reportQueriesRemediationPlanIncludeCompanyDays';
import * as reportQueriesRemediationVelocityApplication from './reportQueriesRemediationVelocityApplication';
import * as reportQueriesRemediationVelocityApplicationAssetDetails from './reportQueriesRemediationVelocityApplicationAssetDetails';
import * as reportQueriesRemediationVelocityCompany from './reportQueriesRemediationVelocityCompany';
import * as reportQueriesResolvedRemediation from './reportQueriesResolvedRemediation';
import * as reportQueriesRiskScore from './reportQueriesRiskScore';
import * as reportQueriesSuppressedProblems from './reportQueriesSuppressedProblems';
import * as reportQueriesSwProblemsRemediationsView from './reportQueriesSwProblemsRemediationsView';
import * as reportQueriesSwProblemsRemediationsViewAssetwise from './reportQueriesSwProblemsRemediationsViewAssetwise';
import * as reportQueriesSwProblemsRemediationsViewVul from './reportQueriesSwProblemsRemediationsViewVul';
import * as reportQueriesTagsView from './reportQueriesTagsView';
import * as reportQueriesTotalAssetCount from './reportQueriesTotalAssetCount';
import * as reportQueriesUnconfirmedKeyCheck from './reportQueriesUnconfirmedKeyCheck';
import * as reportQueriesUnconfirmedOpenPortsKeyCheck from './reportQueriesUnconfirmedOpenPortsKeyCheck';
import * as reportQueriesVulnerabilitiesCount from './reportQueriesVulnerabilitiesCount';
import * as reportQueriesVulnerabilitiesDetails from './reportQueriesVulnerabilitiesDetails';
import * as reportQueriesVulnerabilitiesDetailsSuppressed from './reportQueriesVulnerabilitiesDetailsSuppressed';
import * as assetAssetFirewallPolicy from './assetAssetFirewallPolicy';
import * as assetAssetInstalledDrivers from './assetAssetInstalledDrivers';
import * as assetAssetInterface from './assetAssetInterface';
import * as assetAssetMsdt from './assetAssetMsdt';
import * as assetAssetPorts from './assetAssetPorts';
import * as assetAssetSecurityReportData from './assetAssetSecurityReportData';
import * as reportQueriesAssetSecurityReportDataBulk from './reportQueriesAssetSecurityReportDataBulk';
import * as assetAssetShares from './assetAssetShares';
import * as assetAssetStorages from './assetAssetStorages';
import * as assetAssetUnqoutedServices from './assetAssetUnqoutedServices';
import * as assetAssetUserShares from './assetAssetUserShares';
import * as assetAssetVideoInfo from './assetAssetVideoInfo';
import * as assetAssetWindowsRebootRequired from './assetAssetWindowsRebootRequired';
import * as assetBiosInfo from './assetBiosInfo';
import * as assetBrowserExtensions from './assetBrowserExtensions';
import * as assetCiphersView from './assetCiphersView';
import * as assetWindowsProtectionStatus from './assetWindowsProtectionStatus';
import * as companyAttackSurfaceDomain from './companyAttackSurfaceDomain';
import * as companyAttackSurfaceResults from './companyAttackSurfaceResults';
import * as companyBackupSoftware from './companyBackupSoftware';
import * as companyAssetWindowsCompatibility from './companyAssetWindowsCompatibility';
import * as companyCompanies from './companyCompanies';
import * as companyCompanyStats from './companyCompanyStats';
import * as companyJobsView from './companyJobsView';
import * as reportQueriesAssetComplianceDetails from './reportQueriesAssetComplianceDetails';
import * as reportQueriesAssetComplianceReportData from './reportQueriesAssetComplianceReportData';
import * as reportQueriesComplianceAssetInfo from './reportQueriesComplianceAssetInfo';
import * as reportQueriesComplianceCheckAssetCount from './reportQueriesComplianceCheckAssetCount';
import * as reportQueriesComplianceCheckCompanyCount from './reportQueriesComplianceCheckCompanyCount';
import * as reportQueriesComplianceCheckCount from './reportQueriesComplianceCheckCount';
import * as reportQueriesComplianceCheckCountBySection from './reportQueriesComplianceCheckCountBySection';
import * as reportQueriesComplianceInternalChecks from './reportQueriesComplianceInternalChecks';
import * as reportQueriesComplianceMaturity from './reportQueriesComplianceMaturity';
import * as complianceTypes from './complianceTypes';
import * as companyComplianceAssessment from './companyComplianceAssessment';
import * as companyAgentCredentialsMapping from './companyAgentCredentialsMapping';
import * as companyCredentials from './companyCredentials';
import * as companyAgentDiscoverysettingsMapping from './companyAgentDiscoverysettingsMapping';
import * as companyDiscoverySettings from './companyDiscoverySettings';
import * as companyEdr from './companyEdr';
import * as companyEventSet from './companyEventSet';
import * as companyCustomProfile from './companyCustomProfile';
import * as companyExternalScan from './companyExternalScan';
import * as assetFirewallGroups from './assetFirewallGroups';
import * as assetFirewallInterfaces from './assetFirewallInterfaces';
import * as assetFirewallLicense from './assetFirewallLicense';
import * as assetFirewallRules from './assetFirewallRules';
import * as assetFirewallUsers from './assetFirewallUsers';
import * as assetFirewallZones from './assetFirewallZones';
import * as integrationCompanyMappings from './integrationCompanyMappings';
import * as integrationIntegrationCredentials from './integrationIntegrationCredentials';
import * as integrationIntegrationRules from './integrationIntegrationRules';
import * as companyPiiScanSettings from './companyPiiScanSettings';
import * as reportQueriesApplicationVulnerabilities from './reportQueriesApplicationVulnerabilities';
import * as reportQueriesApplicationVulnerabilitiesOsPatch from './reportQueriesApplicationVulnerabilitiesOsPatch';
import * as companyPatchNow from './companyPatchNow';
import * as companyReportJobsView from './companyReportJobsView';
import * as companyRemoveSchedule from './companyRemoveSchedule';
import * as companyScheduler from './companyScheduler';
import * as companyUpdateSchedule from './companyUpdateSchedule';
import * as companyCustomDomain from './companyCustomDomain';
import * as companyCustomDomains from './companyCustomDomains';
import * as companyTagRules from './companyTagRules';
import * as companyTags from './companyTags';
import * as companyCustomTicketingTemplate from './companyCustomTicketingTemplate';
import * as userGetUsers from './userGetUsers';
import * as reportQueriesApplicationVulnerabilitiesByOs from './reportQueriesApplicationVulnerabilitiesByOs';
import * as reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails from './reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails';
import * as reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed from './reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed';
import * as reportQueriesApplicationVulnerabilitiesByProduct from './reportQueriesApplicationVulnerabilitiesByProduct';
import * as reportQueriesApplicationVulnerabilitiesByProductSuppressed from './reportQueriesApplicationVulnerabilitiesByProductSuppressed';
import * as reportQueriesApplicationVulnerabilitiesByProductSuppressedTag from './reportQueriesApplicationVulnerabilitiesByProductSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesByProductTag from './reportQueriesApplicationVulnerabilitiesByProductTag';
import * as reportQueriesApplicationVulnerabilitiesNet from './reportQueriesApplicationVulnerabilitiesNet';
import * as reportQueriesApplicationVulnerabilitiesNetSuppressed from './reportQueriesApplicationVulnerabilitiesNetSuppressed';
import * as reportQueriesApplicationVulnerabilitiesNetSuppressedTag from './reportQueriesApplicationVulnerabilitiesNetSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesNetTag from './reportQueriesApplicationVulnerabilitiesNetTag';
import * as reportQueriesApplicationVulnerabilitiesSuppressed from './reportQueriesApplicationVulnerabilitiesSuppressed';
import * as reportQueriesApplicationVulnerabilitiesSuppressedByOs from './reportQueriesApplicationVulnerabilitiesSuppressedByOs';
import * as reportQueriesApplicationVulnerabilitiesSuppressedTag from './reportQueriesApplicationVulnerabilitiesSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesSuppressedTagByOs from './reportQueriesApplicationVulnerabilitiesSuppressedTagByOs';
import * as reportQueriesApplicationVulnerabilitiesTag from './reportQueriesApplicationVulnerabilitiesTag';
import * as reportQueriesApplicationVulnerabilitiesTagByOs from './reportQueriesApplicationVulnerabilitiesTagByOs';
import * as cveReport from './cveReport';
import * as assetSuppressVulnerability from './assetSuppressVulnerability';
import * as reportQueriesSuppressVulnerabilityProblems from './reportQueriesSuppressVulnerabilityProblems';
import * as reportQueriesSuppressVulnerabilitySolution from './reportQueriesSuppressVulnerabilitySolution';

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	const items = this.getInputData();
	const operationResult: INodeExecutionData[] = [];
	let responseData: IDataObject | IDataObject[] = [];

	for (let i = 0; i < items.length; i++) {
		const resource = this.getNodeParameter<ConnectSecure>('resource', i);
		const operation = this.getNodeParameter('operation', i);

		const connectSecure = {
			resource,
			operation,
		} as ConnectSecure;

		try {
			switch (connectSecure.resource) {
			case 'customApi':
				responseData = await (customApi as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAgents':
				responseData = await (companyAgents as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyGetUninstallSecret':
				responseData = await (companyGetUninstallSecret as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyResetAgents':
				responseData = await (companyResetAgents as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAppBaselinePlanAssets':
				responseData = await (companyAppBaselinePlanAssets as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAppBaselinePlanCompany':
				responseData = await (companyAppBaselinePlanCompany as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAppBaselinePlanGlobal':
				responseData = await (companyAppBaselinePlanGlobal as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyApplicationBaselineRules':
				responseData = await (companyApplicationBaselineRules as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationCount':
				responseData = await (reportQueriesApplicationCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesPatchingAssetDetails':
				responseData = await (reportQueriesApplicationVulnerabilitiesPatchingAssetDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesV2':
				responseData = await (reportQueriesApplicationVulnerabilitiesV2 as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetCriticalVulnerabilities':
				responseData = await (reportQueriesAssetCriticalVulnerabilities as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetPortsView':
				responseData = await (reportQueriesAssetPortsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetSecurityReportData':
				responseData = await (reportQueriesAssetSecurityReportData as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetSoftware':
				responseData = await (reportQueriesAssetSoftware as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetStats':
				responseData = await (assetAssetStats as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetView':
				responseData = await (assetAssetView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetWiseVulnerabilities':
				responseData = await (reportQueriesAssetWiseVulnerabilities as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssets':
				responseData = await (assetAssets as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetsByApplication':
				responseData = await (reportQueriesAssetsByApplication as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetsByApplicationSuppressed':
				responseData = await (reportQueriesAssetsByApplicationSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyBulkDeprecate':
				responseData = await (companyBulkDeprecate as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesCertInfoView':
				responseData = await (reportQueriesCertInfoView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesCompaniesByApplication':
				responseData = await (reportQueriesCompaniesByApplication as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesCompaniesByApplicationSuppressed':
				responseData = await (reportQueriesCompaniesByApplicationSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesCompaniesByProblemGroup':
				responseData = await (reportQueriesCompaniesByProblemGroup as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesCompaniesByProblemGroupSuppressed':
				responseData = await (reportQueriesCompaniesByProblemGroupSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceCount':
				responseData = await (reportQueriesComplianceCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctAgentsName':
				responseData = await (reportQueriesDistinctAgentsName as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctAssetIp':
				responseData = await (reportQueriesDistinctAssetIp as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctAssetName':
				responseData = await (reportQueriesDistinctAssetName as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctDiscoveredProtocols':
				responseData = await (reportQueriesDistinctDiscoveredProtocols as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctOs':
				responseData = await (reportQueriesDistinctOs as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctPlatform':
				responseData = await (reportQueriesDistinctPlatform as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctSoftware':
				responseData = await (reportQueriesDistinctSoftware as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesDistinctTags':
				responseData = await (reportQueriesDistinctTags as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesExternalAssetExternalscan':
				responseData = await (reportQueriesExternalAssetExternalscan as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesExternalAssetPortsData':
				responseData = await (reportQueriesExternalAssetPortsData as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesExternalAssetSslAttack':
				responseData = await (reportQueriesExternalAssetSslAttack as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesExternalAssetSslCiphers':
				responseData = await (reportQueriesExternalAssetSslCiphers as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesExternalAssetVulnerabilities':
				responseData = await (reportQueriesExternalAssetVulnerabilities as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetGetAssetRemediationPlan':
				responseData = await (assetGetAssetRemediationPlan as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesGetAssetsByProblem':
				responseData = await (reportQueriesGetAssetsByProblem as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesGetAssetsProblem':
				responseData = await (reportQueriesGetAssetsProblem as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyGetPatchSettings':
				responseData = await (companyGetPatchSettings as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesGetRemediateRecords':
				responseData = await (reportQueriesGetRemediateRecords as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesGetRemediation':
				responseData = await (reportQueriesGetRemediation as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesLightweightAssets':
				responseData = await (reportQueriesLightweightAssets as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesNotificationTicketsView':
				responseData = await (reportQueriesNotificationTicketsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesOsPendingPatches':
				responseData = await (reportQueriesOsPendingPatches as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesOsPendingPatchesCompanies':
				responseData = await (reportQueriesOsPendingPatchesCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesPortsAssetsDetails':
				responseData = await (reportQueriesPortsAssetsDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesPortsCount':
				responseData = await (reportQueriesPortsCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesPortsView':
				responseData = await (reportQueriesPortsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemGroupSummary':
				responseData = await (reportQueriesProblemGroupSummary as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemGroupSummaryAssetCompanyCount':
				responseData = await (reportQueriesProblemGroupSummaryAssetCompanyCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsInfo':
				responseData = await (reportQueriesProblemsInfo as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsRemediationsSummary':
				responseData = await (reportQueriesProblemsRemediationsSummary as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsSslForAsset':
				responseData = await (reportQueriesProblemsSslForAsset as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsSummary':
				responseData = await (reportQueriesProblemsSummary as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsSummaryAssetDetails':
				responseData = await (reportQueriesProblemsSummaryAssetDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsSummaryGroupByCompanies':
				responseData = await (reportQueriesProblemsSummaryGroupByCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesProblemsSummaryTag':
				responseData = await (reportQueriesProblemsSummaryTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRegistryProblemsCompany':
				responseData = await (reportQueriesRegistryProblemsCompany as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRegistryProblemsRemediation':
				responseData = await (reportQueriesRegistryProblemsRemediation as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRegistryProblemsRemediationAssetDetails':
				responseData = await (reportQueriesRegistryProblemsRemediationAssetDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRegistryProblemsSummary':
				responseData = await (reportQueriesRegistryProblemsSummary as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediateRecords':
				responseData = await (reportQueriesRemediateRecords as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediateRecordsAsset':
				responseData = await (getDataRemediateRecordsAsset as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediateRecordsAssets':
				responseData = await (reportQueriesRemediateRecordsAssets as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediateRecordsCompanies':
				responseData = await (getDataRemediateRecordsCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediateRecordsCompanies':
				responseData = await (reportQueriesRemediateRecordsCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediateRecordsDays':
				responseData = await (reportQueriesRemediateRecordsDays as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediateRecordsGlobal':
				responseData = await (getDataRemediateRecordsGlobal as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediatedRegistrySolutionPlan':
				responseData = await (reportQueriesRemediatedRegistrySolutionPlan as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationCompanies':
				responseData = await (reportQueriesRemediationCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediationPlanAsset':
				responseData = await (getDataRemediationPlanAsset as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanAssetDetails':
				responseData = await (reportQueriesRemediationPlanAssetDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanAssetDetailsByEpss':
				responseData = await (reportQueriesRemediationPlanAssetDetailsByEpss as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanAssetEpssDetails':
				responseData = await (reportQueriesRemediationPlanAssetEpssDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanByCompany':
				responseData = await (reportQueriesRemediationPlanByCompany as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediationPlanCompanies':
				responseData = await (getDataRemediationPlanCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'getDataRemediationPlanGlobal':
				responseData = await (getDataRemediationPlanGlobal as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanIncludeCompany':
				responseData = await (reportQueriesRemediationPlanIncludeCompany as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationPlanIncludeCompanyDays':
				responseData = await (reportQueriesRemediationPlanIncludeCompanyDays as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationVelocityApplication':
				responseData = await (reportQueriesRemediationVelocityApplication as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationVelocityApplicationAssetDetails':
				responseData = await (reportQueriesRemediationVelocityApplicationAssetDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRemediationVelocityCompany':
				responseData = await (reportQueriesRemediationVelocityCompany as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesResolvedRemediation':
				responseData = await (reportQueriesResolvedRemediation as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesRiskScore':
				responseData = await (reportQueriesRiskScore as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSuppressedProblems':
				responseData = await (reportQueriesSuppressedProblems as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSwProblemsRemediationsView':
				responseData = await (reportQueriesSwProblemsRemediationsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSwProblemsRemediationsViewAssetwise':
				responseData = await (reportQueriesSwProblemsRemediationsViewAssetwise as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSwProblemsRemediationsViewVul':
				responseData = await (reportQueriesSwProblemsRemediationsViewVul as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesTagsView':
				responseData = await (reportQueriesTagsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesTotalAssetCount':
				responseData = await (reportQueriesTotalAssetCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesUnconfirmedKeyCheck':
				responseData = await (reportQueriesUnconfirmedKeyCheck as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesUnconfirmedOpenPortsKeyCheck':
				responseData = await (reportQueriesUnconfirmedOpenPortsKeyCheck as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesVulnerabilitiesCount':
				responseData = await (reportQueriesVulnerabilitiesCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesVulnerabilitiesDetails':
				responseData = await (reportQueriesVulnerabilitiesDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesVulnerabilitiesDetailsSuppressed':
				responseData = await (reportQueriesVulnerabilitiesDetailsSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetFirewallPolicy':
				responseData = await (assetAssetFirewallPolicy as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetInstalledDrivers':
				responseData = await (assetAssetInstalledDrivers as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetInterface':
				responseData = await (assetAssetInterface as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetMsdt':
				responseData = await (assetAssetMsdt as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetPorts':
				responseData = await (assetAssetPorts as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetSecurityReportData':
				responseData = await (assetAssetSecurityReportData as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetSecurityReportDataBulk':
				responseData = await (reportQueriesAssetSecurityReportDataBulk as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetShares':
				responseData = await (assetAssetShares as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetStorages':
				responseData = await (assetAssetStorages as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetUnqoutedServices':
				responseData = await (assetAssetUnqoutedServices as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetUserShares':
				responseData = await (assetAssetUserShares as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetVideoInfo':
				responseData = await (assetAssetVideoInfo as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetAssetWindowsRebootRequired':
				responseData = await (assetAssetWindowsRebootRequired as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetBiosInfo':
				responseData = await (assetBiosInfo as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetBrowserExtensions':
				responseData = await (assetBrowserExtensions as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetCiphersView':
				responseData = await (assetCiphersView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetWindowsProtectionStatus':
				responseData = await (assetWindowsProtectionStatus as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAttackSurfaceDomain':
				responseData = await (companyAttackSurfaceDomain as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAttackSurfaceResults':
				responseData = await (companyAttackSurfaceResults as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyBackupSoftware':
				responseData = await (companyBackupSoftware as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAssetWindowsCompatibility':
				responseData = await (companyAssetWindowsCompatibility as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCompanies':
				responseData = await (companyCompanies as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCompanyStats':
				responseData = await (companyCompanyStats as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyJobsView':
				responseData = await (companyJobsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetComplianceDetails':
				responseData = await (reportQueriesAssetComplianceDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesAssetComplianceReportData':
				responseData = await (reportQueriesAssetComplianceReportData as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceAssetInfo':
				responseData = await (reportQueriesComplianceAssetInfo as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceCheckAssetCount':
				responseData = await (reportQueriesComplianceCheckAssetCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceCheckCompanyCount':
				responseData = await (reportQueriesComplianceCheckCompanyCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceCheckCount':
				responseData = await (reportQueriesComplianceCheckCount as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceCheckCountBySection':
				responseData = await (reportQueriesComplianceCheckCountBySection as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceInternalChecks':
				responseData = await (reportQueriesComplianceInternalChecks as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesComplianceMaturity':
				responseData = await (reportQueriesComplianceMaturity as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'complianceTypes':
				responseData = await (complianceTypes as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyComplianceAssessment':
				responseData = await (companyComplianceAssessment as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAgentCredentialsMapping':
				responseData = await (companyAgentCredentialsMapping as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCredentials':
				responseData = await (companyCredentials as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyAgentDiscoverysettingsMapping':
				responseData = await (companyAgentDiscoverysettingsMapping as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyDiscoverySettings':
				responseData = await (companyDiscoverySettings as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyEdr':
				responseData = await (companyEdr as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyEventSet':
				responseData = await (companyEventSet as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCustomProfile':
				responseData = await (companyCustomProfile as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyExternalScan':
				responseData = await (companyExternalScan as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallGroups':
				responseData = await (assetFirewallGroups as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallInterfaces':
				responseData = await (assetFirewallInterfaces as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallLicense':
				responseData = await (assetFirewallLicense as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallRules':
				responseData = await (assetFirewallRules as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallUsers':
				responseData = await (assetFirewallUsers as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetFirewallZones':
				responseData = await (assetFirewallZones as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'integrationCompanyMappings':
				responseData = await (integrationCompanyMappings as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'integrationIntegrationCredentials':
				responseData = await (integrationIntegrationCredentials as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'integrationIntegrationRules':
				responseData = await (integrationIntegrationRules as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyPiiScanSettings':
				responseData = await (companyPiiScanSettings as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilities':
				responseData = await (reportQueriesApplicationVulnerabilities as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesOsPatch':
				responseData = await (reportQueriesApplicationVulnerabilitiesOsPatch as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyPatchNow':
				responseData = await (companyPatchNow as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyReportJobsView':
				responseData = await (companyReportJobsView as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyRemoveSchedule':
				responseData = await (companyRemoveSchedule as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyScheduler':
				responseData = await (companyScheduler as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyUpdateSchedule':
				responseData = await (companyUpdateSchedule as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCustomDomain':
				responseData = await (companyCustomDomain as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCustomDomains':
				responseData = await (companyCustomDomains as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyTagRules':
				responseData = await (companyTagRules as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyTags':
				responseData = await (companyTags as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'companyCustomTicketingTemplate':
				responseData = await (companyCustomTicketingTemplate as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'userGetUsers':
				responseData = await (userGetUsers as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByOs':
				responseData = await (reportQueriesApplicationVulnerabilitiesByOs as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails':
				responseData = await (reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed':
				responseData = await (reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByProduct':
				responseData = await (reportQueriesApplicationVulnerabilitiesByProduct as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByProductSuppressed':
				responseData = await (reportQueriesApplicationVulnerabilitiesByProductSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByProductSuppressedTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesByProductSuppressedTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesByProductTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesByProductTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesNet':
				responseData = await (reportQueriesApplicationVulnerabilitiesNet as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesNetSuppressed':
				responseData = await (reportQueriesApplicationVulnerabilitiesNetSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesNetSuppressedTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesNetSuppressedTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesNetTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesNetTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesSuppressed':
				responseData = await (reportQueriesApplicationVulnerabilitiesSuppressed as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesSuppressedByOs':
				responseData = await (reportQueriesApplicationVulnerabilitiesSuppressedByOs as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesSuppressedTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesSuppressedTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesSuppressedTagByOs':
				responseData = await (reportQueriesApplicationVulnerabilitiesSuppressedTagByOs as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesTag':
				responseData = await (reportQueriesApplicationVulnerabilitiesTag as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesApplicationVulnerabilitiesTagByOs':
				responseData = await (reportQueriesApplicationVulnerabilitiesTagByOs as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'cveReport':
				responseData = await (cveReport as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'assetSuppressVulnerability':
				responseData = await (assetSuppressVulnerability as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSuppressVulnerabilityProblems':
				responseData = await (reportQueriesSuppressVulnerabilityProblems as any)[connectSecure.operation].execute.call(this, i);
				break;
			case 'reportQueriesSuppressVulnerabilitySolution':
				responseData = await (reportQueriesSuppressVulnerabilitySolution as any)[connectSecure.operation].execute.call(this, i);
				break;
				default:
					break;
			}

			const executionData = this.helpers.returnJsonArray(responseData);
			operationResult.push(...executionData);
		} catch (err) {
			if (this.continueOnFail()) {
				operationResult.push({ json: this.getInputData(i)[0].json, error: err });
			} else {
				throw toNodeApiError(this, err, { itemIndex: i });
			}
		}
	}

	return [operationResult];
}
