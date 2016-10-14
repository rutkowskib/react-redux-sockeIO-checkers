/**
 * Created by Bartlomiej Rutkowski on 10.09.16.
 */
import PassportJwt from 'passport-jwt';
import User from './models/user';
import Config from './config';
import jwt from 'jwt-simple';

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

export default function (passport) {
  const opts = {};
  opts.secretOrKey = Config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.find({id: jwtPayload.id}, (err, user) => {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
}

export function getToken(headers) {
  if(headers && headers.authorization) {
    return getTokenFromTokenString(headers.authorization);
  } else {
    return null;
  }
}

export function authenticateWithToken(req, res, next) {
  const token = getToken(req.headers);
  if(token) {
    const decoded = jwt.decode(token, Config.secret);
    User.findOne({
      name: decoded.name
    }, (err, user) => {
      if(err) throw err;
      if(!user) {
        res.status(403).send({success: false, msg: 'No user'});
      }
      next();
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token'});
  }
}

export function checkToken(tokenString, loginSuccessful, loginUnsuccessful) {
  const token = getTokenFromTokenString(tokenString);
  if(token) {
    const decoded = jwt.decode(token, Config.secret);
    User.findOne({
      name: decoded.name
    }, (err, user) => {
      if(err) throw err;
      if(!user) {
        const noUserMessage = 'No user';
        loginUnsuccessful(noUserMessage);
      }
      loginSuccessful(user);
    });
  } else {
    const badFormatTokenMessage = 'Bad token format';
    loginUnsuccessful(badFormatTokenMessage);
  }
}

function getTokenFromTokenString(tokenString) {
  const parted = tokenString.split(' ');
  const length = parted.length;
  if(length >= 2) {
    return parted[length - 1];
  } else {
    return null;
  }
}
