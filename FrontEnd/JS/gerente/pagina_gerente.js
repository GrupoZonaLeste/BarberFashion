const API_cadastrar_funcionario = getEndpoint_manager("cadastrar")
const API_listar_funcionarios = getEndpoint_manager("listar_funcionarios")
const API_deletar_funcionario = getEndpoint_manager("deletar_funcionario")
const API_listar_usuarios = getEndpoint_manager("listar_usuarios")
const API_cadastrar_servicos = getEndpoint_manager("cadastrar_servicos")
const API_listar_servicos = getEndpoint_manager("listar_servicos")
// Utilizando os endpoints para definir o endereço para realizar o fetch
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
    await fetch(API_cadastrar_funcionario, {
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
    await fetch(API_listar_funcionarios)
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
                
                await fetch(API_deletar_funcionario({funcid: btn_deletar.id}), {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                alert("Funcionário excluido com Sucesso!")
                location.reload()
            })
        });
    })
    .catch(erro => console.log(`erro: ${erro}`))
}

const divClientesCadastrados = document.getElementById('clientes_cadastrados')

async function addDivClientes(){
    await fetch(API_listar_usuarios)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            textNode = `<b style="font-size: 120%">Nome:</b> ${element.name} <b style="font-size: 120%">Email:</b> ${element.email}<br><hr><br>`
            const p = document.createElement('p')
            p.innerHTML = textNode
            p.style.margin = '5px'
            p.style.fontSize = '110%'

            divClientesCadastrados.appendChild(p)
        })
    })
    .catch(erro => console.log(erro))
}

const nomeServico = document.getElementById('nome-servico')
const descricaoServico = document.getElementById('descricao-servico')
const tempoServico = document.getElementById('tempo-servico')
const precoServico = document.getElementById('preco-servico')
const btnAddServico = document.getElementById('btn-add-servico')

btnAddServico.addEventListener('click', async () => {
    if (nomeServico.value === '' || descricaoServico === '' || tempoServico === '' || precoServico === ''){
        alert('PREENCHA TODOS OS DADOS')
        return
    }

    data = {
        "nome": nomeServico.value,
        "descricao": descricaoServico.value,
        "tempo": tempoServico.value,
        "preco": precoServico.value,
    }

    await fetch(API_cadastrar_servicos , {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    location.reload()
})

const divServicosCadastrados = document.getElementById('servicos-cadastrados')

async function AddDivServicos(){
    await fetch(API_listar_servicos)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            textDATA = `<h4>${element.nome}<h4><hr><br><h4>DESCRIÇÃO:</h4> ${element.descricao} <h4>TEMPO:<h4> ${element.tempo} <h4>PREÇO:<h4> ${element.preco} `;
            
            const btn_editar = document.createElement('button')
            const btn_delete = document.createElement('button')
            const p = document.createElement('p')
            const div_contentService = document.createElement('div')
            const div_textos = document.createElement('div')
            const div_btn = document.createElement('div')
            btn_delete.innerHTML = "DELETAR"
            btn_editar.innerHTML = "EDITAR"
            div_textos.id = 'text_service'
            div_contentService.id = 'content_service'
            id_corte = element._id
            btn_delete.id = id_corte.slice(9, 33)
            btn_editar.id = id_corte.slice(9, 33)

            div_btn.style.display = 'flex'
            div_btn.style.flexDirection = 'row'
            div_btn.style.justifyContent = 'space-around'
            btn_delete.style.backgroundColor = '#E74040'
            btn_delete.style.color = '#ffffff'
            btn_delete.onmousemove = function(){
                btn_delete.style.opacity = 0.5
            };
            btn_delete.onmouseout = function(){
                btn_delete.style.opacity = 1
            };

            p.innerHTML = textDATA
            div_textos.append(p)
            div_btn.appendChild(btn_delete)
            div_btn.appendChild(btn_editar)
            div_contentService.append(div_textos)
            div_contentService.append(div_btn)
            divServicosCadastrados.append(div_contentService)
        })
    })
}

document.addEventListener("DOMContentLoaded", AddDivServicos)
document.addEventListener("DOMContentLoaded",addDivClientes)
document.addEventListener("DOMContentLoaded", addDivFuncionarios)