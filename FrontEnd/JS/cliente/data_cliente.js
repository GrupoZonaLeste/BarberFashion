const API_usuario = getEndpoint_client("get_usuario")
//API_Gateway definindo endereço para realizar o fetch

function retornarIdUsuario(){
  const token = localStorage.getItem('token')
  const token_decoded = parseJwt(token)
  const id = token_decoded.sub
  return id
}

function GetData(iduser){
const options = {
  method: 'GET',
  url: API_usuario,
  params: {id: iduser},
  
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

function buscarImagemServico(servico_id) {
  // Constrói o nome do arquivo
  const filename = `servico_${servico_id}.webp`;
  const imageUrl = `/BackEnd/pictures_servicos/${filename}`;
  const imgElement = document.getElementById(servico_id);

  // Define a nova url na imagem 
  imgElement.src = imageUrl;
  
  // Caso de algum erro
  imgElement.onerror = function() {
      const urlImagemAlternativa = '/FrontEnd/images/LogoMarca.png';
      imgElement.src = urlImagemAlternativa;
  };
}

function buscarImagemFuncionario(tag, funcid) {

  // Constrói o nome do arquivo
  const filename = `funcionario_${funcid}.webp`;
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
