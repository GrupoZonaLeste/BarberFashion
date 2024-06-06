const API_upload = getEndpoint_client("upload")
//API_Gateway definindo endereço para realizar o fetch

document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('picture_input');

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.querySelector('.picture_img').setAttribute('src', imageUrl);
        };

        reader.readAsDataURL(file);
    });
});

function enviarImagem() {
    // Cria um novo objeto FormData
    const formData = new FormData();
    function retornarIdUsuario(){
        const token = localStorage.getItem('token')
        const token_decoded = parseJwt(token)
        const id = token_decoded.sub
    
        return id
    }
    const user_id = retornarIdUsuario();
    // Obtém o input de arquivo
    const input = document.getElementById('picture_input');

    // Verifica se um arquivo foi selecionado pelo usuário
    if (input.files.length > 0) {
        // Adiciona o arquivo ao FormData
        formData.append('image', input.files[0]);

        // Configura as opções da requisição Axios
        const options = {
            method: 'POST',
            url: API_upload,
            params: {id: user_id},
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData
        };

        // Faz a requisição Axios
        axios.request(options)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.error(error);
            });
    } else {
        console.error('Nenhum arquivo selecionado.');
    }
}

// Adiciona um listener para o evento de clique no botão de confirmar
document.getElementById('btnupdate').addEventListener('click', function(event) {
    event.preventDefault(); // Evita o comportamento padrão do botão (enviar o formulário)
    enviarImagem(); // Chama a função para enviar a imagem selecionada pelo usuário
});
