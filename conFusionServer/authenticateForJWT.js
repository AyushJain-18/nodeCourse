let config = require('./config')
let passport = require('passport');
let User = require('./models/userFpass');
// for passport jwt
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtModule = require('jsonwebtoken')// used to create, sign and verify json tokens.

// option object AuthFn
let opts ={};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); // extracting token from header we can also extract token from body
opts.secretOrKey = config.secretkey;

// In order to use jsonWebToken we need to pass it instance of it strategy to passport.use  
// instance strategy take a authebtication funtion
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


exports.verifyUser = passport.authenticate('jwt',{session: false});
exports.getToken = (user)=>{ // here we are creating a sign token
    return jwtModule.sign(user, config.secretkey,{expiresIn: 3600})
}
/**
 * we had used this funtion to create a token when user login in and then 
 * we will set this token in response header,
 *  we our server will expect that token for subsequent request
 */

