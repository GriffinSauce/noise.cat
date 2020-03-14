import fetch from 'isomorphic-unfetch';

function fetcher(...args) {
  return fetch(...args)
    .then(response => (response.status === 204 ? null : response.json()))
    .then(data => {
      if (data?.error) throw new Error(data.error);
      return data;
    });
}

export default fetcher;
