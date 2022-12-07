var express = require('express');
const passport = require('passport');
var router = express.Router();

/* router.get('/', function(req, res, next) {
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
}); */

router.get('/EE', function(req, res, next) {
    if(req.session.cookie.secure == true && req.session.cookie.type == 'encarregado'){
        res.render('homepageEE', {title: 'Homepage'});
    } else { 
        res.redirect('/');
    }
});

router.get('/D', function(req, res, next) {
    if(req.session.cookie.secure == true && req.session.cookie.type == 'docente'){
        res.render('homepageD', {title: 'Homepage'});
    } else { 
        res.redirect('/');
    }
});

router.get('/D/alunos', function(req, res, next) {
    if(req.session.cookie.secure == true && req.session.cookie.type == 'docente'){
        res.render('alunos', {title: 'Alunos'});
    } else { 
        res.redirect('/');
    }
  })

module.exports = router;