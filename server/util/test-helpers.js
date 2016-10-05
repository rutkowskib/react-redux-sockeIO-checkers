import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import app from '../server';

export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('mongodb://localhost:27017/mern-test', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}

export function createRandomString(length = 8) {
  return Math.random().toString(36).substring(length);
}

export function createRandomUser() {
  const username = createRandomString();
  const password = createRandomString();
  return {
    username,
    password
  };
}

export function getApp() {
  return app;
}
