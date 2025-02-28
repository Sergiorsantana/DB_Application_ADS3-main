//console.log('Hello World!')

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end('Parabéns! Você fez o seu primeiro servidor com Node.js!Nota 10');     

    });

app.listen(8080);