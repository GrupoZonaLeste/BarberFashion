const API_editar = getEndpoint_client("editar")
const API_usuario = getEndpoint_client("get_usuario")
//API_Gateway definindo endereço para realizar o fetch

//token: pegar o id do usuário
const token = localStorage.getItem("token");
const token_decoded = parseJwt(token)
id = token_decoded.sub

function buscarImagemCliente(cliente_id) {
    console.log(cliente_id);
  
    // Constrói o nome do arquivo
    const filename = `user_${cliente_id}.webp`;
    console.log(filename);
  
  
    const imageUrl = `/BackEnd/pictures_clientes/${filename}`;
  
  
    const imgElement = document.getElementById('image_user');
  
    // Define a nova url na imagem 
    imgElement.src = imageUrl;
  
    // Caso de algum erro
    imgElement.onerror = function() {
  
        // URL Dos icones padroes do Gui
        const urlImagemAlternativa = '/FrontEnd/images/profile.png';
  
        imgElement.src = urlImagemAlternativa;
    };
  }

async function getDataUsuario(){
    const options2 = {
        method: 'GET',
        url: API_usuario,
        params: {id: id},
        headers: {'User-Agent': 'insomnia/9.1.0'}
      };

    axios.request(options2).then(function (response) {
        console.log(response.data)
        nomeuser = response.data.name,
        emailuser = response.data.email,
        phoneuser = response.data.phone
        PutData(id,nomeuser, emailuser, phoneuser)
    }).catch(function (error) {
        console.error(error);
    });

}

function PutData(id,nome,email1,phone){
    document.getElementById('name').value = nome
    document.getElementById('email').value = email1
    document.getElementById('phone').value = phone
    buscarImagemCliente(id)
}

const btn_update = document.getElementById('btnupdate')

btn_update.addEventListener('click', async function(){
    
    new_name = document.getElementById('name').value
    new_email = document.getElementById('email').value.trim()
    new_phone = document.getElementById('phone').value.trim()
     const params = { id: id };

    // Adicionar os campos ao objeto de parâmetros somente se tiverem sido preenchidos
    if (new_name !== '') params.name = new_name;
    if (new_email !== '') params.email = new_email;
    if (new_phone !== '') params.phone = new_phone;
    
    const options = {
    method: 'POST',
    url: API_editar,
    params: params
    } 
    Swal.fire({
        icon: "success",
        title: "Mudanças salvas!",
        showConfirmButton: false,
        timer: 1500
      }).then(async ()=>{
          await axios.request(options).then(function (response) {
        }).catch(function (error) {
            console.log(error);
        });
    })
        
});


function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

document.addEventListener('DOMContentLoaded', getDataUsuario)