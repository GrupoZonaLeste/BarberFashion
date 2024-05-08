document.querySelectorAll('.nav-link').forEach(anchor =>{
    anchor.addEventListener('click', function(e){
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

document.getElementById('agendar').onclick = function(){
    const token = localStorage.getItem("token"); 
        if(token !== null && token !== undefined && token !== "") {
            window.location.replace("http:/FrontEnd/HTML/cliente/pagina_cliente.html")
        } else {
            window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
        }
}

const typed = new Typed(".placeholder-search",{
    strings: ["Revitalize sua Imagem...", "Assegure sua Confiança...", "Mantenha sua Lealdade...", "Cortes de Excêlencia!!!"],
    typeSpeed:50,
    backSpeed:100, 
    loop: true
})