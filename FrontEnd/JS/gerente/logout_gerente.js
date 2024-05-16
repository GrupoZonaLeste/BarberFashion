const btn_logout = document.getElementById('logout')
const logout = () => {
    window.location.replace("/FrontEnd/HTML/index.html")
    localStorage.removeItem('token');
    
  };

btn_logout.addEventListener('click', async () => {
   logout()
})