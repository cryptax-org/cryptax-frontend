import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  isSignedUp: bool,
  isAuthenticated: bool,
  jwt: string,
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

const authReducer = createReducer(false)({
  [types.SIGNUP]: () => false,
  [types.SIGNUP_COMPLETED]: () => false,
  [types.SIGNUP_FAILED]: () => false,
  [types.LOGIN]: () => false,
  [types.LOGIN_COMPLETED]: () => true,
  [types.LOGIN_FAILED]: () => false,
  [types.LOGOUT]: () => false,
});

const jwtReducer = createReducer(null)({
  [types.STORE_TOKEN]: (state, action) => action.payload.jwt,
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
  isAuthenticated: authReducer,
  jwt: jwtReducer,
  user: userReducer,
  redirectAfterLogin: redirectAfterLoginReducer,
});
