import React from "react";
import Swal from "sweetalert2";
import api from "./../../../services/api";

export default function Tarefa(props) {
  if(props.status !== props.dados.status) return (<></>);

  async function atualizarStatus(idTarefa, status, concluido)
  {

      if(concluido === true){
         
        Swal.fire({
          title: 'É preciso informar a senha de autorização',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Confirmar',
          cancelButtonText: 'Sair',
          showLoaderOnConfirm: true,
          allowOutsideClick: () => !Swal.isLoading()
        }).then(async (result) => {
          if(!result.isConfirmed) return;

          await gravarAtualizacaoStatus(idTarefa, status, result.value);
        })
        
        return;
      }
      
      await gravarAtualizacaoStatus(idTarefa, status);
  }  
  
  async function gravarAtualizacaoStatus(idTarefa, status, senha = '')
  {

      const response = await api.post('/tarefas/atualizar', {
        idTarefa, status, senha
      });
      
      if(response.data.status === true) {
        props.getTarefa();
        return;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: response.data.message,
        confirmButtonColor: '#d33',
      });
  }


  return (
    <>
    <div className="card mt-3 mb-3">
        <div className="card-body text-secondary">
          <div>
            <p className="m-0 fw-bolder"><i className="fas fa-envelope-open-text"></i> Descrição</p>
            <p className="m-0 mb-4">{props.dados.descricao}</p>
          </div>
          <div className="mb-2">
            <div className="badge bg-secondary me-2">{props.dados.nomeResponsavel}</div>
            <div className="badge bg-secondary">{props.dados.emailResponsavel}</div>
          </div>
          <hr />
          <div className="p-2 mt-3">
            <h5 className="fw-bold">Atualizar status</h5>
            <div className="input-group">
              {props.status !== 'PENDENTE' ? (<button className="btn btn-warning w-50 text-white" onClick={event => atualizarStatus(props.dados.idTarefa, 1, props.status === 'CONCLUIDO' ? true : false)} >PENDENTE</button>) : ''}
              {props.status !== 'EXECUTANDO' ? (<button className="btn btn-info w-50 text-white" onClick={event => atualizarStatus(props.dados.idTarefa, 2, false)} >EXECUTANDO</button>) : ''}
              {props.status !== 'CONCLUIDO' ? (<button className="btn btn-success w-50 text-white" onClick={event => atualizarStatus(props.dados.idTarefa, 3, false)} >CONCLUIDO</button>) : ''}
            </div>
          </div>
        </div>
    </div>
    </>
  );
}
