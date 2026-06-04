import { IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { apiRequest } from '../../../transport';
import { unwrapResponseData } from '../../../resourceList';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const recordId = this.getNodeParameter('recordId', index) as number;
	const endpoint = `/d/company/agent_credentials_mapping/{id}`.replace('{id}', String(recordId));
	const response = await apiRequest.call(this, 'DELETE', endpoint, {}, {});

	return [{ json: unwrapResponseData(response) || { success: true, id: recordId }, pairedItem: { item: index } }];
}
