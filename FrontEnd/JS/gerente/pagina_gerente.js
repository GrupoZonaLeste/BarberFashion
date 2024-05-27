const API_cadastrar_funcionario = getEndpoint_manager("cadastrar")
const API_listar_funcionarios = getEndpoint_manager("listar_funcionarios")
const API_deletar_funcionario = getEndpoint_manager("deletar_funcionario")
const API_listar_usuarios = getEndpoint_manager("listar_usuarios")
const API_cadastrar_servicos = getEndpoint_manager("cadastrar_servicos")
const API_listar_servicos = getEndpoint_manager("listar_servicos")
const API_excluir_servicos = getEndpoint_manager("deletar_servicos")
const API_editar_servicos = getEndpoint_manager("editar_servicos")
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
            textNode = `<b style="font-size: 120%">Nome:</b> ${element.name} <b style="font-size: 120%">Email:</b> ${element.email}<br><br>`
            const p = document.createElement('p')
            p.innerHTML = textNode
            p.style.margin = '5px'
            p.style.fontSize = '110%'
            p.id = 'content_service'

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
        
        nomeServico.value = nomeServico.value.toUpperCase()
              
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
const divEditarServicos = document.querySelector('.modal_editar_Servicos')


async function AddDivServicos(){
    await fetch(API_listar_servicos)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            textDATA = `<h4>${element.nome}<h4><hr><br> <p>${element.descricao}</p><br> <h4>TEMPO: ${element.tempo} min</h4>  <h4>PREÇO: R$ ${element.preco}<h4>`;
            
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
            
            btn_delete.addEventListener('click', async () => {
                await fetch(API_excluir_servicos( {nome: element.nome}) , {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                alert("Serviço excluido com Sucesso!")
                location.reload()
            })
            
            btn_editar.name = "btn-editar-servico"
            btn_editar.addEventListener('click', () => {
               const nomeapi = element.nome
               
               divEditarServicos.style.display = 'block'

               const divEditarServicos2 = document.getElementById('editar_servicos')
               const formEditarCorte = document.createElement('form')
               const btn_fechar_editar = document.createElement('button')
               const btn_confimar_editar = document.createElement('button')
               btn_confimar_editar.innerText = "Confirmar"
               btn_fechar_editar.innerText = "Cancelar"
               btn_fechar_editar.style.backgroundColor = '#E74040'
               btn_fechar_editar.style.color = '#ffffff'
               btn_fechar_editar.onmousemove = function(){
                   btn_fechar_editar.style.opacity = 0.5
               };
               btn_fechar_editar.onmouseout = function(){
                   btn_fechar_editar.style.opacity = 1
               };

               const LabelNome = document.createElement('label')
               LabelNome.innerText = 'Editar nome'
               const LabelDescricao = document.createElement('label')
               LabelDescricao.innerText = 'Editar descricao'
               const LabelTempo = document.createElement('label')
               LabelTempo.innerText = 'Editar tempo'
               const LabelPreco = document.createElement('label')
               LabelPreco.innerText = 'Editar preço'

               const NomeInput = document.createElement('input')
               NomeInput.required = true
               NomeInput.value = element.nome
               NomeInput.style.height = '20px';
               
               const DescricaoInput = document.createElement('textarea')
               DescricaoInput.required = true
               DescricaoInput.value = element.descricao
               DescricaoInput.rows= "5"
               DescricaoInput.style.resize= 'none';
               
               const TempoInput = document.createElement('input')
               TempoInput.required = true
               TempoInput.value = element.tempo
               TempoInput.type = 'number'

               const PrecoInput = document.createElement('input')
               PrecoInput.required = true
               PrecoInput.value = element.preco
               PrecoInput.type = 'number'

               formEditarCorte.appendChild(LabelNome)
               formEditarCorte.appendChild(NomeInput)

               formEditarCorte.appendChild(LabelDescricao)
               formEditarCorte.appendChild(DescricaoInput)
               
               formEditarCorte.appendChild(LabelTempo)
               formEditarCorte.appendChild(TempoInput)
               
               formEditarCorte.appendChild(LabelPreco)
               formEditarCorte.appendChild(PrecoInput)
               
               divEditarServicos2.appendChild(formEditarCorte)
               divEditarServicos2.appendChild(btn_fechar_editar)
               divEditarServicos2.appendChild(btn_confimar_editar)

               
               document.getElementById('fechar_editarServicos_btn').addEventListener('click', () => {
                   divEditarServicos.style.display = 'none'
                   while (divEditarServicos2.firstChild) {
                       divEditarServicos2.removeChild(divEditarServicos2.firstChild)
                    }
                })
                
                btn_fechar_editar.addEventListener('click', () => {
                    divEditarServicos.style.display = 'none'
                   
                   while (divEditarServicos2.firstChild) {
                       divEditarServicos2.removeChild(divEditarServicos2.firstChild)
                    }
                })
                
                btn_confimar_editar.addEventListener('click', async () => {
                    if(NomeInput.value == '' || DescricaoInput.value == '' || TempoInput.value == '' || PrecoInput.value == ''){
                        alert("CAMPOS NÃO PODEM SER VAZIOS")
                        return
                    }

                    await fetch(API_editar_servicos( {nome: nomeapi} ), {
                        method: 'PUT',
                        body: JSON.stringify({
                            "nome": NomeInput.value,
                            "descricao": DescricaoInput.value,
                            "tempo": TempoInput.value,
                            "preco": PrecoInput.value
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    divEditarServicos.style.display = 'none'
                    while (divEditarServicos2.firstChild) {
                        divEditarServicos2.removeChild(divEditarServicos2.firstChild)
                    }
                    location.reload()
                })
            
            })
            
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

document.getElementById('fechar_servicos_btn').addEventListener('click', () => {
    nomeServico.value = '' 
    descricaoServico.value = '' 
    tempoServico.value = ''
    precoServico.value = ''
})

document.addEventListener("DOMContentLoaded", AddDivServicos)
document.addEventListener("DOMContentLoaded",addDivClientes)
document.addEventListener("DOMContentLoaded", addDivFuncionarios)