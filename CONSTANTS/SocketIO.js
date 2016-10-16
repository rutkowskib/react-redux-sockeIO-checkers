/**
 * Created by Bartlomiej Rutkowski on 16.10.16.
 */
const CLIENT_EMITTED = {
  CONNECT: 'connection',
  DISCONNECT: 'DISCONNECT'
};

const SERVER_EMITTED = {

};

const SOCKET_IO_URL = 'http://localhost:4040';

module.exports = {
  CLIENT_EMITTED,
  SERVER_EMITTED,
  SOCKET_IO_URL
};
