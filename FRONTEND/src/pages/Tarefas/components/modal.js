import React, { useState } from "react";
import Swal from "sweetalert2";
import Tarefas from "../../../services/Tarefas";

export default function Modal(props) {

  const [email, setEmail]         = useState("");
  const [descricao, setDescricao] = useState("");
  const [nome, setNome]           = useState("");


  async function handleSubmit(event) {
    event.preventDefault();

    await Tarefas.inserirRegistro(email, descricao, nome).then((result) => {

      if(result.data.status === true){

        props.getTarefa(); 

        Swal.fire({
          icon: 'success',
          title: 'Sucesso',
          html: 'Tarefa inserida com sucesso'
        });

        setEmail('');
        setDescricao('');
        setNome('');
      }

    });
  }



  return (
    <>
    <form className="needs-validation" onSubmit={handleSubmit}>
    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header bg-success">
          <h5 className="modal-title text-white" id="exampleModalLabel">Incluir nova tarefa</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="form-floating mb-3">
            <input type="nome" 
                    className="form-control" 
                    id="Nome" 
                    placeholder="nome"
                    value={nome}
                    onChange={event => setNome(event.target.value)}
                    required/>
            <label for="Nome">Informe seu Nome</label>
          </div>
          <div className="form-floating mb-3">
            <input type="email" 
                   className="form-control" 
                   id="email" 
                   placeholder="email"
                   value={email}
                   onChange={event => setEmail(event.target.value)}
                   required/>
            <label for="email">Informe seu e-mail</label>
          </div>
          <div className="form-floating mb-3">
            <textarea  type="descricao" 
            className="form-control" 
            id="descricao" 
            placeholder="descricao" 
            value={descricao}
            onChange={event => setDescricao(event.target.value)}
            style={{height: 150}} required></textarea>
            <label for="descricao">Informe a descrição da tarefa</label>
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-success" type="submit">Salvar</button>
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Sair</button>
        </div>
      </div>
    </div>
  </div>
  </form>
    </>
  );
}
