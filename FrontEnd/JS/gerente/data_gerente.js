const token = localStorage.getItem("token");
token_decoded = parseJwt(token);

const get_gerente_name = token_decoded.name;
let Nome_gerente = get_gerente_name.charAt(0).toUpperCase() + get_gerente_name.slice(1);

var mensagem = document.getElementById("apresentation");
mensagem.textContent = ("Olá Senhor "+ Nome_gerente);