/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import CONST from '../../../CONSTANTS/CONSTANTS';
import REDUX_CONST from '../../../CONSTANTS/Redux/User';
import API_POST from '../../../CONSTANTS/API/POST';
import {callApiPost} from '../../util/apiCaller';
import {setAuthenticationToken, moveToLoggedInSection, moveToMainPage, deleteToken} from '../../util/auth';
import SocketIO from '../../util/SocketIO';

export function registerUser(user) {
  return {
    type: REDUX_CONST.REGISTER_USER,
    payload: callApiPost(API_POST.REGISTER_USER, {user})
  };
}

export function authenticateUser(user) {
  return dispatch => dispatch({
    type: REDUX_CONST.AUTHENTICATE_USER,
    payload: callApiPost(API_POST.AUTHENTICATE_USER, {user})
      .then(response => {
        dispatch(afterSuccessfulAuthenticationRequest(response));
      })
      .catch(response => {
        afterFailedAuthenticationRequest(response);
      })
  });
}

function afterSuccessfulAuthenticationRequest(response) {
  return dispatch => {
    const data = response.data;
    const token = data.token;
    const user = data.user;
    localStorage.setItem(CONST.JWT_TOKEN, token);
    setAuthenticationToken(token);
    dispatch(login(user));
    dispatch(connectToSocket(user));
  };
}

function afterFailedAuthenticationRequest(response) {
  return response;
}

export function authenticateWithToken() {
  const token = localStorage.getItem(CONST.JWT_TOKEN);
  return dispatch => dispatch({
    type: REDUX_CONST.AUTHENTICATE_WITH_TOKEN,
    payload: callApiPost(API_POST.AUTHENTICATE_WITH_TOKEN, {token})
      .then(response => {
        dispatch(afterSuccessfulAuthenticationRequest(response));
      })
      .catch(() => {
        dispatch(logout);
      })
  });
}

function login(user) {
  moveToLoggedInSection();
  return {
    type: REDUX_CONST.LOGIN,
    user
  };
}

function logout() {
  moveToMainPage();
  deleteToken();
  return {
    type: REDUX_CONST.LOGOUT
  };
}

function connectToSocket(user) {
  return dispatch => {
    dispatch({
      type: `${REDUX_CONST.CONNECT_TO_SOCKET}_PENDING`
    });
    SocketIO.connect(user);
  };
}
