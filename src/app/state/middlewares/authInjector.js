const authInjector = ({ getState }) => (next) => (action) => {
  if (!action.meta || !action.meta.authRequired) {
    return next(action);
  }

  const currentState = getState();
  if (!currentState.session.jwt) {
    return next(action);
  }

  const { type, payload, meta } = action;
  return next({
    type,
    payload,
    meta: {...action.meta, jwt: currentState.session.jwt.token},
  });
};

export default authInjector;
