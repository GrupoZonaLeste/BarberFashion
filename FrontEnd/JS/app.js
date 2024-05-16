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
    try{
      token_decoded = parseJwt(token)
      const role = token_decoded.role
      if(token !== null && token !== undefined && token !== "") {
        if(role == 1){
          window.location.replace("http:/FrontEnd/HTML/cliente/pagina_cliente.html")
        }else if(role == 2){
          window.location.replace("http:/FrontEnd/HTML/funcionario/pagina_funcionario.html")
        }else if(role == 3){
          window.location.replace("http:/FrontEnd/HTML/gerente/pagina_gerente.html")
        }else{
          window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
        }
    }
    }catch{
      window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
    }
        
        
       
}

const typed = new Typed(".placeholder-search",{
    strings: ["Revitalize sua Imagem...", "Assegure sua Confiança...", "Mantenha sua Lealdade...", "Cortes de Excêlencia!!!"],
    typeSpeed:50,
    backSpeed:100, 
    loop: true
})

window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("voltarAoTopo").style.display = "block";
    } else {
      document.getElementById("voltarAoTopo").style.display = "none";
    }
  }

  function voltarAoTopo() {
    document.body.scrollTop = 0; // Para navegadores Safari
    document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
  }
