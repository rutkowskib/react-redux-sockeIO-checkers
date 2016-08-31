/**
 * Created by Bartlomiej Rutkowski on 30.08.16.
 */
import User from '../models/user';
import sanitizeHtml from 'sanitize-html';

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
