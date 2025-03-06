//console.log('Hello World!')

const express = require ('express');

//Impostar módulo flieupload
const fileUpload = require('express-fileupload');

//Importar módulo express-handlebars
//A sintaxe { engine } é desestruturação de objeto. Isso significa que require('express-handlebars') retorna um objeto, e estamos extraindo apenas a propriedade engine desse objeto.
//O que é express-handlebars? é um template engine para o framework Express. Ele permite a criação de páginas dinâmicas no servidor utilizando o Handlebars como mecanismo de renderização.
const { engine } = require ('express-handlebars');

//importar módulo mysql
const mysql = require('mysql2');

//app é o servidor web
const app = express();

//Habilitando o upload de arquivos
app.use(fileUpload());

//adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

//adicionar CSS

app.use('/css', express.static('./css'));


//Configuração do express para usar o handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

//Rota principal
app.get('/', function(req, res) {
    res.render('formulario');    //renderiza o arquivo formulario.handlebars

    });

//Rota para salvar os dados do formulário ou rota de cadastro
    app.post('/cadastrar', function(req, res) {
        console.log(req.body);  //exibe no console os dados do formulário
        console.log(req.files); //exibe no console os arquivos do formulário
        

        req.files.imagem.mv(__dirname+'/imagens/'+req.files.imagem.name);
        res.send('Arquivo recebido com sucesso!');
    });
    

    //Servidor
app.listen(8080);