/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import User from '../models/user';
import sanitizeHtml from 'sanitize-html';
import Config from '../config';
import jwt from 'jwt-simple';

export function saveUser(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    res.status(403).end();
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
  if (!req.body.user.username || !req.body.user.password) {
    res.status(403).end();
  }
  User.findOne({
    username: req.body.user.username
  }, (err, user) => {
    if(err) {
      throw err;
    }
    if(!user) {
      return res.status(403).send({success: false, message: 'User not found'});
    }
    if(user.password === req.body.user.password) {
      const token = jwt.encode(user, Config.secret);
      res.json({success: true, token: `JWT ${token}`});
    } else {
      return res.status(403).send({success: false, message: 'Incorrect password'});
    }
  });
}
