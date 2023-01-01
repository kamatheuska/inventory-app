import ServerError from './server-error';

function reduceQueryParams(acc: any, [key, value]: [string, string]) {
    if (value === null) return acc;
    if (typeof acc === 'string' && acc.length === 0) return `${key}=${value}`;
    return `${acc}&${key}=${value}`;
}

interface RequestOptions {
    baseUrl?: string;
    body?: BodyInit | null;
    endpoint?: string;
    method?: string;
    headers?: HeadersInit;
    params?: any[];
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request({
    baseUrl = BASE_URL,
    body, // empty body is ignored by fetch
    endpoint = '',
    method = 'GET',
    headers,
    params,
}: RequestOptions = {}): Promise<any> {
    let query;

    if (params) {
        query = Object.entries(params).reduce(reduceQueryParams, '');
    }

    const fullUrl = query ? `${baseUrl}${endpoint}?${query}` : `${baseUrl}${endpoint}`;
    const response = await fetch(fullUrl, {
        method,
        headers,
        body,
    });

    try {
        const responseBody = await response.json();

        if (!response.ok) {
            throw new (ServerError as any)(responseBody);
        }

        return responseBody;
    } catch (error) {
        if (!response.ok) {
            throw new (ServerError as any)();
        }

        return [];
    }
}

export default request;
