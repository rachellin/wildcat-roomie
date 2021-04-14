var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var profilesRouter = require('./routes/profiles');
var firebaseRouter = require('./routes/firestore');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  key: 'user_sid',
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000
  }
}));

// my own methods and middlewares
var tokenChecker = require('./methods/middlewares').tokenChecker;
var getHashedPassword = require('./methods/methods').getHashedPassword;
var user = require('./methods/methods').users;

// verify token: check if there is valid token saved to browser cookies (server.js)
app.get('/api/checkToken', tokenChecker, function(req, res) {
  res.status(200).send(user);
});

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/api/profiles', profilesRouter);
app.all('/', tokenChecker, indexRouter);
app.use('/api/register', registerRouter); // temp removed tokenChoker
app.use('/api/login', loginRouter);
//app.use('/dashboard', dashboardRouter);
app.use('/api/logout', logoutRouter);

// TEST DB CONNECTION
const User = require('./db/user');  
app.get('/psql', User.exists);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
