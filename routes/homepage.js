const express = require('express');
const passport = require('passport');
const { Database } = require('sqlite3');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();


async function buscaAlunosDoEE(id_ee_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT * FROM alunos WHERE id_ee = ?", [id_ee_x], function (err, alunos_list) {
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

+async function buscaMensagensNaDBEE(id_aluno) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT * FROM mensagens WHERE id_aluno = ?", [id_aluno], function (err, alunos_list) {
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

async function insereMensagemNaDBEE(id_aluno, mensagem_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READWRITE);
    //console.log(aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem);
    return new Promise((resolve, reject) => {
        database.run('INSERT INTO mensagens(id_aluno, mensagem) VALUES(?,?)',
            [id_aluno, mensagem_x], function (err) {
                if (err) {
                    console.error("Erro ao inserir na base de dados", err);
                    database.close();
                    reject(err);
                }
                database.close();
                resolve();
            })
    })
}


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

async function insereRelatorioNaDB(aluno_x, urgente, valor_comportamento, titulo_comportamento, detalhes_comportamento, titulo_assiduidade, detalhes_assiduidade, titulo_pontualidade, detalhes_pontualidade, valor_bem_estar, titulo_bem_estar, detalhes_bem_estar, titulo_faltas_material, detalhes_faltas_material, valor_avaliacao, titulo_avaliacao, detalhes_avaliacao, titulo_visitas_estudo, detalhes_visitas_estudo) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READWRITE);
    //console.log(aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem);
    return new Promise((resolve, reject) => {
        if (urgente == null) {
            urgente = false;
        }
        database.run('INSERT INTO relatorios(id_aluno, urgente, comportamento_valor, comportamento, comportamento_detalhes, assiduidade, assiduidade_detalhes, pontualidade, pontualidade_detalhes, bem_estar_valor, bem_estar, bem_estar_detalhes,  data, faltas_material, faltas_material_detalhes, avaliacao_valor, avaliacao, avaliacao_detalhes, visitas_estudo, visitas_estudo_detalhes) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [aluno_x, urgente, valor_comportamento, titulo_comportamento, detalhes_comportamento, titulo_assiduidade, detalhes_assiduidade, titulo_pontualidade, detalhes_pontualidade, valor_bem_estar, titulo_bem_estar, detalhes_bem_estar, new Date().toDateString(), titulo_faltas_material, detalhes_faltas_material, valor_avaliacao, titulo_avaliacao, detalhes_avaliacao, titulo_visitas_estudo, detalhes_visitas_estudo], function (err) {
                if (err) {
                    console.error("Erro ao inserir na base de dados", err);
                    database.close();
                    reject(err);
                }
                database.close();
                resolve();
            })
    })

}

async function insereMensagemNaDB(aluno_x, docente_x, mensagem_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READWRITE);
    //console.log(aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem);
    return new Promise((resolve, reject) => {
        database.run('INSERT INTO mensagens(id_aluno, id_docente, mensagem) VALUES(?,?,?)',
            [aluno_x, docente_x, mensagem_x], function (err) {
                if (err) {
                    console.error("Erro ao inserir na base de dados", err);
                    database.close();
                    reject(err);
                }
                database.close();
                resolve();
            })
    })

}

async function buscaMensagensNaDb(aluno_x, docente_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT id_aluno, id_docente, id_turma, mensagem FROM mensagens WHERE id_aluno = ? and id_docente = ?", [aluno_x, docente_x], function (err, alunos_list) {
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


async function buscaDetalhesRelatoriosNaDb(relatorio_id) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.get("SELECT * FROM relatorios WHERE id = ? ", [relatorio_id], function (err, relatorio) {
            if (err) {
                console.error("Erro ao procurar relatorio", err);
                database.close();
                reject(err);
            }
            //console.log(alunos_list)
            database.close();
            resolve(relatorio);
        });
    });
};

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

router.get('/D/:turma/:aluno/relatorios', async function (req, res, next) {
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


router.get('/D/:turma/:aluno/relatorios/new', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        res.render('new_relatorio', { title: 'Novo Relatório', turma: req.params.turma, aluno: req.params.aluno });
    } else {
        res.redirect('/');
    }
})

router.post('/D/:turma/:aluno/relatorios/new', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        //console.log('HI IM HERE NOTICE ME');
        //console.log(req.body.DComportamento, req.body.slideComportamento, req.body.DAssiduidade, req.body.slideAssiduidade, req.body.DBemEstar, req.body.slideBemEstar, req.body.urgente, req.body.botao_modo);
        //if(req.body.botao_modo == 'enviar') {}
        //                  aluno_x, urgente,                   valor_comportamento,            titulo_comportamento, detalhes_comportamento, titulo_assiduidade, detalhes_assiduidade,         titulo_pontualidade, detalhes_pontualidade, valor_bem_estar, titulo_bem_estar, detalhes_bem_estar,          titulo_faltas_material, detalhes_faltas_material,   valor_avaliacao, titulo_avaliacao, detalhes_avaliacao,              titulo_visitas_estudo, detalhes_visitas_estudo
        insereRelatorioNaDB(req.params.aluno, req.body.urgente, req.body.slideComportamento, req.body.TComportamento, req.body.DComportamento, req.body.TAssiduidade, req.body.DAssiduidade, req.body.TPontualidade, req.body.DPontualidade, req.body.slideBemEstar, req.body.TBemEstar, req.body.DBemEstar, req.body.TFaltasMaterial, req.body.DFaltasMaterial, req.body.slideAvaliacao, req.body.TAvaliacao, req.body.DAvaliacao, req.body.TVisitasEstudos, req.body.DVisitasEstudos);
        res.redirect('/homepage/D/' + req.params.turma + '/' + req.params.aluno + '/relatorios');
    } else {
        res.redirect('/');
    }
})

router.get('/D/:turma/:aluno/mensagens', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        buscaMensagensNaDb(req.params.aluno, req.session.cookie.id).then(mensagens => {
            console.log(mensagens);
            res.render('mensagens', { title: 'Mensagens', mensagens: mensagens });
        });
    } else {
        res.redirect('/');
    }
})

router.post('/D/:turma/:aluno/mensagens', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        console.log(req.session.cookie);
        insereMensagemNaDB(req.params.aluno, req.session.cookie.id, req.body.mensagem);
        res.redirect('/homepage/D/' + req.params.turma + '/' + req.params.aluno + '/mensagens');
    } else {
        res.redirect('/');
    }
})

router.get('/D/:turma/:aluno/relatorios/:id_relatorio', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        buscaDetalhesRelatoriosNaDb(req.params.id_relatorio).then(relatorio => {
            console.log(relatorio)
            res.render('relatorioDetails', { relatorio: relatorio });
        });
    } else {
        res.redirect('/');
    }
})

router.get('/D', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        res.render('homepageD', { title: 'Homepage' });
    } else {
        res.redirect('/');
    }
});

router.get('/EE', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        buscaAlunosDoEE(req.session.cookie.id).then(alunos => {
            res.render('homepageEE', { title: 'Alunos', alunos: alunos });
        });
    } else {
        res.redirect('/');
    }
});


router.get('/EE/:aluno/mensagens', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        res.render('mensagensEE')
    } else {
        res.redirect('/');
    }
});

router.post('/EE/:aluno/mensagens', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        insereMensagemNaDBEE(req.params.aluno, req.body.mensagem);
        res.redirect('/homepage/EE/' + req.params.aluno + '/mensagens')
    } else {
        res.redirect('/');
    }
});


module.exports = router;