import TarefaAtuacao from '../services/TarefaAtuacao';
import TarefasRepository from './../repository/TarefasRepository';

export default class TarefasController {

    index = async (req, res) => {

        try {

            const dados = await (new TarefasRepository()).lista();
            
            res.json({
                status      : true,
                message     : "Sucesso",
                resultSet   : dados
            }, 200);


        } catch (e) {
            res.json({
                status : false,
                message : "Não foi possível realizar a listagem"
            }, 502);
        }

    }

    update = async (req, res) => {
        try {

            const {idTarefa, status, senha} = req.body;

            const tarefaAtuacao = new TarefaAtuacao();
            await tarefaAtuacao.atualizarStatus(idTarefa, status, senha);

            res.json({
                status      : true,
                message     : "Sucesso",
                resultSet   : []
            }, 200);


        } catch (e) {

            let erro = e;
            
            if(e.original) {
                erro = e.original.sqlMessage;
            }

            res.json({
                status : false,
                message : erro
            }, 200);
        }

    }

    store = async (req, res) => {
        try {

            const dados = req.body;

            const tarefaAtuacao = new TarefaAtuacao();
            let resultSet = await tarefaAtuacao.inserirRegistro(dados);

            res.status(200).json({
                status      : true,
                message     : "Sucesso",
                resultSet   : resultSet
            }, 200);


        } catch (e) {
            res.status(200).json({
                status : false,
                message : e
            });
        }

    }

}