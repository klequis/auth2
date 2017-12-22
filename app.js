var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//login script from here

var flash    = require('connect-flash');
var crypto   = require('crypto');
/* Login script */
var passport = require('passport');
var LocalStrategy  = require('passport-local').Strategy;
var connection     = require('./lib/dbconn');

 var sess  = require('express-session');
 var Store = require('express-session').Store
 var BetterMemoryStore = require(__dirname + '/memory')
 var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true })
 app.use(sess({
    name: 'JSESSION',
    secret: 'MYSECRETISVERYSECRET',
    store:  store,
    resave: true,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);

//passport Strategy -- the express session middleware before calling passport.session()
passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  },
    function (req, username, password, done) {
      console.log('** passport.use **', username+' = '+ password);
      if (!username || !password ) {
        console.log('** missing uname || pass')
        return done(null, false, req.flash('message','All fields are required.'));
      }
      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      connection.query("select * from tbl_users where username = ?", [username], function(err, rows) {
          if (err) {
            console.log('** passport.use query error**', err);
            return done(req.flash('message',err));
          }
          if(!rows.length) {
            return done(null, false, req.flash('message','Invalid username or password.'));
          }
          salt = salt+''+password;
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          var dbPassword  = rows[0].password;

          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password.'));
           }

           return done(null, rows[0]);
         } // end connection.query callback
       ); // end connection.query
     } // end passport callback
));

passport.serializeUser(function(user, done){
    console.log('** serializeUser **')
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log('** deserializeUser **')
    connection.query("select * from tbl_users where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});

app.get('/signin',
  function(req, res) {
    console.log('** app.get /signin **')
    res.render('login',{'message' :req.flash('message')});
  }
);
app.post("/signin",
  passport.authenticate('local', {
      successRedirect: '/success',
      failureRedirect: '/fail',
      failureFlash: true
    }
  ), function(req, res, info) {
    console.log('** app.post /signin: info **', info)
    res.render('login/index',{'message' :req.flash('message')});
});
app.get('/success',
  function(req, res) {
    console.log('** app.get /success **')
    res.render('success')
  }
)
app.get('/fail',
  function(req, res) {
    console.log('** app.get /fail **')
    res.render('fail')
  }
)
app.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('/signin');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
