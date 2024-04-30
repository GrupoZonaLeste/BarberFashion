const switchModal = () =>{
    const modal = document.querySelector('.modal')
    modal.style.display = 'block'
}

const btn = document.querySelector('.modalBtn')
btn.addEventListener('click', switchModal)

window.onclick = function(e) {
    const modal = document.querySelector('.modal')
    if (e.target == modal) {
        modal.style.display = 'none'
    }
}
