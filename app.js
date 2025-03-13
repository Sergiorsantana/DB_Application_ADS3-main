// 1. console.log('Hello World!');

// 2. Importar módulo express
const express = require('express');

// 3.Importar módulo mysql
const mysql = require('MySQL2');

//4.Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// 2.1 App
const app = express();

//5. Adcionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// 6. Adicionar CSS

app.use('/css', express.static('./css'));

//4.1 Configuração do express - handlebars

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//8. Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:true}));

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
//app.get('/', function(req, res){
 //   res.write('Hello World!');
 //   res.end();
//}); 

//4.2 Rota principal
app.get('/', function(req, res){
    res.render('formulario');
});

//7.Rota de Cadastro
app.post('/Cadastrar', function(req, res){
    console.log(req.body);
    res.end();
    });


// Servidor
app.listen(8080);