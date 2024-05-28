document.addEventListener('DOMContentLoaded', () => {
    const btnServicos = document.getElementById('btnservicos');
    const btnHorarios = document.getElementById('btnhorarios');
    const btnBarbeiros = document.getElementById('btnbarbeiros');
    const btnConfirmacao = document.getElementById('btnconfirmacao');

    const navegacao = document.querySelector('.navegacao');
    const servicos = document.querySelector('.serviços');
    const horarios = document.querySelector('.horarios');
    const barbeiros = document.querySelector('.barbeiros');
    const confirmacao = document.querySelector('.confirmacao');

    const sections = document.querySelectorAll('.section');

    let selectedBarbaBigode = null;

    function resetBtnStyles() {
        [btnServicos, btnHorarios, btnBarbeiros, btnConfirmacao].forEach(btn => {
            btn.style.backgroundColor = '#333';
            btn.style.color = '#f9f9f9';
        });
    }

    function hideAllSections() {
        [servicos, horarios, barbeiros, confirmacao].forEach(section => {
            section.style.display = 'none';
        });
    }

    function OkaySelected(btn){
        btn.style.backgroundColor = '#00D446';
        btn.style.color = '#111111';
    }

    function showSelectedSection(section) {
        hideAllSections();
        section.style.display = 'block';
    }

    function selectButton(btn) {
        resetBtnStyles();
        btn.style.backgroundColor = '#e79f33';
        btn.style.color = '#111111';
    }

    function selectBarbaBigode(section) {
        selectedBarbaBigode = section;
        const otherSection = selectedBarbaBigode === 'barbas' ? 'bigodes' : 'barbas';
        document.getElementById(otherSection).querySelectorAll('.servico-checkbox').forEach(checkbox => {
            checkbox.setAttribute('data-selected', 'false');
        });
    }

    btnServicos.addEventListener('click', () => {
        selectButton(btnServicos);
        showSelectedSection(servicos);
    });

    btnHorarios.addEventListener('click', () => {
        selectButton(btnHorarios);
        showSelectedSection(horarios);
    });

    btnBarbeiros.addEventListener('click', () => {
        selectButton(btnBarbeiros);
        showSelectedSection(barbeiros);
    });

    btnConfirmacao.addEventListener('click', () => {
        selectButton(btnConfirmacao);
        showSelectedSection(confirmacao);
    });

    sections.forEach(section => {
        section.addEventListener('click', function(event) {
            const clickedCheckbox = event.target.closest('.servico-checkbox');
            if (!clickedCheckbox) return;


            const selected = clickedCheckbox.getAttribute('data-selected') === 'true';
            const currentSectionId = section.id;

            // If selecting from barbas or bigodes, ensure only one of these sections is selected
            if (currentSectionId === 'barbas' || currentSectionId === 'bigodes') {
                selectBarbaBigode(currentSectionId);
            }

            // Deselect all checkboxes in the current section
            section.querySelectorAll('.servico-checkbox').forEach(checkbox => {
                checkbox.setAttribute('data-selected', 'false');
                selectButton(btnServicos)
            });

            // Select the clicked checkbox if it was not previously selected
            if (!selected) {
                clickedCheckbox.setAttribute('data-selected', 'true');
                OkaySelected(btnServicos);
                if (currentSectionId === 'barbas' || currentSectionId === 'bigodes') {
                    selectBarbaBigode(currentSectionId);
                }
            }
        });
    });
});