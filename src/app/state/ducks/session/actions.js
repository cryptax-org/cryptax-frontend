import * as types from './types';

export const signUp = (userData) => ({
  type: types.SIGNUP,
  meta: {
    async: true,
    blocking: true,
    url: `/users`,
    method: 'POST',
    body: userData,
  }
});

export const login = (userLoginData) => ({
  type: types.LOGIN,
  meta: {
    async: true,
    blocking: true,
    url: `/token`,
    method: 'POST',
    body: userLoginData,
  }
});

export const refresh = (refreshToken) => ({
  type: types.REFRESH,
  meta: {
    async: true,
    blocking: true,
    url: `/refresh`,
    method: 'GET',
    refreshToken,
  }
});

export const getUser = (userId) => ({
  type: types.GET_USER,
  meta: {
    async: true,
    blocking: true,
    url: `/users/${userId}`,
    method: 'GET',
  }
});

export const logout = () => ({
  type: types.LOGOUT,
});

export const initializeSession = () => ({
  type: types.INITIALIZE,
});

export const setRedirectAfterLogin = (redirectUrl) => ({
  type: types.SET_REDIRECT_AFTER_LOGIN,
  payload: {
    redirectUrl,
  }
});
