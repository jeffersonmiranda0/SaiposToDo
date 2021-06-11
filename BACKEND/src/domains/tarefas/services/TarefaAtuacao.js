import {sequelize} from './../../../config/dbSequelize';
import {QueryTypes} from 'sequelize';
import * as EmailValidator from 'email-validator';

export default class TarefaAtuacao {

    atualizarStatus = async (idTarefa, status, senha) => {

        if(status === 1 && senha !== 'TrabalheNaSaipos'){
            throw 'Você não pode realizar esta alteração!';
        }
        
        await sequelize.query(`UPDATE Tarefa SET idStatus = $idStatus WHERE idTarefa = $idTarefa`, {
            type: QueryTypes.UPDATE,
            bind : {
                idStatus : status,
                idTarefa : idTarefa
            }
        });
    }

    inserirRegistro = async (dados = {
        descricao, nome, email
    }) => {

        if(!EmailValidator.validate(dados.email)) {
            // throw 'E-mail inválido';
        }
        
        return await sequelize.query(`CALL saipos.inserirTarefa($descricao, $nome, $email)`, {
            type: QueryTypes.UPDATE,
            bind : dados
        });

    }

}