// 1. console.log('Hello World!');

// 2. Importar módulo express
const express = require('express');

//9. Importar módulo Fileupload
const fileUpload = require('express-fileupload');

// 3.Importar módulo mysql
const mysql = require('MySQL2');

//4.Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// 2.1 App
const app = express();

//10.Habilitando o upload do arquivo
app.use(fileUpload());

//5. Adcionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// 6. Adicionar CSS

app.use('/css', express.static('./css'));

//Referenciar a pasta de imagenm
app.use('/imagem', express.static('./imagem'));

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
    //11 SQL
    let sql = 'SELECT * FROM produtos';
    //11.1 Executar o comando SQL
    conexao.query(sql, function(erro, resultado){
        res.render('formulario', {produtos:resultado});
    });

   
});

//7.Rota de Cadastro
app.post('/Cadastrar', function(req, res){
    //10. Obter os dados que serão utilizados para cadstro
    let nome = req.body.nome;
    let valor = req.body.valor;
    let imagem = req.files.imagem.name;
    
    // 10.1 Estrutura SQL
    let sql = `INSERT INTO produtos(nome, valor, imagem) VALUES('${nome}', '${valor}', '${imagem}')`;
    //Executar o comando SQL
    conexao.query(sql, function(erro, resultado){
        if(erro) throw erro;
        //10.2 Upload da imagem 
        req.files.imagem.mv(__dirname + '/imagem/' + req.files.imagem.name);
        console.log('Produto cadastrado com sucesso!');
        });

        //10.3Retornar para rota principal
        res.redirect('/');

    });


// Servidor
app.listen(8080);