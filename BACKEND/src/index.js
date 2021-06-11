import express from 'express';
import cors from 'cors';
import http from 'http';

const middleware  = require('./middlewares/default');
const route       = require('./routes/default');

const bodyParser  = require('body-parser');

const app         = express();
const server      = http.Server(app);

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(middleware);
app.use(route);

const port = 3333;

server.listen(port, function () {
    console.log('Servidor iniciado', port);
});