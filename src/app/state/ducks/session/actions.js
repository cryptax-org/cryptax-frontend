import * as types from './types';

export const signUp = (userData) => ({
  type: types.SIGNUP,
  meta: {
    async: true,
    blocking: true,
    url: `/users`,
    method: 'POST',
    body: userData
  }
});

export const login = (userLoginData) => ({
  type: types.LOGIN,
  meta: {
    async: true,
    blocking: true,
    url: '/token',
    method: 'POST',
    body: userLoginData
  }
});

export const storeToken = (jwt) => ({
  type: types.STORE_TOKEN,
  payload: {
    jwt
  }
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const initializeSession = () => ({
  type: types.INITIALIZE,
});

export const setRedirectAfterLogin = () => ({
  type: types.SET_REDIRECT_AFTER_LOGIN,
});
