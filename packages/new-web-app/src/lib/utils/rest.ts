import ServerError from './server-error';

function reduceQueryParams(acc: any, [key, value]: [string, string]) {
    if (value === null) return acc;
    if (typeof acc === 'string' && acc.length === 0) return `${key}=${value}`;
    return `${acc}&${key}=${value}`;
}

export interface RequestOptions {
    baseUrl?: string;
    body?: BodyInit | null;
    endpoint?: string;
    method?: string;
    headers?: HeadersInit;
    params?: any[];
}

async function request({
    baseUrl = import.meta.env.VITE_API_BASE_URL || '',
    body, // empty body is ignored by fetch
    endpoint = '',
    method = 'GET',
    headers: additionalHeaders,
    params,
}: RequestOptions = {}): Promise<any> {
    let query;

    if (params) {
        query = Object.entries(params).reduce(reduceQueryParams, '');
    }

    const fullUrl = query ? `${baseUrl}${endpoint}?${query}` : `${baseUrl}${endpoint}`;
    const headers: HeadersInit = {
        ...additionalHeaders,
    };

    try {
        const fetchInit: globalThis.RequestInit = {
            method,
            headers,
        };

        if (body) {
            fetchInit.body = body;
        }

        const response = await fetch(fullUrl, fetchInit);

        const responseBody = await response.json();

        if (!response.ok) {
            throw new (ServerError as any)(responseBody);
        }

        return responseBody;
    } catch (error) {
        throw new (ServerError as any)({ error });
        return [];
    }
}

export default request;
