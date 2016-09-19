/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import axios from 'axios';

export function setAuthenticationToken(token) {
  if(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
