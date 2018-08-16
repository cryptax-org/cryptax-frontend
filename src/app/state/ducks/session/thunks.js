import {
  signUp,
  storeToken,
  login,
  getUser,
  logout,
  initializeSession,
  setRedirectAfterLogin
} from './actions';

const loginAndStoreTokenAndGetUser = (userData) => (dispatch) => {
  dispatch(login({
    email: userData.email,
    password: userData.password
  })).then((response) => {
    dispatch(storeToken(response.data.token));

    dispatch(getUser(
      response.data.id,
      response.data.token
    ))
  })
}

export default {
  signUp,
  loginAndStoreTokenAndGetUser,
  logout,
  initializeSession,
  setRedirectAfterLogin,
};
