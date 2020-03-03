let passport = require('passport');
let passportLocalStrategy = require('passport-local').Strategy
let User = require('./models/userFpass');

// here we are definig local strategies with passport local strategies
// in that we need to pass our verify fn
// but as we are using passport-local-mongoose we can do that with user.authenticate();
exports.locale = passport.use(new  passportLocalStrategy(User.authenticate()))

// as we are using session to authenticate thus we need to searlize and deserailize passport
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
