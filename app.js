// 1. console.log('Hello World!');

// 2. Importar módulo express
const express = require('express');

// 2.1 App
const app = express();

// 2.2 Rota de teste
app.get('/', function(req, res){
    res.write('Hello World!');
    res.end();
});

// Servidor
app.listen(8080);