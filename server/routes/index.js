import express from 'express';
const router = express.Router();
import { isAuthenticated } from '../passport/util'

/* GET home page. */
router.get('/', (req, res, next) => {
  // res.render('index', { title: 'Express' });
  res.send('slash')
});
router.get('/protected', isAuthenticated,  (req, res, next) => {
  res.send('protected');
})


module.exports = router;
