import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { unwrapResponseData } from '../../../resourceList';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as number;
	const endpoint = `/r/company/scheduler/{id}`.replace('{id}', String(recordId));
	const response = await apiRequest.call(this, 'GET', endpoint, {}, {});

	return [{ json: unwrapResponseData(response), pairedItem: { item: index } }];
}
