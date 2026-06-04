import {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestMethods,
	INodeExecutionData,
} from 'n8n-workflow';
import { extractResourceList } from './resourceList';
import { apiRequest, apiRequestAllItems } from './transport';

export { extractResourceList };
export {
	buildCondition,
	buildConditionClause,
	buildListQuery,
	buildOrderBy,
	combineConditions,
	getListQueryParameters,
} from './queryHelpers';

export async function runGetAllRequest(
	this: IExecuteFunctions,
	index: number,
	params: {
		endpoint: string;
		resourceKey: string;
		qs: IDataObject;
		body?: IDataObject;
		method?: IHttpRequestMethods;
		maxLimit?: number;
		skipLimit?: boolean;
	},
): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', index) as boolean;
	const qs = { ...params.qs };
	const body = params.body ?? {};
	const method = params.method ?? 'GET';
	const { endpoint, resourceKey } = params;

	if (!returnAll && !params.skipLimit && qs.limit === undefined) {
		let limit = this.getNodeParameter('limit', index, 50) as number;
		if (params.maxLimit) {
			limit = Math.min(Math.max(limit, 1), params.maxLimit);
		}
		qs.limit = limit;
	}

	if (returnAll) {
		const all = await apiRequestAllItems.call(this, method, endpoint, resourceKey, body, qs);
		return this.helpers.returnJsonArray(all);
	}

	const response = await apiRequest.call(this, method, endpoint, body, qs);
	return this.helpers.returnJsonArray(extractResourceList(response, resourceKey));
}
