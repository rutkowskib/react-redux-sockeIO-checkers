/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import REDUX_CONST from '../../../CONSTANTS/Redux/Rooms';

export default function RoomsReducer(state = {rooms: []}, action) {
  switch (action.type) {
    case REDUX_CONST.ADD_ROOM:
      return {
        ...state
      };
    case REDUX_CONST.DELETE_ROOM:
      return {
        ...state
      };
    case `${REDUX_CONST.GET_ROOMS}_PENDING`:
      return {
        ...state,
        gettingRooms: true
      };
    case `${REDUX_CONST.GET_ROOMS}_FULFILLED`:
      return {
        ...state,
        rooms: action.rooms,
        gettingRooms: false
      };
    default:
      return state;
  }
}
