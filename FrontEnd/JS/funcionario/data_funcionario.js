const token = localStorage.getItem("token");
token_decoded = parseJwt(token);

const get_funcionario_name = token_decoded.name;
let Nome_funcionario = get_funcionario_name.charAt(0).toUpperCase() + get_funcionario_name.slice(1);

var mensagem = document.getElementById("apresentation");
mensagem.textContent = ("Olá Senhor "+ Nome_funcionario);