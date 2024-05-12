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


/*
const btn3teste = document.getElementById('fechar_servicos_btn')
btn3teste.addEventListener('click', ()=> {
    modal3.style.display = 'none'
})
*/




