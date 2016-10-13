/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import CONST from '../../../CONSTANTS/CONSTANTS';
import REDUX_CONST from '../../../CONSTANTS/Redux/User';
import API_POST from '../../../CONSTANTS/API/POST';
import {callApiPost} from '../../util/apiCaller';
import {setAuthenticationToken, moveToLoggedInSection} from '../../util/auth';

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
    const token = response.data.token;
    localStorage.setItem(CONST.JWT_TOKEN, token);
    setAuthenticationToken(token);
    dispatch(login());
  };
}

function afterFailedAuthenticationRequest(response) {
  return response;
}

function login() {
  moveToLoggedInSection();
  return {
    type: REDUX_CONST.LOGIN
  };
}
