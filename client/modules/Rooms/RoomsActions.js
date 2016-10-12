/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import REDUX_CONST from '../../../CONSTANTS/Redux/Rooms';

export function getRooms() {
  return dispatch => {
    dispatch({
      type: `${REDUX_CONST.GET_ROOMS}_PENDING`
    });
  };
}
