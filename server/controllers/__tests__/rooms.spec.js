/**
 * Created by Bartlomiej Rutkowski on 21.09.16.
 */
import test from 'ava';
import request from 'supertest';
import {connectDB, dropDB} from '../../util/test-helpers';
import app from '../../server';

test.before('connect and try to add user', t => {
  connectDB(t, () => {

  });
});

test.after('disconnect and clear db', t => {
  dropDB(t);
});

test('Should return empty array', async t => {
  const res = await request(app)
    .get('/api/rooms/get')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.truthy(res.body.rooms);
  t.truthy(!res.body.rooms.length);
  t.pass();
});
