import passport from 'passport'
const LocalStrategy  = require('passport-local').Strategy;
import connection from '../lib/dbconn';
import crypto from 'crypto';

//passport Strategy -- the express session middleware before calling passport.session()
passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  },
    (req, username, password, done) => {
      console.log('** passport.use **', username+' = '+ password);
      if (!username || !password ) {
        console.log('** missing uname || pass')
        return done(null, false, req.flash('message','All fields are required.'));
      }
      let salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
      connection.query("select * from tbl_users where username = ?", [username], (err, rows) => {
          if (err) {
            console.log('** passport.use query error**', err);
            return done(req.flash('message',err));
          }
          if(!rows.length) {
            return done(null, false, req.flash('message','Invalid username or password.'));
          }
          salt = salt+''+password;
          const encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          const dbPassword  = rows[0].password;

          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password.'));
           }

           return done(null, rows[0]);
         } // end connection.query callback
       ); // end connection.query
     } // end passport callback
));

passport.serializeUser((user, done) => {
    console.log('** serializeUser **')
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('** deserializeUser **')
    connection.query("select * from tbl_users where id = "+ id, (err, rows) => {
        done(err, rows[0]);
    });
});

const isAuthenticated = (req, res, next) => {

  if (req.isAuthenticated())

    return next();

  res.redirect('/signin');

}

module.exports = passport;
