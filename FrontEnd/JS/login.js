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

cadastar_btn.addEventListener('click', async () => {
    alert("oi");
    logar();
    

    async function logar(){
        let data = fetchButtonData()
        try{
            const response = await axios({
            method: "POST",
            url: API_GATEWAY,
            contentType: "application/json",
            data:data,
          });
          if (response.data.status === "LOGIN CORRETO") {
            alert(`Login feito com sucesso!`);
           
        } else {
            alert(`Este usuário não está cadastrado`);
        }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                alert('Dados incorretos');
            }
        }
    }


})