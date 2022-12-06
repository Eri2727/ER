var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
  console.log(req.session.cookie);
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/homepage',
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
