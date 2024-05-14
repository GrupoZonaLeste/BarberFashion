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

btn_agendar.addEventListener('click', async () => {
    if (data_corte.value == '' || hora_corte.value == '' || select_corte.value == '') {
        div_alerta.style.display = 'flex'
        div_alerta.style.flexDirection = 'column-reverse'
        div_alerta.style.alignItems = 'center'
        div_alerta.style.borderColor = '#E74040'
        mensagem.style.marginBottom = '1rem'
        mensagem.style.color = '#E74040'

        btnOk.style.backgroundColor = '#E74040'
        btnOk.style.borderColor = '#E74040'
        btnOk.style.boxShadow = '0px 0px 16px -5px #E74040'

        mensagem.innerHTML = "Preencha os Campos do Serviço!";
        div_alerta.append(mensagem);
        btnOk.addEventListener('click', () =>{
            div_alerta.style.display = 'none'
        });
        //alert("preencha os campos")
        return
    }
    console.log("ID DO USUARIO: " + retornarIdUsuario())

    await fetch("http://localhost:8000/marcarcorte", {
        method: "POST",
        body: JSON.stringify({
            "data": data_corte.value,
            "hora": hora_corte.value,
            "servico": select_corte.value,
            "client_id": retornarIdUsuario()
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        

    hora_corte.value = ''
    data_corte.value = ''
    select_corte.value = ''
    //location.reload()
        div_alerta.style.display = 'flex'
        div_alerta.style.flexDirection = 'column-reverse'
        div_alerta.style.alignItems = 'center'
        div_alerta.style.borderColor = '#FF9800'
        mensagem.style.marginBottom = '1rem'
        mensagem.style.color = '#FF9800'

        btnOk.style.backgroundColor = '#FF9800'
        btnOk.style.borderColor = '#FF9800'
        btnOk.style.boxShadow = '0px 0px 16px -5px #FF9800'

        mensagem.innerHTML = "Serviço Agendado com Sucesso!";
        div_alerta.append(mensagem);
        btnOk.addEventListener('click', () =>{
            div_alerta.style.display = 'none'
            location.reload()
        });
})

const divCortes = document.getElementById('servicos_agendados')
const dadosDivCortes = document.getElementById('dados_servicos_marcados')

async function addDivCortes() {
    await fetch(`http://localhost:8000/pegarcortes/${retornarIdUsuario()}`)
        .then(res => res.json())
        .then(data => {
            data.forEach(element => {
                textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} `;
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

function dataHoje(){
    const data = new Date()

    let dia = data.getDate() < '10' ? `0${data.getDate()}` : data.getDate()
    let mes = data.getMonth() + 1 < '10' ? `0${data.getMonth() + 1}` : data.getMonth() + 1
    let ano = data.getFullYear()

    data_hoje = `${ano}-${mes}-${dia}`

    return data_hoje
}

const inputFile = document.querySelector('#picture_input');
const pictureImage = document.querySelector('.picture_image');
const pictureImageTXT = 'Escolha uma Foto';
pictureImage.innerHTML = pictureImageTXT;

inputFile.addEventListener('change', function(e) {
    const inputTarget = e.target;
    const file = inputTarget.files[0];
    
    if (file){
        const reader = new FileReader();
        reader.addEventListener('load', function(e) {
            const readerTarget = e.target;       
            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture_img');
            pictureImage.innerHTML = '';
            pictureImage.appendChild(img);
        
        })
        reader.readAsDataURL(file);
    } else{

    }
})

document.addEventListener("DOMContentLoaded", addDivCortes)