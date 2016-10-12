/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import test from 'ava';
import User from '../user';
import {connectDB, dropDB, createRandomUser, sendRegisterUserRequest, sendLoginRequest} from '../../util/test-helpers';

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
  const res = await sendRegisterUserRequest(user);

  t.is(res.status, 200);
  const newUser = await User.findOne({username: user.username}).exec();
  t.truthy(newUser);
});

test('Test logging in', async t => {
  const user = createRandomUser();
  await sendRegisterUserRequest(user);
  const res = await sendLoginRequest(user);

  t.is(res.status, 200);
  t.truthy(res.body.token);
});
