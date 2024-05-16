const nomeInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('senha')

const fetchButtonData = () => {
    return {
      name: nomeInput.value,
      email: emailInput.value,
      password: senhaInput.value,
      funcionario_id: 0,
    };
  };
const btn_cadastrarFuncionario = document.getElementById('cadastrarFuncionario')  

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
const btnDeletar = document.getElementById('btn-conf')
const btnCancelar = document.getElementById('btn-canc')
var mensagem = document.createElement("p")
const div_confirmacao = document.getElementById('confirm')

btn_cadastrarFuncionario.addEventListener('click', async () => {
    if(nomeInput.value == '' || emailInput.value == '' || senhaInput.value == ''){
        div_alerta.style.display = 'flex'
        div_alerta.style.flexDirection = 'column-reverse'
        div_alerta.style.alignItems = 'center'
        div_alerta.style.borderColor = '#E74040'
        mensagem.style.marginBottom = '1rem'
        mensagem.style.color = '#E74040'

        btnOk.style.backgroundColor = '#E74040'
        btnOk.style.borderColor = '#E74040'
        btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'

        mensagem.innerHTML = "Preencha os Campos do Cadastro!";
        div_alerta.append(mensagem);
        btnOk.addEventListener('click', () =>{
            div_alerta.style.display = 'none'
        });
        return
    }

    let data = fetchButtonData()
    await fetch("http://localhost:8000/cadastrar_funcionario/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)  
        try {
            if (response.status === "OK") {
                alert(`Funcionário cadastrado com sucesso`);
        } else if(response.status === "EMAIL CADASTRADO") {
            alert(`O Email "${data.email}" já está Cadastrado.`);
        }
        } catch (error) {
        if (error.response && error.response.status === 422) {
                alert('Dados incorretos');
            } else {
                console.log('Erro ao atualizar o item:', error);
            }
        }
    })

    nomeInput.value = ''
    emailInput.value = ''
    senhaInput.value = ''
    location.reload()
})

const divFuncionariosCadastrados = document.getElementById('funcionarios_cadastrados')

async function addDivFuncionarios(){
    await fetch('http://localhost:8000/listar_funcionarios/')
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            textNode = `<b style="font-size: 120%">Nome:</b> ${element.name} <b style="font-size: 120%">Email:</b> ${element.email}<br>`
            const p = document.createElement('p')

            const btn_editar = document.createElement('button')
            const btn_deletar = document.createElement('button')
            btn_editar.innerText = "Editar"
            btn_editar.id = element.funcionario_id
            btn_editar.style.cursor = "pointer"
            
            btn_deletar.innerText = "Deletar"
            btn_deletar.id = element.funcionario_id
            btn_deletar.style.cursor = "pointer"
            

            p.innerHTML = textNode
            p.appendChild(btn_editar)
            p.appendChild(btn_deletar)

            divFuncionariosCadastrados.appendChild(p)

            btn_deletar.addEventListener('click', async ()=> {
                await fetch(`http://localhost:8000/deletar_funcionario/${btn_deletar.id}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                location.reload()
            })
        });
    })
    .catch(erro => console.log(`erro: ${erro}`))
}

document.addEventListener("DOMContentLoaded", addDivFuncionarios)