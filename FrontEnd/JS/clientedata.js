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
    nome_campo.textContent = name
    email_campo.textContent = ("Email:"+email)
    phone_campo.textContent = ("Telfone:"+email)
    apresentation.textContent = ("Olá "+name+", Bem-vindo à Barbearia!")
}

