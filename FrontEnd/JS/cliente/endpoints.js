// Define base URL
const baseURL = 'http://localhost:8000';
//Definindo prexifos das rotas
const auth_prefix = "/auth"
const client_prefix = "/client"
const manager_prefix = "/manager"
const schedule_prefix = "/schedule"
const employee_prefix = "/employee"
// Define API endpoints for different prefixes
export const endpoints = {
  auth: {
    verifyToken: `${baseURL}${auth_prefix}/verificar-token/`,
    login: `${baseURL}${auth_prefix}/login/`,
  },
  client: {
    marcarCorte: `${baseURL}${client_prefix}/marcarcorte/`,
    usuario: `${baseURL}${client_prefix}/usuario/`,
    pegarCortes: ({ client_id }) => `${baseURL}${client_prefix}/pegarcortes/${client_id}`,
    editarCliente: `${baseURL}${client_prefix}/editar_cliente/`,
    cadastrarCliente: `${baseURL}${client_prefix}/cadastrar/`,
    upload: `${baseURL}${client_prefix}/upload/`,
  },
  manager: {
    cadastrarFuncionario: `${baseURL}${manager_prefix}/cadastrar_funcionario/`,
    listarUsuarios: `${baseURL}${manager_prefix}/listar_usuarios/`,
    deletarFuncionario: ({ funcid }) => `${baseURL}${manager_prefix}/deletar_funcionario/${funcid}`,
    listarFuncionarios: `${baseURL}${manager_prefix}/listar_funcionarios/`,
  },
  schedule: {
    deletarCorte: ({ id }) => `${baseURL}${schedule_prefix}/deletarcorte/${id}`,
    atualizarCortes: ({ id }) => `${baseURL}${schedule_prefix}/atualizarcortes/${id}`,
  },
  employee: {
    pegarTodosCortes: `${baseURL}${employee_prefix}/pegartodoscortes/`,
    pegarNomesUsuario: ({ id }) => `${baseURL}${employee_prefix}/usuarionames/${id}`,
  },
};
