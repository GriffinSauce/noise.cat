import fetch from 'isomorphic-unfetch';

type Options = {
  method?:
    | 'GET'
    | 'POST'
    | 'DELETE'
    | 'PATCH'
    | 'PUT'
    | 'HEAD'
    | 'OPTIONS'
    | 'CONNECT';
  headers?: object;
  body?: object;
};

function fetcher<T>(url: string, options: Options = {}): Promise<T> {
  const { headers, body, ...otherOptions } = options;
  return fetch(url, {
    ...otherOptions,
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
    .then((response) => (response.status === 204 ? null : response.json()))
    .then((data) => {
      if (data?.error) throw new Error(data.error);
      return data as T;
    });
}

export default fetcher;
