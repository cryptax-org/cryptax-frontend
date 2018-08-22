import {
  signUp,
  storeToken,
  login,
  getUser,
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

export default {
  signUp,
  loginAndStoreTokenAndGetUser,
  logout,
  initializeSession,
  setRedirectAfterLogin,
};
