const div_cortes_marcados = document.getElementById('agendamentos_marcados')

async function addDivCortes(){
    await fetch("http://localhost:8000/pegartodoscortes")
    .then(res => res.json())
    .then(data => {
        data.forEach(async element => {
            nome_data = await fetch(`http://localhost:8000/usuarionames/${element.client_id}`).then(data => data.json()).then(data => {return data.name})
            
            textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4>CLIENTE:</h4> ${nome_data}`;
            textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;
            const p = document.createElement('p')
            const p2 = document.createElement('p')
            const div_services = document.getElementById('card_service')
            const div_contentService = document.createElement('div')
            const div_textos = document.createElement('div')
            const div_btn = document.createElement('div')
            const btn_delete = document.createElement('button')
            const btn_editar = document.createElement('button')
            btn_delete.innerHTML = "DELETAR"
            btn_editar.innerHTML = "ACEITAR"
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
            div_cortes_marcados.appendChild(div_services)
            
        })
    })    
}

document.addEventListener('DOMContentLoaded', addDivCortes)