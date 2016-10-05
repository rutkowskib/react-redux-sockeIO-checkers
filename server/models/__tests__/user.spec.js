/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import test from 'ava';
import request from 'supertest';
import User from '../user';
import {connectDB, dropDB, createRandomUser} from '../../util/test-helpers';
import app from '../../server';

test.before('connect and try to add user', t => {
  connectDB(t, () => {

  });
});

test.after('disconnect and clear db', t => {
  dropDB(t);
});

test('Should pass test', t => {
  t.pass();
});

test('Test saving user', async t => {
  t.plan(2);
  const user = createRandomUser();
  const res = await sendAddUserRequest(user);

  t.is(res.status, 200);
  const newUser = await User.findOne({username: user.username}).exec();
  t.truthy(newUser);
});

test('Test logging in', async t => {
  const user = createRandomUser();
  await sendAddUserRequest(user);
  const res = await sendLoginRequest(user);

  t.is(res.status, 200);
  t.truthy(res.body.token);
});

function sendAddUserRequest(user) {
  return request(app)
    .post('/api/users/new')
    .send({user})
    .set('Accept', 'application/json');
}

function sendLoginRequest(user) {
  return request(app)
    .post('/api/users/login')
    .send({user})
    .set('Accept', 'application/json');
}
