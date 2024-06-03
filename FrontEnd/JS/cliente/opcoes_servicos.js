document.addEventListener('DOMContentLoaded', () => {
    var servico = {
        "data": '',
        "hora": '',
        "servico": '',
        "tempo": '',
        "client_id": retornarIdUsuario(),
        "funcionario_id": 0,
        "status": 'esperando'
    }

    const btnServicos = document.getElementById('btnservicos');
    const btnHorarios = document.getElementById('btnhorarios');
    const btnBarbeiros = document.getElementById('btnbarbeiros');
    const btnConfirmacao = document.getElementById('btnconfirmacao');
    
    const servicos = document.querySelector('.serviços');
    const horarios = document.querySelector('.horarios');
    const barbeiros = document.querySelector('.barbeiros');
    const confirmacao = document.querySelector('.confirmacao');
    
    const sections = document.querySelectorAll('.section');
    
    // Funções para manipulação de botões
    function resetButton(btn) {
        btn.style.backgroundColor = '#333';
        btn.style.color = '#f9f9f9';
    }
    
    function selectButton(btn) {
        btn.style.backgroundColor = '#e79f33';
        btn.style.color = '#111111';
    }
    
    function selectGreen(btn) {
        btn.style.backgroundColor = '#00D446';
        btn.style.color = '#111111';
    }
    
    function hideSections() {
        [servicos, horarios, barbeiros, confirmacao].forEach(section => {
            section.style.display = 'none';
        });
    }
    
    function showSection(section) {
        hideSections();
        section.style.display = 'block';
    }
    
    // Função para selecionar a seção de barba ou bigode
    let selectedBarbaBigode = null;
    
    function selectBarbaBigode(section) {
        selectedBarbaBigode = section;
        const otherSection = selectedBarbaBigode === 'barbas' ? 'bigodes' : 'barbas';
        document.getElementById(otherSection).querySelectorAll('.servico-checkbox').forEach(checkbox => {
            checkbox.setAttribute('data-selected', 'false');
            checkbox.checked = false;
        });
    }
    
    // Função para atualizar a cor do botão de serviços
    function updateServico() {
        var anyCheckboxSelected = false;
        Array.from(document.querySelectorAll('.servico-checkbox')).forEach(element => {
            if(element.getAttribute('data-selected') === 'true'){
                anyCheckboxSelected = true;
                servico.servico = element.firstChild.innerText;
                servico.tempo = element.getAttribute('tempoestimado')
                listar_funcionarios(element.firstChild.innerText) 
                console.log(servico)
                return;
            }
        })
        if (!anyCheckboxSelected) {
            selectButton(btnServicos);
            resetButton(btnHorarios);
            resetButton(btnBarbeiros);
            hideSections(servicos)        
            showSection(horarios);
        } else {
            selectGreen(btnServicos);
            if (btnHorarios.addEventListener('click', () =>{   
                hideSections(servicos)        
                showSection(horarios);
                selectGreen(btnServicos)
                selectButton(btnHorarios);
            })); 
        };
        updateHorario();
    }

    // Função para atualizar a cor do botão de horários
    function updateHorario() {
        const dataInput = document.getElementById('data');
        const horarioInput = document.getElementById('horario');

        const dataFilled = dataInput.value !== '';
        const horarioFilled = horarioInput.value !== '';

        if (dataFilled && horarioFilled) {
            servico.data = dataInput.value
            servico.hora = horarioInput.value
            console.log(servico)
            selectGreen(btnHorarios);
            if (btnBarbeiros.addEventListener('click', () =>{   
                hideSections(horarios)        
                showSection(barbeiros);
                selectButton(btnBarbeiros);
            })); 
        } else {
            selectButton(btnHorarios);
        }
    }

    // Função para atualizar a cor do botão de barbeiros
    function updateBarbeiro() {
        const anyCheckboxSelected2 = Array.from(document.querySelectorAll('.servico-checkbox2'))
            .some(checkbox => checkbox.getAttribute('data-selected') === 'true');

        if (anyCheckboxSelected2) {
            selectGreen(btnBarbeiros);
            if (btnConfirmacao.addEventListener('click', () =>{
                addDivConfirmacao()   
                console.log(servico)
                hideSections(barbeiros)        
                showSection(confirmacao);
                selectButton(btnConfirmacao);
            })); 
        } else {
            selectButton(btnBarbeiros);
        }
    }

    // Adicionando event listeners para seleção de serviços
    sections.forEach(section => {
        section.addEventListener('click', function(event) {
            const clickedCheckbox = event.target.closest('.servico-checkbox');
            if (!clickedCheckbox) return;
            
            const selected = clickedCheckbox.getAttribute('data-selected') === 'true';
            const currentSectionId = section.id;
            
            if (currentSectionId === 'barbas' || currentSectionId === 'bigodes') {
                selectBarbaBigode(currentSectionId);
            }
            
            section.querySelectorAll('.servico-checkbox').forEach(checkbox => {
                checkbox.setAttribute('data-selected', 'false');
            });
            
            if (!selected) {
                clickedCheckbox.setAttribute('data-selected', 'true');
            }
            
            updateServico();
        });
    });

    // Adicionando event listeners para os campos de data e horário
    const dataInput = document.getElementById('data');
    const horarioInput = document.getElementById('horario');

    dataInput.addEventListener('input', updateHorario);
    horarioInput.addEventListener('input', updateHorario);

    // Adicionando event listeners para seleção de barbeiros
    sections.forEach(section => {
        section.addEventListener('click', function(event) {
            const clickedCheckbox = event.target.closest('.servico-checkbox2');
            if (!clickedCheckbox) return;

            const selected = clickedCheckbox.getAttribute('data-selected') === 'true';
            const currentSectionId = section.id;

            
            if (currentSectionId === 'barbas' || currentSectionId === 'bigodes') {
                selectBarbaBigode(currentSectionId);
            }
            
            section.querySelectorAll('.servico-checkbox2').forEach(checkbox => {
                checkbox.setAttribute('data-selected', 'false');
            });
            
            if (!selected) {
                clickedCheckbox.setAttribute('data-selected', 'true');
                servico.funcionario_id = parseInt(clickedCheckbox.id)
            }

            updateBarbeiro();
        });
    });

    //listar funcionarios qualificados
    const divBarbeiros = document.getElementById('confirmar-barbeiro')
    async function listar_funcionarios(cortes){
        await fetch(API_listar_funcionarios({corte: cortes}))
        .then(response => response.json())
        .then(response => {
            response.forEach(element => {

                const divBarbeiro = document.createElement('div')
                divBarbeiro.className = 'servico-checkbox2'
                divBarbeiro.dataset.selected = "false"
                divBarbeiro.id = element.funcionario_id
                
                const divNome = document.createElement('div')
                divNome.className = 'div-nome'
                
                const nome = document.createElement('p')
                nome.className = 'nome-barbeiro'
                nome.innerText = element.name

                const img = document.createElement('img')
                img.src = '/FrontEnd/images/estrela.png'
                img.className = 'estrelas'

                const imgBarbeiro = document.createElement('img')
                buscarImagemFuncionario(imgBarbeiro, element.funcionario_id)
                imgBarbeiro.className = 'img-servico'
                
                const descricao = document.createElement('p')
                descricao.className = 'descricao-corte'
                descricao.innerText = 'Clique aqui para Ver suas Avaliações'

                divNome.appendChild(nome)
                divNome.appendChild(img)
                divBarbeiro.appendChild(divNome)
                divBarbeiro.appendChild(imgBarbeiro)
                divBarbeiro.appendChild(descricao)
                divBarbeiros.append(divBarbeiro)
                console.log(servico)
            })
        })
    }

    async function addDivConfirmacao(){
        console.log(servico)
        const data_confirmacao = document.getElementById('data-confirmacao')
        const horario_confirmacao = document.getElementById('horario-confirmacao')
        const totalTempo = document.getElementById('tempo-estimado')
        data_confirmacao.innerText = servico.data
        horario_confirmacao.innerText = servico.hora
        totalTempo.innerText = servico.tempo

        const divServico = document.createElement('div')
        divServico.className = 'serv-conf'

        const cardServico = document.createElement('div')
        cardServico.className = 'card-conf'

        const img = document.createElement('img')
        img.id = servico.servico
        img.className = 'img-conf'

        const divInfo = document.createElement('div')
        divInfo.className = 'conf-info'

        const elementos = document.createElement('p')
        elementos.className = 'elementos'
        elementos.innerText = servico.servico

        const sub_elementos1 = document.createElement('p')
        sub_elementos1.className = 'sub-elementos'
        sub_elementos1.innerText = 'Tempo Estimado:'
        
        const sub_elementos2 = document.createElement('p')
        sub_elementos2.className = 'sub-elementos'
        sub_elementos2.innerText = `${servico.tempo} minutos`

        divInfo.appendChild(elementos)
        divInfo.appendChild(sub_elementos1)
        divInfo.appendChild(sub_elementos2)
        cardServico.appendChild(img)
        cardServico.appendChild(divInfo)
        divServico.appendChild(cardServico)
        document.getElementById('servicos-selecionados').append(divServico)
        
        const barbeiroConfirmacao = document.getElementById('barbeiro-confirmacao')
        nome_data = await fetch(API_nome_funcionario({funcionario_id : servico.funcionario_id})).then(data => data.json()).then(data => {return data.name})
        barbeiroConfirmacao.innerText = nome_data
        
        const fotoBarbeiroConfirmacao = document.getElementById('foto-barbeiro-confirmacao')
        buscarImagemFuncionario(fotoBarbeiroConfirmacao, servico.funcionario_id)
        buscarImagemServico(img, servico.servico)
    }
    
    const btn_limpar_agendamento = document.getElementById('limpar_agendamento_btn')
    btn_limpar_agendamento.addEventListener('click', () => {
        location.reload()
    })
    const btn_cancelar_agendamento = document.getElementById('cancelar-servico')
    btn_cancelar_agendamento.addEventListener('click', () => {
        location.reload()
    })

    const confirmar_servico = document.getElementById('confirmar-servico')
    confirmar_servico.addEventListener('click', async () => {
        await fetch(API_marcar_corte, {
            method: 'POST',
            body: JSON.stringify(servico),
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        alert("SERVICO MARCADO COM SUCESSO")
        location.reload()
    })

});
