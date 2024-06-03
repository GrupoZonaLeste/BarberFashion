
const API_fotos_servicos = getEndpoint_manager('foto_servicos')
const API_fotos_funcinoarios = getEndpoint_manager('foto_funcionarios')

const token = localStorage.getItem("token");
token_decoded = parseJwt(token);

const get_gerente_name = token_decoded.name;
let Nome_gerente = get_gerente_name.charAt(0).toUpperCase() + get_gerente_name.slice(1);

var mensagem = document.getElementById("apresentation");
mensagem.textContent = ("Olá Senhor "+ Nome_gerente);


async function putFotoServico(){
    const inputimg = document.getElementById('picture_input')
    const nomeServico = document.getElementById('nome-servico')

    const form = new FormData();
    
    form.append("image", inputimg.files[0]);
    
    const options = {
      method: 'POST',
      url: API_fotos_servicos,
      params: {id: nomeServico.value},
      data: form
    };
    
    await axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
}

async function putFotoFuncionario(funcid){
    const inputimg = document.getElementById('picture_input_funcionario')
    
    const form = new FormData();
    form.append("image", inputimg.files[0]);
    
    const options = {
      method: 'POST',
      url: API_fotos_funcinoarios,
      params: {id: funcid},
      data: form
    };
    
    await axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
}

document.getElementById('btn-add-servico').addEventListener('click', () => {
    putFotoServico();
})


function buscarImagemServico(tag, servico_id) {
    // Constrói o nome do arquivo
    const filename = `servico_${servico_id}.jpeg`;
    const imageUrl = `/BackEnd/pictures_servicos/${filename}`;

    // Define a nova url na imagem 
    tag.src = imageUrl;
  
    // Caso de algum erro
    tag.onerror = function() {
        // URL Dos icones padroes do Gui
        const urlImagemAlternativa = '/FrontEnd/images/LogoMarca.png';
        tag.src = urlImagemAlternativa;
    };
    
    // Caso de algum erro
}

function buscarImagemCliente(tag, cliente_id) {

    // Constrói o nome do arquivo
    const filename = `user_${cliente_id}.webp`;
    const imageUrl = `/BackEnd/pictures_clientes/${filename}`;

    // Define a nova url na imagem 
    tag.src = imageUrl;
  
    // Caso de algum erro
    tag.onerror = function() {
        // URL Dos icones padroes do Gui
        const urlImagemAlternativa = '/FrontEnd/images/profile.png';
        tag.src = urlImagemAlternativa;
    };
}

function buscarImagemFuncionario(tag, funcid) {

    // Constrói o nome do arquivo
    const filename = `funcionario_${funcid}.jpeg`;
    const imageUrl = `/BackEnd/pictures_funcionarios/${filename}`;

    // Define a nova url na imagem 
    tag.src = imageUrl;
  
    // Caso de algum erro
    tag.onerror = function() {
        // URL Dos icones padroes do Gui
        const urlImagemAlternativa = '/FrontEnd/images/profile.png';
        tag.src = urlImagemAlternativa;
    };
}

  document.addEventListener("DOMContentLoaded", function() {
      const fileInput = document.getElementById('picture_input_funcionario');

      fileInput.addEventListener('change', function(event) {
          const file = event.target.files[0];
          const reader = new FileReader();
          
          reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.querySelector('[name=imagem-funcionario]').setAttribute('src', imageUrl);
        };
        
        reader.readAsDataURL(file);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('picture_input');
    
    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const imageUrl = event.target.result;
            document.querySelector('[name=imagem-servico]').setAttribute('src', imageUrl);
        };
        
        reader.readAsDataURL(file);
    });
});
