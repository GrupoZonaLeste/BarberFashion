//rota:
const API_GATEWAY = "http://localhost:8000/editar_cliente";
//token: pegar o id do usuário
const token = localStorage.getItem("token");
const token_decoded = parseJwt(token)
id = token_decoded.sub

async function getDataUsuario(){
    const options2 = {
        method: 'GET',
        url: 'http://localhost:8000/usuario/',
        params: {id: id},
        headers: {'User-Agent': 'insomnia/9.1.0'}
      };

    axios.request(options2).then(function (response) {
        console.log(response.data)
        nomeuser = response.data.name,
        emailuser = response.data.email,
        phoneuser = response.data.phone
        PutData(nomeuser, emailuser, phoneuser)
    }).catch(function (error) {
        console.error(error);
    });

}

function PutData(nome,email1,phone){
    document.getElementById('name').value = nome
    document.getElementById('email').value = email1
    document.getElementById('phone').value = phone
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
    url: API_GATEWAY,
    params: params
    } 

    await axios.request(options).then(function (response) {
        alert("Atualizado com sucesso!")
        console.log(response.data);
    }).catch(function (error) {
        console.log(error);
    });

    location.reload()
})

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

const inputFile = document.querySelector('#picture_input');
const pictureImage = document.querySelector('.picture_image');
const pictureImageTXT = 'Escolha uma Foto';
pictureImage.innerHTML = pictureImageTXT;

inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    
    if (file){
        const reader = new FileReader();
        reader.addEventListener('load', function(e) {
            const readerTarget = e.target;       
            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture_img');
            pictureImage.innerHTML = '';
            pictureImage.appendChild(img);
        
        })
        reader.readAsDataURL(file);
    } else{

    }
})

document.addEventListener('DOMContentLoaded', getDataUsuario)