import {Router} from "express";
import TarefasController from "../controllers/TarefasController";

const app = Router();

const tarefas = new TarefasController();
app.get('/tarefas/lista', tarefas.index);
app.post('/tarefas/atualizar', tarefas.update);
app.post('/tarefas/inserir', tarefas.store);

export default app;