/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import Config from '../config';
import jwt from 'jwt-simple';
import {checkToken} from '../passportJWT';

export function saveUser(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    res.status(403).send();
  }
  const newUser = new User(req.body.user);
  newUser.username = sanitizeHtml(newUser.username);
  newUser.password = sanitizeHtml(newUser.password);
  newUser.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({user: saved});
    }
  });
}

export function authenticateUser(req, res) {
  if (!req.body.user || !req.body.user.username || !req.body.user.password) {
    res.status(403).send();
  }
  const userToAuth = req.body.user;
  User.findOne({
    username: userToAuth.username
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(!user) {
      return res.status(403).send({success: false, message: 'User not found'});
    }
    user.comparePassword(userToAuth.password, (err, isMatch) => {
      if(err) {
        return res.status(403).send({success: false, message: 'Error during password compare'});
      }
      if(isMatch) {
        const token = jwt.encode(user, Config.secret);
        res.json({success: true, token: `JWT ${token}`, user});
      } else {
        return res.status(403).send({success: false, message: 'Incorrect password'});
      }
    });
  });
}

export function loginWithToken(req, res) {
  const token = req.body.token;
  if(!token) {
    res.status(403).send({msg: 'Token not found'});
  }
  const loginSuccessful = (user) => {
    res.json({success: true, token: `JWT ${token}`, user});
  };
  const loginUnsuccessful = (msg) => {
    res.status(403).send({msg});
  };
  checkToken(token, loginSuccessful, loginUnsuccessful);
}
