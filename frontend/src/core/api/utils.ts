import { Sha256 } from '@aws-crypto/sha256-browser';
import { getEcmaEnvironmentVariable } from '@shared/utils/get-ecma-environment-variable';
import { HttpRequest } from '@smithy/protocol-http';
import { SignatureV4 } from '@smithy/signature-v4';
import { HttpMessage, QueryParameterBag, URI } from '@smithy/types';

export type HttpsRequestOptions<TBody = unknown> = Omit<
    Partial<HttpMessage> & Partial<URI>,
    'body'
> & {
    method: string;
    body?: TBody;
};

export type SignedFetchOptions<TBody = unknown> = {
    /** Body */
    body?: HttpsRequestOptions<TBody>['body'];
    /** Headers */
    headers?: HttpsRequestOptions<TBody>['headers'];
    /**
     * HTTP method
     *
     * @default GET
     */
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH';
    /**
     * Query params.
     *
     * Do NOT use `encodeURIComponent`
     */
    query?: HttpsRequestOptions<TBody>['query'];
};

/**
 * Makes a signed fetch request to the specified URL with the given options.
 *
 * @template TResponse The type of the response expected.
 * @template TBody The type of the body.
 * @param url The base URL without query parameters (e.g., `new URL('https://some-domain.com/api')`).
 * @param {SignedFechOptions} options The options for the fetch request.
 * @returns {Promise<T>} A promise that resolved to the response of type `T`.
 *
 * @example
 * ```javascript
 * const url = new URL('https://some-domain.com/api');
 * const response = await signedFetch<Response>(url, {
 *   query: {
 *     param: paramValue
 *   }
 * })
 * ```
 */
export async function signedFetch<TResponse = unknown, TBody = unknown>(
    url: URL,
    options?: SignedFetchOptions<TBody>,
): Promise<TResponse> {
    const region = getEcmaEnvironmentVariable('VITE_REGION');

    const signer = new SignatureV4({
        credentials: {
            accessKeyId: getEcmaEnvironmentVariable('VITE_AWS_ACCESS_KEY_ID'),
            secretAccessKey: getEcmaEnvironmentVariable('VITE_AWS_SECRET_ACCESS_KEY'),
            sessionToken: getEcmaEnvironmentVariable('VITE_AWS_SESSION_TOKEN'),
        },
        region,
        service: 'execute-api',
        sha256: Sha256,
    });

    console.log('signer')

    const requestOptions: HttpsRequestOptions<TBody> = {
        body: options?.body,
        headers: {
            ...options?.headers,
            host: url.hostname,
        },
        hostname: url.hostname,
        method: options?.method ?? 'GET',
        path: url.pathname,
        protocol: url.protocol,
        query: options?.query,
    };

    
    const request = new HttpRequest(requestOptions);
    const signedRequest = await signer.sign(request);

    const query = buildQueryString(requestOptions.query);
    const fetchUrl = `${signedRequest.protocol}//${signedRequest.hostname}${signedRequest.path}${query}`;

    const response = await fetch(fetchUrl, signedRequest);

    if (!response.ok) {
        throw new Error('signedFetch failed in the request');
    }

    const result = (await response.json()) as TResponse;
    return result;
}

function buildQueryString(query?: QueryParameterBag): string {
    if (!query) {
        return '';
    }

    const params = Object.entries(query)
        .filter(([, value]) => Boolean(value))
        .map(
            ([name, value]) =>
                `${name}=${typeof value === 'string' ? encodeURIComponent(value) : encodeURIComponent(JSON.stringify(value))}`,
        )
        .join('&');

    return `?${params}`;
}
