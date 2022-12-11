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
            //console.log(alunos_list)
            database.close();
            resolve(alunos_list);
        });
    });
};

async function buscaRelatoriosDoAlunoX(aluno_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT * FROM relatorios WHERE id_aluno = ?", [aluno_x], function (err, relatorios_list) {
            if (err) {
                console.error("Erro ao procurar relatórios", err);
                database.close();
                reject(err);
            }
            //console.log(relatorios_list);
            database.close();
            resolve(relatorios_list);
        });
    });
}

async function buscaAlunoX(aluno_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT * FROM alunos WHERE id = ?", [aluno_x], function (err, aluno_list) {
            if (err) {
                console.error("Erro ao procurar aluno", err);
                database.close();
                reject(err);
            }
            //console.log(aluno_list);
            database.close();
            resolve(aluno_list);
        });
    });
}

async function insereRelatorioNaDB(aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READWRITE);
    return new Promise((resolve, reject) => {
        database.run('INSERT INTO relatorios(id_aluno, urgente, comportamento, comportamento_valor, assiduidade, assiduidade_valor, bem_estar, bem_estar_valor, data) VALUES(?,?,?,?,?,?,?,?,?)',
        [aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem, new Date().toDateString()], function(err) {
            if(err) {
                console.error("Erro ao inserir na base de dados", err);
                database.close();
                reject(err);
            }
            database.close();
            resolve();
        })
    })

}

router.get('/D/:turma/alunos', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        buscaAlunosDaTurmaX(req.params.turma).then(alunos => {
            //console.log(alunos);
            res.render('alunos', { title: 'Alunos', turma: req.params.turma, alunos: alunos });
        });

    } else {
        res.redirect('/');
    }
})

router.get('/D/:turma/:aluno/relatorios', async function(req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        let aluno_nome = '';

        await buscaAlunoX(req.params.aluno).then(aluno => { //await necessario para o nome carregar sempre mesmo que o utilizador nao retorne para tras da forma correta
            aluno_nome = aluno[0].nome_aluno;
            console.log(aluno_nome);
        })

        buscaRelatoriosDoAlunoX(req.params.aluno).then(relatorios => {
            //console.log(relatorios);
            res.render('relatorios', { title: 'Relatórios', relatorios: relatorios, aluno: aluno_nome });
        })
    } else {
        res.redirect('/');
    }
})

router.get('/D/:turma/:aluno/relatorios/new', async function(req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        res.render('new_relatorio', { title: 'Novo Relatório', turma: req.params.turma, aluno: req.params.aluno});
    }
})

router.post('/D/:turma/:aluno/relatorios/new', async function(req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        //console.log('HI IM HERE NOTICE ME');
        //console.log(req.body.DComportamento, req.body.slideComportamento, req.body.DAssiduidade, req.body.slideAssiduidade, req.body.DBemEstar, req.body.slideBemEstar, req.body.urgente, req.body.botao_modo);
        //if(req.body.botao_modo == 'enviar') {}
        insereRelatorioNaDB(req.params.aluno, req.body.urgente, req.body.DComportamento, req.body.slideComportamento, req.body.DAssiduidade, req.body.slideAssiduidade, req.body.DBemEstar, req.body.slideBemEstar);
        res.redirect('/homepage/D/'+req.params.turma+'/'+req.params.aluno+'/relatorios');
    }
})
/* router.get('/D/:turma/:aluno/mensagens', async function(req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        buscaMensagensDoAlunoX(req.params.aluno).then(mensagens => {
            //console.log(mensagens);
            res.render('mensagens', { title: 'Mensagens', mensagens: mensagens });
        })
    } else {
        res.redirect('/');
    }
}) */

module.exports = router;