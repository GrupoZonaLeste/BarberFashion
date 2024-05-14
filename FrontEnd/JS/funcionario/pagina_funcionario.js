const div_cortes_marcados = document.getElementById('cortes-marcados')

async function addDivCortes(){
    await fetch("http://localhost:8000/pegarcortes")
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            textDATA = `<h4>DATA:</h4> ${element.data} ; ${element.hora} <h4>CLIENTE:</h4> ${element.client_id}`;
            textDESCRIPTION = `<h4>DESCRIÇÃO:</h4>${element.servico}`;
            const p = document.createElement('p')
            const p2 = document.createElement('p')
            p.innerHTML = textDATA
            p2.innerHTML = textDESCRIPTION

            div_cortes_marcados.appendChild(p)
            div_cortes_marcados.appendChild(p2)
            
        })
    })    
}

document.addEventListener('DOMContentLoaded', addDivCortes)