import ServerError from "./server-error";


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

async function request<T>({
  baseUrl = '',
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

  const responseBody = await response.json();

  if (!response.ok) {
    throw new (ServerError as any)(responseBody);
  }

  return responseBody;
};

export default request;
