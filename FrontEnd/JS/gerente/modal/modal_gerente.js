document.addEventListener('DOMContentLoaded', () => {
    const toggleModal = (modal, display) => {
        console.log("Toggling modal. Display:", display); // Adiciona log para verificar se a função toggleModal está sendo chamada
        modal.style.display = display;
    }

    const addModalEventListeners = (openBtn, closeBtn, modal) => {
        if (openBtn && closeBtn && modal) {
            openBtn.addEventListener('click', () => {
                console.log("Abrindo modal");
                toggleModal(modal, 'block');
            });
            closeBtn.addEventListener('click', () => {
                console.log("Fechando modal");
                toggleModal(modal, 'none');
            });
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
    const modalVisualizarFuncionario = document.querySelector('.modal_visualizarFuncionario');
    const btnEditarBarbeiro = document.getElementById('btn-editar-barbeiro');
    const btnFecharVFuncionario = document.getElementById('fechar_visualizarFuncionario_btn');
    addModalEventListeners(btnEditarBarbeiro, btnFecharVFuncionario, modalVisualizarFuncionario);

    
    const modalEditarFuncionario = document.querySelector('.modal_editar_Funcionario');
    const btnEditarFuncionario = document.getElementById('2');
    const btnFecharEditarFuncionario = document.getElementById('fechar_editarFuncionario_btn');
    addModalEventListeners(btnEditarFuncionario, btnFecharEditarFuncionario, modalEditarFuncionario);
    

    // MODAL: Servicos Agendados (NAO ESTA FUNCIONANDO!)
    const modalAgendamentos = document.querySelector('.modal_Agendamentos');
    const btnAgendamentos = document.getElementById('btn-agendamentos');
    const btnFecharAgendamentos = document.getElementById('fechar_agendamenos_btn');
    addModalEventListeners(btnAgendamentos, btnFecharAgendamentos, modalAgendamentos);

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
