import fetch from 'isomorphic-unfetch';

function fetcher(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  })
    .then(response => (response.status === 204 ? null : response.json()))
    .then(data => {
      if (data?.error) throw new Error(data.error);
      return data;
    });
}

export default fetcher;
