let tokenChecked = false;
async function checkTokenValidity() {
    if (tokenChecked) {
        return; // Se a função já foi chamada, retorna sem fazer nada
    }

    const token = localStorage.getItem("token"); 

    const options = {
        method: 'GET',
        url: 'http://localhost:8000/verificar-token/',
        params: {token: token},
        headers: {'User-Agent': 'insomnia/9.1.0'}
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
        if(response.data.status == "Token válido") {
            roleuser = retornarRoleUsuario()
            if (roleuser == 2){
                token_decoded = parseJwt(token)
                DataLoad()
            }else{
                alert("Você não pode acessar esta página")
                window.location.replace("http:/FrontEnd/HTML/index.html")
                return false;
            }
            return true;    
        } else {
            alert("ERRO NA AUTENTICAÇÂO TENTE NOVAMENTE")
            window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html");
            return false;
        }
    } catch (error) {
        alert("Você não está autenticado");
        console.error(error);
        window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html");
        return false;
    }

}

checkTokenValidity();
async function DataLoad(){
    GetData(token_decoded.sub);
}

function retornarIdUsuario(){
    const token = localStorage.getItem('token')
    const token_decoded = parseJwt(token)
    const id = token_decoded.sub

    return id
}
function retornarRoleUsuario(){
    const token = localStorage.getItem('token')
    const token_decoded = parseJwt(token)
    const role = token_decoded.role

    return role
}
