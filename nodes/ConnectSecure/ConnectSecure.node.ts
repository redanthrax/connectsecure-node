import { RESOURCE_GROUP_OPTIONS } from './resourceGroups';
import { connectSecureLoadOptions } from './loadOptions';
import * as customApi from './actions/customApi';
import * as companyAgents from './actions/companyAgents';
import * as companyGetUninstallSecret from './actions/companyGetUninstallSecret';
import * as companyResetAgents from './actions/companyResetAgents';
import * as companyAppBaselinePlanAssets from './actions/companyAppBaselinePlanAssets';
import * as companyAppBaselinePlanCompany from './actions/companyAppBaselinePlanCompany';
import * as companyAppBaselinePlanGlobal from './actions/companyAppBaselinePlanGlobal';
import * as companyApplicationBaselineRules from './actions/companyApplicationBaselineRules';
import * as reportQueriesApplicationCount from './actions/reportQueriesApplicationCount';
import * as reportQueriesApplicationVulnerabilitiesPatchingAssetDetails from './actions/reportQueriesApplicationVulnerabilitiesPatchingAssetDetails';
import * as reportQueriesApplicationVulnerabilitiesV2 from './actions/reportQueriesApplicationVulnerabilitiesV2';
import * as reportQueriesAssetCriticalVulnerabilities from './actions/reportQueriesAssetCriticalVulnerabilities';
import * as reportQueriesAssetPortsView from './actions/reportQueriesAssetPortsView';
import * as reportQueriesAssetSecurityReportData from './actions/reportQueriesAssetSecurityReportData';
import * as reportQueriesAssetSoftware from './actions/reportQueriesAssetSoftware';
import * as assetAssetStats from './actions/assetAssetStats';
import * as assetAssetView from './actions/assetAssetView';
import * as reportQueriesAssetWiseVulnerabilities from './actions/reportQueriesAssetWiseVulnerabilities';
import * as assetAssets from './actions/assetAssets';
import * as reportQueriesAssetsByApplication from './actions/reportQueriesAssetsByApplication';
import * as reportQueriesAssetsByApplicationSuppressed from './actions/reportQueriesAssetsByApplicationSuppressed';
import * as companyBulkDeprecate from './actions/companyBulkDeprecate';
import * as reportQueriesCertInfoView from './actions/reportQueriesCertInfoView';
import * as reportQueriesCompaniesByApplication from './actions/reportQueriesCompaniesByApplication';
import * as reportQueriesCompaniesByApplicationSuppressed from './actions/reportQueriesCompaniesByApplicationSuppressed';
import * as reportQueriesCompaniesByProblemGroup from './actions/reportQueriesCompaniesByProblemGroup';
import * as reportQueriesCompaniesByProblemGroupSuppressed from './actions/reportQueriesCompaniesByProblemGroupSuppressed';
import * as reportQueriesComplianceCount from './actions/reportQueriesComplianceCount';
import * as reportQueriesDistinctAgentsName from './actions/reportQueriesDistinctAgentsName';
import * as reportQueriesDistinctAssetIp from './actions/reportQueriesDistinctAssetIp';
import * as reportQueriesDistinctAssetName from './actions/reportQueriesDistinctAssetName';
import * as reportQueriesDistinctDiscoveredProtocols from './actions/reportQueriesDistinctDiscoveredProtocols';
import * as reportQueriesDistinctOs from './actions/reportQueriesDistinctOs';
import * as reportQueriesDistinctPlatform from './actions/reportQueriesDistinctPlatform';
import * as reportQueriesDistinctSoftware from './actions/reportQueriesDistinctSoftware';
import * as reportQueriesDistinctTags from './actions/reportQueriesDistinctTags';
import * as reportQueriesExternalAssetExternalscan from './actions/reportQueriesExternalAssetExternalscan';
import * as reportQueriesExternalAssetPortsData from './actions/reportQueriesExternalAssetPortsData';
import * as reportQueriesExternalAssetSslAttack from './actions/reportQueriesExternalAssetSslAttack';
import * as reportQueriesExternalAssetSslCiphers from './actions/reportQueriesExternalAssetSslCiphers';
import * as reportQueriesExternalAssetVulnerabilities from './actions/reportQueriesExternalAssetVulnerabilities';
import * as assetGetAssetRemediationPlan from './actions/assetGetAssetRemediationPlan';
import * as reportQueriesGetAssetsByProblem from './actions/reportQueriesGetAssetsByProblem';
import * as reportQueriesGetAssetsProblem from './actions/reportQueriesGetAssetsProblem';
import * as companyGetPatchSettings from './actions/companyGetPatchSettings';
import * as reportQueriesGetRemediateRecords from './actions/reportQueriesGetRemediateRecords';
import * as reportQueriesGetRemediation from './actions/reportQueriesGetRemediation';
import * as reportQueriesLightweightAssets from './actions/reportQueriesLightweightAssets';
import * as reportQueriesNotificationTicketsView from './actions/reportQueriesNotificationTicketsView';
import * as reportQueriesOsPendingPatches from './actions/reportQueriesOsPendingPatches';
import * as reportQueriesOsPendingPatchesCompanies from './actions/reportQueriesOsPendingPatchesCompanies';
import * as reportQueriesPortsAssetsDetails from './actions/reportQueriesPortsAssetsDetails';
import * as reportQueriesPortsCount from './actions/reportQueriesPortsCount';
import * as reportQueriesPortsView from './actions/reportQueriesPortsView';
import * as reportQueriesProblemGroupSummary from './actions/reportQueriesProblemGroupSummary';
import * as reportQueriesProblemGroupSummaryAssetCompanyCount from './actions/reportQueriesProblemGroupSummaryAssetCompanyCount';
import * as reportQueriesProblemsInfo from './actions/reportQueriesProblemsInfo';
import * as reportQueriesProblemsRemediationsSummary from './actions/reportQueriesProblemsRemediationsSummary';
import * as reportQueriesProblemsSslForAsset from './actions/reportQueriesProblemsSslForAsset';
import * as reportQueriesProblemsSummary from './actions/reportQueriesProblemsSummary';
import * as reportQueriesProblemsSummaryAssetDetails from './actions/reportQueriesProblemsSummaryAssetDetails';
import * as reportQueriesProblemsSummaryGroupByCompanies from './actions/reportQueriesProblemsSummaryGroupByCompanies';
import * as reportQueriesProblemsSummaryTag from './actions/reportQueriesProblemsSummaryTag';
import * as reportQueriesRegistryProblemsCompany from './actions/reportQueriesRegistryProblemsCompany';
import * as reportQueriesRegistryProblemsRemediation from './actions/reportQueriesRegistryProblemsRemediation';
import * as reportQueriesRegistryProblemsRemediationAssetDetails from './actions/reportQueriesRegistryProblemsRemediationAssetDetails';
import * as reportQueriesRegistryProblemsSummary from './actions/reportQueriesRegistryProblemsSummary';
import * as reportQueriesRemediateRecords from './actions/reportQueriesRemediateRecords';
import * as getDataRemediateRecordsAsset from './actions/getDataRemediateRecordsAsset';
import * as reportQueriesRemediateRecordsAssets from './actions/reportQueriesRemediateRecordsAssets';
import * as getDataRemediateRecordsCompanies from './actions/getDataRemediateRecordsCompanies';
import * as reportQueriesRemediateRecordsCompanies from './actions/reportQueriesRemediateRecordsCompanies';
import * as reportQueriesRemediateRecordsDays from './actions/reportQueriesRemediateRecordsDays';
import * as getDataRemediateRecordsGlobal from './actions/getDataRemediateRecordsGlobal';
import * as reportQueriesRemediatedRegistrySolutionPlan from './actions/reportQueriesRemediatedRegistrySolutionPlan';
import * as reportQueriesRemediationCompanies from './actions/reportQueriesRemediationCompanies';
import * as getDataRemediationPlanAsset from './actions/getDataRemediationPlanAsset';
import * as reportQueriesRemediationPlanAssetDetails from './actions/reportQueriesRemediationPlanAssetDetails';
import * as reportQueriesRemediationPlanAssetDetailsByEpss from './actions/reportQueriesRemediationPlanAssetDetailsByEpss';
import * as reportQueriesRemediationPlanAssetEpssDetails from './actions/reportQueriesRemediationPlanAssetEpssDetails';
import * as reportQueriesRemediationPlanByCompany from './actions/reportQueriesRemediationPlanByCompany';
import * as getDataRemediationPlanCompanies from './actions/getDataRemediationPlanCompanies';
import * as getDataRemediationPlanGlobal from './actions/getDataRemediationPlanGlobal';
import * as reportQueriesRemediationPlanIncludeCompany from './actions/reportQueriesRemediationPlanIncludeCompany';
import * as reportQueriesRemediationPlanIncludeCompanyDays from './actions/reportQueriesRemediationPlanIncludeCompanyDays';
import * as reportQueriesRemediationVelocityApplication from './actions/reportQueriesRemediationVelocityApplication';
import * as reportQueriesRemediationVelocityApplicationAssetDetails from './actions/reportQueriesRemediationVelocityApplicationAssetDetails';
import * as reportQueriesRemediationVelocityCompany from './actions/reportQueriesRemediationVelocityCompany';
import * as reportQueriesResolvedRemediation from './actions/reportQueriesResolvedRemediation';
import * as reportQueriesRiskScore from './actions/reportQueriesRiskScore';
import * as reportQueriesSuppressedProblems from './actions/reportQueriesSuppressedProblems';
import * as reportQueriesSwProblemsRemediationsView from './actions/reportQueriesSwProblemsRemediationsView';
import * as reportQueriesSwProblemsRemediationsViewAssetwise from './actions/reportQueriesSwProblemsRemediationsViewAssetwise';
import * as reportQueriesSwProblemsRemediationsViewVul from './actions/reportQueriesSwProblemsRemediationsViewVul';
import * as reportQueriesTagsView from './actions/reportQueriesTagsView';
import * as reportQueriesTotalAssetCount from './actions/reportQueriesTotalAssetCount';
import * as reportQueriesUnconfirmedKeyCheck from './actions/reportQueriesUnconfirmedKeyCheck';
import * as reportQueriesUnconfirmedOpenPortsKeyCheck from './actions/reportQueriesUnconfirmedOpenPortsKeyCheck';
import * as reportQueriesVulnerabilitiesCount from './actions/reportQueriesVulnerabilitiesCount';
import * as reportQueriesVulnerabilitiesDetails from './actions/reportQueriesVulnerabilitiesDetails';
import * as reportQueriesVulnerabilitiesDetailsSuppressed from './actions/reportQueriesVulnerabilitiesDetailsSuppressed';
import * as assetAssetFirewallPolicy from './actions/assetAssetFirewallPolicy';
import * as assetAssetInstalledDrivers from './actions/assetAssetInstalledDrivers';
import * as assetAssetInterface from './actions/assetAssetInterface';
import * as assetAssetMsdt from './actions/assetAssetMsdt';
import * as assetAssetPorts from './actions/assetAssetPorts';
import * as assetAssetSecurityReportData from './actions/assetAssetSecurityReportData';
import * as reportQueriesAssetSecurityReportDataBulk from './actions/reportQueriesAssetSecurityReportDataBulk';
import * as assetAssetShares from './actions/assetAssetShares';
import * as assetAssetStorages from './actions/assetAssetStorages';
import * as assetAssetUnqoutedServices from './actions/assetAssetUnqoutedServices';
import * as assetAssetUserShares from './actions/assetAssetUserShares';
import * as assetAssetVideoInfo from './actions/assetAssetVideoInfo';
import * as assetAssetWindowsRebootRequired from './actions/assetAssetWindowsRebootRequired';
import * as assetBiosInfo from './actions/assetBiosInfo';
import * as assetBrowserExtensions from './actions/assetBrowserExtensions';
import * as assetCiphersView from './actions/assetCiphersView';
import * as assetWindowsProtectionStatus from './actions/assetWindowsProtectionStatus';
import * as companyAttackSurfaceDomain from './actions/companyAttackSurfaceDomain';
import * as companyAttackSurfaceResults from './actions/companyAttackSurfaceResults';
import * as companyBackupSoftware from './actions/companyBackupSoftware';
import * as companyAssetWindowsCompatibility from './actions/companyAssetWindowsCompatibility';
import * as companyCompanies from './actions/companyCompanies';
import * as companyCompanyStats from './actions/companyCompanyStats';
import * as companyJobsView from './actions/companyJobsView';
import * as reportQueriesAssetComplianceDetails from './actions/reportQueriesAssetComplianceDetails';
import * as reportQueriesAssetComplianceReportData from './actions/reportQueriesAssetComplianceReportData';
import * as reportQueriesComplianceAssetInfo from './actions/reportQueriesComplianceAssetInfo';
import * as reportQueriesComplianceCheckAssetCount from './actions/reportQueriesComplianceCheckAssetCount';
import * as reportQueriesComplianceCheckCompanyCount from './actions/reportQueriesComplianceCheckCompanyCount';
import * as reportQueriesComplianceCheckCount from './actions/reportQueriesComplianceCheckCount';
import * as reportQueriesComplianceCheckCountBySection from './actions/reportQueriesComplianceCheckCountBySection';
import * as reportQueriesComplianceInternalChecks from './actions/reportQueriesComplianceInternalChecks';
import * as reportQueriesComplianceMaturity from './actions/reportQueriesComplianceMaturity';
import * as complianceTypes from './actions/complianceTypes';
import * as companyComplianceAssessment from './actions/companyComplianceAssessment';
import * as companyAgentCredentialsMapping from './actions/companyAgentCredentialsMapping';
import * as companyCredentials from './actions/companyCredentials';
import * as companyAgentDiscoverysettingsMapping from './actions/companyAgentDiscoverysettingsMapping';
import * as companyDiscoverySettings from './actions/companyDiscoverySettings';
import * as companyEdr from './actions/companyEdr';
import * as companyEventSet from './actions/companyEventSet';
import * as companyCustomProfile from './actions/companyCustomProfile';
import * as companyExternalScan from './actions/companyExternalScan';
import * as assetFirewallGroups from './actions/assetFirewallGroups';
import * as assetFirewallInterfaces from './actions/assetFirewallInterfaces';
import * as assetFirewallLicense from './actions/assetFirewallLicense';
import * as assetFirewallRules from './actions/assetFirewallRules';
import * as assetFirewallUsers from './actions/assetFirewallUsers';
import * as assetFirewallZones from './actions/assetFirewallZones';
import * as integrationCompanyMappings from './actions/integrationCompanyMappings';
import * as integrationIntegrationCredentials from './actions/integrationIntegrationCredentials';
import * as integrationIntegrationRules from './actions/integrationIntegrationRules';
import * as companyPiiScanSettings from './actions/companyPiiScanSettings';
import * as reportQueriesApplicationVulnerabilities from './actions/reportQueriesApplicationVulnerabilities';
import * as reportQueriesApplicationVulnerabilitiesOsPatch from './actions/reportQueriesApplicationVulnerabilitiesOsPatch';
import * as companyPatchNow from './actions/companyPatchNow';
import * as companyReportJobsView from './actions/companyReportJobsView';
import * as companyRemoveSchedule from './actions/companyRemoveSchedule';
import * as companyScheduler from './actions/companyScheduler';
import * as companyUpdateSchedule from './actions/companyUpdateSchedule';
import * as companyCustomDomain from './actions/companyCustomDomain';
import * as companyCustomDomains from './actions/companyCustomDomains';
import * as companyTagRules from './actions/companyTagRules';
import * as companyTags from './actions/companyTags';
import * as companyCustomTicketingTemplate from './actions/companyCustomTicketingTemplate';
import * as userGetUsers from './actions/userGetUsers';
import * as reportQueriesApplicationVulnerabilitiesByOs from './actions/reportQueriesApplicationVulnerabilitiesByOs';
import * as reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails from './actions/reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails';
import * as reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed from './actions/reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed';
import * as reportQueriesApplicationVulnerabilitiesByProduct from './actions/reportQueriesApplicationVulnerabilitiesByProduct';
import * as reportQueriesApplicationVulnerabilitiesByProductSuppressed from './actions/reportQueriesApplicationVulnerabilitiesByProductSuppressed';
import * as reportQueriesApplicationVulnerabilitiesByProductSuppressedTag from './actions/reportQueriesApplicationVulnerabilitiesByProductSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesByProductTag from './actions/reportQueriesApplicationVulnerabilitiesByProductTag';
import * as reportQueriesApplicationVulnerabilitiesNet from './actions/reportQueriesApplicationVulnerabilitiesNet';
import * as reportQueriesApplicationVulnerabilitiesNetSuppressed from './actions/reportQueriesApplicationVulnerabilitiesNetSuppressed';
import * as reportQueriesApplicationVulnerabilitiesNetSuppressedTag from './actions/reportQueriesApplicationVulnerabilitiesNetSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesNetTag from './actions/reportQueriesApplicationVulnerabilitiesNetTag';
import * as reportQueriesApplicationVulnerabilitiesSuppressed from './actions/reportQueriesApplicationVulnerabilitiesSuppressed';
import * as reportQueriesApplicationVulnerabilitiesSuppressedByOs from './actions/reportQueriesApplicationVulnerabilitiesSuppressedByOs';
import * as reportQueriesApplicationVulnerabilitiesSuppressedTag from './actions/reportQueriesApplicationVulnerabilitiesSuppressedTag';
import * as reportQueriesApplicationVulnerabilitiesSuppressedTagByOs from './actions/reportQueriesApplicationVulnerabilitiesSuppressedTagByOs';
import * as reportQueriesApplicationVulnerabilitiesTag from './actions/reportQueriesApplicationVulnerabilitiesTag';
import * as reportQueriesApplicationVulnerabilitiesTagByOs from './actions/reportQueriesApplicationVulnerabilitiesTagByOs';
import * as cveReport from './actions/cveReport';
import * as assetSuppressVulnerability from './actions/assetSuppressVulnerability';
import * as reportQueriesSuppressVulnerabilityProblems from './actions/reportQueriesSuppressVulnerabilityProblems';
import * as reportQueriesSuppressVulnerabilitySolution from './actions/reportQueriesSuppressVulnerabilitySolution';

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionTypes,
} from 'n8n-workflow';

export class ConnectSecure implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Connect Secure',
		name: 'connectSecure',
		icon: 'file:connectsecure.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={$parameter["operation"] + ": " + $parameter["resource"]}',
		description: 'Get data from the Connect Secure API',
		documentationUrl: 'https://github.com/redanthrax/connectsecure-node',
		usableAsTool: true,
		defaults: {
			name: 'Connect Secure',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'connectSecureApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource Group',
				name: 'resourceGroup',
				type: 'options',
				noDataExpression: true,
				options: RESOURCE_GROUP_OPTIONS,
				default: 'company',
				description: 'The API area to operate on',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				typeOptions: {
					loadOptionsMethod: 'getResources',
					loadOptionsDependsOn: ['resourceGroup'],
				},
				default: 'companyAssetWindowsCompatibility',
				description: 'The resource within the selected group',
			},
			...customApi.description,
			...companyAgents.description,
			...companyGetUninstallSecret.description,
			...companyResetAgents.description,
			...companyAppBaselinePlanAssets.description,
			...companyAppBaselinePlanCompany.description,
			...companyAppBaselinePlanGlobal.description,
			...companyApplicationBaselineRules.description,
			...reportQueriesApplicationCount.description,
			...reportQueriesApplicationVulnerabilitiesPatchingAssetDetails.description,
			...reportQueriesApplicationVulnerabilitiesV2.description,
			...reportQueriesAssetCriticalVulnerabilities.description,
			...reportQueriesAssetPortsView.description,
			...reportQueriesAssetSecurityReportData.description,
			...reportQueriesAssetSoftware.description,
			...assetAssetStats.description,
			...assetAssetView.description,
			...reportQueriesAssetWiseVulnerabilities.description,
			...assetAssets.description,
			...reportQueriesAssetsByApplication.description,
			...reportQueriesAssetsByApplicationSuppressed.description,
			...companyBulkDeprecate.description,
			...reportQueriesCertInfoView.description,
			...reportQueriesCompaniesByApplication.description,
			...reportQueriesCompaniesByApplicationSuppressed.description,
			...reportQueriesCompaniesByProblemGroup.description,
			...reportQueriesCompaniesByProblemGroupSuppressed.description,
			...reportQueriesComplianceCount.description,
			...reportQueriesDistinctAgentsName.description,
			...reportQueriesDistinctAssetIp.description,
			...reportQueriesDistinctAssetName.description,
			...reportQueriesDistinctDiscoveredProtocols.description,
			...reportQueriesDistinctOs.description,
			...reportQueriesDistinctPlatform.description,
			...reportQueriesDistinctSoftware.description,
			...reportQueriesDistinctTags.description,
			...reportQueriesExternalAssetExternalscan.description,
			...reportQueriesExternalAssetPortsData.description,
			...reportQueriesExternalAssetSslAttack.description,
			...reportQueriesExternalAssetSslCiphers.description,
			...reportQueriesExternalAssetVulnerabilities.description,
			...assetGetAssetRemediationPlan.description,
			...reportQueriesGetAssetsByProblem.description,
			...reportQueriesGetAssetsProblem.description,
			...companyGetPatchSettings.description,
			...reportQueriesGetRemediateRecords.description,
			...reportQueriesGetRemediation.description,
			...reportQueriesLightweightAssets.description,
			...reportQueriesNotificationTicketsView.description,
			...reportQueriesOsPendingPatches.description,
			...reportQueriesOsPendingPatchesCompanies.description,
			...reportQueriesPortsAssetsDetails.description,
			...reportQueriesPortsCount.description,
			...reportQueriesPortsView.description,
			...reportQueriesProblemGroupSummary.description,
			...reportQueriesProblemGroupSummaryAssetCompanyCount.description,
			...reportQueriesProblemsInfo.description,
			...reportQueriesProblemsRemediationsSummary.description,
			...reportQueriesProblemsSslForAsset.description,
			...reportQueriesProblemsSummary.description,
			...reportQueriesProblemsSummaryAssetDetails.description,
			...reportQueriesProblemsSummaryGroupByCompanies.description,
			...reportQueriesProblemsSummaryTag.description,
			...reportQueriesRegistryProblemsCompany.description,
			...reportQueriesRegistryProblemsRemediation.description,
			...reportQueriesRegistryProblemsRemediationAssetDetails.description,
			...reportQueriesRegistryProblemsSummary.description,
			...reportQueriesRemediateRecords.description,
			...getDataRemediateRecordsAsset.description,
			...reportQueriesRemediateRecordsAssets.description,
			...getDataRemediateRecordsCompanies.description,
			...reportQueriesRemediateRecordsCompanies.description,
			...reportQueriesRemediateRecordsDays.description,
			...getDataRemediateRecordsGlobal.description,
			...reportQueriesRemediatedRegistrySolutionPlan.description,
			...reportQueriesRemediationCompanies.description,
			...getDataRemediationPlanAsset.description,
			...reportQueriesRemediationPlanAssetDetails.description,
			...reportQueriesRemediationPlanAssetDetailsByEpss.description,
			...reportQueriesRemediationPlanAssetEpssDetails.description,
			...reportQueriesRemediationPlanByCompany.description,
			...getDataRemediationPlanCompanies.description,
			...getDataRemediationPlanGlobal.description,
			...reportQueriesRemediationPlanIncludeCompany.description,
			...reportQueriesRemediationPlanIncludeCompanyDays.description,
			...reportQueriesRemediationVelocityApplication.description,
			...reportQueriesRemediationVelocityApplicationAssetDetails.description,
			...reportQueriesRemediationVelocityCompany.description,
			...reportQueriesResolvedRemediation.description,
			...reportQueriesRiskScore.description,
			...reportQueriesSuppressedProblems.description,
			...reportQueriesSwProblemsRemediationsView.description,
			...reportQueriesSwProblemsRemediationsViewAssetwise.description,
			...reportQueriesSwProblemsRemediationsViewVul.description,
			...reportQueriesTagsView.description,
			...reportQueriesTotalAssetCount.description,
			...reportQueriesUnconfirmedKeyCheck.description,
			...reportQueriesUnconfirmedOpenPortsKeyCheck.description,
			...reportQueriesVulnerabilitiesCount.description,
			...reportQueriesVulnerabilitiesDetails.description,
			...reportQueriesVulnerabilitiesDetailsSuppressed.description,
			...assetAssetFirewallPolicy.description,
			...assetAssetInstalledDrivers.description,
			...assetAssetInterface.description,
			...assetAssetMsdt.description,
			...assetAssetPorts.description,
			...assetAssetSecurityReportData.description,
			...reportQueriesAssetSecurityReportDataBulk.description,
			...assetAssetShares.description,
			...assetAssetStorages.description,
			...assetAssetUnqoutedServices.description,
			...assetAssetUserShares.description,
			...assetAssetVideoInfo.description,
			...assetAssetWindowsRebootRequired.description,
			...assetBiosInfo.description,
			...assetBrowserExtensions.description,
			...assetCiphersView.description,
			...assetWindowsProtectionStatus.description,
			...companyAttackSurfaceDomain.description,
			...companyAttackSurfaceResults.description,
			...companyBackupSoftware.description,
			...companyAssetWindowsCompatibility.description,
			...companyCompanies.description,
			...companyCompanyStats.description,
			...companyJobsView.description,
			...reportQueriesAssetComplianceDetails.description,
			...reportQueriesAssetComplianceReportData.description,
			...reportQueriesComplianceAssetInfo.description,
			...reportQueriesComplianceCheckAssetCount.description,
			...reportQueriesComplianceCheckCompanyCount.description,
			...reportQueriesComplianceCheckCount.description,
			...reportQueriesComplianceCheckCountBySection.description,
			...reportQueriesComplianceInternalChecks.description,
			...reportQueriesComplianceMaturity.description,
			...complianceTypes.description,
			...companyComplianceAssessment.description,
			...companyAgentCredentialsMapping.description,
			...companyCredentials.description,
			...companyAgentDiscoverysettingsMapping.description,
			...companyDiscoverySettings.description,
			...companyEdr.description,
			...companyEventSet.description,
			...companyCustomProfile.description,
			...companyExternalScan.description,
			...assetFirewallGroups.description,
			...assetFirewallInterfaces.description,
			...assetFirewallLicense.description,
			...assetFirewallRules.description,
			...assetFirewallUsers.description,
			...assetFirewallZones.description,
			...integrationCompanyMappings.description,
			...integrationIntegrationCredentials.description,
			...integrationIntegrationRules.description,
			...companyPiiScanSettings.description,
			...reportQueriesApplicationVulnerabilities.description,
			...reportQueriesApplicationVulnerabilitiesOsPatch.description,
			...companyPatchNow.description,
			...companyReportJobsView.description,
			...companyRemoveSchedule.description,
			...companyScheduler.description,
			...companyUpdateSchedule.description,
			...companyCustomDomain.description,
			...companyCustomDomains.description,
			...companyTagRules.description,
			...companyTags.description,
			...companyCustomTicketingTemplate.description,
			...userGetUsers.description,
			...reportQueriesApplicationVulnerabilitiesByOs.description,
			...reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails.description,
			...reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed.description,
			...reportQueriesApplicationVulnerabilitiesByProduct.description,
			...reportQueriesApplicationVulnerabilitiesByProductSuppressed.description,
			...reportQueriesApplicationVulnerabilitiesByProductSuppressedTag.description,
			...reportQueriesApplicationVulnerabilitiesByProductTag.description,
			...reportQueriesApplicationVulnerabilitiesNet.description,
			...reportQueriesApplicationVulnerabilitiesNetSuppressed.description,
			...reportQueriesApplicationVulnerabilitiesNetSuppressedTag.description,
			...reportQueriesApplicationVulnerabilitiesNetTag.description,
			...reportQueriesApplicationVulnerabilitiesSuppressed.description,
			...reportQueriesApplicationVulnerabilitiesSuppressedByOs.description,
			...reportQueriesApplicationVulnerabilitiesSuppressedTag.description,
			...reportQueriesApplicationVulnerabilitiesSuppressedTagByOs.description,
			...reportQueriesApplicationVulnerabilitiesTag.description,
			...reportQueriesApplicationVulnerabilitiesTagByOs.description,
			...cveReport.description,
			...assetSuppressVulnerability.description,
			...reportQueriesSuppressVulnerabilityProblems.description,
			...reportQueriesSuppressVulnerabilitySolution.description,
		],
	};

	methods = {
		loadOptions: connectSecureLoadOptions,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		try {
			const { router } = await import('./actions/router');
			return await router.call(this);
		} catch (error) {
			if (this.continueOnFail()) {
				return [this.helpers.returnJsonArray({ error: (error as Error).message })];
			}
			const { toNodeApiError } = await import('./errors');
			throw toNodeApiError(this, error);
		}
	}
}
