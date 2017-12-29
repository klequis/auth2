import SourceMapSupport from 'source-map-support';
SourceMapSupport.install();
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import favicon from 'serve-favicon'
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import passport from './passport';
import flash from 'connect-flash';
import index from './routes/index';
import users from './routes/users';

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

import sess from 'express-session';
const Store = require('express-session').Store
const BetterMemoryStore = require(__dirname + '/memory')
const store = new BetterMemoryStore({
  expires: 60 * 60 * 1000,
  debug: true
})
app.use(sess({name: 'JSESSION', secret: 'MYSECRETISVERYSECRET', store: store, resave: true, saveUninitialized: true}));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};

  // render the error page
  res.status(err.status || 500);
  // res.send('error');
});

module.exports = app;
