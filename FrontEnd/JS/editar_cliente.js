async function carregarDadosCliente() {
    try {
        const clienteId = document.getElementById('cliente_id').value;
        const url = `/perfilcliente/${clienteId}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao obter dados do cliente');
        }

        const dados = await response.json();

        // Preencher os campos de entrada com os dados obtidos
        document.getElementById('name').value = dados.name;
        document.getElementById('email').value = dados.email;
        document.getElementById('phone').value = dados.telefone;
        document.getElementById('password').value = dados.password;
    } catch (error) {
        console.error('Erro ao preencher campos do cliente: ', error);
    }
}