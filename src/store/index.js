import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';

import rootReducer from 'root-reducer';

export const history = createBrowserHistory()

const middlewares = [
  thunk,
  routerMiddleware(history)
];

const initialState = {};

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(...middlewares),
  ),
)

if (module.hot) {
  module.hot.accept('../root-reducer', () => store.replaceReducer(rootReducer));
}

export default store;
