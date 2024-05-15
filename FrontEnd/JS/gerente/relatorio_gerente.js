const btnDiario = document.getElementById('diario')
const btnMensal = document.getElementById('mensal')
const btnAnual = document.getElementById('anual')
const btnPesquisar = document.getElementById('pesquisar')

const inputDiario = document.getElementById('input_diario')
const inputMensal = document.getElementById('input_mensal')
const inputAnual = document.getElementById('input_anual')

const card_relat = document.getElementById('card_Relatorio')
const relat_content = document.getElementById('relat-content')


btnDiario.addEventListener('click', () =>{
    card_relat.style.height = '35rem'
    relat_content.style.display = 'flex'
    btnPesquisar.style.display = 'flex'

    inputDiario.style.display = 'flex'
    btnDiario.style.backgroundColor = '#585858'
    btnDiario.style.color = '#ffffff'
    btnDiario.style.fontWeight = '500'
    
    inputMensal.style.display = 'none'
    btnMensal.style.color = '#000000'
    btnMensal.style.backgroundColor = '#FFC672'

    inputAnual.style.display = 'none'
    btnAnual.style.color = '#000000'
    btnAnual.style.backgroundColor = '#FFC672'

})

btnMensal.addEventListener('click', () =>{
    inputMensal.style.display = 'flex'
    inputDiario.style.display = 'none'
    inputAnual.style.display = 'none'
    btnMensal.style.backgroundColor = '#585858'
    btnMensal.style.color = '#ffffff'
    btnDiario.style.color = '#000000'
    btnDiario.style.backgroundColor = '#FFC672'

})