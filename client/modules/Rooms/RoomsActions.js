/**
 * Created by Bartlomiej Rutkowski on 12.10.16.
 */
import REDUX_CONST from '../../../CONSTANTS/Redux/Rooms';
import API_POST from '../../../CONSTANTS/API/POST';
import roomMocks from '../../mocks/roomMocks';
import {callApiPost} from '../../util/apiCaller';

export function getRooms() {
  return dispatch => {
    dispatch({
      type: `${REDUX_CONST.GET_ROOMS}_PENDING`
    });
    dispatch({
      type: `${REDUX_CONST.GET_ROOMS}_FULFILLED`,
      rooms: roomMocks.rooms
    });
  };
}

export function createRoom() {
  return (dispatch, getState) => {
    dispatch({
      type: `${REDUX_CONST.CREATE_ROOM}_PENDING`
    });
    const user = getState().user;
    callApiPost(API_POST.CREATE_ROOM, {user})
      .then(response => {
        dispatch({
          type: `${REDUX_CONST.CREATE_ROOM}_FULFILLED`
        });
        const room = response.data.room;
        dispatch(addRoom(room));
      })
      .catch(() => {
        dispatch({
          type: `${REDUX_CONST.CREATE_ROOM}_REJECTED`
        });
      });
  };
}

function addRoom(room) {
  return {
    type: REDUX_CONST.ADD_ROOM,
    room
  };
}
