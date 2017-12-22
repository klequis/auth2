// var express = require('express');
// var router = express.Router();
// // var passport = require('passport');
// // var LocalStrategy  = require('passport-local').Strategy;
// var connection     = require('../lib/dbconn');
//
// router.get('/', function(req, res, next) {
//   console.log('** login get **')
//   res.render('login', { title: 'login' });
// });
//
// router.post('/', function(req, res, next) {
//   console.log('** login post 1**')
//   passport.authenticate('local', {
//     successRedirect: '/test',
//     failureRedirect: '/test',
//     // failureFlash: true,
//   }), function (req, res, info) {
//     console.log('** login.post 2**')
//     res.render('test', { title: 'login' });
//   }
//
// });
//
//
//
// module.exports = router;
