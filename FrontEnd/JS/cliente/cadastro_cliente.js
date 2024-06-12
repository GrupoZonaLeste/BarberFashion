const API_cadastrar = getEndpoint_auth("cadastrar")
//API_Gateway definindo endereço para realizar o fetch
const fetchButtonData = () => {
    return {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('password').value,
      client_id: 0,
    };
  };

const cadastar_btn = document.getElementById('button-cadastar')
const nome_input = document.getElementById('name')
const email_input = document.getElementById('email')
const telefone_input = document.getElementById('phone')
const senha_input = document.getElementById('password')
const confirma_senha = document.getElementById('confirm_password')

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
var mensagem = document.createElement("p")

cadastar_btn.addEventListener('click',function() {
    if (nome_input.value == '' || email_input.value == '' || telefone_input.value == '' || senha_input.value == '' || confirma_senha == ''){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha os campos antes de prosseguir.",
          });
        validarFormulario()
        return false
    }else{
        teste = validarFormulario()
        if(teste){
            inserir();
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Por favor, preencha os campos antes de prosseguir.",
              });
        }
    }

async function inserir(){
    let data = fetchButtonData()
        try{
            const response = await axios({
            method: "POST",
            url: API_cadastrar,
            contentType: "application/json",
            data:data,
          });
          if (response.data.status === "OK") {
            Swal.fire({
                icon: "success",
                title: "Cadastro Concluído",
                text: "Seu cadastro foi realizado com sucesso!",
                showConfirmButton: false,
                timer: 1500
              }).then((result) => {
                  location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
              })
            

            
        } else if(response.data.status === "EMAIL CADASTRADO") {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `O Email ${data.email} já está cadastrado.`,
              });
              //alert(`O Email "${data.email}" já está Cadastrado.`);
            } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Ocorreu um erro ao excluir o item com o ID ${data}`,
              });
              
              //alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "dados incorretos"
                  });
                  
                  //alert('Dados incorretos');
                } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Erro ao atualizar o item", error
                  });

                //console.log('Erro ao atualizar o item:', error);
            }
        }
    }
})

