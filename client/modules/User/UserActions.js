/**
 * Created by Bartlomiej Rutkowski on 18.09.16.
 */
import CONST from '../../../CONSTANTS/Redux/User';
import API_POST from '../../../CONSTANTS/API/POST';
import {callApiPost} from '../../util/apiCaller';

export function registerUser(user) {
  return {
    type: CONST.REGISTER_USER,
    payload: callApiPost(API_POST.REGISTER_USER, {user})
  };
}
