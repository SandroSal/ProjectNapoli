// 
// TODO - Fix to work with MySQL 
// 

// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User = mongoose.model('users');
// const keys = require('../config/keys');

// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//     passport.use(
//         new JwtStrategy(opts, (jwt_payload, done) => { // jwt_payload get from users.js by using jwt.sign(payload)
//             User.findById(jwt_payload.id)
//                 .then(user => {
//                     if (user) {
//                         return done(null, user);
//                     }
//                     return done(null, false);
//                 })
//                 .catch(err => console.log(err));
//         })
//     );
// };