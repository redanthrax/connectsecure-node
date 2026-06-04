import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { runGetAllRequest } from '../../../getAllHelpers';
import { getListQueryParameters } from '../../../queryHelpers';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const qs = getListQueryParameters(this, index);

	return runGetAllRequest.call(this, index, {
		endpoint: '/r/report_queries/registry_problems_remediation_asset_details',
		resourceKey: '',
		qs,
	});
}
