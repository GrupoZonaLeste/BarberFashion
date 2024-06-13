document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form_cadastrar_funcionario');
    const spans = document.querySelectorAll('.span-required');
    const campos = document.querySelectorAll('.required');
    const submitButton = document.getElementById('cadastrarFuncionario');

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexName = /^[a-zA-Z\s]*$/;

    
    function setError(index) {
        campos[index].style.border = '2px solid #e63636';
        spans[index].style.display = 'block';
    }

    function removeError(index) {
        campos[index].style.border = '';
        spans[index].style.display = 'none';
    }

    function nameValidate() {
        if (campos[0].value.length < 3 || !regexName.test(campos[0].value)) {
            setError(0);
        } else {
            removeError(0);
        }
        checkFormValidity();
    }

    function emailValidate() {
        if (!emailRegex.test(campos[1].value)) {
            setError(1);
        } else {
            removeError(1);
        }
        checkFormValidity();
    }

    function senhaValidate() {
        if (campos[2].value.length < 6) {
            setError(2);
        } else {
            removeError(2);
        }
        checkFormValidity();
    }

  
    function checkFormValidity() {
        const isValid = Array.from(spans).every(span => span.style.display === 'none');
        submitButton.disabled = !isValid;
        if (submitButton.disabled) {
            submitButton.classList.add('disabled-button');
        } else {
            submitButton.classList.remove('disabled-button');
        }
    }
    


    campos[0].addEventListener('input', nameValidate);
    campos[1].addEventListener('input', emailValidate);
    campos[2].addEventListener('input', senhaValidate);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        nameValidate();
        emailValidate();
        senhaValidate();

        if (!submitButton.disabled) {

            console.log("Formulário válido e pronto para envio");
        }
    });


    checkFormValidity();
});
