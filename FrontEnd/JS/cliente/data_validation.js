// 1.1Elementos do formulario
//campos = itera entre a classe .required dos inputs do formulario 
const form = document.getElementById("form");
const spans = document.querySelectorAll('.span-required');
const campos = document.querySelectorAll('.required');
const submit = document.getElementById("button-cadastar");

// 1.2 Regex de validação
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
const regexName =  /^[a-zA-Z\s]*$/;
//1.3 funções de validação:
function nameValidate(){
    if(campos[0].value.length < 3)
        {
            setError(0); 
        }
        else
        {
            removeError(0);
        }
}
function emailValidate(){
    if(emailRegex.test(campos[1].value))
        {
            removeError(1);
        }
        else
        {
            setError(1);
        }
}
function phoneValidate(){
    if(phoneRegex.test(campos[2].value))
        {
            removeError(2);
        }else{
            setError(2);
        }
    //Nao permitir a escrita de letras
    limpar_letras = campos[2].value.replace(/\D/g, "").substring(0,11);
    var numeroArray = limpar_letras.split("");
    var numeroFormatado = "";
    //formata os dois primeiros numero entre parenteses
    if(numeroArray.length > 0){
        numeroFormatado += `(${numeroArray.slice(0,2).join("")})`;
    }
    // formata os 5 primeiro numeros antes do traço
    if(numeroArray.length > 2){
        numeroFormatado += `${numeroArray.slice(2,7).join("")}`;
    }
    //formata o traço e os 4 números após o traço
    if(numeroArray.length > 2){
        numeroFormatado += `-${numeroArray.slice(7,11).join("")}`;
    }
    campos[2].value = numeroFormatado;
    
}
function passwordValidate(){
    if(campos[3].value.length < 8)
        {
            setError(3);
        }else{
            removeError(3);
            confirmPassword();
        }
}

function confirmPassword(){
    if(campos[3].value == campos[4].value && campos[4].value.length >=8){
        removeError(4);
    }else{
        setError(4);
    }
}

//3 Função geral
function validarFormulario() {
    // Chama todas as funções de validação
    nameValidate();
    emailValidate();
    phoneValidate();
    passwordValidate();
    confirmPassword();
    
    // Verifica se algum erro ainda está presente
    for (let i = 0; i < spans.length; i++) {
        if (spans[i].style.display == 'block') {
            
            return false; 
            
        }
    }
    return true;
}


//4 - operadores de Erro

//4.1 estiliza os inputs com erro
function setError(index){
    campos[index].style.border = "2px solid #e63636";
    spans[index].style.display = 'block';
 }
 //4.2 estiliza os inputs que não estão mais com erro
 function removeError(index){
     campos[index].style.border = "";
     spans[index].style.display = 'none';
 }
  //4.3 impede que seja escrito numeros e caracteres especiais no input nome 
 document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de eventos para o evento keypress
    campos[0].addEventListener('keypress', function(event) {
        // Verifica se a tecla pressionada é uma letra comum (A-Z ou a-z)
        if (!regexName.test(event.key)) {
            event.preventDefault();
        }
    });
});