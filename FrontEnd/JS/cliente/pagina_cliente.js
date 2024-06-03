const API_marcar_corte = getEndpoint_client("marcar_corte")
const API_pegar_cortes = getEndpoint_client("pegar_cortes")
const API_nome_funcionario = getEndpoint_client("funcionario_nome")
const API_atualizar_cortes = getEndpoint_schedule("atualizar")
const API_deletar_cortes = getEndpoint_schedule("deletar")
const API_listar_servicos = getEndpoint_manager("listar_servicos")
const API_listar_funcionarios = getEndpoint_employee("funcionarios_qualificados")
const API_listar_cortes_realizados = getEndpoint_schedule("cortes_realizados")
//API_Gateway definindo endereço para realizar o fetch

const data_corte = document.getElementById('data')
      data_corte.min = dataHoje()
const hora_corte = document.getElementById('horario')
const select_corte = document.getElementById('servico')
const btn_agendar = document.getElementById('input_agendar')

const divEditarCortes = document.getElementById('editar-corte')
const form_editar_corte = document.getElementById('form-editar-corte')

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
const btnDeletar = document.getElementById('btn-conf')
const btnCancelar = document.getElementById('btn-canc')
var mensagem = document.createElement("p")
const div_confirmacao = document.getElementById('confirm')

const divCortes = document.getElementById('servicos_agendados')
const dadosDivCortes = document.getElementById('dados_servicos_marcados')

async function addDivCortes() {
    await fetch(API_pegar_cortes({client_id: retornarIdUsuario()}))
    .then(res => res.json())
    .then(data => {
        data.forEach(async element => {
            textDATA = ""
            const btn_editar = document.createElement('button')
                const btn_delete = document.createElement('button')
                if(element.status == 'confirmado'){
                    nome_data = await fetch(API_nome_funcionario({funcionario_id : element.funcionario_id})).then(data => data.json()).then(data => {return data.name})
                    textDATA = `<h4>SERVIÇO CONFIRMADO ✓</h4><hr><br> <h4>DATA:</h4> ${element.data} ; ${element.hora} <h4><br>FUNCIONARIO: </h4> ${nome_data} `;
                    btn_editar.style.display = 'none'
                    btn_delete.innerHTML = "CANCELAR AGENDAMENTO"
                } if (element.status == 'esperando'){
                    textDATA = `<h4>ESPERANDO CONFIRMAÇÃO ... <h4><hr><br>DATA:</h4> ${element.data} ; ${element.hora} <h4><br>FUNCIONARIO: </h4> ${nome_data} `;
                } if(element.status == 'realizado'){
                    return
                }
                textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;

                const p = document.createElement('p')
                const p2 = document.createElement('p')
                const div_services = document.getElementById('card_service')
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
                p2.innerHTML = textDESCRIPTION
                div_textos.append(p)
                div_textos.append(p2)
                div_btn.appendChild(btn_delete)
                div_btn.appendChild(btn_editar)
                div_contentService.append(div_textos)
                div_contentService.append(div_btn)
                div_services.append(div_contentService)
                divCortes.appendChild(div_services)

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
                            await fetch(API_deletar_cortes({id : btn_delete.id}), {
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

                btn_editar.addEventListener('click', () =>{
                    divEditarCortes.style.visibility = 'visible'
                    const btn_fechar_editar = document.createElement('button')
                    const btn_confimar_editar = document.createElement('button')
                    btn_fechar_editar.innerText = "Cancelar"
                    btn_confimar_editar.innerText = "Confirmar"

                    const dataInput = document.createElement('input')
                    dataInput.required = true
                    dataInput.type = "date"
                    dataInput.id = btn_editar.id
                    dataInput.min = dataHoje()

                    const horaInput = document.createElement("input")
                    horaInput.required = true
                    horaInput.type = "time"
                    horaInput.id = btn_editar.id
                    
                    const selectCortes = document.createElement("select")
                    selectCortes.required = true
                    selectCortes.id = btn_editar.id

                    const arrayServicos = ["Selecione um serviço", "corte de cabelo", "barba", "sobrancelha", "progressiva", "coloração de cabelo"]
                    for (let i=0 ; i< arrayServicos.length ; i++){
                        let option = document.createElement('option')
                        option.value = arrayServicos[i]
                        option.text = arrayServicos[i]
                        if(arrayServicos[i] == "Selecione um serviço"){
                            option.disabled = true
                            option.selected = true
                        }
                        selectCortes.appendChild(option) 
                    }
                    const sub_editar_corte = document.getElementById('sub-editar-corte')
                    form_editar_corte.appendChild(dataInput)
                    form_editar_corte.appendChild(horaInput)
                    form_editar_corte.appendChild(selectCortes)
                    sub_editar_corte.appendChild(btn_confimar_editar)
                    sub_editar_corte.appendChild(btn_fechar_editar)

                    btn_fechar_editar.addEventListener('click', () => {
                        divEditarCortes.style.visibility = 'hidden'
                        while (form_editar_corte.firstChild){
                            form_editar_corte.removeChild(form_editar_corte.firstChild)
                        }
                        btn_confimar_editar.remove()
                        btn_fechar_editar.remove()
                        
                    })

                    btn_confimar_editar.addEventListener('click', async () => {
                        await fetch(API_atualizar_cortes({id : btn_editar.id}),{
                            method: 'PUT',
                            body: JSON.stringify({
                                "data": dataInput.value,
                                "hora": horaInput.value,
                                "servico": selectCortes.value 
                            }),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                            
                        }).catch(erro => console.log(`erro: ${erro}`))
                        div_alerta.style.display = 'flex'
                        div_alerta.style.flexDirection = 'column-reverse'
                        div_alerta.style.alignItems = 'center'
                        div_alerta.style.borderColor = '#FF9800'
                        mensagem.style.marginBottom = '1rem'
                        mensagem.style.color = '#FF9800'

                        btnOk.style.backgroundColor = '#FF9800'
                        btnOk.style.borderColor = '#FF9800'
                        btnOk.style.boxShadow = '0px 0px 16px -5px #FF9800'

                        mensagem.innerHTML = "Serviço Editado com Sucesso!";
                        div_alerta.append(mensagem);
                        btnOk.addEventListener('click', () =>{
                            div_alerta.style.display = 'none'
                            location.reload()
                        });
                    })
                })
                
            });
        })
        .catch(erro => console.log(`erro: ${erro}`))
}

const divMarcarServico = document.getElementById('marcar-servico')

async function addDivServicos(){
     fetch(API_listar_servicos)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            const divServico = document.createElement('div')
            divServico.className = 'servico-checkbox'
            divServico.dataset.selected = 'false'
            divServico.setAttribute("tempoestimado", element.tempo)
            
            const nomeServico = document.createElement('p')
            nomeServico.className = 'title-corte'
            nomeServico.innerText = element.nome

            const imgServico = document.createElement('img')
            imgServico.id = element.nome
            imgServico.className = 'img-servico'

            const descServico = document.createElement('p')
            descServico.className = 'descricao-corte'
            descServico.innerText = element.descricao

            divServico.appendChild(nomeServico)
            divServico.appendChild(imgServico)
            divServico.appendChild(descServico)
            divMarcarServico.appendChild(divServico)
            buscarImagemServico(element.nome)
        })
    })
}

async function addDivHistorico(){
    await fetch(API_listar_cortes_realizados({clientid: retornarIdUsuario(), funcid: 0}))
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            nome_funcionario = await fetch(API_nome_funcionario({funcionario_id : element.funcionario_id})).then(data => data.json()).then(data => {return data.name})
            const historico = document.getElementById('div-historico')
            textDATA = `<br><b>SERVIÇO:</b> ${element.servico} | <b>DATA:</b> ${element.data} | <b>HORA:</b> ${element.hora} <br> <b>FUNCIONÁRIO:</b> ${nome_funcionario}<br><hr>`
            const p = document.createElement('p')
            p.innerHTML = textDATA
            historico.appendChild(p)
            historico.removeChild(document.getElementById('seta'))
        })
    })
}

function dataHoje(){
    const data = new Date()

    let dia = data.getDate() < '10' ? `0${data.getDate()}` : data.getDate()
    let mes = data.getMonth() + 1 < '10' ? `0${data.getMonth() + 1}` : data.getMonth() + 1
    let ano = data.getFullYear()

    data_hoje = `${ano}-${mes}-${dia}`

    return data_hoje
}


document.addEventListener("DOMContentLoaded", addDivServicos)
document.addEventListener("DOMContentLoaded", addDivCortes)
document.addEventListener("DOMContentLoaded", addDivHistorico)