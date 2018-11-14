import { client } from "state/utils";

// const baseUrl = typeof document === "undefined" ? "http://localhost:7777/api" : "/api";

const apiService = () => (next) => (action) => {
  if (!action.meta || !action.meta.async) {
    return next(action); // Double check that it doesn't need to be extracted to a const
  }

  const {
    body,
    headers = null,
    isForm,
    method = 'GET',
    params,
    refreshToken,
    token,
    url,
  } = action.meta;

  if (!url) {
    throw new Error(`'url' not specified for async action ${action.type}`);
  }

  const requestHeaders = token || refreshToken ? { Authorization: `Bearer ${token || refreshToken}`, ...headers } : headers;

  return client(url, method, body, params, requestHeaders, isForm).then(
    res => handleResponse(res, action, next),
    err => handleErrors(err, action, next),
  );
};

export default apiService;

function handleErrors(err, action, next) {
  if (err.response.status !== 401) {
    next({
      type: `${action.type}_FAILED`,
      payload: err,
      meta: action.meta,
    });
  }

  return Promise.reject(err);
}

function handleResponse(res, action, next) {
  next({
    type: `${action.type}_COMPLETED`,
    payload: res,
    meta: action.meta,
  });

  return res;
}
