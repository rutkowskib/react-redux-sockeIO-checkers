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
    const parted = headers.authorization.split(' ');
    if(parted.length === 3) {
      return parted[2];
    } else {
      return null;
    }
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
