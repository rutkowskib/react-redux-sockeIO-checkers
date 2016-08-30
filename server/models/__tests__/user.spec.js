/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import test from 'ava';
import User from '../user';
import {connectDB} from '../../util/test-helpers';


const users = [
  new User({username: 'username1'}, {password: 'pw1'}),
  new User({username: 'username2'}, {password: 'pw2'})
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
