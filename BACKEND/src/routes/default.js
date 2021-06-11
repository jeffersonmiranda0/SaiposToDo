import { Router }  from 'express';
import tarefas from './../domains/tarefas/routes';

const app = Router();
app.use(tarefas);


app.get('/hello-world', (req, res) => {
    console.log('Hello world');
    res.json({
        status : true,
        message: "hello world"
    })
});

/**
 * ROTA INEXISTENTE
 */
 app.use(function(req, res, next) {
    res.status(404).send({
        status : false,
        message : "Rota inexistente"
    })
    next();
});

module.exports = app;