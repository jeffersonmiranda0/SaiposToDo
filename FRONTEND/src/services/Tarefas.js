import Swal from "sweetalert2";
import api from "./api";
export default class Tarefas{
    static inserirRegistro = async (email, nome, descricao) => {
        let messageCamposObrigatorios = '';

        if(!email || email === ''){
          messageCamposObrigatorios += 'E-MAIL NÃO INFORMADO<br />';
        }
        if(!nome || nome === ''){
          messageCamposObrigatorios += 'NOME NÃO INFORMADO<br />';
        }
        if(!descricao || descricao === ''){
          messageCamposObrigatorios += 'DESCRIÇÃO NÃO INFORMADA<br />';
        }
        
        if(messageCamposObrigatorios !== ''){      
    
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: messageCamposObrigatorios,
            confirmButtonColor: '#d33',
          });
    
          return;
        }
        
        return await api.post('/tarefas/inserir', {email, nome, descricao});
    }
}