import React, { useEffect, useState } from "react";
import Tarefa from "./components/tarefa";
import Modal from "./components/modal";
import api from "./../../services/api";
import Task from "./../../services/Tarefas";
import axios from "axios";

export default function Tarefas() {
    const [tarefas, setTarefas] = useState([]);

    async function getTarefas() {
        const response = await api.get('/tarefas/lista');
        setTarefas(response.data.resultSet);
    }

    async function getFacts() {
        const url = "https://cat-fact.herokuapp.com";
        const api = axios.create({baseURL: url});

        await api.get('/facts/random?animal_type=dog&amount=3').then(async (result) => {
            let dados = result.data;
            await Task.inserirRegistro('Eu', 'eu@me.com', dados[0].text);
            await Task.inserirRegistro('Eu', 'eu@me.com', dados[1].text);
            await Task.inserirRegistro('Eu', 'eu@me.com', dados[2].text);

            getTarefas();
        });
    }


    useEffect(() => {
        getTarefas();
    }, []);

  return (
    <>

        <div className="h-100">
            <div className="bg-light p-3">
                <button className="btn btn-success me-3" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus"></i> NOVA TAREFA</button>
                <button className="btn btn-info text-white" onClick={getFacts}><i className="fas fa-laugh-beam"></i> ESTOU SEM TAREFAS</button>
            </div>
            <div className="row">
                <div className="col-4">
                    <div className="card bg-light">
                        <div className="card-header bg-warning">
                            <h2 className="text-white text-center"><i className="fas fa-clipboard-list"></i> PENDENTE</h2>
                        </div>
                        <div className="card-body">   
                        { tarefas.map(tarefa => ( <Tarefa dados={tarefa} key={tarefa.idTarefa} status="PENDENTE" getTarefa={getTarefas} /> ))}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-light">
                        <div className="card-header bg-info">
                            <h2 className="text-white text-center"><i className="fas fa-briefcase"></i> EXECUTANDO</h2>
                        </div>
                        <div className="card-body">
                        { tarefas.map(tarefa => ( <Tarefa dados={tarefa} key={tarefa.idTarefa} status="EXECUTANDO" getTarefa={getTarefas} /> ))}
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card bg-light">
                        <div className="card-header bg-success">
                            <h2 className="text-white text-center"><i className="fas fa-clipboard-check"></i> CONCLUIDO</h2>
                        </div>
                        <div className="card-body">
                        { tarefas.map(tarefa => ( <Tarefa dados={tarefa} key={tarefa.idTarefa} status="CONCLUIDO" getTarefa={getTarefas} /> ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Modal getTarefa={getTarefas}  />
    </>
  );
}
