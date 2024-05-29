const input_email = document.getElementById("email")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const enviar_email = document.getElementById("enviar_email")
const spans = document.getElementById('span_email');

function emailValidate(){
    if(emailRegex.test(input_email.value))
        {
            removeError();
        }
        else
        {
            setError();
        }
}

function setError(){
    input_email.style.border = "2px solid #e63636";
    spans.style.display = 'block';

 }
 //4.2 estiliza os inputs que não estão mais com erro
 function removeError(){
     input_email.style.border = "";
     spans.style.display = 'none';
 }

 enviar_email.addEventListener('click',function() {
    console.log();
})

document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um ouvinte de eventos para o evento keypress
    input_email.addEventListener('keypress', function() {
        emailValidate()
    });
});