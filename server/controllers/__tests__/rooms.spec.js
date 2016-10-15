/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import test from 'ava';
import request from 'supertest';
import {connectDB, dropDB, createRandomUser, sendRegisterUserRequest, sendLoginRequest} from '../../util/test-helpers';
import app from '../../server';

const user = createRandomUser();
let token;

test.before('connect', async t => {
  await connectDB(t, () => {

  });
  await sendRegisterUserRequest(user);
  const res = await sendLoginRequest(user);
  token = res.body.token;
});

test.after('disconnect and clear db', t => {
  dropDB(t);
});

test.serial('Should return empty array', async t => {
  const res = await sendGetRoomsRequest();
  t.is(res.status, 200);
  t.truthy(res.body.rooms);
  t.truthy(!res.body.rooms.length);
});

test('Should create empty room', async t => {
  await createRoomWithUser(t);
  const roomsRes = await sendGetRoomsRequest();
  checkIfThereIsRoom(t, roomsRes);
});

test('Should join room', async t => {
  const user = createRandomUser();
  await createRoomWithUser(t, user);
  const room = checkIfAnyRoomExistsAndReturnOne(t);
  joinAndCheckIfSuccessful(t, user, room);
});

test('Should leave room', async t => {
  const user = createRandomUser();
  await createRoomWithUser(t, user);
  const room = checkIfAnyRoomExistsAndReturnOne(t);
  await joinAndCheckIfSuccessful(t, user, room);
  leaveAndCheckIfSuccessful(t, user, room);
});

function sendGetRoomsRequest() {
  return request(app)
    .get('/api/rooms/get')
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`);
}

function sendCreateRoomRequest(user) {
  return request(app)
    .post('/api/rooms/new')
    .send({user})
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`);
}

function sendJoinRoomRequest(user, roomId) {
  return request(app)
    .put('/api/rooms/join')
    .send({user, roomId})
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`);
}

function sendLeaveRoomRequest(user, roomId) {
  return request(app)
    .delete('/api/rooms/leave')
    .send({user, roomId})
    .set('Accept', 'application/json')
    .set('Authorization', `Bearer ${token}`);
}

function createRoomWithUser(t, user = null) {
  const userToSend = user || createRandomUser();
  sendCreateRoomRequest(userToSend)
    .then(res => {
      t.is(res.status, 200);
    });
}

function checkIfThereIsRoom(t, response) {
  t.truthy(response.body.rooms);
  t.truthy(response.body.rooms.length);
}

function checkIfAnyRoomExistsAndReturnOne(t) {
  return sendGetRoomsRequest()
    .then(response => {
      t.is(response.status, 200);
      const rooms = response.body.rooms && response.body.rooms;
      t.truthy(rooms);
      return rooms[0];
    });
}

function joinAndCheckIfSuccessful(t, user, room) {
  sendJoinRoomRequest(user, room.id)
    .then(res => {
      t.is(res.status, 200);
      t.true(res.body.success);
    });
}

function leaveAndCheckIfSuccessful(t, room, user) {
  const roomId = room.id;
  sendLeaveRoomRequest(user, roomId)
    .then(res => {
      t.is(res.status, 200);
    });
}
