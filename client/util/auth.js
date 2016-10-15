/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import axios from 'axios';
import {browserHistory} from 'react-router';

export function setAuthenticationToken(token) {
  if(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

export function moveToLoggedInSection() {
  browserHistory.push('rooms/');
}

export function moveToMainPage() {
  browserHistory.push('/');
}

export function deleteToken() {
  localStorage.clear();
  setAuthenticationToken();
}
