document.addEventListener('DOMContentLoaded', () => {
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
        const anyCheckboxSelected = Array.from(document.querySelectorAll('.servico-checkbox'))
            .some(checkbox => checkbox.getAttribute('data-selected') === 'true');

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
        updateServico();
        updateHorario();
        
    }

    // Função para atualizar a cor do botão de horários
    function updateHorario() {
        const dataInput = document.getElementById('data');
        const horarioInput = document.getElementById('horario');

        const dataFilled = dataInput.value !== '';
        const horarioFilled = horarioInput.value !== '';

        if (dataFilled && horarioFilled) {
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
            }

            updateBarbeiro();
        });
    });

});
