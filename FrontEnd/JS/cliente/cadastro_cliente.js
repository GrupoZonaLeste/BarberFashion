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

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
var mensagem = document.createElement("p")

cadastar_btn.addEventListener('click',function() {
    if (nome_input.value == '' || email_input.value == '' || telefone_input.value == '' || senha_input.value == '' || confirma_senha == ''){
        div_alerta.style.display = 'flex'
        div_alerta.style.flexDirection = 'column-reverse'
        div_alerta.style.alignItems = 'center'
        div_alerta.style.borderColor = '#E74040'
        mensagem.style.marginBottom = '1rem'
        mensagem.style.color = '#E74040'

        btnOk.style.backgroundColor = '#E74040'
        btnOk.style.borderColor = '#E74040'
        btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'

        mensagem.innerHTML = "Por Favor, Preencha Todos os Campos!";
        div_alerta.append(mensagem);
        btnOk.addEventListener('click', () =>{
            div_alerta.style.display = 'none'
        });
        //alert("prencha todos os campos")
        validarFormulario()
        return false
    } if (senha_input.value != confirma_senha.value){
        div_alerta.style.display = 'flex'
        div_alerta.style.flexDirection = 'column-reverse'
        div_alerta.style.alignItems = 'center'
        div_alerta.style.borderColor = '#E74040'
        mensagem.style.marginBottom = '1rem'
        mensagem.style.color = '#E74040'

        btnOk.style.backgroundColor = '#E74040'
        btnOk.style.borderColor = '#E74040'
        btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'

        mensagem.innerHTML = "Senhas inseridas indiferentes!";
        div_alerta.append(mensagem);
        btnOk.addEventListener('click', () =>{
            div_alerta.style.display = 'none'
        });
        //alert("campos de senha diferentes")
        validarFormulario()
        return false
    }else{
        teste = validarFormulario()
        if(teste){
            inserir();
        }else{
            div_alerta.style.display = 'flex'
            div_alerta.style.flexDirection = 'column-reverse'
            div_alerta.style.alignItems = 'center'
            div_alerta.style.borderColor = '#E74040'
            mensagem.style.marginBottom = '1rem'
            mensagem.style.color = '#E74040'
    
            btnOk.style.backgroundColor = '#E74040'
            btnOk.style.borderColor = '#E74040'
            btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'
            mensagem.innerHTML = "Formulario com campos incompletos!";
            div_alerta.append(mensagem);
            //alert("Formulario com itens incorretos")
            btnOk.addEventListener('click', () =>{
                div_alerta.style.display = 'none'
            });
            
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
            div_alerta.style.display = 'flex'
            div_alerta.style.flexDirection = 'column-reverse'
            div_alerta.style.alignItems = 'center'
            div_alerta.style.borderColor = '#00D446'
            mensagem.innerHTML = "Você Cadastrou-se com Sucesso!";
            div_alerta.append(mensagem);
            mensagem.style.color = '#00D446'
            mensagem.style.marginBottom = '1rem'
            mensagem.style.color = '#00D446'
    
            btnOk.style.backgroundColor = '#00D446'
            btnOk.style.borderColor = '#00D446'
            btnOk.style.boxShadow = '0px 0px 16px -5px #00D446'
            //alert(`Você se Cadastrou com sucesso`);
            
            btnOk.addEventListener('click', () =>{
                div_alerta.style.display = 'none'
                location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
            });
            
        } else if(response.data.status === "EMAIL CADASTRADO") {
            div_alerta.style.display = 'flex'
            div_alerta.style.flexDirection = 'column-reverse'
            div_alerta.style.alignItems = 'center'
            div_alerta.style.borderColor = '#FF9800'
            mensagem.style.marginBottom = '1rem'
            mensagem.style.color = '#FF9800'

            btnOk.style.backgroundColor = '#FF9800'
            btnOk.style.borderColor = '#FF9800'
            btnOk.style.boxShadow = '0px 0px 16px -5px #FF9800'

            var link = document.createElement("a")
            link.href = '../HTML/login.html'
            link.textContent = 'Clique aqui para ser redirecionado'
            mensagem.innerHTML = "Email já está Cadastrado,  ";
            mensagem.append(link);
            div_alerta.append(mensagem);
            btnOk.addEventListener('click', () =>{
                div_alerta.style.display = 'none'
            });
           
            //alert(`O Email "${data.email}" já está Cadastrado.`);
        } else {
            div_alerta.style.display = 'flex'
            div_alerta.style.flexDirection = 'column-reverse'
            div_alerta.style.alignItems = 'center'
            div_alerta.style.borderColor = '#E74040'
            mensagem.style.marginBottom = '1rem'
            mensagem.style.color = '#E74040'

            btnOk.style.backgroundColor = '#E74040'
            btnOk.style.borderColor = '#E74040'
            btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'
            mensagem.innerHTML = "Ocorreu um Erro ao Excluir o item com o ID!";
            div_alerta.append(mensagem);
            btnOk.addEventListener('click', () =>{
                div_alerta.style.display = 'none'
            })
            //alert(`Ocorreu um erro ao excluir o item com o ID ${data}.`);
        }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                div_alerta.style.display = 'flex'
                div_alerta.style.flexDirection = 'column-reverse'
                div_alerta.style.alignItems = 'center'
                div_alerta.style.borderColor = '#E74040'
                mensagem.style.marginBottom = '1rem'
                mensagem.style.color = '#E74040'
    
                btnOk.style.backgroundColor = '#E74040'
                btnOk.style.borderColor = '#E74040'
                btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'
                mensagem.innerHTML = "Dados Incorretos!";
                div_alerta.append(mensagem);
                btnOk.addEventListener('click', () =>{
                    div_alerta.style.display = 'none'
                });
                //alert('Dados incorretos');
            } else {
                div_alerta.style.display = 'flex'
                div_alerta.style.flexDirection = 'column-reverse'
                div_alerta.style.alignItems = 'center'
                div_alerta.style.borderColor = '#E74040'
                mensagem.style.marginBottom = '1rem'
                mensagem.style.color = '#E74040'
    
                btnOk.style.backgroundColor = '#E74040'
                btnOk.style.borderColor = '#E74040'
                btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'
                mensagem.innerHTML = "Erro ao Atualizar o Item!";
                div_alerta.append(mensagem);
                btnOk.addEventListener('click', () =>{
                    div_alerta.style.display = 'none'
                });
                //console.log('Erro ao atualizar o item:', error);
            }
        }
    }
})

