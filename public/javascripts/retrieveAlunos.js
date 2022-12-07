const sqlite3 = require('sqlite3').verbose();
const { Database } = require('sqlite3');

function buscaAlunosDaTurmaX(turma_x) {
    let database = new Database("base_de_dados.sqlite3", sqlite3.OPEN_READONLY);

    database.get("SELECT * FROM alunos WHERE turma = ?", [ turma_x ], function(err, alunos_list) {
        if (err) {
            alert("Erro ao procurar alunos");
        }
        console.log(alunos_list);
    });
    database.close();
};

window.onload = function() {
    document.getElementById('getalunos').onclick = function() {
        alert('getting alunos');
        buscaAlunosDaTurmaX('1');
    }
}