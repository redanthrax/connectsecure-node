#!/usr/bin/env python3
"""Generate Connect Secure n8n action modules from docs/swagger.yaml."""

from __future__ import annotations

import re
import shutil
from collections import defaultdict
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
SWAGGER = ROOT / 'docs' / 'swagger.yaml'
ACTIONS_DIR = ROOT / 'nodes' / 'ConnectSecure' / 'actions'

OPERATION_LABELS = {
    'getAll': ('Get Many', 'Get many records'),
    'getById': ('Get', 'Get a record by ID'),
    'create': ('Create', 'Create a record'),
    'update': ('Update', 'Update a record'),
    'delete': ('Delete', 'Delete a record'),
}

COMMON_QUERY_PARAMS = [
    ('condition', 'string', 'Query Condition'),
    ('skip', 'number', 'Skip'),
    ('order_by', 'string', 'Order By'),
]

CONDITION_OPERATORS = [
    ('Equal (=)', 'eq'),
    ('Not Equal (!=)', 'neq'),
    ('Greater Than (>)', 'gt'),
    ('Greater Than or Equal (>=)', 'gte'),
    ('Less Than (<)', 'lt'),
    ('Less Than or Equal (<=)', 'lte'),
    ('Contains (ILIKE)', 'ilike'),
    ('Like (LIKE)', 'like'),
    ('In (IN)', 'in'),
    ('Not In (NOT IN)', 'notIn'),
    ('Is Null', 'isNull'),
    ('Is Not Null', 'isNotNull'),
]

LIKE_MATCH_OPTIONS = [
    ('Contains', 'contains'),
    ('Starts With', 'startsWith'),
    ('Ends With', 'endsWith'),
    ('Exact', 'exact'),
]


def snake_to_camel(name: str) -> str:
    parts = name.split('_')
    return parts[0] + ''.join(part.capitalize() for part in parts[1:])


def resource_key(category: str, entity: str) -> str:
    base = snake_to_camel(category)
    entity_camel = snake_to_camel(entity)
    return base + entity_camel[:1].upper() + entity_camel[1:]


def entity_label(entity: str) -> str:
    return ' '.join(word.capitalize() for word in entity.split('_'))


def tag_key(tag: str) -> str:
    parts = re.split(r'[\s_-]+', tag.strip())
    if not parts:
        return 'unknown'
    return parts[0].lower() + ''.join(part.capitalize() for part in parts[1:])


def display_name(entity: str, tag: str) -> str:
    return entity_label(entity)


def classify_operation(method: str, path: str) -> str | None:
    has_id = '{id}' in path
    if method == 'get' and not has_id:
        return 'getAll'
    if method == 'get' and has_id:
        return 'getById'
    if method == 'post':
        return 'create'
    if method == 'patch':
        return 'update'
    if method == 'delete':
        return 'delete'
    return None


def parse_entities(spec: dict) -> dict:
    entities: dict[str, dict] = {}

    for path, ops in spec.get('paths', {}).items():
        parts = path.strip('/').split('/')
        if len(parts) < 3:
            continue

        category, entity = parts[1], parts[2]

        for method, detail in ops.items():
            op = classify_operation(method, path)
            if not op:
                continue

            key = f'{category}/{entity}'
            if key not in entities:
                entities[key] = {
                    'category': category,
                    'entity': entity,
                    'tag': detail.get('tags', ['Unknown'])[0],
                    'operations': {},
                }

            entities[key]['tag'] = detail.get('tags', ['Unknown'])[0]
            entities[key]['operations'][op] = {
                'method': method.upper(),
                'path': path,
                'summary': detail.get('summary', op),
            }

    return entities


def write_file(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding='utf-8')


def _options_lines(options: list[tuple[str, str]], indent: str = '\t\t\t\t') -> str:
    return '\n'.join(
        f"{indent}{{ name: '{name}', value: '{value}' }},"
        for name, value in options
    )


def gen_query_description_fields(res: str) -> str:
    op_lines = _options_lines(CONDITION_OPERATORS)
    like_lines = _options_lines(LIKE_MATCH_OPTIONS)

    return f"""
\t{{
\t\tdisplayName: 'Filter Mode',
\t\tname: 'filterMode',
\t\ttype: 'options',
\t\tnoDataExpression: true,
\t\toptions: [
\t\t\t{{ name: 'Manual Condition', value: 'manual' }},
\t\t\t{{ name: 'Build Filters', value: 'builder' }},
\t\t\t{{ name: 'None', value: 'none' }},
\t\t],
\t\tdefault: 'builder',
\t\tdescription: 'How to build the API condition query string',
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getAll'] }} }},
\t}},
\t{{
\t\tdisplayName: 'Query Condition',
\t\tname: 'condition',
\t\ttype: 'string',
\t\tdefault: '',
\t\tdescription:
\t\t\t'SQL-like filter passed as the condition query parameter, e.g. name ILIKE \\'%Acme%\\' AND company_id = 1',
\t\tdisplayOptions: {{
\t\t\tshow: {{ resource: ['{res}'], operation: ['getAll'], filterMode: ['manual'] }},
\t\t}},
\t}},
\t{{
\t\tdisplayName: 'Filters',
\t\tname: 'filters',
\t\ttype: 'fixedCollection',
\t\ttypeOptions: {{ multipleValues: true, sortable: true }},
\t\tdefault: {{}},
\t\tdescription: 'Build a condition string from field, operator, and value',
\t\tdisplayOptions: {{
\t\t\tshow: {{ resource: ['{res}'], operation: ['getAll'], filterMode: ['builder'] }},
\t\t}},
\t\toptions: [
\t\t\t{{
\t\t\t\tname: 'filter',
\t\t\t\tdisplayName: 'Filter',
\t\t\t\tvalues: [
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Field',
\t\t\t\t\t\tname: 'field',
\t\t\t\t\t\ttype: 'options',
\t\t\t\t\t\tnoDataExpression: true,
\t\t\t\t\t\ttypeOptions: {{
\t\t\t\t\t\t\tloadOptionsMethod: 'getFilterFields',
\t\t\t\t\t\t\tloadOptionsDependsOn: ['resource', 'operation'],
\t\t\t\t\t\t}},
\t\t\t\t\t\tdefault: '',
\t\t\t\t\t\tdescription: 'Field names loaded from a sample record on this endpoint (limit=1)',
\t\t\t\t\t\trequired: true,
\t\t\t\t\t}},
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Operator',
\t\t\t\t\t\tname: 'operator',
\t\t\t\t\t\ttype: 'options',
\t\t\t\t\t\tnoDataExpression: true,
\t\t\t\t\t\toptions: [
{op_lines}
\t\t\t\t\t],
\t\t\t\t\tdefault: 'eq',
\t\t\t\t}},
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Value',
\t\t\t\t\t\tname: 'value',
\t\t\t\t\t\ttype: 'string',
\t\t\t\t\t\tdefault: '',
\t\t\t\t\t\tdescription:
\t\t\t\t\t\t\t'Filter value. Supports expressions (e.g. from prior nodes). For IN / NOT IN, comma-separate values.',
\t\t\t\t\t\tdisplayOptions: {{
\t\t\t\t\t\t\thide: {{ operator: ['isNull', 'isNotNull'] }},
\t\t\t\t\t\t}},
\t\t\t\t\t}},
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Text Match',
\t\t\t\t\t\tname: 'likeMatch',
\t\t\t\t\t\ttype: 'options',
\t\t\t\t\t\tnoDataExpression: true,
\t\t\t\t\t\toptions: [
{like_lines}
\t\t\t\t\t],
\t\t\t\t\tdefault: 'contains',
\t\t\t\t\tdescription: 'How to wrap ILIKE / LIKE values with wildcards',
\t\t\t\t\t\tdisplayOptions: {{
\t\t\t\t\t\t\tshow: {{ operator: ['ilike', 'like'] }},
\t\t\t\t\t\t}},
\t\t\t\t\t}},
\t\t\t\t],
\t\t\t}},
\t\t],
\t}},
\t{{
\t\tdisplayName: 'Combine Filters With',
\t\tname: 'combineFiltersWith',
\t\ttype: 'options',
\t\tnoDataExpression: true,
\t\toptions: [
\t\t\t{{ name: 'AND', value: 'AND' }},
\t\t\t{{ name: 'OR', value: 'OR' }},
\t\t],
\t\tdefault: 'AND',
\t\tdisplayOptions: {{
\t\t\tshow: {{ resource: ['{res}'], operation: ['getAll'], filterMode: ['builder'] }},
\t\t}},
\t}},
\t{{
\t\tdisplayName: 'Skip',
\t\tname: 'skip',
\t\ttype: 'number',
\t\tdefault: 0,
\t\tdescription: 'Number of records to skip for pagination',
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getAll'] }} }},
\t}},
\t{{
\t\tdisplayName: 'Sort Mode',
\t\tname: 'orderByMode',
\t\ttype: 'options',
\t\tnoDataExpression: true,
\t\toptions: [
\t\t\t{{ name: 'Manual', value: 'manual' }},
\t\t\t{{ name: 'Build Sort Fields', value: 'builder' }},
\t\t\t{{ name: 'None', value: 'none' }},
\t\t],
\t\tdefault: 'manual',
\t\tdescription: 'How to build the order_by query parameter',
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getAll'] }} }},
\t}},
\t{{
\t\tdisplayName: 'Order By',
\t\tname: 'order_by',
\t\ttype: 'string',
\t\tdefault: '',
\t\tdescription: 'Sort expression passed as order_by, e.g. name desc, severity desc',
\t\tdisplayOptions: {{
\t\t\tshow: {{ resource: ['{res}'], operation: ['getAll'], orderByMode: ['manual'] }},
\t\t}},
\t}},
\t{{
\t\tdisplayName: 'Sort Fields',
\t\tname: 'orderByFields',
\t\ttype: 'fixedCollection',
\t\ttypeOptions: {{ multipleValues: true, sortable: true }},
\t\tdefault: {{}},
\t\tdescription: 'Fields to sort by',
\t\tdisplayOptions: {{
\t\t\tshow: {{ resource: ['{res}'], operation: ['getAll'], orderByMode: ['builder'] }},
\t\t}},
\t\toptions: [
\t\t\t{{
\t\t\t\tname: 'field',
\t\t\t\tdisplayName: 'Field',
\t\t\t\tvalues: [
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Field Name',
\t\t\t\t\t\tname: 'name',
\t\t\t\t\t\ttype: 'options',
\t\t\t\t\t\tnoDataExpression: true,
\t\t\t\t\t\ttypeOptions: {{
\t\t\t\t\t\t\tloadOptionsMethod: 'getSortFields',
\t\t\t\t\t\t\tloadOptionsDependsOn: ['resource', 'operation'],
\t\t\t\t\t\t}},
\t\t\t\t\t\tdefault: '',
\t\t\t\t\t\tdescription: 'Field names loaded from a sample record on this endpoint (limit=1)',
\t\t\t\t\t\trequired: true,
\t\t\t\t\t}},
\t\t\t\t\t{{
\t\t\t\t\t\tdisplayName: 'Direction',
\t\t\t\t\t\tname: 'direction',
\t\t\t\t\t\ttype: 'options',
\t\t\t\t\t\tnoDataExpression: true,
\t\t\t\t\t\toptions: [
\t\t\t\t\t\t\t{{ name: 'Ascending', value: 'asc' }},
\t\t\t\t\t\t\t{{ name: 'Descending', value: 'desc' }},
\t\t\t\t\t\t],
\t\t\t\t\t\tdefault: 'asc',
\t\t\t\t\t}},
\t\t\t\t],
\t\t\t}},
\t\t],
\t}},"""


def gen_get_all_description(res: str) -> str:
    lines = [
        "import { INodeProperties } from 'n8n-workflow';",
        '',
        'export const getAllDescription: INodeProperties[] = [',
        '\t{',
        "\t\tdisplayName: 'Return All',",
        "\t\tname: 'returnAll',",
        "\t\ttype: 'boolean',",
        "\t\tdescription: 'Whether to return all results or only up to a given limit',",
        f"\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getAll'] }} }},",
        '\t\tdefault: false,',
        '\t},',
        '\t{',
        "\t\tdisplayName: 'Limit',",
        "\t\tname: 'limit',",
        "\t\ttype: 'number',",
        "\t\tdescription: 'Max number of results to return',",
        f"\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getAll'], returnAll: [false] }} }},",
        "\t\ttypeOptions: { minValue: 1 },",
        '\t\tdefault: 50,',
        '\t},',
        gen_query_description_fields(res),
        '];',
        '',
    ]
    return '\n'.join(lines)


def gen_get_all_execute(endpoint: str) -> str:
    return f"""import {{ IExecuteFunctions, INodeExecutionData }} from 'n8n-workflow';
import {{ runGetAllRequest }} from '../../../getAllHelpers';
import {{ getListQueryParameters }} from '../../../queryHelpers';

export async function execute(
\tthis: IExecuteFunctions,
\tindex: number,
): Promise<INodeExecutionData[]> {{
\tconst qs = getListQueryParameters(this, index);

\treturn runGetAllRequest.call(this, index, {{
\t\tendpoint: '{endpoint}',
\t\tresourceKey: '',
\t\tqs,
\t}});
}}
"""


def gen_get_by_id_description(res: str) -> str:
    return f"""import {{ INodeProperties }} from 'n8n-workflow';

export const getByIdDescription: INodeProperties[] = [
\t{{
\t\tdisplayName: 'Record ID',
\t\tname: 'recordId',
\t\ttype: 'number',
\t\trequired: true,
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['getById'] }} }},
\t\tdefault: 0,
\t}},
];
"""


def gen_get_by_id_execute(endpoint_template: str) -> str:
    return f"""import {{ IExecuteFunctions, INodeExecutionData }} from 'n8n-workflow';
import {{ apiRequest }} from '../../../transport';
import {{ unwrapResponseData }} from '../../../resourceList';

export async function execute(
\tthis: IExecuteFunctions,
\tindex: number,
): Promise<INodeExecutionData[]> {{
\tconst recordId = this.getNodeParameter('recordId', index) as number;
\tconst endpoint = `{endpoint_template}`.replace('{{id}}', String(recordId));
\tconst response = await apiRequest.call(this, 'GET', endpoint, {{}}, {{}});

\treturn [{{ json: unwrapResponseData(response), pairedItem: {{ item: index }} }}];
}}
"""


def gen_create_description(res: str) -> str:
    return f"""import {{ INodeProperties }} from 'n8n-workflow';

export const createDescription: INodeProperties[] = [
\t{{
\t\tdisplayName: 'Data',
\t\tname: 'data',
\t\ttype: 'json',
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['create'] }} }},
\t\tdefault: {{}},
\t\tdescription: 'Record fields sent as the \\"data\\" object in the request body',
\t}},
];
"""


def gen_create_execute(endpoint: str, method: str) -> str:
    return f"""import {{ IExecuteFunctions, IDataObject, INodeExecutionData }} from 'n8n-workflow';
import {{ apiRequest }} from '../../../transport';
import {{ unwrapResponseData }} from '../../../resourceList';

export async function execute(
\tthis: IExecuteFunctions,
\tindex: number,
): Promise<INodeExecutionData[]> {{
\tconst data = this.getNodeParameter('data', index, {{}}) as IDataObject;
\tconst body = {{ data }};
\tconst response = await apiRequest.call(this, '{method}', '{endpoint}', body, {{}});

\treturn [{{ json: unwrapResponseData(response), pairedItem: {{ item: index }} }}];
}}
"""


def gen_update_description(res: str) -> str:
    return gen_create_description(res).replace('createDescription', 'updateDescription').replace(
        "operation: ['create']", "operation: ['update']"
    )


def gen_update_execute(endpoint: str) -> str:
    return gen_create_execute(endpoint, 'PATCH').replace('create', 'update')


def gen_delete_description(res: str) -> str:
    return f"""import {{ INodeProperties }} from 'n8n-workflow';

export const deleteDescription: INodeProperties[] = [
\t{{
\t\tdisplayName: 'Record ID',
\t\tname: 'recordId',
\t\ttype: 'number',
\t\trequired: true,
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'], operation: ['delete'] }} }},
\t\tdefault: 0,
\t}},
];
"""


def gen_delete_execute(endpoint_template: str) -> str:
    return f"""import {{ IExecuteFunctions, INodeExecutionData }} from 'n8n-workflow';
import {{ apiRequest }} from '../../../transport';
import {{ unwrapResponseData }} from '../../../resourceList';

export async function execute(
\tthis: IExecuteFunctions,
\tindex: number,
): Promise<INodeExecutionData[]> {{
\tconst recordId = this.getNodeParameter('recordId', index) as number;
\tconst endpoint = `{endpoint_template}`.replace('{{id}}', String(recordId));
\tconst response = await apiRequest.call(this, 'DELETE', endpoint, {{}}, {{}});

\treturn [{{ json: unwrapResponseData(response) || {{ success: true, id: recordId }}, pairedItem: {{ item: index }} }}];
}}
"""


def gen_operation_index(export_name: str) -> str:
    return f"""export * from './execute';
export {{ {export_name} as description }} from './description';
"""


def gen_resource_index(res: str, operations: list[str], import_name: str) -> str:
    imports = []
    options = []
    descriptions = []

    op_aliases = {'delete': 'deleteRecord'}

    for op in operations:
        mod = op_aliases.get(op, op)
        imports.append(f"import * as {mod} from './{op}';")

    import_block = '\n'.join(imports)
    export_names = ', '.join(op_aliases.get(op, op) for op in operations)

    for op in operations:
        label, action = OPERATION_LABELS[op]
        options.append(f"\t\t\t{{ name: '{label}', value: '{op}', action: '{action}' }},")
        mod = op_aliases.get(op, op)
        descriptions.append(f"\t...{mod}.description,")

    default_op = 'getAll' if 'getAll' in operations else operations[0]

    return f"""{import_block}

import {{ INodeProperties }} from 'n8n-workflow';

export {{ {export_names} }};

export const description: INodeProperties[] = [
\t{{
\t\tdisplayName: 'Operation',
\t\tname: 'operation',
\t\ttype: 'options',
\t\tnoDataExpression: true,
\t\tdisplayOptions: {{ show: {{ resource: ['{res}'] }} }},
\t\toptions: [
{chr(10).join(options)}
\t\t],
\t\tdefault: '{default_op}',
\t}},
{chr(10).join(descriptions)}
];
"""


def generate_resource(res_key: str, info: dict) -> None:
    resource_dir = ACTIONS_DIR / res_key
    if resource_dir.exists():
        shutil.rmtree(resource_dir)

    operations = info['operations']

    for op, meta in operations.items():
        op_dir = resource_dir / op
        if op == 'getAll':
            write_file(op_dir / 'description.ts', gen_get_all_description(res_key))
            write_file(op_dir / 'execute.ts', gen_get_all_execute(meta['path']))
            write_file(op_dir / 'index.ts', gen_operation_index('getAllDescription'))
        elif op == 'getById':
            write_file(op_dir / 'description.ts', gen_get_by_id_description(res_key))
            write_file(op_dir / 'execute.ts', gen_get_by_id_execute(meta['path']))
            write_file(op_dir / 'index.ts', gen_operation_index('getByIdDescription'))
        elif op == 'create':
            write_file(op_dir / 'description.ts', gen_create_description(res_key))
            write_file(op_dir / 'execute.ts', gen_create_execute(meta['path'], meta['method']))
            write_file(op_dir / 'index.ts', gen_operation_index('createDescription'))
        elif op == 'update':
            write_file(op_dir / 'description.ts', gen_update_description(res_key))
            write_file(op_dir / 'execute.ts', gen_update_execute(meta['path']))
            write_file(op_dir / 'index.ts', gen_operation_index('updateDescription'))
        elif op == 'delete':
            write_file(op_dir / 'description.ts', gen_delete_description(res_key))
            write_file(op_dir / 'execute.ts', gen_delete_execute(meta['path']))
            write_file(op_dir / 'index.ts', gen_operation_index('deleteDescription'))

    write_file(resource_dir / 'index.ts', gen_resource_index(res_key, list(operations.keys()), res_key))


def build_groups(resources: list[tuple[str, dict]]) -> dict[str, dict]:
    groups: dict[str, dict] = {}
    for key, info in resources:
        group_key = tag_key(info['tag'])
        info['resourceGroup'] = group_key
        if group_key not in groups:
            groups[group_key] = {'name': info['tag'], 'resources': []}
        groups[group_key]['resources'].append({'key': key, 'name': entity_label(info['entity'])})
    for group in groups.values():
        group['resources'].sort(key=lambda item: item['name'].lower())
    return groups


def generate_get_all_endpoints(resources: list[tuple[str, dict]]) -> None:
    entries: list[str] = []
    for key, info in resources:
        get_all = info['operations'].get('getAll')
        if not get_all:
            continue
        entries.append(f"\t'{key}': '{get_all['path']}',")

    content = f"""// Auto-generated by scripts/generate-from-swagger.py — do not edit manually

export const GET_ALL_ENDPOINTS: Record<string, string> = {{
{chr(10).join(entries)}
}};

export function getGetAllEndpoint(resource: string): string | undefined {{
\treturn GET_ALL_ENDPOINTS[resource];
}}
"""
    write_file(ROOT / 'nodes' / 'ConnectSecure' / 'resourceGetAllEndpoints.ts', content)


def generate_resource_groups(groups: dict[str, dict]) -> None:
    sorted_groups = sorted(groups.items(), key=lambda item: item[1]['name'])
    group_entries: list[str] = []

    for group_key, group in sorted_groups:
        resource_entries = ',\n\t\t\t'.join(
            f"{{ name: '{item['name']}', value: '{item['key']}' }}"
            for item in group['resources']
        )
        safe_name = group['name'].replace("'", "\\'")
        group_entries.append(
            f"""\t{{
\t\tkey: '{group_key}',
\t\tname: '{safe_name}',
\t\tresources: [
\t\t\t{resource_entries},
\t\t],
\t}},"""
        )

    content = f"""import {{ INodePropertyOptions }} from 'n8n-workflow';

export interface ResourceGroupDefinition {{
\tkey: string;
\tname: string;
\tresources: INodePropertyOptions[];
}}

export const RESOURCE_GROUPS: ResourceGroupDefinition[] = [
{chr(10).join(group_entries)}
\t{{
\t\tkey: 'custom',
\t\tname: 'Custom API',
\t\tresources: [{{ name: 'Custom API Call', value: 'customApi' }}],
\t}},
];

export const RESOURCE_GROUP_OPTIONS: INodePropertyOptions[] = RESOURCE_GROUPS.map((group) => ({{
\tname: group.name,
\tvalue: group.key,
}}));

const resourcesByGroup = new Map<string, INodePropertyOptions[]>(
\tRESOURCE_GROUPS.map((group) => [group.key, group.resources]),
);

export function getResourcesForGroup(resourceGroup: string): INodePropertyOptions[] {{
\treturn resourcesByGroup.get(resourceGroup) ?? [];
}}

export function getDefaultResourceForGroup(resourceGroup: string): string | undefined {{
\treturn getResourcesForGroup(resourceGroup)[0]?.value as string | undefined;
}}
"""
    write_file(ROOT / 'nodes' / 'ConnectSecure' / 'resourceGroups.ts', content)


def generate_interfaces(resources: list[tuple[str, dict]], groups: dict[str, dict]) -> None:
    resource_types = ' | '.join(f"'{key}'" for key, _ in resources)
    group_types = ' | '.join(f"'{key}'" for key in sorted(groups)) + " | 'custom'"
    lines = [
        f'export type ConnectSecureResourceGroup = {group_types};',
        f"export type ConnectSecureResource = 'customApi' | {resource_types};",
        '',
        'export interface ConnectSecure {',
        '\tresourceGroup: ConnectSecureResourceGroup;',
        '\tresource: ConnectSecureResource;',
        "\toperation: string;",
        '}',
        '',
    ]
    write_file(ACTIONS_DIR / 'Interfaces.ts', '\n'.join(lines))


def generate_router(resources: list[tuple[str, dict]]) -> None:
    imports = ["import { IExecuteFunctions } from 'n8n-workflow';",
                 "import { IDataObject, INodeExecutionData } from 'n8n-workflow';",
                 '',
                 "import { ConnectSecure } from './Interfaces';",
                 "import { toNodeApiError } from '../errors';",
                 "import * as customApi from './customApi';"]

    for key, _ in resources:
        imports.append(f"import * as {key} from './{key}';")

    switch_cases = ["\t\t\tcase 'customApi':",
                    "\t\t\t\tresponseData = await (customApi as any)[connectSecure.operation].execute.call(this, i);",
                    '\t\t\t\tbreak;']

    for key, _ in resources:
        switch_cases.extend([
            f"\t\t\tcase '{key}':",
            f"\t\t\t\tresponseData = await ({key} as any)[connectSecure.operation].execute.call(this, i);",
            '\t\t\t\tbreak;',
        ])

    content = '\n'.join(imports) + f"""

export async function router(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {{
\tconst items = this.getInputData();
\tconst operationResult: INodeExecutionData[] = [];
\tlet responseData: IDataObject | IDataObject[] = [];

\tfor (let i = 0; i < items.length; i++) {{
\t\tconst resource = this.getNodeParameter<ConnectSecure>('resource', i);
\t\tconst operation = this.getNodeParameter('operation', i);

\t\tconst connectSecure = {{
\t\t\tresource,
\t\t\toperation,
\t\t}} as ConnectSecure;

\t\ttry {{
\t\t\tswitch (connectSecure.resource) {{
{chr(10).join(switch_cases)}
\t\t\t\tdefault:
\t\t\t\t\tbreak;
\t\t\t}}

\t\t\tconst executionData = this.helpers.returnJsonArray(responseData);
\t\t\toperationResult.push(...executionData);
\t\t}} catch (err) {{
\t\t\tif (this.continueOnFail()) {{
\t\t\t\toperationResult.push({{ json: this.getInputData(i)[0].json, error: err }});
\t\t\t}} else {{
\t\t\t\tthrow toNodeApiError(this, err, {{ itemIndex: i }});
\t\t\t}}
\t\t}}
\t}}

\treturn [operationResult];
}}
"""
    write_file(ACTIONS_DIR / 'router.ts', content)


def generate_main_node(resources: list[tuple[str, dict]], groups: dict[str, dict]) -> None:
    imports = [
        "import { RESOURCE_GROUP_OPTIONS } from './resourceGroups';",
        "import { connectSecureLoadOptions } from './loadOptions';",
        "import * as customApi from './actions/customApi';",
    ]
    descriptions = ['\t\t\t...customApi.description,']

    for key, info in resources:
        imports.append(f"import * as {key} from './actions/{key}';")
        descriptions.append(f"\t\t\t...{key}.description,")

    default_group = 'company' if 'company' in groups else sorted(groups)[0]
    default_group_resources = groups[default_group]['resources']
    default_resource = default_group_resources[0]['key'] if default_group_resources else 'customApi'

    content = f"""{chr(10).join(imports)}

import {{
\tIExecuteFunctions,
\tINodeExecutionData,
\tINodeType,
\tINodeTypeDescription,
\tNodeConnectionTypes,
}} from 'n8n-workflow';

export class ConnectSecure implements INodeType {{
\tdescription: INodeTypeDescription = {{
\t\tdisplayName: 'Connect Secure',
\t\tname: 'connectSecure',
\t\ticon: 'file:connectsecure.svg',
\t\tgroup: ['transform'],
\t\tversion: 1,
\t\tsubtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
\t\tdescription: 'Get data from the Connect Secure API',
\t\tdocumentationUrl: 'https://github.com/redanthrax/connectsecure-node',
\t\tusableAsTool: true,
\t\tdefaults: {{
\t\t\tname: 'Connect Secure',
\t\t}},
\t\tinputs: [NodeConnectionTypes.Main],
\t\toutputs: [NodeConnectionTypes.Main],
\t\tcredentials: [
\t\t\t{{
\t\t\t\tname: 'connectSecureApi',
\t\t\t\trequired: true,
\t\t\t}},
\t\t],
\t\tproperties: [
\t\t\t{{
\t\t\t\tdisplayName: 'Resource Group',
\t\t\t\tname: 'resourceGroup',
\t\t\t\ttype: 'options',
\t\t\t\tnoDataExpression: true,
\t\t\t\toptions: RESOURCE_GROUP_OPTIONS,
\t\t\t\tdefault: '{default_group}',
\t\t\t\tdescription: 'The API area to operate on',
\t\t\t}},
\t\t\t{{
\t\t\t\tdisplayName: 'Resource',
\t\t\t\tname: 'resource',
\t\t\t\ttype: 'options',
\t\t\t\tnoDataExpression: true,
\t\t\t\ttypeOptions: {{
\t\t\t\t\tloadOptionsMethod: 'getResources',
\t\t\t\t\tloadOptionsDependsOn: ['resourceGroup'],
\t\t\t\t}},
\t\t\t\tdefault: '{default_resource}',
\t\t\t\tdescription: 'The resource within the selected group',
\t\t\t}},
{chr(10).join(descriptions)}
\t\t],
\t}};

\tmethods = {{
\t\tloadOptions: connectSecureLoadOptions,
\t}};

\tasync execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {{
\t\ttry {{
\t\t\tconst {{ router }} = await import('./actions/router');
\t\t\treturn await router.call(this);
\t\t}} catch (error) {{
\t\t\tif (this.continueOnFail()) {{
\t\t\t\treturn [this.helpers.returnJsonArray({{ error: (error as Error).message }})];
\t\t\t}}
\t\t\tconst {{ toNodeApiError }} = await import('./errors');
\t\t\tthrow toNodeApiError(this, error);
\t\t}}
\t}}
}}
"""
    write_file(ROOT / 'nodes' / 'ConnectSecure' / 'ConnectSecure.node.ts', content)


def main() -> None:
    with SWAGGER.open(encoding='utf-8') as handle:
        spec = yaml.safe_load(handle)

    entities = parse_entities(spec)
    resources: list[tuple[str, dict]] = []

    for entity_path, info in sorted(entities.items()):
        key = resource_key(info['category'], info['entity'])
        if key in dict(resources):
            suffix = 2
            candidate = f'{key}{suffix}'
            while candidate in dict(resources):
                suffix += 1
                candidate = f'{key}{suffix}'
            key = candidate
        resources.append((key, info))
        generate_resource(key, info)

    resources.sort(key=lambda item: (item[1]['tag'], entity_label(item[1]['entity'])))
    groups = build_groups(resources)
    generate_resource_groups(groups)
    generate_interfaces(resources, groups)
    generate_router(resources)
    generate_get_all_endpoints(resources)
    generate_main_node(resources, groups)

    print(
        f'Generated {len(resources)} resources in {len(groups) + 1} groups '
        f'(including Custom API) from {SWAGGER.name}'
    )


if __name__ == '__main__':
    main()
