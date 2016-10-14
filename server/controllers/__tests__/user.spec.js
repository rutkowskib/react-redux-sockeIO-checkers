/**
 * Created by Bartlomiej Rutkowski on 14.10.16.
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

test('Should login with token', async t => {
  const res = await sendLoginWithTokenRequest();
  checkLoginWithTokenResponse(t, res);
});

function sendLoginWithTokenRequest() {
  return request(app)
    .post('/api/users/auth')
    .send({token})
    .set('Accept', 'application/json');
}

function checkLoginWithTokenResponse(t, res) {
  t.is(res.status, 200);
  t.truthy(res.body.user);
  const username = res.body.user.username;
  t.is(user.username, username);
}
