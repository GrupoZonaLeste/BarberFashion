const API_login = getEndpoint_auth("login")
//API_Gateway definindo endereço para realizar o fetch atraves dos endpoints prédefinidos no arquivo endpoint.js

const fetchButtonData = () => {
  return {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value ,
      
  };
};
const saveTokenToLocal = (token) => {
  localStorage.setItem('token', token);
};

const login_btn = document.getElementById('button-login')
const email = document.getElementById('email')
const senha = document.getElementById('password')

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
var mensagem = document.createElement("p")
/*
function Alerta(msg){
div_alerta.style.display = 'flex'
div_alerta.style.flexDirection = 'column-reverse'
div_alerta.style.alignItems = 'center'
div_alerta.style.borderColor = '#E74040'
mensagem.style.marginBottom = '1rem'
mensagem.style.color = '#E74040'
btnOk.style.backgroundColor = '#E74040'
btnOk.style.borderColor = '#E74040'
btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'
mensagem.innerHTML = msg;
div_alerta.append(mensagem);
btnOk.addEventListener('click', () =>{
div_alerta.style.display = 'none'
              });
}
*/
login_btn.addEventListener('click', async () => {
  if(fetchButtonData().email === '' || fetchButtonData().password === ''){
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Por favor, preencha os campos antes de prosseguir.",
      });
      return
  }
  logar();

  async function logar(){
    
    data = fetchButtonData()
    const options = {
      method: 'POST',
      url: API_login,
      params: {email: data.email, senha: data.password, '': ''},
    };
    
    
    axios.request(options).then(function (response) {
      console.log(response)
      const token = response.data.token;
      const tipousuario = response.data.tipo_usuario[0]
      console.log(tipousuario)
      saveTokenToLocal(token);
      Swal.fire({
        icon: "success",
        title: "Login realizado!",
        showConfirmButton: false,
        timer: 1500
      }).then((result) =>{
        if(tipousuario == 'cliente'){
          window.location.href = "http:/FrontEnd/HTML/cliente/pagina_cliente.html";
        } 
        if(tipousuario == 'adm'){
          window.location.href = "http:/FrontEnd/HTML/gerente/pagina_gerente.html";
        } 
        if(tipousuario == 'funcionario'){
          window.location.href = "http:/FrontEnd/HTML/funcionario/pagina_funcionario.html";
        }
        checkTokenValidityLogin();      
      });
      }).catch(function (error) {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Email ou senha incorretos. Por favor, corrija-os antes de prosseguir.",
        });
      });
      
    }
    
    
  })
  