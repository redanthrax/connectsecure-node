import { IDataObject, IExecuteFunctions } from 'n8n-workflow';

export type ConditionLogic = 'AND' | 'OR';

export type ConditionOperator =
	| '='
	| '!='
	| '<>'
	| '>'
	| '>='
	| '<'
	| '<='
	| 'ILIKE'
	| 'LIKE'
	| 'IN'
	| 'NOT IN'
	| 'IS NULL'
	| 'IS NOT NULL';

/** UI-safe operator keys — avoids n8n treating "=" as an expression. */
export type ConditionOperatorKey =
	| 'eq'
	| 'neq'
	| 'gt'
	| 'gte'
	| 'lt'
	| 'lte'
	| 'ilike'
	| 'like'
	| 'in'
	| 'notIn'
	| 'isNull'
	| 'isNotNull';

const CONDITION_OPERATOR_KEYS: Record<string, ConditionOperator> = {
	eq: '=',
	neq: '!=',
	gt: '>',
	gte: '>=',
	lt: '<',
	lte: '<=',
	ilike: 'ILIKE',
	like: 'LIKE',
	in: 'IN',
	notIn: 'NOT IN',
	isNull: 'IS NULL',
	isNotNull: 'IS NOT NULL',
};

export function resolveConditionOperator(operator: string): ConditionOperator {
	const trimmed = operator.trim();
	const mapped = CONDITION_OPERATOR_KEYS[trimmed];
	if (mapped) {
		return mapped;
	}

	return trimmed.toUpperCase() as ConditionOperator;
}

export type LikeMatch = 'contains' | 'startsWith' | 'endsWith' | 'exact';

export interface ConditionFilter {
	field: string;
	operator: ConditionOperator | ConditionOperatorKey | string;
	value?: unknown;
	likeMatch?: LikeMatch;
}

export interface OrderByField {
	field: string;
	direction?: 'asc' | 'desc';
}

export interface ListQueryOptions {
	condition?: string;
	skip?: number;
	limit?: number;
	orderBy?: string;
	extra?: IDataObject;
}

function escapeStringValue(value: string): string {
	return value.replace(/'/g, "''");
}

export function formatScalarValue(value: string | number | boolean): string {
	if (typeof value === 'number' || typeof value === 'boolean') {
		return String(value);
	}

	return `'${escapeStringValue(value)}'`;
}

export function formatLikeValue(value: string, match: LikeMatch = 'contains'): string {
	const escaped = escapeStringValue(value);

	switch (match) {
		case 'startsWith':
			return `'${escaped}%'`;
		case 'endsWith':
			return `'%${escaped}'`;
		case 'exact':
			return `'${escaped}'`;
		case 'contains':
		default:
			return `'%${escaped}%'`;
	}
}

function normalizeFilterValue(value: unknown): string | number | boolean | undefined {
	if (value === undefined || value === null || value === '') {
		return undefined;
	}

	if (Array.isArray(value)) {
		return value.map(String).join(', ');
	}

	if (typeof value === 'object') {
		return JSON.stringify(value);
	}

	return value as string | number | boolean;
}

export function buildConditionClause(filter: ConditionFilter): string {
	const field = filter.field?.trim();
	if (!field) {
		return '';
	}

	const operator = resolveConditionOperator(String(filter.operator ?? 'eq'));

	if (operator === 'IS NULL' || operator === 'IS NOT NULL') {
		return `${field} ${operator}`;
	}

	const value = normalizeFilterValue(filter.value);
	if (value === undefined) {
		return '';
	}

	if (operator === 'ILIKE' || operator === 'LIKE') {
		return `${field} ${operator} ${formatLikeValue(String(value), filter.likeMatch ?? 'contains')}`;
	}

	if (operator === 'IN' || operator === 'NOT IN') {
		const values = String(value)
			.split(',')
			.map((part) => part.trim())
			.filter(Boolean)
			.map((part) => formatScalarValue(part));

		if (values.length === 0) {
			return '';
		}

		return `${field} ${operator} (${values.join(', ')})`;
	}

	return `${field} ${operator} ${formatScalarValue(value)}`;
}

export function combineConditions(conditions: string[], logic: ConditionLogic = 'AND'): string {
	const parts = conditions.map((part) => part.trim()).filter(Boolean);

	if (parts.length === 0) {
		return '';
	}

	if (parts.length === 1) {
		return parts[0];
	}

	return parts.map((part) => (/\s(AND|OR)\s/i.test(part) ? `(${part})` : part)).join(` ${logic} `);
}

export function buildCondition(
	filters: ConditionFilter[],
	logic: ConditionLogic = 'AND',
): string {
	return combineConditions(
		filters.map((filter) => buildConditionClause(filter)),
		logic,
	);
}

export function buildOrderBy(fields: OrderByField[] | string): string {
	if (typeof fields === 'string') {
		return fields.trim();
	}

	return fields
		.filter((entry) => entry.field?.trim())
		.map((entry) => {
			const field = entry.field.trim();
			return entry.direction === 'desc' ? `${field} desc` : field;
		})
		.join(', ');
}

export function buildListQuery(options: ListQueryOptions): IDataObject {
	const qs: IDataObject = { ...(options.extra ?? {}) };

	if (options.condition) {
		qs.condition = options.condition;
	}

	if (options.skip !== undefined && options.skip > 0) {
		qs.skip = options.skip;
	}

	if (options.limit !== undefined && options.limit > 0) {
		qs.limit = options.limit;
	}

	if (options.orderBy) {
		qs.order_by = options.orderBy;
	}

	return qs;
}

export function mergeQueryParameters(base: IDataObject, extra: IDataObject): IDataObject {
	return { ...base, ...extra };
}

type FilterCollection = {
	filter?: Array<{
		field?: string;
		operator?: string;
		value?: string | number | boolean;
		likeMatch?: LikeMatch;
	}>;
};

type OrderByCollection = {
	field?: Array<{
		name?: string;
		direction?: 'asc' | 'desc';
	}>;
};

export function getListQueryParameters(
	ctx: Pick<IExecuteFunctions, 'getNodeParameter'>,
	index: number,
): IDataObject {
	const qs: IDataObject = {};
	const filterMode = ctx.getNodeParameter('filterMode', index, 'manual') as string;

	if (filterMode === 'manual') {
		const condition = ctx.getNodeParameter('condition', index, '') as string;
		if (condition.trim()) {
			qs.condition = condition.trim();
		}
	} else if (filterMode === 'builder') {
		const filters = ctx.getNodeParameter('filters', index, {}) as FilterCollection;
		const combineFiltersWith = ctx.getNodeParameter('combineFiltersWith', index, 'AND') as ConditionLogic;
		const condition = buildCondition(
			(filters.filter ?? []).map((entry) => ({
				field: entry.field ?? '',
				operator: entry.operator ?? 'eq',
				value: entry.value,
				likeMatch: entry.likeMatch,
			})),
			combineFiltersWith,
		);

		if (condition) {
			qs.condition = condition;
		}
	}

	const orderByMode = ctx.getNodeParameter('orderByMode', index, 'manual') as string;

	if (orderByMode === 'manual') {
		const orderBy = ctx.getNodeParameter('order_by', index, '') as string;
		if (orderBy.trim()) {
			qs.order_by = orderBy.trim();
		}
	} else if (orderByMode === 'builder') {
		const orderByFields = ctx.getNodeParameter('orderByFields', index, {}) as OrderByCollection;
		const orderBy = buildOrderBy(
			(orderByFields.field ?? []).map((entry) => ({
				field: entry.name ?? '',
				direction: entry.direction ?? 'asc',
			})),
		);

		if (orderBy) {
			qs.order_by = orderBy;
		}
	}

	const skip = ctx.getNodeParameter('skip', index, 0) as number;
	if (skip > 0) {
		qs.skip = skip;
	}

	return qs;
}
