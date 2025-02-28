//console.log('Hello World!')

const express = require('express');

//importar módulo mysql
const mysql = require('mysql2');

//app é o servidor web
const app = express();

//Configuração da conexão com o banco de dados
const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'1234',
    database: 'projetos'
});

//teste de conexão com o banco de dados
conexao.connect(function(error){
    if(error) throw error;
    console.log('Conexão com o banco de dados realizada com sucesso!');
});



app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end('Nota 10');     

    });

app.listen(8080);