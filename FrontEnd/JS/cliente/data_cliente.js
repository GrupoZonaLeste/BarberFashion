function retornarIdUsuario(){
  const token = localStorage.getItem('token')
  const token_decoded = parseJwt(token)
  const id = token_decoded.sub
  return id
}


function GetData(iduser){
const options = {
  method: 'GET',
  url: 'http://localhost:8000/usuario/',
  params: {id: iduser},
  headers: {'User-Agent': 'insomnia/9.1.0'}
};

axios.request(options).then(function (response) {
  console.log(response.data)
  nomeuser = response.data.name,
  emailuser = response.data.email,
  phoneuser = response.data.phone
  PutData(nomeuser, emailuser, phoneuser)
}).catch(function (error) {
  console.error(error);
});
}

function PutData(name,email,phone){
    var nome_campo = document.getElementById("name")
    var email_campo = document.getElementById("email")
    var phone_campo = document.getElementById("phone")
    var apresentation = document.getElementById("apresentation")
    let NameTitle = name.charAt(0).toUpperCase() + name.slice(1);
    
    //imagem
    
    cliente_id = retornarIdUsuario()
    buscarImagemCliente(cliente_id)

    //texto
    nome_campo.textContent = NameTitle
    email_campo.textContent = ("Email: "+email)
    phone_campo.textContent = ("Telefone: "+phone)
    apresentation.textContent = ("Olá "+NameTitle+", Bem-vindo à Barbearia!")
}

function buscarImagemCliente(cliente_id) {
  console.log(cliente_id);

  // Constrói o nome do 
  const filename = `user_${cliente_id}.jpg`;
  console.log(filename);

  const imageUrl = `http://127.0.0.1:51982/BackEnd/clientes_pictures/${filename}`;

  const imgElement = document.getElementById('image_user');

  imgElement.src = imageUrl;
}
