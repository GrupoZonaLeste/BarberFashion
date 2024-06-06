const input_email = document.getElementById("email")
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
    toggleButton(false)

 }
 //4.2 estiliza os inputs que não estão mais com erro
 function removeError(){
     input_email.style.border = "";
     spans.style.display = 'none';
     toggleButton(true)
 }


function toggleButton(state) {
    const btn_email = document.getElementById("btn_email");
    btn_email.disabled = !state; // Se state for true, o botão é habilitado (disabled = false); se state for false, o botão é desabilitado (disabled = true)
}
