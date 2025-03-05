//console.log('Hello World!')

const express = require ('express');

//Impostar módulo flieupload
const fileUpload = require('express-fileupload');

//Importar módulo express-handlebars
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
    app.post('/cadastrar', function (req, res) {
        if (!req.files || !req.files.imagem) {
            return res.status(400).send('Nenhum arquivo foi enviado.');
        }
    
        const imagem = req.files.imagem;
        const uploadPath = __dirname + '/imagens/' + imagem.name;
    
        imagem.mv(uploadPath, function (err) {
            if (err) {
                return res.status(500).send(err);
            }
            res.send('Arquivo enviado com sucesso!');
        });
    });
    

    //Servidor
app.listen(8080);