import { combineReducers } from 'redux';
import * as types from './types';
import { createReducer } from 'state/utils';

/* State shape
{
  isAuthenticated: bool,
  redirectAfterLogin: string
}
*/

const authReducer = createReducer(false)({
  [types.SIGNUP]: () => true,
  [types.LOGIN]: () => true,
  [types.LOGOUT]: () => false,
});

const redirectAfterLoginReducer = createReducer(null)({
  [types.SET_REDIRECT_AFTER_LOGIN]: (state, action) => action.payload.redirectUrl,
});

export default combineReducers({
  isAuthenticated: authReducer,
  redirectAfterLogin: redirectAfterLoginReducer,
});
