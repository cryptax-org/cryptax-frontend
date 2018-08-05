import {
  signUp,
  storeToken,
  login,
  logout,
  initializeSession,
  setRedirectAfterLogin
} from './actions';

const loginAndStoreToken = (userData) => (dispatch) => {
  dispatch(login({
    email: userData.email,
    password: userData.password
  })).then((response) => {
    dispatch(storeToken(response.data.token));
  })
}

export default {
  signUp,
  loginAndStoreToken,
  logout,
  initializeSession,
  setRedirectAfterLogin,
};
