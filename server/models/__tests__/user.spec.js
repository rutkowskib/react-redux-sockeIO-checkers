/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import test from 'ava';
import request from 'supertest';
import User from '../user';
import {connectDB, dropDB} from '../../util/test-helpers';
import app from '../../server';


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
];

test.beforeEach('connect and try to add user', t => {
  connectDB(t, () => {
    User.create(users[0], err => {
      if (err) {
        t.fail('Unable to create users');
      }
    });
  });
});


test.afterEach('disconnect and clear db', t => {
  dropDB(t);
});

test('Should pass test', t => {
  t.pass();
});

test('Test saving user', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/users/new')
    .send({user: userCredentials[0]})
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const newUser = await User.findOne({username: 'username1'}).exec();
  t.is(newUser.password, userCredentials[0].password);
});

test('Test logging in', async t => {
  const res = await request(app)
    .post('/api/users/login')
    .send({user: userCredentials[0]})
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.truthy(res.body.token);
});
