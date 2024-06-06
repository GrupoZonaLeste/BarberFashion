const API_cadastrar_funcionario = getEndpoint_manager("cadastrar")
const API_listar_funcionarios = getEndpoint_manager("listar_funcionarios")
const API_deletar_funcionario = getEndpoint_manager("deletar_funcionario")
const API_editar_funcionario = getEndpoint_manager('editar_funcionario')
const API_listar_usuarios = getEndpoint_manager("listar_usuarios")
const API_cadastrar_servicos = getEndpoint_manager("cadastrar_servicos")
const API_listar_servicos = getEndpoint_manager("listar_servicos")
const API_excluir_servicos = getEndpoint_manager("deletar_servicos")
const API_editar_servicos = getEndpoint_manager("editar_servicos")
const API_listar_agendamentos = getEndpoint_manager("listar_agendamentos")
const API_listar_cortes_realizados = getEndpoint_schedule("cortes_realizados")

// Nomes funcionario e clientes
const API_pegar_nomes_usuarios = getEndpoint_employee("pegar_nomes_usuario")
const API_nome_funcionario = getEndpoint_client("funcionario_nome")
// Utilizando os endpoints para definir o endereço para realizar o fetch
const nomeInput = document.getElementById('nome')
const emailInput = document.getElementById('email')
const senhaInput = document.getElementById('senha')
const cadastarServicosFuncionario = document.getElementById('div_cadastrar_servicos_funcionario')

var objServicosSelecionados = {}
const fetchButtonData = () => {
    return {
        name: nomeInput.value,
        email: emailInput.value,
        password: senhaInput.value,
        servicos: objServicosSelecionados,
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

const checkboxes = document.getElementsByName("checkbox-cadastro-servico-funcionario");

btn_cadastrarFuncionario.addEventListener('click', async (event) => {
    event.preventDefault(); 

    for (let i = 0; i < checkboxes.length; i++) {
        objServicosSelecionados[checkboxes[i].value] = checkboxes[i].checked ? 1 : 0;
    }
    
    const arrayCheck = Object.values(objServicosSelecionados);
    const verificacaoCheckbox = (item) => item == 0;
    
    // Validate input fields and checkboxes
    if (nomeInput.value === '' || emailInput.value === '' || senhaInput.value === '' || checkboxes.length < 1 || arrayCheck.every(verificacaoCheckbox)) {
        Swal.fire({
            title: "Oops...",
            text: "Preencha todos os campos!",
            icon: "error",
            confirmButtonColor: "#FF9800",
        });
        return;
    }

    let data = fetchButtonData();
    console.log(data)
    const options = {
        method: 'POST',
        url: API_cadastrar_funcionario,
        data: data
    }
      
      axios.request(options).then(function (response) {
         if (response.data.status == "OK") {
            Swal.fire({
                title: "Funcionário Cadastrado!",
                text: "Funcionário foi cadastrado com sucesso.",
                icon: "success",
                confirmButtonColor: "#FF9800",
            }).then(() => {
                putFotoFuncionario(response.data.funcid);
            });
        } else if (response.data.status == "EMAIL CADASTRADO") {
            Swal.fire({
                title: `O email '${data.email}' já está cadastrado`,
                icon: "error"
            }).then(() => {
                location.reload();
            });
        } else {
            console.log(response.data.status)
            Swal.fire({
                title: "Erro",
                text: "Erro ao cadastrar funcionário. Tente novamente.",
                icon: "error",
                confirmButtonColor: "#FF9800",
            });
        }
      }).catch(function (error) {
        console.error(error);
      });

})

const divFuncionariosCadastrados = document.getElementById('funcionarios_cadastrados')
const divEditarFuncionarios = document.querySelector('.modal_editar_Funcionario')

async function addDivFuncionarios(){
    await fetch(API_listar_funcionarios)
    .then(response => response.json())
    .then(response => {
        response.forEach(element => {
            //textNode = `<br><br> <hr><br> <br>`
            img_f = `<img id="image_funcionario_${element.funcionario_id}" style="width: 100px; height: 100px; object-fit: cover;"></img>`
            nome_f = `<p style="font-size: 1.2rem">Nome: ${element.name}</p> `
            email_f = `<p style="font-size: 1.2rem">Email: ${element.email}</p> `

            const div_left = document.createElement('div')
            div_left.id = 'content-left'
            div_left.innerHTML = img_f

            const p_nome = document.createElement('p')
            const p_email = document.createElement('p')

            p_nome.innerHTML = nome_f
            p_email.innerHTML = email_f
            
            //const p = document.createElement('p')

            const btn_editar = document.createElement('button')
            const btn_deletar = document.createElement('button')
            const div_imgTXT = document.createElement('div')
            const div_contentService = document.createElement('div')
            const div_textos = document.createElement('div')
            const div_btn = document.createElement('div')
            btn_editar.innerText = "EDITAR"
            btn_editar.id = element.funcionario_id
            btn_editar.style.cursor = "pointer"
            
            btn_deletar.innerText = "DELETAR"
            btn_deletar.id = element.funcionario_id
            btn_deletar.style.cursor = "pointer"
            btn_deletar.style.backgroundColor = '#E74040'
            btn_deletar.style.color = '#ffffff'
            btn_deletar.onmousemove = function(){
                btn_deletar.style.opacity = 0.5
            };
            btn_deletar.onmouseout = function(){
                btn_deletar.style.opacity = 1
            };
            
            div_btn.id = 'div_btn'
            div_imgTXT.id = 'content-double'
            div_left.id = 'content-left'
            div_textos.id = 'content-right'
            div_contentService.id = 'content_funcionario'
            
            div_left.innerHTML = img_f
            div_textos.append(p_nome, p_email)
            div_imgTXT.append(div_left, div_textos)

            div_btn.appendChild(btn_deletar)
            div_btn.appendChild(btn_editar)
            div_contentService.append(div_imgTXT)
            div_contentService.append(div_btn)
            divFuncionariosCadastrados.append(div_contentService)
            const imgfunc = document.getElementById(`image_funcionario_${element.funcionario_id}`)
            buscarImagemFuncionario(imgfunc, element.funcionario_id)
            
            btn_deletar.addEventListener('click', async ()=> {
                Swal.fire({
                    title: "Deletar funcionário?",
                    text: "Você não vai poder reverter essa ação.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#E74040",
                    cancelButtonColor: "gray",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Sim, deletar funcionário!"
                  }).then(async (result) => {
                      if (result.isConfirmed) {
                          Swal.fire({
                              title: "Funcionário deletado!",
                              text: "Funcionário foi deletado com sucesso.",
                              icon: "success",
                            }).then(async () =>{
                                await fetch(API_deletar_funcionario({funcid: btn_deletar.id}), {
                                    method: "DELETE",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                location.reload()
                            })
                    }
                  });
            })
            
            btn_editar.addEventListener('click', async () => {
                divEditarFuncionarios.style.display = 'block'

               const divEditarFuncionarios2 = document.getElementById('editar_Funcionario')
               const formEditarFuncionario = document.createElement('form')
               formEditarFuncionario.id = 'form_EditarFunc'
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
               LabelNome.innerText = 'Editar Nome:'

               const LabelEmail = document.createElement('label')
               LabelEmail.innerText = 'Editar Email:'

               const NomeInput = document.createElement('input')
               NomeInput.required = true
               NomeInput.value = element.name
               NomeInput.id = 'nomeFunc_input'
               
               
               const EmailInput = document.createElement('input')
               EmailInput.required = true
               EmailInput.value = element.email
               EmailInput.id = 'emailFunc_input'
               


               formEditarFuncionario.appendChild(LabelNome)
               formEditarFuncionario.appendChild(NomeInput)

               formEditarFuncionario.appendChild(document.createElement('br'))

               formEditarFuncionario.appendChild(LabelEmail)
               formEditarFuncionario.appendChild(EmailInput)
               
               divEditarFuncionarios2.appendChild(formEditarFuncionario)

               divEditarFuncionarios2.appendChild(document.createElement('br'))
               divEditarFuncionarios2.appendChild(await listarServicosCheckbox())
               divEditarFuncionarios2.appendChild(btn_fechar_editar)
               divEditarFuncionarios2.appendChild(btn_confimar_editar)
               if (element.servicos) { // Verifica se element.servicos está definido
                for (const [key, value] of Object.entries(element.servicos)) {
                    for (let i = 0; i < checkboxes.length; i++) {
                        if (key == checkboxes[i].value) {
                            if (value == 1)
                                checkboxes[i].checked = true; // Removi as aspas em 'true', pois o valor deve ser booleano
                            console.log(key, checkboxes[i].value);
                        }
                    }
                }
            } else {
                console.log("O objeto 'element' não possui a propriedade 'servicos' definida.");
            }

                btn_fechar_editar.addEventListener('click', () => {
                    divEditarFuncionarios.style.display = 'none'
               
                    while (divEditarFuncionarios2.firstChild) {
                        divEditarFuncionarios2.removeChild(divEditarFuncionarios2.firstChild)
                    }
                })
                
                document.getElementById('fechar_editarFuncionario_btn').addEventListener('click', () => {
                    divEditarFuncionarios.style.display = 'none'
                    
                    while (divEditarFuncionarios2.firstChild) {
                        divEditarFuncionarios2.removeChild(divEditarFuncionarios2.firstChild)
                    }
                 })

                btn_confimar_editar.addEventListener('click', () => {
                    const checkboxes = document.querySelectorAll('input[name="checkbox-cadastro-servico-funcionario"]');
                    for (let i = 0; i < checkboxes.length; i++) {
                        if (checkboxes[i].checked) {
                            objServicosSelecionados[checkboxes[i].value] = 1
                            console.log(objServicosSelecionados)
                        } else {
                            objServicosSelecionados[checkboxes[i].value] = 0
                        }
                    }

                    if(NomeInput.value == '' || EmailInput.value == ''){
                        alert("campos não podem ser vazios")
                        return
                    }
                    Swal.fire({
                        icon: "success",
                        title: "Mudanças salvas!",
                        showConfirmButton: false,
                        timer: 1500
                    }).then(async ()=>{

                          fetch(API_editar_funcionario( {funcid: element.funcionario_id} ), {
                              method: "PUT",
                              body: JSON.stringify({
                                  "name": NomeInput.value,
                                  "email": EmailInput.value,
                                  "servicos": objServicosSelecionados
                                }),
                                headers: {
                            "Content-type": "application/json; charset=UTF-8"
                            }
                        })
                        location.reload()
                    })
                })
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
            img_c = `<img id="image_client_${element.client_id}" style="width: 100px; height: 100px; object-fit: cover;">`
            nome_c = `<p style="font-size: 1.2rem">Nome: ${element.name}</p>`
            email_c = `<p style="font-size: 1.2rem">Email: ${element.email}</p>`            
            
            const div_VCliente = document.createElement('div')
            div_VCliente.id = 'content_cliente'

            const div_left = document.createElement('div')
            div_left.id = 'content-left'
            div_left.innerHTML = img_c

            const div_right = document.createElement('div')
            div_right.id = 'content-right'

            const p_nome = document.createElement('p')
            const p_email = document.createElement('p')

            p_nome.innerHTML = nome_c
            p_email.innerHTML = email_c
            
            div_right.append(p_nome, p_email)

            div_VCliente.append(div_left)
            div_VCliente.append(div_right)

            divClientesCadastrados.append(div_VCliente)

            const imga = document.getElementById(`image_client_${element.client_id}`)
            buscarImagemCliente(imga, element.client_id)
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
            textDATA = `<img id="${element.nome}" style="width: 100px; height: 100px; object-fit: cover;"><br><br><h4>${element.nome}<h4><hr><br> <p>${element.descricao}</p><br> <h4>TEMPO: ${element.tempo} min</h4>  <h4>PREÇO: R$ ${element.preco}<h4>`;
            
            
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
            div_contentService.style.flexDirection = 'column'
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
                Swal.fire({
                    title: "Deletar serviço?",
                    text: "Você não vai poder reverter essa ação.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#E74040",
                    cancelButtonColor: "gray",
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Sim, deletar serviço!"
                  }).then(async (result) => {
                      if (result.isConfirmed) {
                          Swal.fire({
                              title: "Serviço deletado!",
                              text: "Serviço foi deletado com sucesso.",
                              icon: "success",
                            }).then(async () =>{

                                await fetch(API_excluir_servicos( {nome: element.nome}) , {
                                    method: "DELETE",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                location.reload()
                            })
                    }
                  });
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
                    Swal.fire({
                        icon: "success",
                        title: "Mudanças salvas!",
                        showConfirmButton: false,
                        timer: 1500
                      }).then(async () =>{
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
                            location.reload()
                        })
                            
                    divEditarServicos.style.display = 'none'
                    while (divEditarServicos2.firstChild) {
                        divEditarServicos2.removeChild(divEditarServicos2.firstChild)
                    }
                })
                
            })
            
            p.innerHTML = textDATA
            div_textos.append(p)
            div_btn.appendChild(btn_delete)
            div_btn.appendChild(btn_editar)
            div_contentService.append(div_textos)
            div_contentService.append(div_btn)
            divServicosCadastrados.append(div_contentService)
            buscarImagemServico(document.getElementById(element.nome), element.nome)
        })
    })
}

document.getElementById('fechar_servicos_btn').addEventListener('click', () => {
    nomeServico.value = '' 
    descricaoServico.value = '' 
    tempoServico.value = ''
    precoServico.value = ''
})

async function listarServicosCheckbox(){
    const divCheckboxServicos = document.createElement('div');
    divCheckboxServicos.classList.add('services-container'); // Adiciona a classe para estilizar o contêiner
    const titulo = "<h4>Adicionar serviços</h4>"; 
    divCheckboxServicos.innerHTML = titulo;
    
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
    
    cadastarServicosFuncionario.appendChild(divCheckboxServicos)
    cadastarServicosFuncionario.appendChild(btn_cadastrarFuncionario)
    return divCheckboxServicos
}

async function addDivAgendamentos(){
    const divAgendamentos = document.getElementById('div-agendamentos')

    await fetch(API_listar_agendamentos)
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            nome_cliente = await fetch(API_pegar_nomes_usuarios({id : element.client_id})).then(data => data.json()).then(data => {return data.name})
            nome_funcionario = await fetch(API_nome_funcionario({funcionario_id : element.funcionario_id})).then(data => data.json()).then(data => {return data.name})

            textNode = `
            <img name="image_client_service_${element.client_id}" style="width: 60px; height: 60px; object-fit: cover;"><br>
            <h4>CLIENTE: ${nome_cliente}</h4><br> 
            <img name="image_funcionario_service_${element.funcionario_id}" style="width: 60px; height: 60px; object-fit: cover;"><br>
            <h4>FUNCIONÁRIO: ${nome_funcionario}</h4><br><br> 
            <h4>DATA:</h4> ${element.data} ; ${element.hora} <h4><br>SERVIÇO:</h4>${element.servico}`

            const imgCliente = document.getElementsByName(`image_client_service_${element.client_id}`)
            const imgfunc = document.getElementsByName(`image_funcionario_service_${element.client_id}`)
            const p = document.createElement('p')
            p.innerHTML = textNode
            p.style.margin = '5px'
            p.style.fontSize = '110%'
            p.id = 'content_service'
            p.style.alignItems = 'center'
            p.style.display = 'flex'
            p.style.flexDirection = 'column'
            divAgendamentos.appendChild(p)

            imgCliente.forEach(item =>{
                buscarImagemCliente(item, element.client_id)
            })
            imgfunc.forEach(item => {
                buscarImagemFuncionario(item, element.client_id)
            })
        })
    })
}

async function addDivHistorico(){
    await fetch(API_listar_cortes_realizados({clientid: 0, funcid: 0}))
    .then(response => response.json())
    .then(response => {
        response.forEach(async element => {
            nome_cliente = await fetch(API_pegar_nomes_usuarios({id : element.client_id})).then(data => data.json()).then(data => {return data.name})
            nome_funcionario = await fetch(API_nome_funcionario({funcionario_id : element.funcionario_id})).then(data => data.json()).then(data => {return data.name})
            const historico = document.getElementById('div-historico')
            textDATA = `<br><b>SERVIÇO:</b> ${element.servico} | <b>DATA:</b> ${element.data} | <b>HORA:</b> ${element.hora} <br> <b>CLIENTE:</b> ${nome_cliente} | <b>FUNCIONÁRIO:</b> ${nome_funcionario}<br><hr>`
            const p = document.createElement('p')
            p.innerHTML = textDATA
            historico.appendChild(p)
            historico.removeChild(document.getElementById('seta'))
        })
    })
}

document.addEventListener("DOMContentLoaded", addDivAgendamentos)
document.addEventListener("DOMContentLoaded", AddDivServicos)
document.addEventListener("DOMContentLoaded", listarServicosCheckbox)
document.addEventListener("DOMContentLoaded",addDivClientes)
document.addEventListener("DOMContentLoaded", addDivFuncionarios)
document.addEventListener("DOMContentLoaded", addDivHistorico)