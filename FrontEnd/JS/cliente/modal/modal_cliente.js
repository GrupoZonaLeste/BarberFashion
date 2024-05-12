/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE MARCAR CORTE*/
const modalAgendar = document.querySelector('.modal_agendar')

const switchModal = () =>{
    modalAgendar.style.display = 'block'
}

const btnAgendar = document.querySelector('.btn_agendar')
btnAgendar.addEventListener('click', switchModal) 

const btnFechar_agendamento = document.getElementById('fechar_agendamento_btn')
btnFechar_agendamento.addEventListener('click', ()=> {
    modalAgendar.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE MARCAR CORTE*/
const modalServico = document.querySelector('.modal_servico')

const switchModal2 = () =>{
    modalServico.style.display = 'block'
}

const btnEditar = document.getElementById('btn-editar-servicos')
btnEditar.addEventListener('click', switchModal2)

const btnFechar_servico = document.getElementById('fechar_servicos_btn')
btnFechar_servico.addEventListener('click', () => {
    modalServico.style.display = 'none'
})