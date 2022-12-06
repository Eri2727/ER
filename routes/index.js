var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
  console.log(req.session.cookie);
});

router.post('/loginEE', passport.authenticate('loginEE', {
  successRedirect: '/homepage/EE',
  failureRedirect: '/'
}));

router.post('/loginD', passport.authenticate('loginD', {
  successRedirect: '/homepage/D',
  failureRedirect: '/'
}));

router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    req.session.cookie.secure = false;
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;
