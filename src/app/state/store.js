import { applyMiddleware, compose, createStore } from 'redux'
import { combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

import { apiService } from "./middlewares";
import * as reducers from './ducks';

export const history = createBrowserHistory()

const middlewares = [
  apiService,
  thunk,
  routerMiddleware(history)
];

const initialState = {};

const appReducers = combineReducers(reducers);

const rootReducer = (state, action) => appReducers(state, action);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session']
}

const persistedRootReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  connectRouter(history)(persistedRootReducer),
  initialState,
  composeEnhancers(
    applyMiddleware(...middlewares),
  ),
)

export const persistor = persistStore(store);

if (module.hot) {
  module.hot.accept('./ducks', () => persistor.replaceReducer(persistedRootReducer));
}

export default store;
