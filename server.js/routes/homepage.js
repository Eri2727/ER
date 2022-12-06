var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(req.session);
    if(req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        res.render('homepageD', {title: 'Homepage'});
    }
    if(req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        res.render('homepageEE', {title: 'Homepage'});
    }
    else {
        res.redirect('/');
    }
});

module.exports = router;