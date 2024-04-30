const data_corte = document.getElementById('data')
const hora_corte = document.getElementById('horario')
const select_corte = document.getElementById('servico')
const btn_agendar = document.getElementById('input_agendar')

const divEditarCortes = document.getElementById('editar-corte')
const form_editar_corte = document.getElementById('form-editar-corte')

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
                    const btn_fechar_editar = document.createElement('button')
                    const btn_confimar_editar = document.createElement('button')
                    btn_fechar_editar.innerText = "Cancelar"
                    btn_confimar_editar.innerText = "Confirmar"

                    const dataInput = document.createElement('input')
                    dataInput.required = true
                    dataInput.type = "date"
                    dataInput.id = btn_editar.id

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
                        await fetch(`http://localhost:8000/atualizarcortes/${btn_editar.id}`,{
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
                        location.reload()
                    })
                })
                
            });
        })
        .catch(erro => console.log(`erro: ${erro}`))
}
document.addEventListener("DOMContentLoaded", addDivCortes)