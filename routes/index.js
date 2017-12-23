import express from 'express';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/protected', isAuthenticated,  (req, res, next) => {
  res.render('protected');
})

function isAuthenticated(req, res, next) {

  if (req.isAuthenticated())

    return next();

  res.redirect('/users/signin');

}
module.exports = router;
