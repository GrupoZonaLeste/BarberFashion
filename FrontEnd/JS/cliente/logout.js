const btn_logout = document.getElementById('logout')
const logout = () => {
    localStorage.removeItem('token');
    window.location.replace("http:/FrontEnd/HTML/cliente/login_cliente.html")
  };

btn_logout.addEventListener('click', async () => {
   logout()
})