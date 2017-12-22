const express = require('express');
const router = express.Router();
const passport = require('../passport')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/signin', function(req, res) {
  // console.log('** app.get /signin **')
  res.render('login', {'message': req.flash('message')});
});
router.post("/signin", passport.authenticate('local', {
  successRedirect: '/users/success',
  failureRedirect: '/users/fail',
  failureFlash: true
}), function(req, res, info) {
  // console.log('** app.post /signin: info **', info)
  res.render('login/index', {'message': req.flash('message')});
});
router.get('/success', function(req, res) {
  // console.log('** app.get /success **')
  res.render('success')
})
router.get('/fail', function(req, res) {
  /// console.log('** app.get /fail **')
  res.render('fail')
})
router.get('/logout', function(req, res) {
  req.session.destroy();
  req.logout();
  res.redirect('/users/signin');
});

module.exports = router;
