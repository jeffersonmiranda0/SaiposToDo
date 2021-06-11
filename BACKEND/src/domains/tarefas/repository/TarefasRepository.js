import { QueryTypes } from 'sequelize';
import {sequelize} from './../../../config/dbSequelize';

export default class TarefasRepository {

    lista = async () => {
        const sql = 'CALL saipos.listarTarefa()';
        
        const result = await sequelize.query(sql);

        return result;
    }
}