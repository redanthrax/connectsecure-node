import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { runGetAllRequest } from '../../../getAllHelpers';
import { getListQueryParameters } from '../../../queryHelpers';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const qs = getListQueryParameters(this, index);

	return runGetAllRequest.call(this, index, {
		endpoint: '/r/company/edr',
		resourceKey: '',
		qs,
	});
}
