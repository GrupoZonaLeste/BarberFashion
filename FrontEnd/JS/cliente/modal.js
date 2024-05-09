const modal = document.querySelector('.modal')
const modal2 = document.querySelector('.modal2')
const modal3 = document.querySelector('.modal3')


const switchModal = () =>{
    modal.style.display = 'block'
}
const switchModal2 = () =>{
    modal2.style.display = 'block'
}
const switchModal3 = () =>{
    modal3.style.display = 'block'
}


const btn = document.querySelector('.modalBtn')
btn.addEventListener('click', switchModal)  
const btn2 = document.getElementById('btn-editar-servicos')
const btn2_1 = document.getElementById('btn-editar-servicos')
btn2.addEventListener('click', switchModal2)
btn2_1.addEventListener('click', switchModal3)

const btn3 = document.getElementById('fechar_agendamento_btn')
btn3.addEventListener('click', ()=> {
    modal.style.display = 'none'
})
const btn3teste = document.getElementById('fechar_agendamento_btn2')
btn3teste.addEventListener('click', ()=> {
    modal3.style.display = 'none'
})



const btn4 = document.getElementById('fechar_servicos_btn')
btn4.addEventListener('click', () => {
    modal2.style.display = 'none'
})
