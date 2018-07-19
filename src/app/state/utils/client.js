import axios from 'axios';

import resolveApiUrl from 'state/config/resolveApiUrl';
import resolveApiKey from 'state/config/resolveApiKey';

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'x-api-key': resolveApiKey(resolveApiUrl())
};

const service = axios.create({
  baseURL: resolveApiUrl(),
  headers,
});

// axios.all not currently included axios instance methods
service.all = requestArray => axios.all(requestArray);

export default (url, method, body) => {
  const config = {
    url, //TODO: add body in URL for get?
    method,
    data: method !== "GET" ? JSON.stringify(body) : null, //necessary to stringify?
  };

  return service.request(config);
};
