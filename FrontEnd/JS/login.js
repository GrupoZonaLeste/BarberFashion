const fetchButtonData = () => {
    return {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value ,
        
    };
  };

const API_GATEWAY = "http://localhost:8000/logar"

const login_btn = document.getElementById('button-login')
const email = document.getElementById('email')
const senha = document.getElementById('password')


login_btn.addEventListener('click', async () => {
   
    logar();

    async function logar(){
        let data = fetchButtonData()
        
        console.log(data)
        
            const response = await axios({
            method: "POST",
            url: API_GATEWAY,
            contentType: "application/json",
            data:data,
          });
          console.log(response.data.status)
          if (response.data.status == "LOGIN CORRETO") {
            window.location.href = "http:/FrontEnd/HTML/pagina_cliente.html";
            alert(`Login feito com sucesso!`);
           
        } else {
            alert(`Este usuário não está cadastrado`);
        }
        
    }


})