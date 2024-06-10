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
                    Swal.fire({
                        title: "Cancelar Agendamento?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#E74040",
                        cancelButtonColor: "gray",
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Sim, Cancelar Agendamento!"
                      }).then(async (result) => {
                          if (result.isConfirmed) {
                              Swal.fire({
                                  title: "Agendamento cancelado!",
                                  text: "Agendamento foi cancelado com sucesso.",
                                  icon: "success",
                                }).then(async () =>{
                                    await fetch(API_atualizar_cortes({id: btn_delete.id}),{
                                        method: 'PUT',
                                        body: JSON.stringify({
                                            "status": "esperando"
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }      
                                    })
                                    location.reload()
                                })
                        }
                      });
                    

                })
                btn_confirmar_servico.addEventListener('click', async () => {
                    Swal.fire({
                        title: "Confirmar realização do serviço?",
                        text: "O status do serviço mudará para realizado, contabilizando o mesmo no sistema. Você não poderá restaurar essa ação.",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#E74040",
                        cancelButtonColor: "gray",
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Sim, Confirmar Serviço!"
                      }).then(async (result) => {
                          if (result.isConfirmed) {
                              Swal.fire({
                                  title: "Serviço Realizado!",
                                  text: "Parabéns! O serviço foi realizado com sucesso.",
                                  icon: "success",
                                }).then(async () =>{
                                    await fetch(API_atualizar_cortes({id: btn_delete.id}),{
                                        method: 'PUT',
                                        body: JSON.stringify({
                                            "status": "realizado"
                                        }),
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }      
                                    })
                                    location.reload()
                                })
                        }
                      });
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

            btn_delete.addEventListener('click', async () => {
                Swal.fire({
                    title: "Deletar Serviço?",
                    text: "Você não vai poder reverter essa ação.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#E74040",
                    cancelButtonColor: "gray",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Sim, deletar Serviço!"
                  }).then(async (result) => {
                      if (result.isConfirmed) {
                          Swal.fire({
                              title: "Serviço deletado!",
                              text: "Serviço foi deletado com sucesso.",
                              icon: "success",
                            }).then(async () =>{
                                await fetch(API_deletar_cortes({id: btn_delete.id}),{
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }      
                                })
                                location.reload()
                            })
                    }
                  });
            })


            btn_aceitar.addEventListener('click', async () => {

                Swal.fire({
                    title: "Aceitar Serviço?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#FF9800",
                    cancelButtonColor: "gray",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Aceitar!"
                  }).then(async (result) => {
                      if (result.isConfirmed) {
                          Swal.fire({
                              title: "Serviço Aceito!",
                              text: "Serviço foi Aceito com sucesso.",
                              icon: "success",
                            }).then(async () =>{
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
                    }
                  });
                
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
                    Swal.fire({
                        title: "Serviços atualizados!",
                        text: "Seus serviços foram atualizados com sucesso!",
                        icon: "success",
                        confirmButtonColor: "#FF9800",
                      }).then(() =>{
                          location.reload()
                      })
})

async function addDivHistorico(){
    await fetch(API_listar_cortes_realizados({clientid: 0, funcid: retornarIdUsuario()}))
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            if(element.status == 'cancelado') return
            nome_cliente = await fetch(API_pegar_nomes_usuarios({id : element.client_id})).then(data => data.json()).then(data => {return data.name})
            const historico = document.getElementById('div-historico')
            const servico = `<b>SERVIÇO:</b> ${element.servico}`
            const data = `<b>DATA:</b> ${element.data}`
            const hora = `<b>HORA:</b> ${element.hora}`
            const cliente = `<b>CLIENTE:</b> ${nome_cliente}`
            
            const lista = document.createElement('div')
            lista.id = lista
            lista.style.display = 'none'

            const p_servico = document.createElement('p')
            const p_data = document.createElement('p')
            const p_hora = document.createElement('p')
            const p_cliente = document.createElement('p')
                
            p_servico.innerHTML = servico
            p_data.innerHTML = data
            p_hora.innerHTML = hora
            p_cliente.innerHTML = cliente
            
            lista.append(p_servico, p_data, p_hora, p_cliente)
            historico.appendChild(lista)

            const btn_seta = document.getElementById('seta')
            btn_seta.addEventListener('click', () => {
                if (lista.style.display === 'none') {
                    lista.style.display = 'flex'
                    lista.style.flexDirection = 'row'
                    lista.style.justifyContent = 'space-around'
                    lista.style.width = '100%'
                    lista.style.margin = '1rem'
                    btn_seta.style.transform = 'rotate(180deg)'
                } else {
                    lista.style.display = 'none'
                    btn_seta.style.transform = 'rotate(0deg)'
                }
                

            })
        })
    })
}

document.addEventListener('DOMContentLoaded', addDivCortes)
document.addEventListener('DOMContentLoaded', addDivServicos)
document.addEventListener('DOMContentLoaded', addDivHistorico)