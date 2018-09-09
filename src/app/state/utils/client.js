import axios from 'axios';

import resolveApiUrl from 'state/config/resolveApiUrl';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const service = axios.create({
  baseURL: resolveApiUrl(),
  headers,
});

// axios.all not currently included in axios instance methods
service.all = requestArray => axios.all(requestArray);

export default (url, method, body, params, headers) => {
  const config = {
    url, //TODO: add body in URL for get?
    method,
    data: method !== "GET" ? JSON.stringify(body) : null, //necessary to stringify?
    params,
    headers,
  };

  return service.request(config);
};
