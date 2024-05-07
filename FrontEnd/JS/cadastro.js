const fetchButtonData = () => {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      client_id: 0,
    };
  };
const API_GATEWAY = "http://localhost:8000/cadastrar";

const cadastar_btn = document.getElementById('button-cadastar')
const nome_input = document.getElementById('name')
const email_input = document.getElementById('email')
const telefone_input = document.getElementById('phone')
const senha_input = document.getElementById('password')
const confirma_senha = document.getElementById('confirm_password')



cadastar_btn.addEventListener('click',function() {
    if (nome_input.value == '' || email_input.value == '' || telefone_input.value == '' || senha_input.value == '' || confirma_senha == ''){
        
        alert("prencha todos os campos")
        validarFormulario()
        return false
    } if (senha_input.value != confirma_senha.value){
        
        alert("campos de senha diferentes")
        validarFormulario()
        return false
    }else{
        teste = validarFormulario()
        if(teste){
            inserir();
        }else{
            alert("Formulario com itens incorretos")
            
            
        }
    }



async function inserir(){
    let data = fetchButtonData()
        try{
            const response = await axios({
            method: "POST",
            url: API_GATEWAY,
            contentType: "application/json",
            data:data,
          });
          if (response.data.status === "OK") {
            alert(`Você se Cadastrou com sucesso`);
            location.replace("http:/FrontEnd/HTML/login.html")
        } else if(response.data.status === "EMAIL CADASTRADO") {
            alert(`O Email "${data.email}" já está Cadastrado.`);
        } else {
            alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
        }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Dados incorretos');
            } else {
                console.log('Erro ao atualizar o item:', error);
            }
        }
    }
})

