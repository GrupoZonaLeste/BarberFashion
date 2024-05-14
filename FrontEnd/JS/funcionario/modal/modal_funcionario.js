/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE AGENDA*/
const modalAgenda = document.querySelector('.modal_agenda')

const switchModal = () =>{
    modalAgenda.style.display = 'block'
}

const btnAgenda = document.getElementById('btn-agenda')
btnAgenda.addEventListener('click', switchModal)

const btnFechar_agenda = document.getElementById('fechar_agenda_btn')
btnFechar_agenda.addEventListener('click', () => {
    modalAgenda.style.display = 'none'
})


/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE VISUALIZAR SERVIÇO*/
const modalServico = document.querySelector('.modal_servico')

const switchModal2 = () =>{
    modalServico.style.display = 'block'
}

const btnEditar = document.getElementById('btn-meus-servicos')
btnEditar.addEventListener('click', switchModal2)

const btnFechar_servico = document.getElementById('fechar_servicos_btn')
btnFechar_servico.addEventListener('click', () => {
    modalServico.style.display = 'none'
})

/* FUNÇÃO DE ATIVAR E DESATIVAR MODAL DE AGENDA*/
const modalPedidos = document.querySelector('.modal_agendamento')

const switchModal3 = () =>{
    modalPedidos.style.display = 'block'
}

const btnPedidos = document.getElementById('btn-pedidos')
btnPedidos.addEventListener('click', switchModal3)

const btnFechar_pedidos = document.getElementById('fechar_pedidos_btn')
btnFechar_pedidos.addEventListener('click', () => {
    modalPedidos.style.display = 'none'
}) 