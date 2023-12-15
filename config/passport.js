import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import userModel from '../models/userModel.js';

function mypass(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    userModel.getUserById(jwt_payload.id, (error, results) => {
        if (error) {
            return done(err, false);
        } else {
          if(results.length > 0)
          {
            done(null, results[0]);
          }
          else
          {
            done(null, false);
          }
        }
    })
  }));
};

export default mypass;