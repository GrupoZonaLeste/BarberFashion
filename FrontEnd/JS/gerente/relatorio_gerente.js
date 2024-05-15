const btnDiario = document.getElementById('diario')
const btnMensal = document.getElementById('mensal')
const btnAnual = document.getElementById('anual')
const btnPesquisar = document.getElementById('pesquisar')

const inputDiario = document.getElementById('input_diario')
const inputMensal = document.getElementById('input_mensal')
const inputAnual = document.getElementById('input_anual')

const card_relat = document.getElementById('card_Relatorio')
const relat_content = document.getElementById('relat-content')

const btnFechar_relat = document.getElementById('fechar_relatorio_btn')
btnDiario.onmousemove = function () {
    btnDiario.style.opacity = 0.5
}
btnDiario.onmouseout = function () {
    btnDiario.style.opacity = 1
}
btnMensal.onmousemove = function () {
    btnMensal.style.opacity = 0.5
}
btnMensal.onmouseout = function () {
    btnMensal.style.opacity = 1
}
btnAnual.onmousemove = function () {
    btnAnual.style.opacity = 0.5
}
btnAnual.onmouseout = function () {
    btnAnual.style.opacity = 1
}

btnDiario.addEventListener('click', () =>{
    card_relat.style.height = '40rem'
    relat_content.style.display = 'flex'
    btnPesquisar.style.display = 'flex'
    btnPesquisar.style.justifyContent = 'center'

    inputDiario.style.display = 'flex'
    btnDiario.style.backgroundColor = '#585858'
    btnDiario.style.color = '#ffffff'
    btnDiario.style.fontWeight = '500'
    btnDiario.style.cursor = 'default'
    
    inputMensal.style.display = 'none'
    btnMensal.style.color = '#000000'
    btnMensal.style.backgroundColor = '#FFC672'
    btnMensal.style.cursor = 'pointer'

    inputAnual.style.display = 'none'
    btnAnual.style.color = '#000000'
    btnAnual.style.backgroundColor = '#FFC672'
    btnAnual.style.cursor = 'pointer'

    btnDiario.onmousemove = function(){
        btnDiario.style.opacity = 1
    }
    btnMensal.onmousemove = function () {
        btnMensal.style.opacity = 0.5
    }
    btnMensal.onmouseout = function () {
        btnMensal.style.opacity = 1
    }
    btnAnual.onmousemove = function () {
        btnAnual.style.opacity = 0.5
    }
    btnAnual.onmouseout = function () {
        btnAnual.style.opacity = 1
    }

})

btnMensal.addEventListener('click', () =>{
    card_relat.style.height = '40rem'
    relat_content.style.display = 'flex'
    btnPesquisar.style.display = 'flex'
    btnPesquisar.style.justifyContent = 'center'

    inputMensal.style.display = 'flex'
    btnMensal.style.backgroundColor = '#585858'
    btnMensal.style.color = '#ffffff'
    btnMensal.style.cursor = 'default'

    inputAnual.style.display = 'none'
    btnAnual.style.color = '#000000'
    btnAnual.style.backgroundColor = '#FFC672'
    btnAnual.style.cursor = 'pointer'

    btnDiario.style.color = '#000000'
    btnDiario.style.backgroundColor = '#FFC672'
    inputDiario.style.display = 'none'
    btnDiario.style.cursor = 'pointer'

    btnDiario.onmousemove = function () {
        btnDiario.style.opacity = 0.5
    }
    btnDiario.onmouseout = function () {
        btnDiario.style.opacity = 1
    }
    btnMensal.onmousemove = function () {
        btnMensal.style.opacity = 1
    }
    btnMensal.onmouseout = function () {
        btnMensal.style.opacity = 1
    }
    btnAnual.onmousemove = function () {
        btnAnual.style.opacity = 0.5
    }
    btnAnual.onmouseout = function () {
        btnAnual.style.opacity = 1
    }
})

btnAnual.addEventListener('click', () =>{
    card_relat.style.height = '40rem'
    relat_content.style.display = 'flex'
    btnPesquisar.style.display = 'flex'
    btnPesquisar.style.justifyContent = 'center'

    inputAnual.style.display = 'flex'
    btnAnual.style.backgroundColor = '#585858'
    btnAnual.style.color = '#ffffff'
    btnAnual.style.cursor = 'default'

    inputMensal.style.display = 'none'
    btnMensal.style.color = '#000000'
    btnMensal.style.backgroundColor = '#FFC672'
    btnMensal.style.cursor = 'pointer'

    btnDiario.style.color = '#000000'
    btnDiario.style.backgroundColor = '#FFC672'
    inputDiario.style.display = 'none'
    btnDiario.style.cursor = 'pointer'

    btnDiario.onmousemove = function () {
        btnDiario.style.opacity = 0.5
    }
    btnDiario.onmouseout = function () {
        btnDiario.style.opacity = 1
    }
    btnMensal.onmousemove = function () {
        btnMensal.style.opacity = 0.5
    }
    btnMensal.onmouseout = function () {
        btnMensal.style.opacity = 1
    }
    btnAnual.onmousemove = function () {
        btnAnual.style.opacity = 1
    }
    btnAnual.onmouseout = function () {
        btnAnual.style.opacity = 1
    }
})

btnFechar_relat.addEventListener('click', () => {
    card_relat.style.height = '10rem'
    relat_content.style.display = 'none'
    btnPesquisar.style.display = 'none'

    inputMensal.style.display = 'none'
    btnMensal.style.color = '#000000'
    btnMensal.style.backgroundColor = '#FFC672'
    btnMensal.style.cursor = 'pointer'

    btnDiario.style.color = '#000000'
    btnDiario.style.backgroundColor = '#FFC672'
    inputDiario.style.display = 'none'
    btnDiario.style.cursor = 'pointer'

    btnAnual.style.color = '#000000'
    btnAnual.style.backgroundColor = '#FFC672'
    inputAnual.style.display = 'none'
    btnAnual.style.cursor = 'pointer'

    btnDiario.onmousemove = function () {
        btnDiario.style.opacity = 0.5
    }
    btnDiario.onmouseout = function () {
        btnDiario.style.opacity = 1
    }
    btnMensal.onmousemove = function () {
        btnMensal.style.opacity = 0.5
    }
    btnMensal.onmouseout = function () {
        btnMensal.style.opacity = 1
    }
    btnAnual.onmousemove = function () {
        btnAnual.style.opacity = 0.5
    }
    btnAnual.onmouseout = function () {
        btnAnual.style.opacity = 1
    }
})