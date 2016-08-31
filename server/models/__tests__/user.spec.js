/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import test from 'ava';
import request from 'supertest';
import User from '../user';
import {connectDB} from '../../util/test-helpers';
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
    User.create(users, err => {
      if (err) {
        t.fail('Unable to create users');
      }
    });
  });
});

test('Should pass test', t => {
  t.pass();
});

test('Test saving user', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/users/new')
    .send({user: {username: 'username1', password: 'pw1'}})
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const newUser = await User.findOne({username: 'username1'}).exec();
  t.is(newUser.password, 'pw1');
});
