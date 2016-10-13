/**
 * Created by Bartlomiej Rutkowski on 19.09.16.
 */
import REDUX_CONST from '../../../CONSTANTS/Redux/User';

const UserReducer = (state = {}, action) => {
  switch(action.type) {
    case `${REDUX_CONST.AUTHENTICATE_USER}_PENDING`:
      return {
        ...state
      };
    case `${REDUX_CONST.AUTHENTICATE_USER}_FULFILLED`:
      return {
        ...state
      };
    case `${REDUX_CONST.AUTHENTICATE_USER}_REJECTED`:
      return {
        ...state
      };
    case REDUX_CONST.LOGIN:
      return {
        ...state,
        ...action.user,
        isAuthenticated: true
      };
    default:
      return {
        ...state
      };
  }
};

export default UserReducer;
