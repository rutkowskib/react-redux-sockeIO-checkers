/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import test from 'ava';
import request from 'supertest';
import {connectDB, dropDB, createRandomUser} from '../../util/test-helpers';
import app from '../../server';

test.before('connect', t => {
  connectDB(t, () => {

  });
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
  const user = createRandomUser();
  await sendCreateRoomRequest(user);
  const roomsRes = await sendGetRoomsRequest();

  t.truthy(roomsRes.body.rooms);
  t.truthy(roomsRes.body.rooms.length);
});

test('Should join room', async t => {
  const user = createRandomUser();
  await sendCreateRoomRequest(user);
  const getRoomsRes = await sendGetRoomsRequest();
  const rooms = getRoomsRes.body.rooms && getRoomsRes.body.rooms;
  t.truthy(rooms);
  const room = rooms[0];
  const res = await sendJoinRoomRequest(user, room.id);

  t.is(res.status, 200);
});

test('Should leave room', async t => {
  const user = createRandomUser();
  await sendCreateRoomRequest(user);
  const getRoomsRes = await sendGetRoomsRequest();
  const rooms = getRoomsRes.body.rooms && getRoomsRes.body.rooms;
  const room = rooms[0];
  const roomId = room.id;
  const joinRes = await sendJoinRoomRequest(user, roomId);
  t.is(joinRes.status, 200);
  t.true(joinRes.body.success);

  const res = await sendLeaveRoomRequest(user, roomId);
  t.is(res.status, 200);
});

function sendGetRoomsRequest() {
  return request(app)
    .get('/api/rooms/get')
    .set('Accept', 'application/json');
}

function sendCreateRoomRequest(user) {
  return request(app)
    .post('/api/rooms/new')
    .send({user})
    .set('Accept', 'application/json');
}

function sendJoinRoomRequest(user, roomId) {
  return request(app)
    .put('/api/rooms/join')
    .send({user, roomId})
    .set('Accept', 'application/json');
}

function sendLeaveRoomRequest(user, roomId) {
  return request(app)
    .delete('/api/rooms/leave')
    .send({user, roomId})
    .set('Accept', 'application/json');
}
