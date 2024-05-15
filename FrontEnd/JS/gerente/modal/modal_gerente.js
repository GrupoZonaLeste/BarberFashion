/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE CADASTRAR FUNCIONÁRIO*/
const modalCriarFuncionario = document.querySelector('.modal_CriarFuncionario')

const switchModal = () =>{
    modalCriarFuncionario.style.display = 'block'
}

const btnCadastrar_barbeiro = document.getElementById('btn-cadastrar-barbeiro')
btnCadastrar_barbeiro.addEventListener('click', switchModal)

const btnFechar_cadastrarfuncionario = document.getElementById('fechar_cadastrarFuncionario_btn')
btnFechar_cadastrarfuncionario.addEventListener('click', () => {
    modalCriarFuncionario.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE EDITAR FUNCIONÁRIO*/
const modalEditarFuncionario = document.querySelector('.modal_EditarFuncionario')

const switchModal2 = () =>{
    modalEditarFuncionario.style.display = 'block'
}

const btnEditar_barbeiro = document.getElementById('btn-editar-barbeiro')
btnEditar_barbeiro.addEventListener('click', switchModal2)

const btnFechar_editarfuncionario = document.getElementById('fechar_editarFuncionario_btn')
btnFechar_editarfuncionario.addEventListener('click', ()=> {
    modalEditarFuncionario.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE SERVIÇOS AGENDADOS*/
const modalServicos = document.querySelector('.modal_servicos')

const switchModal3 = () =>{
    modalServicos.style.display = 'block'
}

const btnAgendamentos = document.getElementById('btn-agendamentos')
btnAgendamentos.addEventListener('click', switchModal3)

const btnFechar_servicos = document.getElementById('fechar_servicos_btn')
btnFechar_servicos.addEventListener('click', ()=> {
    modalServicos.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE CLIENTES CADASTRADOS*/
const modalVisualizar = document.querySelector('.modal_visualizar')

const switchModal4 = () =>{
    modalVisualizar.style.display = 'block'
}

const btnVisualizar = document.getElementById('btn-visualizar-cliente')
btnVisualizar.addEventListener('click', switchModal4)

const btnFechar_visualizar = document.getElementById('fechar_visualizar_btn')
btnFechar_visualizar.addEventListener('click', ()=> {
    modalVisualizar.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE RELATÓRIO*/
const modalRelatorio = document.querySelector('.modal_Relatorio')

const switchModal5 = () =>{
    modalRelatorio.style.display = 'block'
}

const btnRelatorio = document.getElementById('btn-relat')
btnRelatorio.addEventListener('click', switchModal5)

const btnFechar_relatorio = document.getElementById('fechar_relatorio_btn')
btnFechar_relatorio.addEventListener('click', ()=> {
    modalRelatorio.style.display = 'none'
})


/*
const btn3teste = document.getElementById('fechar_servicos_btn')
btn3teste.addEventListener('click', ()=> {
    modal3.style.display = 'none'
})
*/

//FUNCÇAO ABRIR E FECHAR MODAL DE VISUALIZAÇÃO DE CLIENTES
const modalVisualizarClientes = document.querySelector('.modal_visualizar_clientes')

const switchModal3 = () => {
    modalVisualizarClientes.style.display = 'block'
}
const btnAbrirFecharClientes = document.getElementById('btn-visualizar-cliente')
btnAbrirFecharClientes.addEventListener('click', switchModal3)

const fecharClientes = document.getElementById('fechar_clientes_btn')
fecharClientes.addEventListener('click', () => {
    modalVisualizarClientes.style.display = 'none'
})


