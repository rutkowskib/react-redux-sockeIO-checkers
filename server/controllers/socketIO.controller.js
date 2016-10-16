/**
 * Created by Bartlomiej Rutkowski on 16.10.16.
 */
import socketIO from 'socket.io';
import http from 'http';
import {CLIENT_EMITTED} from '../../CONSTANTS/SocketIO';

let io = null;

function createSocket() {
  const server = http.createServer().listen(4040);
  io = socketIO(server);
  setListeners();
}

function setListeners() {
  io.on(CLIENT_EMITTED.CONNECT, connectUser);
}

function connectUser() {
  // sconsole.log(data);
}

module.exports = {
  createSocket
};
