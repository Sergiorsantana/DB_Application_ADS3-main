// 1. console.log('Hello World!');

// 2. Importar módulo express
const express = require('express');

// 3.Importar módulo mysql
const mysql = require('MySQL2');

//4.Importar módulo express-handlebars
import { engine } from 'express-handlebars';

//4.1 Configuração do handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// 2.1 App
const app = express();

//3.1 Conexão com o banco de dados
const conexao = mysql.createConnection({
     host: 'localhost',
     user:'root',
     password :'1234',
     database:'projetos'
});

//3.2 Teste de Conexão com o banco de dados
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conectou com sucesso!');
});

// 2.2 Rota de teste
app.get('/', function(req, res){
    res.write('Hello World!');
    res.end();
});

// Servidor
app.listen(8080);