const modal = document.querySelector('.modal')
const modal2 = document.querySelector('.modal2')


const switchModal = () =>{
    modal.style.display = 'block'
}
const switchModal2 = () =>{
    modal2.style.display = 'block'
}


const btn = document.querySelector('.modalBtn')
btn.addEventListener('click', switchModal)  
const btn2 = document.getElementById('btn-editar-servicos')
btn2.addEventListener('click', switchModal2)

const btn3 = document.getElementById('fechar_agendamento_btn')
btn3.addEventListener('click', ()=> {
    modal.style.display = 'none'
})

const btn4 = document.getElementById('fechar_servicos_btn')
btn4.addEventListener('click', () => {
    modal2.style.display = 'none'
})
