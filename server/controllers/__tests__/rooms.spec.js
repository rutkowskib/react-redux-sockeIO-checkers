/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import test from 'ava';
import request from 'supertest';
import app from '../../server';

/*
const userCredentials = [{
  username: 'username1',
  password: 'password1'
}, {
  username: 'username2',
  password: 'password2'
}];

const users = [
  new User(userCredentials[0]),
  new User(userCredentials[1])
]; */

test('Should return empty array', async t => {
  const res = await request(app)
    .get('/api/rooms/get')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.true(res.body.rooms);
  t.true(!res.body.rooms.length);
});
