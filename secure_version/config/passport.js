import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import config from './config.js';
import userModel from '../models/userModel.js';

function mypass(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {
    const result = await userModel.getUserById(jwt_payload.id);
    if (result[0].length > 0) {
      done(null, result[0]);
    }
    else {
      done(null, false);
    }
  }));
};

export default mypass;