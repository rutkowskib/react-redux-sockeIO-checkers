/**
 * Created by Bartlomiej Rutkowski on 16.10.16.
 */
import io from 'socket.io-client';
import {SOCKET_IO_URL, CLIENT_EMITTED} from '../../CONSTANTS/SocketIO';

const socketIO = (function () {
  let socket = null;

  const connect = (user) => {
    socket = io.connect(SOCKET_IO_URL, user);
  };

  const disconnect = () => {
    socket.emit(CLIENT_EMITTED.DISCONNECT);
    socket = null;
  };

  return {
    connect,
    disconnect
  };
}());

export default socketIO;
