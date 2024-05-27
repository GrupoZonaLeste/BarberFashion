document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the display of modals
    const toggleModal = (modal, display) => {
        modal.style.display = display;
    }

    // Event listeners for opening and closing modals
    const addModalEventListeners = (openBtn, closeBtn, modal) => {
        if (openBtn && closeBtn && modal) {
            openBtn.addEventListener('click', () => toggleModal(modal, 'block'));
            closeBtn.addEventListener('click', () => toggleModal(modal, 'none'));
        } else {
            console.error('One or more elements are missing:', { openBtn, closeBtn, modal });
        }
    }

    // MODAL: Criar Funcionario
    const modalCriarFuncionario = document.querySelector('.modal_CriarFuncionario');
    const btnCadastrarBarbeiro = document.getElementById('btn-cadastrar-barbeiro');
    const btnFecharCadastrarFuncionario = document.getElementById('fechar_cadastrarFuncionario_btn');
    addModalEventListeners(btnCadastrarBarbeiro, btnFecharCadastrarFuncionario, modalCriarFuncionario);

    // MODAL: Editar Funcionario
    const modalEditarFuncionario = document.querySelector('.modal_EditarFuncionario');
    const btnEditarBarbeiro = document.getElementById('btn-editar-barbeiro');
    const btnFecharEditarFuncionario = document.getElementById('fechar_editarFuncionario_btn');
    addModalEventListeners(btnEditarBarbeiro, btnFecharEditarFuncionario, modalEditarFuncionario);

    // MODAL: Servicos Agendados (NAO ESTA FUNCIONANDO!)
    //const modalServicos = document.getElementById('modal_servicos');
    //const btnAgendamentos = document.getElementById('btn-agendamentos');
    //const btnFecharServicos = document.getElementById('fechar_servicos_btn');
    //addModalEventListeners(btnAgendamentos, btnFecharServicos, modalServicos);

    // MODAL: Visualizar Clientes
    const modalVisualizarClientes = document.querySelector('.modal_visualizar_clientes');
    const btnVisualizarCliente = document.getElementById('btn-visualizar-cliente');
    const btnFecharVisualizarClientes = document.getElementById("fechar_clientes_btn");
    addModalEventListeners(btnVisualizarCliente, btnFecharVisualizarClientes, modalVisualizarClientes);

    // MODAL: Relatorio
    const modalRelatorio = document.querySelector('.modal_Relatorio');
    const btnRelatorio = document.getElementById('btn-relat');
    const btnFecharRelatorio = document.getElementById('fechar_relatorio_btn');
    addModalEventListeners(btnRelatorio, btnFecharRelatorio, modalRelatorio);

    // MODAL: Serviços
    const modalServicos = document.querySelector('.modal_Servicos');
    const btnServicos = document.querySelector("[name=editar-barbearia-btn]");
    const btnFecharServicos = document.getElementById('fechar_servicos_btn');
    addModalEventListeners(btnServicos, btnFecharServicos, modalServicos);
});
