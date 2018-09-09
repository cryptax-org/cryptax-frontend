import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  isSignedUp: bool,
  isAuthenticated: bool,
  isAuthorized: bool,
  jwt: {
    id: string,
    token: string,
    refreshToken: string,
  },
  user: {
    id: string,
    email: string,
    lastName: string,
    firstName: string,
  }
  redirectAfterLogin: string,
}
*/

const signUpReducer = createReducer(false)({
  [types.SIGNUP]: () => false,
  [types.SIGNUP_COMPLETED]: () => true,
  [types.SIGNUP_FAILED]: () => false,
  [types.LOGOUT]: () => false,
});

const isAuthenticatedReducer = createReducer(false)({
  [types.SIGNUP]: () => false,
  [types.SIGNUP_COMPLETED]: () => false,
  [types.SIGNUP_FAILED]: () => false,
  [types.LOGIN]: () => false,
  [types.LOGIN_COMPLETED]: () => true,
  [types.LOGIN_FAILED]: () => false,
  [types.LOGOUT]: () => false,
});

const isAuthorizedReducer = createReducer(null)({
  [types.AUTHORIZE_USER]: () => null,
  [types.AUTHORIZE_USER_COMPLETED]: () => true,
  [types.AUTHORIZE_USER_FAILED]: () => false,
  [types.RESET_AUTHORIZE]: () => null,
  [types.LOGOUT]: () => null,
})

const jwtReducer = createReducer(null)({
  [types.LOGIN_COMPLETED]: (state, action) => action.payload.data,
  [types.REFRESH_COMPLETED]: (state, action) => action.payload.data,
  'session/STORE_TOKEN': (state, action) => action.payload.jwt,
  [types.LOGOUT]: () => null,
})

const userReducer = createReducer({})({
  [types.SIGNUP_COMPLETED]: (state, action) => action.payload.data,
  [types.LOGIN_COMPLETED]: (state, action) => {return { ...state, id: action.payload.data.id }},
  [types.GET_USER_COMPLETED]: (state, action) => action.payload.data,
  [types.GET_USER_FAILED]: () => null,
  [types.LOGOUT]: () => null,
})

const redirectAfterLoginReducer = createReducer('/')({
  [types.SET_REDIRECT_AFTER_LOGIN]: (state, action) => action.payload.redirectUrl,
  [types.LOGOUT]: () => '/',
});

export default combineReducers({
  isSignedUp: signUpReducer,
  isAuthenticated: isAuthenticatedReducer,
  isAuthorized: isAuthorizedReducer,
  jwt: jwtReducer,
  user: userReducer,
  redirectAfterLogin: redirectAfterLoginReducer,
});
