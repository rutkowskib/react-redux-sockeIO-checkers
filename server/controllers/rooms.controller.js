/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import rooms from '../models/rooms';
import ERRORS from '../../CONSTANTS/ERRORS';

export function createRoom(req, res) {
  const user = req.body && req.body.user;
  if(!user) {
    res.status(400).send({success: false, errorType: ERRORS.MISSING_FIELDS});
  }
  const room = rooms.createRoom(user);
  res.status(200).send({success: true, room});
}

export function joinRoom(req, res) {
  const {roomId, user} = req.body;
  if(!roomId || !user) {
    res.status(400).send({success: false, errorType: ERRORS.MISSING_FIELDS});
  }
  rooms.joinRoom(user, roomId);
  res.status(200).send({success: true});
}

export function leaveRoom(req, res) {
  const {roomId, user} = req.body;
  if(!roomId || !user) {
    res.status(400).send({success: false, errorType: ERRORS.MISSING_FIELDS});
  }
  const success = rooms.leaveRoom(user, roomId);
  res.status(200).send({success});
}
export function getRooms(req, res) {
  const roomsArray = rooms.getRooms();
  res.status(200).send({success: true, rooms: roomsArray});
}
