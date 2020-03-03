let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongooes = require('mongoose')
let session = require('express-session');
let fileStore = require('session-file-store')(session);
let passport = require('passport');


// Routers 
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const dishRouter = require('./routes/dishRouter');
const leaderRouter = require('./routes/leaderRouter')
const promotionRouter = require('./routes/promotionRouter')
const userRouterForPassport = require('./routes/userRouterPassport')
const userRouterForJWTPassport = require('./routes/UserRouterJSTpassport')
// Authorizaton
const authBasic  = require('./authorizations/authorization') 
const authCookies = require('./authorizations/cookies-authorization')
const authSession = require('./authorizations/session-authorization')
const authLogin = require('./authorizations/login-authentication')
const authLoginForPass = require('./authorizations/login-passport')

// authenticate file for passport
let authentiate = require('./authenticate')

// const Dishes = require('./models/dishesh')
// const dbUrl = 'mongodb://localhost:27017/conFusion3';

// const connect = mongooes.connect(dbUrl, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//   .then(db => console.log('CONNECTED TO DATABASE CORRECTLY'))
//   .catch(err => console.log('ERROR OCCURED IN CONNECTING ', err))


let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'public')));
// app.use(authBasic); //to use basic Authorization
//app.use(authCookies);// to use cookie Authorization

/** 
app.use(session({
  name: 'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized: false,
  store: new fileStore()
}));
 app.use(authSession);

 // uncomment to use session autherization

 // below line code is for passport-middelware
    app.use(passport.initialize())
    app.use(passport.session());
 */


//app.use('/users', usersRouter); // note here , /users had been called before Authentication of session
// app.use(authLogin)
app.use('/user',userRouterForJWTPassport);
app.use(authLoginForPass)

/**  this code is to be used for passport with session.
app.use('/user',userRouterForPassport)
app.use(authLoginForPass)
*/

app.use('/', indexRouter);
app.use('/dishes', dishRouter);
app.use('/leader', leaderRouter);
app.use('/promotion', promotionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
