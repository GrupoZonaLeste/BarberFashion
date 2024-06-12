const API_RECUPERACAO = getEndpoint_auth("solicitar_recuperacao")
const btn_email = document.getElementById("btn_email");
const loadingOverlay = document.getElementById("loadingOverlay");
//CODIGO PRINCPAL
btn_email.addEventListener('click',function() {
    const email = document.getElementById("email").value
    console.log(email)
    const options = {
        method: 'POST',
        url: API_RECUPERACAO,
        params: {email: email},
      };

      loadingOverlay.removeAttribute("hidden");

      axios.request(options).then(function (response) {
        console.log(response.data);
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: response.data.message,
        }).then(() => {
            modal_codigo();
        });
      }).catch(function (error) {
        console.error(error);
        if (error.response) {
            if (error.response.status === 404) {
                alert("Usuário não encontrado. Verifique o email e tente novamente.");
            } else if (error.response.status === 500) {
                alert("Falha ao enviar o código de recuperação. Tente novamente mais tarde.");
            } else {
                alert("Ocorreu um erro. Tente novamente.");
            }
        } else {
            alert("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.");
        }
        }).finally(function() {
        
        loadingOverlay.setAttribute("hidden", true);
        
        
    });
});

//METODOS
async function modal_codigo(){
    const email = document.getElementById("email").value;
    Swal.fire({
        title: "Digite o código enviado pelo email",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "Enviar",
        showLoaderOnConfirm: true,
        preConfirm: async (code) => {
          try {
            const options = {
                method: 'POST',
                url: 'http://localhost:8000/auth/verificar-codigo/',
                data: {email: email, code: code}  
            };
            const response = await axios.request(options);
            return response.data; // Retorna os dados da resposta
          } catch (error) {
            if (error.response) {
                // O servidor respondeu com um status diferente de 2xx
                if (error.response.status === 400) {
                    Swal.showValidationMessage(`Código incorreto, Tente novamente!`);
                } else if (error.response.status === 401) {
                    Swal.showValidationMessage('Não autorizado. Por favor, faça login novamente.');
                } else {
                    Swal.showValidationMessage(`Erro do servidor: ${error.response.statusText}`);
                }
            } else if (error.request) {
                // A requisição foi feita mas não houve resposta
                Swal.showValidationMessage('Sem resposta do servidor. Por favor, tente novamente mais tarde.');
            } else {
                // Algo aconteceu na configuração da requisição que gerou um erro
                Swal.showValidationMessage(`Erro: ${error.message}`);
            }
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            const response = result.value; // Usa o valor retornado pela função preConfirm
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Código Válido',
                text: response.message, // Usa a mensagem da resposta
            }).then(() => {
                alterar_senha(email)
            });
        }
    });
}


function alterar_senha(email){
    const user_email = email
    Swal.fire({
        title: "Redefinir senha",
        html: `
            <input type="password" id="password" class="swal2-input" placeholder="Nova senha">
            <input type="password" id="confirm_password" class="swal2-input" placeholder="Confirme a nova senha">
        `,
        showCancelButton: true,
        confirmButtonText: "Redefinir",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const password = Swal.getPopup().querySelector('#password').value;
            const confirmPassword = Swal.getPopup().querySelector('#confirm_password').value;
    
            if (!password || !confirmPassword) {
                Swal.showValidationMessage('Por favor, preencha ambos os campos');
                return false;
            }
    
            if (password !== confirmPassword) {
                Swal.showValidationMessage('As senhas não correspondem');
                return false;
            }
                const options = {
                    method: 'POST',
                    url: 'http://localhost:8000/auth/alterar_senha/',
                    data: {password: password, email: user_email}
                  };
                  axios.request(options).then(function (response) {
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: 'Sucesso!',
                        text: response.data.message,
                    })
                  }).catch(function (error) {
                    console.error(error);
                    Swal.showValidationMessage(`Request failed: ${error}`);
                  });
        },
        allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Senha redefinida com sucesso:', result.value);
            
        }
    });
}