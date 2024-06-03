const API_pegar_todos_cortes = getEndpoint_employee("pegar_todos_cortes")
const API_atualizar_cortes = getEndpoint_schedule("atualizar")
const API_deletar_cortes = getEndpoint_schedule("deletar")
const API_pegar_nomes_usuarios = getEndpoint_employee("pegar_nomes_usuario")
const API_listar_servicos = getEndpoint_manager("listar_servicos")
const API_listar_funcionarios = getEndpoint_manager("listar_funcionarios")
const API_editar_funcionario = getEndpoint_manager('editar_funcionario')
const API_listar_cortes_realizados = getEndpoint_schedule("cortes_realizados")
// Utilizando os endpoints para definir o endereço para realizar o fetch

const div_cortes_marcados = document.getElementById('agendamentos_marcados')
const divagenda = document.getElementById('agenda_div')

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
const btnDeletar = document.getElementById('btn-conf')
const btnCancelar = document.getElementById('btn-canc')
var mensagem = document.createElement("p")
const div_confirmacao = document.getElementById('confirm')


async function addDivCortes(){
    funcid = retornarIdUsuario()
    await fetch(API_pegar_todos_cortes({ funcid }))
    .then(res => res.json())
    .then(data => {
        data.forEach(async element => {
            console.log(element.status)
            nome_data = await fetch(API_pegar_nomes_usuarios({id : element.client_id})).then(data => data.json()).then(data => {return data.name})
            if(element.status == 'confirmado'){
                textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4><br>CLIENTE:</h4> ${nome_data}`;
                textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;
                
                const p = document.createElement('p')
                const p2 = document.createElement('p')
                const div_services = document.getElementById('agenda_div')
                const div_contentService = document.createElement('div')
                const div_textos = document.createElement('div')
                const div_btn = document.createElement('div')
                const btn_delete = document.createElement('button')
                const btn_confirmar_servico = document.createElement('button')
                btn_delete.innerHTML = "CANCELAR AGENDAMENTO"
                btn_confirmar_servico.innerHTML = "CONFIRMAR REALIZAÇÃO"
                div_textos.id = 'text_service'
                div_contentService.id = 'content_service'
                id_corte = element._id
                btn_delete.id = id_corte.slice(9, 33)
    
                div_btn.style.display = 'flex'
                div_btn.style.flexDirection = 'column'
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
                    
                    div_confirmacao.style.display = 'flex'
                    div_confirmacao.style.flexDirection = 'column-reverse'
                    div_confirmacao.style.alignItems = 'center'
                    div_confirmacao.style.borderColor = '#E74040'
                    mensagem.style.marginBottom = '1rem'
                    mensagem.style.color = '#E74040'
                    
                    btnDeletar.style.backgroundColor = '#E74040'
                    btnDeletar.style.borderColor = '#E74040'
                    btnDeletar.style.boxShadow = '0px 0px 16px -5px #E74040'
                    btnCancelar.style.backgroundColor = '#FF9800'
                    btnCancelar.style.borderColor = '#FF9800'
                    btnCancelar.style.boxShadow = '0px 0px 16px -5px #FF9800'
                    
                    mensagem.innerHTML = "Deseja mesmo Cancelar o Serviço?";
                    div_confirmacao.append(mensagem);
                    
                    btnDeletar.addEventListener('click', async () =>{
                            await fetch(API_deletar_cortes({id:btn_delete.id}), {
                                method: "DELETE",
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            mensagem.innerHTML = "Serviço Cancelado com Sucesso!";
                            div_confirmacao.append(mensagem);
                            div_confirmacao.style.display = 'none'
                            location.reload()
                        });
                        btnCancelar.addEventListener('click', () =>{
                            div_confirmacao.style.display = 'none'
                        })
                })
                btn_confirmar_servico.addEventListener('click', async () => {
                    await fetch(API_atualizar_cortes({id: btn_delete.id}),{
                        method: 'PUT',
                        body: JSON.stringify({
                            "status": "realizado"
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }      
                    })
                    alert("SERVIÇO REALIZADO")
                    location.reload()
                })
                    p.innerHTML = textDATA
                    p2.innerHTML = textDESCRIPTION
                    div_textos.append(p)
                    div_textos.append(p2)
                    div_btn.appendChild(btn_confirmar_servico)
                    div_btn.appendChild(document.createElement('br'))
                    div_btn.appendChild(btn_delete)
                    div_contentService.append(div_textos)
                    div_contentService.append(div_btn)
                    div_services.append(div_contentService)
                    divagenda.appendChild(div_services)
                    return
            }
            if(element.status == 'esperando'){
            textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4><br>CLIENTE:</h4> ${nome_data}`;
            textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;
            const p = document.createElement('p')
            const p2 = document.createElement('p')
            const div_services = document.getElementById('agendamentos_marcados')
            const div_contentService = document.createElement('div')
            const div_textos = document.createElement('div')
            const div_btn = document.createElement('div')
            const btn_delete = document.createElement('button')
            const btn_aceitar = document.createElement('button')
            btn_delete.innerHTML = "DELETAR"
            btn_aceitar.innerHTML = "ACEITAR"
            div_textos.id = 'text_service'
            div_contentService.id = 'content_service'
            id_corte = element._id
            btn_delete.id = id_corte.slice(9, 33)
            btn_aceitar.id = id_corte.slice(9, 33)

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


            btn_aceitar.addEventListener('click', async () => {
                await fetch(API_atualizar_cortes({id: btn_aceitar.id}),{
                    method: 'PUT',
                    body: JSON.stringify({
                        "status": "confirmado"
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                            
                })

                location.reload()
            })

            p.innerHTML = textDATA
            p2.innerHTML = textDESCRIPTION
            div_textos.append(p)
            div_textos.append(p2)
            div_btn.appendChild(btn_delete)
            div_btn.appendChild(btn_aceitar)
            div_contentService.append(div_textos)
            div_contentService.append(div_btn)
            div_services.append(div_contentService)
            div_cortes_marcados.appendChild(div_services)
            }
        })
    })    
}

async function listarServicosCheckbox(){
    const divCheckboxServicos = document.createElement('div')
    
    await fetch(API_listar_servicos)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            const checkbox = document.createElement('input')
            checkbox.type = "checkbox"
            checkbox.value = element.nome
            checkbox.name = "checkbox-cadastro-servico-funcionario"

            const labelCheckbox = document.createElement('label')
            labelCheckbox.for = checkbox.id
            labelCheckbox.innerText = ` ${element.nome}`

            divCheckboxServicos.appendChild(document.createElement('br'))
            divCheckboxServicos.appendChild(checkbox)
            divCheckboxServicos.appendChild(labelCheckbox)
            divCheckboxServicos.appendChild(document.createElement('br'))
        })
    })
    divServicos.appendChild(divCheckboxServicos)
    return divCheckboxServicos
}

const divServicos = document.getElementById('card_service')
async function addDivServicos(){
    await fetch(API_listar_funcionarios)
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            if(element.funcionario_id == retornarIdUsuario()){
                divServicos.appendChild(await listarServicosCheckbox())
                
                const btnEditar = document.getElementById('btn-meus-servicos')
                btnEditar.addEventListener('click', () => {
                    const checkboxes = document.querySelectorAll('input[name="checkbox-cadastro-servico-funcionario"]');
                    for (const [key, value] of Object.entries(element.servicos)) {
                        for(let i=0 ; i< checkboxes.length; i++){
                            if(key == checkboxes[i].value){
                                if(value == 1)
                                checkboxes[i].checked = 'true'
                                console.log(key, checkboxes[i].value)
                            }
                        }
                    }
                })
            }
            return
        })
    })
}
var objServicosSelecionados = {}
const btn_salvar_servicos = document.getElementById('btn-salvar-servicos')
btn_salvar_servicos.addEventListener('click', async () => {
    const checkboxes = document.querySelectorAll('input[name="checkbox-cadastro-servico-funcionario"]');
                    for (let i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            objServicosSelecionados[checkboxes[i].value] = 1
                            console.log(objServicosSelecionados)
                        } else {
                            objServicosSelecionados[checkboxes[i].value] = 0
                        }
                    }
                    fetch(API_editar_funcionario( {funcid: retornarIdUsuario()} ), {
                        method: "PUT",
                        body: JSON.stringify({
                            "servicos": objServicosSelecionados
                        }),
                        headers: {
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    alert("atualizado com sucesso")
                    location.reload()
})

async function addDivHistorico(){
    await fetch(API_listar_cortes_realizados({clientid: 0, funcid: retornarIdUsuario()}))
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            nome_cliente = await fetch(API_pegar_nomes_usuarios({id : element.client_id})).then(data => data.json()).then(data => {return data.name})
            const historico = document.getElementById('div-historico')
            textDATA = `<br><b>SERVIÇO:</b> ${element.servico} | <b>DATA:</b> ${element.data} | <b>HORA:</b> ${element.hora} <br> <b>CLIENTE:</b> ${nome_cliente}<br><hr>`
            const p = document.createElement('p')
            p.innerHTML = textDATA
            historico.appendChild(p)
            historico.removeChild(document.getElementById('seta'))
        })
    })
}

document.addEventListener('DOMContentLoaded', addDivCortes)
document.addEventListener('DOMContentLoaded', addDivServicos)
document.addEventListener('DOMContentLoaded', addDivHistorico)