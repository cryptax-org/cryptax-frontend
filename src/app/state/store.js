import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';

import * as reducers from './ducks';

export const history = createBrowserHistory()

const middlewares = [
  thunk,
  routerMiddleware(history)
];

const initialState = {};

const appReducers = combineReducers(reducers);

const rootReducer = (state, action) => appReducers(state, action);

const store = createStore(
  connectRouter(history)(rootReducer),
  initialState,
  compose(
    applyMiddleware(...middlewares),
  ),
)

if (module.hot) {
  module.hot.accept('./ducks', () => store.replaceReducer(rootReducer));
}

export default store;
