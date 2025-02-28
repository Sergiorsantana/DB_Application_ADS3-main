//console.log('Hello World!')

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.write('Hello World!');
    res.end('Nota 10');     

    });

app.listen(8080);