import { push } from 'react-router-redux';

import {
  signUp,
  storeToken,
  login,
  getUser,
  authorizeUser,
  resetAuthorize,
  logout,
  initializeSession,
  setRedirectAfterLogin
} from './actions';
import { withAuthentication } from 'state/ducks/session'

const loginAndStoreTokenAndGetUser = (userData) => (dispatch) => {
  return dispatch(login({
    email: userData.email,
    password: userData.password
  })).then(response => dispatch(withAuthentication(getUser)(response.data.id)))
}

const authorizeUserAndRedirect = () => (dispatch) => {
  return dispatch(authorizeUser()).then(response => {
    setTimeout(() => {
      dispatch(push('/login'));
      dispatch(resetAuthorize());
    }, 3000)
  });
}

export default {
  signUp,
  loginAndStoreTokenAndGetUser,
  authorizeUserAndRedirect,
  logout,
  initializeSession,
  setRedirectAfterLogin,
};
