import {Router} from 'express';
const app = Router();

/**
 * MIDDEWARE DEFAULT, PASSA POR TODAS AS REQUISIÇÕES
 */
app.use((req, res, next) => {
    return next();
});


module.exports = app;