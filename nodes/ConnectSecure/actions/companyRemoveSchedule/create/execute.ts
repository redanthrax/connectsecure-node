import { IExecuteFunctions, IDataObject, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { unwrapResponseData } from '../../../resourceList';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const data = this.getNodeParameter('data', index, {}) as IDataObject;
	const body = { data };
	const response = await apiRequest.call(this, 'POST', '/w/company/remove_schedule', body, {});

	return [{ json: unwrapResponseData(response), pairedItem: { item: index } }];
}
