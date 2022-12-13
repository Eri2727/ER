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

async function buscaDocentesDaTurma(aluno_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);
    return new Promise((resolve, reject) => {
        database.all("SELECT alunos.id, alunos.turma, turma_docente.docente_id, turma_docente.turma_id, users.id, users.nome FROM alunos, turma_docente, users WHERE alunos.id = ? AND alunos.turma = turma_docente.turma_id AND turma_docente.docente_id = users.id ORDER BY turma_docente.docente_id", [aluno_x], function (err, docentes) {
            if (err) {
                console.error("Erro ao procurar docentes", err);
                database.close();
                reject(err);
            }
            //console.log(aluno_list);
            database.close();
            resolve(docentes);
        });
    })
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

async function insereMensagemNaDB(aluno_x, docente_x, sender_x, mensagem_x, type_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READWRITE);
    //console.log(aluno_x, urgente, comportamento, slide_comp, assiduidade, slide_assi, bemestar, slide_bem);
    return new Promise((resolve, reject) => {
        database.run('INSERT INTO actual_mensagens(id_aluno, id_docente, sender, mensagem, type) VALUES(?,?,?,?,?)',
            [aluno_x, docente_x, sender_x, mensagem_x, type_x], function (err) {
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
        database.all("SELECT * FROM actual_mensagens WHERE id_aluno = ? and id_docente = ?", [aluno_x, docente_x], function (err, mensagens) {
            if (err) {
                console.error("Erro ao procurar mensagens", err);
                database.close();
                reject(err);
            }
            //console.log(alunos_list)
            database.close();
            resolve(mensagens);
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
        });

        buscaRelatoriosDoAlunoX(req.params.aluno).then(relatorios => {
            //console.log(relatorios);
            res.render('relatorios', { title: 'Relatórios', relatorios: relatorios, aluno: aluno_nome });
        });
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

        let nome_ee = '';

        await buscaAlunoX(req.params.aluno).then(aluno => { //await necessario para o nome carregar sempre mesmo que o utilizador nao retorne para tras da forma correta
            nome_ee = aluno[0].nome_ee;
            console.log(nome_ee);
        });

        buscaMensagensNaDb(req.params.aluno, req.session.cookie.id).then(mensagens => {
            console.log(mensagens);
            res.render('mensagens', { title: 'Mensagens', mensagens: mensagens, nome_docente: req.session.cookie.nome, nome_ee: nome_ee });
        });
    } else {
        res.redirect('/');
    }
})

router.post('/D/:turma/:aluno/mensagens', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'docente') {
        console.log(req.session.cookie);
        insereMensagemNaDB(req.params.aluno, req.session.cookie.id, req.session.cookie.nome, req.body.mensagem, req.session.cookie.type);
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
            res.render('homepageEE', { title: 'Alunos', alunos: alunos, nome_ee: req.session.cookie.nome });
        });
    } else {
        res.redirect('/');
    }
});

router.get('/EE/:aluno/relatorios', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        let aluno_nome = '';

        await buscaAlunoX(req.params.aluno).then(aluno => { //await necessario para o nome carregar sempre mesmo que o utilizador nao retorne para tras da forma correta
            aluno_nome = aluno[0].nome_aluno;
            console.log(aluno_nome);
        })
        
        buscaRelatoriosDoAlunoX(req.params.aluno).then(relatorios => {
            //console.log(relatorios);
            res.render('relatoriosEE', { title: 'Relatórios', relatorios: relatorios, aluno: aluno_nome });
        })
    } else {
        res.redirect('/');
    }
});

router.get('/EE/:aluno/relatorios/:id_relatorio', async function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        buscaDetalhesRelatoriosNaDb(req.params.id_relatorio).then(relatorio => {
            console.log(relatorio)
            res.render('relatorioDetails', { relatorio: relatorio });
        });
    } else {
        res.redirect('/');
    }
})

router.get('/EE/:aluno/mensagens', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {

        buscaDocentesDaTurma(req.params.aluno).then(docentes => {
            res.render('mensagensEE', { title: 'Mensagens', docentes: docentes});
        });
        
    } else {
        res.redirect('/');
    }
});

router.get('/EE/:aluno/mensagens/:id_docente', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        
        let docentesList = [];

        /* buscaDocentesDaTurma(req.params.aluno).then(docentes => {
            mensagensList = buscaMensagensNaDb(req.params.aluno, req.params.id_docente);
            setTimeout(() => {
                //console.log("Delayed for 1 second.");
                console.log(mensagensList);
                res.render('mensagensEE-ID', { title: 'Mensagens', docentes: docentes, mensagensList : mensagensList});
              }, "500")
            //console.log(mensagensList);
        }); */

        buscaDocentesDaTurma(req.params.aluno).then(docentes => { 
            docentesList = docentes;
        },
            buscaMensagensNaDb(req.params.aluno, req.params.id_docente).then(mensagens => {
                console.log(mensagens);
                console.log(docentesList);
                setTimeout(() => {
                    res.render('mensagensEE-ID', { title: 'Mensagens', docentesList: docentesList, mensagens : mensagens});
                  }, "100");
            }));
    } else {
        res.redirect('/');
    }
});

router.post('/EE/:aluno/mensagens/:id_docente', function (req, res, next) {
    if (req.session.cookie.secure == true && req.session.cookie.type == 'encarregado') {
        insereMensagemNaDB(req.params.aluno, req.params.id_docente, req.session.cookie.nome, req.body.mensagem, req.session.cookie.type);
        res.redirect('/homepage/EE/' + req.params.aluno + '/mensagens/'+ req.params.id_docente)
    } else {
        res.redirect('/');
    }
});


module.exports = router;