/**
 * Created by Bartlomiej Rutkowski on 10.09.16.
 */
import PassportJwt from 'passport-jwt';
import User from './models/user';
import Config from './config';

const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

module.exports = function (passport) {
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
};

