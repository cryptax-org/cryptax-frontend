import {
  logout,
  refresh,
} from './actions';

let failedActions = [];
let isRefreshing = false;
let didRefresh = false;

const withAuthentication = (action) => (...actionArguments) => (dispatch, getState) => {
  const authAction = action(...actionArguments);

  const { session } = getState();

  authAction.meta.token = session.jwt.token;
  if (isRefreshing) {
    failedActions.push(authAction);
  } else {
    return dispatch(authAction).catch(err => {
      if (err.response.status === 401) {
        if (didRefresh) {
          authAction.meta.token = session.data.token;
          return dispatch(authAction);
        } else if (isRefreshing) {
          const deferred = createDeferred();

          failedActions.push({authAction, deferred});

          return deferred.promise;
        } else {
          const deferred = createDeferred();

          failedActions.push({authAction, deferred});

          isRefreshing = true;
          didRefresh = false;
          dispatch(refresh(session.jwt.refreshToken)).then(response => {
            isRefreshing = false;
            didRefresh = true;
            failedActions.map(action => {
              action.authAction.meta.token = response.data.token;
              action.deferred.resolve(dispatch(action.authAction));
            })

            failedActions = [];
          }).catch(err => {
            isRefreshing = false;
            didRefresh = true;
            failedActions.map(action => {
              action.deferred.reject(err);
            })

            dispatch(logout());
          });

          return deferred.promise
        }
      }
    });
  }
}

const createDeferred = () => {
  const deferred = {
    promise: null,
    resolve: null,
    reject: null,
  };

  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred;
}

export {
  withAuthentication
};

// TODO: Need to add a redirect to the current page if that fails?
