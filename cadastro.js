const cadastar_btn = document.getElementById('button-cadastar')

const nome_input = document.getElementById('name')
const email_input = document.getElementById('email')
const telefone_input = document.getElementById('phone')
const senha_input = document.getElementById('password')
const confirma_senha = document.getElementById('confirm_password')

cadastar_btn.addEventListener('click', async () => {
    if (nome_input.value == '' || email_input.value == '' || telefone_input.value == '' || senha_input.value == '' || confirma_senha == ''){
        alert("prencha todos os campos")
        return
    } if (senha_input.value != confirma_senha.value){
        alert("campos de senha diferentes")
        return
    }

    await fetch("http://localhost:8000/cadastrar", {
        method: "POST",
        body: JSON.stringify({
            "nome": nome_input.value,
            "email": email_input.value,
            "telefone": telefone_input.value,
            "senha": senha_input.value,
        }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});

    nome_input.value = ''
    email_input.value = ''
    telefone_input.value = ''
    senha_input.value = ''
    confirma_senha.value = ''
})

