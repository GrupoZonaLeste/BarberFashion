const data_corte = document.getElementById('data')
const hora_corte = document.getElementById('horario')
const select_corte = document.getElementById('servico')
const btn_agendar = document.getElementById('input_agendar')
const divEditarCortes = document.getElementById('editar-corte')
const fechar_editar = document.getElementById('input_cancelar-edit')

btn_agendar.addEventListener('click', async () => {
    if (data_corte.value == '' || hora_corte.value == '' || select_corte.value == '') {
        alert("preencha os campos")
        return
    }

    await fetch("http://localhost:8000/marcarcorte", {
        method: "POST",
        body: JSON.stringify({
            "data": data_corte.value,
            "hora": hora_corte.value,
            "servico": select_corte.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    hora_corte.value = ''
    data_corte.value = ''
    select_corte.value = ''
    location.reload()
})

const divCortes = document.getElementById('servicos_agendados')
const dadosDivCortes = document.getElementById('dados_servicos_marcados')

async function addDivCortes() {
    await fetch("http://localhost:8000/pegarcortes")
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                console.log(element)
                textNode = `<h4>Data:</h4> ${element.data} ; ${element.hora} <h4>Descrição:<h4>${element.servico}`;
                const p = document.createElement('p')
                const btn_delete = document.createElement('button')
                const btn_editar = document.createElement('button')
                btn_delete.innerHTML = "Deletar corte"
                btn_editar.innerHTML = "Editar corte"

                id_corte = element._id
                btn_delete.id = id_corte.slice(9, 33)
                btn_editar.id = id_corte.slice(9, 33)

                p.innerHTML = textNode
                p.appendChild(btn_delete)
                p.appendChild(btn_editar)
                divCortes.appendChild(p)
                btn_delete.addEventListener('click', async () => {
                    await fetch(`http://localhost:8000/deletarcorte/${btn_delete.id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    location.reload()
                })

                btn_editar.addEventListener('click', () =>{
                    divEditarCortes.style.visibility = 'visible'                     
                })
                
            });
        })
        .catch(erro => console.log(`erro: ${erro}`))
}
fechar_editar.addEventListener('click', () => {
    divEditarCortes.style.visibility = 'hidden'
})

document.addEventListener("DOMContentLoaded", addDivCortes)


