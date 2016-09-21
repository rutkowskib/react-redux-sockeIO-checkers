/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import CONST from '../../CONSTANTS/CONSTANTS';

const rooms = (function () {
  let rooms = [];

  const createRoom = newUser => {
    const idLength = 10;
    const id = Math.random().toString(36).slice(idLength);
    const user = {
      ...newUser,
      status: CONST.SPECTATOR
    };
    const room = {
      id,
      users: [user],
      gameInProgress: false
    };
    rooms.push(room);
  };

  const joinRoom = (user, roomId) => {
    rooms = rooms.map(room => {
      if(room.id !== roomId) {
        return room;
      } else {
        room.users.push(user);
        return room;
      }
    });
  };

  const leaveRoom = (userToLeave, roomId) => {
    rooms = rooms.map(room => {
      if(room.id !== roomId) {
        return room;
      } else {
        return room.users.filter(user => {
          return user.username === userToLeave.username;
        });
      }
    });
  };

  const getRooms = () => rooms;

  return {
    createRoom,
    joinRoom,
    leaveRoom,
    getRooms
  };
}());

export default rooms;
