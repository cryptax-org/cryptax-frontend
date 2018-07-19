export default (initialState) => (actionHandlersMap) => (state = initialState, action) => {
  const actionHandler = actionHandlersMap[ action.type ];
  return actionHandler ? actionHandler( state, action ) : state;
};
