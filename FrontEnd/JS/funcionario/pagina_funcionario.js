const div_cortes_marcados = document.getElementById('agendamentos_marcados')
const divagenda = document.getElementById('agenda_div')

const div_alerta = document.getElementById('alert')
const btnOk = document.getElementById('btn-ok')
const btnDeletar = document.getElementById('btn-conf')
const btnCancelar = document.getElementById('btn-canc')
var mensagem = document.createElement("p")
const div_confirmacao = document.getElementById('confirm')

async function addDivCortes(){
    await fetch("http://localhost:8000/pegartodoscortes")
    .then(res => res.json())
    .then(data => {
        data.forEach(async element => {
            nome_data = await fetch(`http://localhost:8000/usuarionames/${element.client_id}`).then(data => data.json()).then(data => {return data.name})
            if(element.funcionario_id){
                textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4>CLIENTE:</h4> ${nome_data}`;
                textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;
                
                const p = document.createElement('p')
                const p2 = document.createElement('p')
                const div_services = document.getElementById('agenda_div')
                const div_contentService = document.createElement('div')
                const div_textos = document.createElement('div')
                const div_btn = document.createElement('div')
                const btn_delete = document.createElement('button')
                btn_delete.innerHTML = "CANCELAR AGENDAMENTO"
                div_textos.id = 'text_service'
                div_contentService.id = 'content_service'
                id_corte = element._id
                btn_delete.id = id_corte.slice(9, 33)
    
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
                            await fetch(`http://localhost:8000/deletarcorte/${btn_delete.id}`, {
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
                    p.innerHTML = textDATA
                    p2.innerHTML = textDESCRIPTION
                    div_textos.append(p)
                    div_textos.append(p2)
                    div_btn.appendChild(btn_delete)
                    div_contentService.append(div_textos)
                    div_contentService.append(div_btn)
                    div_services.append(div_contentService)
                    divagenda.appendChild(div_services)
                    return
            }
            if(!element.funcionario_id){
            textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4>CLIENTE:</h4> ${nome_data}`;
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
                await fetch(`http://localhost:8000/atualizarcortes/${btn_aceitar.id}`,{
                    method: 'PUT',
                    body: JSON.stringify({
                        "funcionario_id": "teste"
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

document.addEventListener('DOMContentLoaded', addDivCortes)