import express from 'express';
import passport from '../passport';
import bcrypt from 'bcrypt';
import connection from '../lib/dbconn'
const router = express.Router();
/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
router.get('/register', (req, res) => {
  res.render('register', {'message': req.flash('message')});
})
router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  bcrypt.hash(password, 10).then((hash) => {
    console.log('** hash **', hash)
    connection.query("INSERT INTO tbl_users SET ?", {username: username, password: hash, full_Name: username})
  })
  res.render('thankyou');
})
router.get('/signin', (req, res) => {
  // console.log('** app.get /signin **')
  res.render('login', {'message': req.flash('message')});
});
router.post("/signin", passport.authenticate('local', {
  successRedirect: '/users/success',
  failureRedirect: '/users/fail',
  failureFlash: true
}));
// , (req, res, info) => {
//   console.log('** app.post /signin: info **', info)
//   res.render('login/index', {'message': req.flash('message')});
// });
router.get('/success', (req, res) => {
  // console.log('** app.get /success **')
  res.render('success')
})
router.get('/fail', (req, res) => {
  /// console.log('** app.get /fail **')
  res.render('fail')
})
router.get('/logout', (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect('/');
});

module.exports = router;
