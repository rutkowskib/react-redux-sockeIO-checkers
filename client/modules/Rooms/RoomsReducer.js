/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import REDUX_CONST from '../../../CONSTANTS/Redux/Rooms';

export default function RoomsReducer(state = {rooms: []}, action) {
  switch (action.type) {
    case REDUX_CONST.ADD_ROOM:
      return {

      };
    case REDUX_CONST.DELETE_ROOM:
      return {

      };
    default:
      return state;
  }
}
