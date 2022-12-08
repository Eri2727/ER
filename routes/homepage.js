const express = require('express');
const passport = require('passport');
const { Database } = require('sqlite3');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

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

router.get('/EE', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        res.render('homepageEE', { title: 'Homepage' });
    } else {
        res.redirect('/');
    }
});

router.get('/D', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        res.render('homepageD', { title: 'Homepage' });
    } else {
        res.redirect('/');
    }
});


async function buscaAlunosDaTurmaX(turma_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT id, nome_aluno, nome_ee FROM alunos WHERE turma = ?", [turma_x], function (err, alunos_list) {
            if (err) {
                console.error("Erro ao procurar alunos", err);
                database.close();
                reject(err);
            }
            console.log(alunos_list)
            database.close();
            resolve(alunos_list);
        });
    });


};

router.get('/D/alunos/:turma', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        buscaAlunosDaTurmaX(req.params.turma).then(alunos => {
            console.log(alunos);
            res.render('alunos', { title: 'Alunos', alunos: alunos });
        });

    } else {
        res.redirect('/');
    }
})

module.exports = router;