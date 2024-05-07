const fetchButtonData = () => {
    return {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value ,
        
    };
  };
  const saveTokenToLocal = (token) => {
    localStorage.setItem('token', token);
  };
const API_GATEWAY = "http://localhost:8000/login"

const login_btn = document.getElementById('button-login')
const email = document.getElementById('email')
const senha = document.getElementById('password')


login_btn.addEventListener('click', async () => {
   
    logar();

    async function logar(){

    data = fetchButtonData()
    const options = {
        method: 'POST',
        url: 'http://localhost:8000/login/',
        params: {email: data.email, senha: data.password, '': ''},
        headers: {'User-Agent': 'insomnia/9.1.0'}
      };
          axios.request(options).then(function (response) {
            console.log(response)
            const token = response.data.token;
            const tipousuario = response.data.tipo_usuario[0]
            console.log(tipousuario)
            saveTokenToLocal(token);
            if(tipousuario == 'cliente'){
              window.location.href = "http:/FrontEnd/HTML/pagina_cliente.html";
            } 
            if(tipousuario == 'adm'){
                window.location.href = "http:/FrontEnd/HTML/pagina_gerente.html";
            } 
            if(tipousuario == 'funcionario'){
                window.location.href = "http:/FrontEnd/HTML/pagina_funcionario.html";
            }
            checkTokenValidityLogin();

          }).catch(function (error) {
            console.error(error);
            alert("Usuario não encontrado")
          });
          
    }


})
