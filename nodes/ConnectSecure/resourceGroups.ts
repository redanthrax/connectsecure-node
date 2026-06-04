import { INodePropertyOptions } from 'n8n-workflow';

export interface ResourceGroupDefinition {
	key: string;
	name: string;
	resources: INodePropertyOptions[];
}

export const RESOURCE_GROUPS: ResourceGroupDefinition[] = [
	{
		key: 'agent',
		name: 'Agent',
		resources: [
			{ name: 'Agents', value: 'companyAgents' },
			{ name: 'Get Uninstall Secret', value: 'companyGetUninstallSecret' },
			{ name: 'Reset Agents', value: 'companyResetAgents' },
		],
	},
	{
		key: 'applicationBaseline',
		name: 'Application Baseline',
		resources: [
			{ name: 'App Baseline Plan Assets', value: 'companyAppBaselinePlanAssets' },
			{ name: 'App Baseline Plan Company', value: 'companyAppBaselinePlanCompany' },
			{ name: 'App Baseline Plan Global', value: 'companyAppBaselinePlanGlobal' },
			{ name: 'Application Baseline Rules', value: 'companyApplicationBaselineRules' },
		],
	},
	{
		key: 'asset',
		name: 'Asset',
		resources: [
			{ name: 'Application Count', value: 'reportQueriesApplicationCount' },
			{ name: 'Application Vulnerabilities Patching Asset Details', value: 'reportQueriesApplicationVulnerabilitiesPatchingAssetDetails' },
			{ name: 'Application Vulnerabilities V2', value: 'reportQueriesApplicationVulnerabilitiesV2' },
			{ name: 'Asset Critical Vulnerabilities', value: 'reportQueriesAssetCriticalVulnerabilities' },
			{ name: 'Asset Ports View', value: 'reportQueriesAssetPortsView' },
			{ name: 'Asset Security Report Data', value: 'reportQueriesAssetSecurityReportData' },
			{ name: 'Asset Software', value: 'reportQueriesAssetSoftware' },
			{ name: 'Asset Stats', value: 'assetAssetStats' },
			{ name: 'Asset View', value: 'assetAssetView' },
			{ name: 'Asset Wise Vulnerabilities', value: 'reportQueriesAssetWiseVulnerabilities' },
			{ name: 'Assets', value: 'assetAssets' },
			{ name: 'Assets By Application', value: 'reportQueriesAssetsByApplication' },
			{ name: 'Assets By Application Suppressed', value: 'reportQueriesAssetsByApplicationSuppressed' },
			{ name: 'Bulk Deprecate', value: 'companyBulkDeprecate' },
			{ name: 'Cert Info View', value: 'reportQueriesCertInfoView' },
			{ name: 'Companies By Application', value: 'reportQueriesCompaniesByApplication' },
			{ name: 'Companies By Application Suppressed', value: 'reportQueriesCompaniesByApplicationSuppressed' },
			{ name: 'Companies By Problem Group', value: 'reportQueriesCompaniesByProblemGroup' },
			{ name: 'Companies By Problem Group Suppressed', value: 'reportQueriesCompaniesByProblemGroupSuppressed' },
			{ name: 'Compliance Count', value: 'reportQueriesComplianceCount' },
			{ name: 'Distinct Agents Name', value: 'reportQueriesDistinctAgentsName' },
			{ name: 'Distinct Asset Ip', value: 'reportQueriesDistinctAssetIp' },
			{ name: 'Distinct Asset Name', value: 'reportQueriesDistinctAssetName' },
			{ name: 'Distinct Discovered Protocols', value: 'reportQueriesDistinctDiscoveredProtocols' },
			{ name: 'Distinct Os', value: 'reportQueriesDistinctOs' },
			{ name: 'Distinct Platform', value: 'reportQueriesDistinctPlatform' },
			{ name: 'Distinct Software', value: 'reportQueriesDistinctSoftware' },
			{ name: 'Distinct Tags', value: 'reportQueriesDistinctTags' },
			{ name: 'External Asset Externalscan', value: 'reportQueriesExternalAssetExternalscan' },
			{ name: 'External Asset Ports Data', value: 'reportQueriesExternalAssetPortsData' },
			{ name: 'External Asset Ssl Attack', value: 'reportQueriesExternalAssetSslAttack' },
			{ name: 'External Asset Ssl Ciphers', value: 'reportQueriesExternalAssetSslCiphers' },
			{ name: 'External Asset Vulnerabilities', value: 'reportQueriesExternalAssetVulnerabilities' },
			{ name: 'Get Asset Remediation Plan', value: 'assetGetAssetRemediationPlan' },
			{ name: 'Get Assets By Problem', value: 'reportQueriesGetAssetsByProblem' },
			{ name: 'Get Assets Problem', value: 'reportQueriesGetAssetsProblem' },
			{ name: 'Get Patch Settings', value: 'companyGetPatchSettings' },
			{ name: 'Get Remediate Records', value: 'reportQueriesGetRemediateRecords' },
			{ name: 'Get Remediation', value: 'reportQueriesGetRemediation' },
			{ name: 'Lightweight Assets', value: 'reportQueriesLightweightAssets' },
			{ name: 'Notification Tickets View', value: 'reportQueriesNotificationTicketsView' },
			{ name: 'Os Pending Patches', value: 'reportQueriesOsPendingPatches' },
			{ name: 'Os Pending Patches Companies', value: 'reportQueriesOsPendingPatchesCompanies' },
			{ name: 'Ports Assets Details', value: 'reportQueriesPortsAssetsDetails' },
			{ name: 'Ports Count', value: 'reportQueriesPortsCount' },
			{ name: 'Ports View', value: 'reportQueriesPortsView' },
			{ name: 'Problem Group Summary', value: 'reportQueriesProblemGroupSummary' },
			{ name: 'Problem Group Summary Asset Company Count', value: 'reportQueriesProblemGroupSummaryAssetCompanyCount' },
			{ name: 'Problems Info', value: 'reportQueriesProblemsInfo' },
			{ name: 'Problems Remediations Summary', value: 'reportQueriesProblemsRemediationsSummary' },
			{ name: 'Problems Ssl For Asset', value: 'reportQueriesProblemsSslForAsset' },
			{ name: 'Problems Summary', value: 'reportQueriesProblemsSummary' },
			{ name: 'Problems Summary Asset Details', value: 'reportQueriesProblemsSummaryAssetDetails' },
			{ name: 'Problems Summary Group By Companies', value: 'reportQueriesProblemsSummaryGroupByCompanies' },
			{ name: 'Problems Summary Tag', value: 'reportQueriesProblemsSummaryTag' },
			{ name: 'Registry Problems Company', value: 'reportQueriesRegistryProblemsCompany' },
			{ name: 'Registry Problems Remediation', value: 'reportQueriesRegistryProblemsRemediation' },
			{ name: 'Registry Problems Remediation Asset Details', value: 'reportQueriesRegistryProblemsRemediationAssetDetails' },
			{ name: 'Registry Problems Summary', value: 'reportQueriesRegistryProblemsSummary' },
			{ name: 'Remediate Records', value: 'reportQueriesRemediateRecords' },
			{ name: 'Remediate Records Asset', value: 'getDataRemediateRecordsAsset' },
			{ name: 'Remediate Records Assets', value: 'reportQueriesRemediateRecordsAssets' },
			{ name: 'Remediate Records Companies', value: 'getDataRemediateRecordsCompanies' },
			{ name: 'Remediate Records Companies', value: 'reportQueriesRemediateRecordsCompanies' },
			{ name: 'Remediate Records Days', value: 'reportQueriesRemediateRecordsDays' },
			{ name: 'Remediate Records Global', value: 'getDataRemediateRecordsGlobal' },
			{ name: 'Remediated Registry Solution Plan', value: 'reportQueriesRemediatedRegistrySolutionPlan' },
			{ name: 'Remediation Companies', value: 'reportQueriesRemediationCompanies' },
			{ name: 'Remediation Plan Asset', value: 'getDataRemediationPlanAsset' },
			{ name: 'Remediation Plan Asset Details', value: 'reportQueriesRemediationPlanAssetDetails' },
			{ name: 'Remediation Plan Asset Details By Epss', value: 'reportQueriesRemediationPlanAssetDetailsByEpss' },
			{ name: 'Remediation Plan Asset Epss Details', value: 'reportQueriesRemediationPlanAssetEpssDetails' },
			{ name: 'Remediation Plan By Company', value: 'reportQueriesRemediationPlanByCompany' },
			{ name: 'Remediation Plan Companies', value: 'getDataRemediationPlanCompanies' },
			{ name: 'Remediation Plan Global', value: 'getDataRemediationPlanGlobal' },
			{ name: 'Remediation Plan Include Company', value: 'reportQueriesRemediationPlanIncludeCompany' },
			{ name: 'Remediation Plan Include Company Days', value: 'reportQueriesRemediationPlanIncludeCompanyDays' },
			{ name: 'Remediation Velocity Application', value: 'reportQueriesRemediationVelocityApplication' },
			{ name: 'Remediation Velocity Application Asset Details', value: 'reportQueriesRemediationVelocityApplicationAssetDetails' },
			{ name: 'Remediation Velocity Company', value: 'reportQueriesRemediationVelocityCompany' },
			{ name: 'Resolved Remediation', value: 'reportQueriesResolvedRemediation' },
			{ name: 'Risk Score', value: 'reportQueriesRiskScore' },
			{ name: 'Suppressed Problems', value: 'reportQueriesSuppressedProblems' },
			{ name: 'Sw Problems Remediations View', value: 'reportQueriesSwProblemsRemediationsView' },
			{ name: 'Sw Problems Remediations View Assetwise', value: 'reportQueriesSwProblemsRemediationsViewAssetwise' },
			{ name: 'Sw Problems Remediations View Vul', value: 'reportQueriesSwProblemsRemediationsViewVul' },
			{ name: 'Tags View', value: 'reportQueriesTagsView' },
			{ name: 'Total Asset Count', value: 'reportQueriesTotalAssetCount' },
			{ name: 'Unconfirmed Key Check', value: 'reportQueriesUnconfirmedKeyCheck' },
			{ name: 'Unconfirmed Open Ports Key Check', value: 'reportQueriesUnconfirmedOpenPortsKeyCheck' },
			{ name: 'Vulnerabilities Count', value: 'reportQueriesVulnerabilitiesCount' },
			{ name: 'Vulnerabilities Details', value: 'reportQueriesVulnerabilitiesDetails' },
			{ name: 'Vulnerabilities Details Suppressed', value: 'reportQueriesVulnerabilitiesDetailsSuppressed' },
		],
	},
	{
		key: 'assetData',
		name: 'Asset Data',
		resources: [
			{ name: 'Asset Firewall Policy', value: 'assetAssetFirewallPolicy' },
			{ name: 'Asset Installed Drivers', value: 'assetAssetInstalledDrivers' },
			{ name: 'Asset Interface', value: 'assetAssetInterface' },
			{ name: 'Asset Msdt', value: 'assetAssetMsdt' },
			{ name: 'Asset Ports', value: 'assetAssetPorts' },
			{ name: 'Asset Security Report Data', value: 'assetAssetSecurityReportData' },
			{ name: 'Asset Security Report Data Bulk', value: 'reportQueriesAssetSecurityReportDataBulk' },
			{ name: 'Asset Shares', value: 'assetAssetShares' },
			{ name: 'Asset Storages', value: 'assetAssetStorages' },
			{ name: 'Asset Unqouted Services', value: 'assetAssetUnqoutedServices' },
			{ name: 'Asset User Shares', value: 'assetAssetUserShares' },
			{ name: 'Asset Video Info', value: 'assetAssetVideoInfo' },
			{ name: 'Asset Windows Reboot Required', value: 'assetAssetWindowsRebootRequired' },
			{ name: 'Bios Info', value: 'assetBiosInfo' },
			{ name: 'Browser Extensions', value: 'assetBrowserExtensions' },
			{ name: 'Ciphers View', value: 'assetCiphersView' },
			{ name: 'Windows Protection Status', value: 'assetWindowsProtectionStatus' },
		],
	},
	{
		key: 'attackSurface',
		name: 'Attack Surface',
		resources: [
			{ name: 'Attack Surface Domain', value: 'companyAttackSurfaceDomain' },
			{ name: 'Attack Surface Results', value: 'companyAttackSurfaceResults' },
		],
	},
	{
		key: 'backupSoftware',
		name: 'Backup Software',
		resources: [
			{ name: 'Backup Software', value: 'companyBackupSoftware' },
		],
	},
	{
		key: 'company',
		name: 'Company',
		resources: [
			{ name: 'Asset Windows Compatibility', value: 'companyAssetWindowsCompatibility' },
			{ name: 'Companies', value: 'companyCompanies' },
			{ name: 'Company Stats', value: 'companyCompanyStats' },
			{ name: 'Jobs View', value: 'companyJobsView' },
		],
	},
	{
		key: 'compliance',
		name: 'Compliance',
		resources: [
			{ name: 'Asset Compliance Details', value: 'reportQueriesAssetComplianceDetails' },
			{ name: 'Asset Compliance Report Data', value: 'reportQueriesAssetComplianceReportData' },
			{ name: 'Compliance Asset Info', value: 'reportQueriesComplianceAssetInfo' },
			{ name: 'Compliance Check Asset Count', value: 'reportQueriesComplianceCheckAssetCount' },
			{ name: 'Compliance Check Company Count', value: 'reportQueriesComplianceCheckCompanyCount' },
			{ name: 'Compliance Check Count', value: 'reportQueriesComplianceCheckCount' },
			{ name: 'Compliance Check Count By Section', value: 'reportQueriesComplianceCheckCountBySection' },
			{ name: 'Compliance Internal Checks', value: 'reportQueriesComplianceInternalChecks' },
			{ name: 'Compliance Maturity', value: 'reportQueriesComplianceMaturity' },
			{ name: 'Types', value: 'complianceTypes' },
		],
	},
	{
		key: 'complianceAssessment',
		name: 'Compliance Assessment',
		resources: [
			{ name: 'Compliance Assessment', value: 'companyComplianceAssessment' },
		],
	},
	{
		key: 'credentials',
		name: 'Credentials',
		resources: [
			{ name: 'Agent Credentials Mapping', value: 'companyAgentCredentialsMapping' },
			{ name: 'Credentials', value: 'companyCredentials' },
		],
	},
	{
		key: 'discoverySettings',
		name: 'Discovery Settings',
		resources: [
			{ name: 'Agent Discoverysettings Mapping', value: 'companyAgentDiscoverysettingsMapping' },
			{ name: 'Discovery Settings', value: 'companyDiscoverySettings' },
		],
	},
	{
		key: 'edr',
		name: 'EDR',
		resources: [
			{ name: 'Edr', value: 'companyEdr' },
		],
	},
	{
		key: 'eventSet',
		name: 'Event Set',
		resources: [
			{ name: 'Event Set', value: 'companyEventSet' },
		],
	},
	{
		key: 'externalScan',
		name: 'External Scan',
		resources: [
			{ name: 'Custom Profile', value: 'companyCustomProfile' },
			{ name: 'External Scan', value: 'companyExternalScan' },
		],
	},
	{
		key: 'firewall',
		name: 'Firewall',
		resources: [
			{ name: 'Firewall Groups', value: 'assetFirewallGroups' },
			{ name: 'Firewall Interfaces', value: 'assetFirewallInterfaces' },
			{ name: 'Firewall License', value: 'assetFirewallLicense' },
			{ name: 'Firewall Rules', value: 'assetFirewallRules' },
			{ name: 'Firewall Users', value: 'assetFirewallUsers' },
			{ name: 'Firewall Zones', value: 'assetFirewallZones' },
		],
	},
	{
		key: 'integration',
		name: 'Integration',
		resources: [
			{ name: 'Company Mappings', value: 'integrationCompanyMappings' },
			{ name: 'Integration Credentials', value: 'integrationIntegrationCredentials' },
			{ name: 'Integration Rules', value: 'integrationIntegrationRules' },
		],
	},
	{
		key: 'pii',
		name: 'PII',
		resources: [
			{ name: 'Pii Scan Settings', value: 'companyPiiScanSettings' },
		],
	},
	{
		key: 'patchManagement',
		name: 'Patch Management',
		resources: [
			{ name: 'Application Vulnerabilities', value: 'reportQueriesApplicationVulnerabilities' },
			{ name: 'Application Vulnerabilities Os Patch', value: 'reportQueriesApplicationVulnerabilitiesOsPatch' },
			{ name: 'Patch Now', value: 'companyPatchNow' },
		],
	},
	{
		key: 'reports',
		name: 'Reports',
		resources: [
			{ name: 'Report Jobs View', value: 'companyReportJobsView' },
		],
	},
	{
		key: 'scheduler',
		name: 'Scheduler',
		resources: [
			{ name: 'Remove Schedule', value: 'companyRemoveSchedule' },
			{ name: 'Scheduler', value: 'companyScheduler' },
			{ name: 'Update Schedule', value: 'companyUpdateSchedule' },
		],
	},
	{
		key: 'settings',
		name: 'Settings',
		resources: [
			{ name: 'Custom Domain', value: 'companyCustomDomain' },
			{ name: 'Custom Domains', value: 'companyCustomDomains' },
		],
	},
	{
		key: 'tags',
		name: 'Tags',
		resources: [
			{ name: 'Tag Rules', value: 'companyTagRules' },
			{ name: 'Tags', value: 'companyTags' },
		],
	},
	{
		key: 'ticketTemplate',
		name: 'Ticket Template',
		resources: [
			{ name: 'Custom Ticketing Template', value: 'companyCustomTicketingTemplate' },
		],
	},
	{
		key: 'users',
		name: 'Users',
		resources: [
			{ name: 'Get Users', value: 'userGetUsers' },
		],
	},
	{
		key: 'vulnerabilities',
		name: 'Vulnerabilities',
		resources: [
			{ name: 'Application Vulnerabilities By Os', value: 'reportQueriesApplicationVulnerabilitiesByOs' },
			{ name: 'Application Vulnerabilities By Os Software Details', value: 'reportQueriesApplicationVulnerabilitiesByOsSoftwareDetails' },
			{ name: 'Application Vulnerabilities By Os Software Details Suppressed', value: 'reportQueriesApplicationVulnerabilitiesByOsSoftwareDetailsSuppressed' },
			{ name: 'Application Vulnerabilities By Product', value: 'reportQueriesApplicationVulnerabilitiesByProduct' },
			{ name: 'Application Vulnerabilities By Product Suppressed', value: 'reportQueriesApplicationVulnerabilitiesByProductSuppressed' },
			{ name: 'Application Vulnerabilities By Product Suppressed Tag', value: 'reportQueriesApplicationVulnerabilitiesByProductSuppressedTag' },
			{ name: 'Application Vulnerabilities By Product Tag', value: 'reportQueriesApplicationVulnerabilitiesByProductTag' },
			{ name: 'Application Vulnerabilities Net', value: 'reportQueriesApplicationVulnerabilitiesNet' },
			{ name: 'Application Vulnerabilities Net Suppressed', value: 'reportQueriesApplicationVulnerabilitiesNetSuppressed' },
			{ name: 'Application Vulnerabilities Net Suppressed Tag', value: 'reportQueriesApplicationVulnerabilitiesNetSuppressedTag' },
			{ name: 'Application Vulnerabilities Net Tag', value: 'reportQueriesApplicationVulnerabilitiesNetTag' },
			{ name: 'Application Vulnerabilities Suppressed', value: 'reportQueriesApplicationVulnerabilitiesSuppressed' },
			{ name: 'Application Vulnerabilities Suppressed By Os', value: 'reportQueriesApplicationVulnerabilitiesSuppressedByOs' },
			{ name: 'Application Vulnerabilities Suppressed Tag', value: 'reportQueriesApplicationVulnerabilitiesSuppressedTag' },
			{ name: 'Application Vulnerabilities Suppressed Tag By Os', value: 'reportQueriesApplicationVulnerabilitiesSuppressedTagByOs' },
			{ name: 'Application Vulnerabilities Tag', value: 'reportQueriesApplicationVulnerabilitiesTag' },
			{ name: 'Application Vulnerabilities Tag By Os', value: 'reportQueriesApplicationVulnerabilitiesTagByOs' },
			{ name: 'Report', value: 'cveReport' },
			{ name: 'Suppress Vulnerability', value: 'assetSuppressVulnerability' },
			{ name: 'Suppress Vulnerability Problems', value: 'reportQueriesSuppressVulnerabilityProblems' },
			{ name: 'Suppress Vulnerability Solution', value: 'reportQueriesSuppressVulnerabilitySolution' },
		],
	},
	{
		key: 'custom',
		name: 'Custom API',
		resources: [{ name: 'Custom API Call', value: 'customApi' }],
	},
];

export const RESOURCE_GROUP_OPTIONS: INodePropertyOptions[] = RESOURCE_GROUPS.map((group) => ({
	name: group.name,
	value: group.key,
}));

const resourcesByGroup = new Map<string, INodePropertyOptions[]>(
	RESOURCE_GROUPS.map((group) => [group.key, group.resources]),
);

export function getResourcesForGroup(resourceGroup: string): INodePropertyOptions[] {
	return resourcesByGroup.get(resourceGroup) ?? [];
}

export function getDefaultResourceForGroup(resourceGroup: string): string | undefined {
	return getResourcesForGroup(resourceGroup)[0]?.value as string | undefined;
}
