import express from 'express';
import passport from '../passport';
import bcrypt from 'bcrypt';
import { db } from '../db'

const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/register', (req, res) => {
  // console.log('register')
  let sql = `select username from tbl_users`
  db().then((conn) => {
    console.log('register 1')
    return conn.query(sql)
  }).then((rows) => {
    console.log('rows', rows)
    res.send(rows)
  }).catch((err) => {
    console.log('err', err)
  })
  // const username = req.body.user.username;
  // const password = req.body.user.password;
  // console.log(`post/register username=${username}, password=${password}` )
  // const sql = 'INSERT INTO tbl_users SET ?'
  // bcrypt.hash(password, 10)
  //   .then((hash) => {
  //     console.log('** hey')
  //     db().then((conn) => {
  //       return conn.query('INSERT INTO tbl_users SET ?', {username: username, password: hash, full_Name: username})
  //       .then((rows) => {
  //         console.log('rows', rows)
  //         res.send(rows)
  //       })
  //     })
  //   }).catch((err) => {
  //     return err
  //   })
  // res.send('thankyou');
})

// router.get('/signin', (req, res) => {
//   // console.log('** app.get /signin **')
//   res.render('login', {'message': req.flash('message')});
// });
//
// router.post("/signin", passport.authenticate('local', {
//   successRedirect: '/users/success',
//   failureRedirect: '/users/fail',
//   failureFlash: true
// }));
// // , (req, res, info) => {
// //   console.log('** app.post /signin: info **', info)
// //   res.render('login/index', {'message': req.flash('message')});
// // });
// router.get('/success', (req, res) => {
//   // console.log('** app.get /success **')
//   res.render('success')
// })
// router.get('/fail', (req, res) => {
//   /// console.log('** app.get /fail **')
//   res.render('fail')
// })
// router.get('/logout', (req, res) => {
//   req.session.destroy();
//   req.logout();
//   res.redirect('/');
// });

module.exports = router;
