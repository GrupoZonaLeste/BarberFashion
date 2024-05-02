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
            
        } else {
            alert("ERRO NA AUTENTICAÇÂO TENTE NOVAMENTE")
            window.location.replace("http:/FrontEnd/HTML/login.html");
        }
    } catch (error) {
        alert("Você não está autenticado");
        console.error(error);
        window.location.replace("http:/FrontEnd/HTML/login.html");
    }

    // Marca que a função foi chamada
    tokenChecked = true;
}

// Chamar a função de verificação de token imediatamente após o carregamento do script
checkTokenValidity();