// Define base URL
const baseURL = 'http://localhost:8000';
//Definindo prexifos das rotas
const auth_prefix = "/auth"
const client_prefix = "/client"
const manager_prefix = "/manager"
const schedule_prefix = "/schedule"
const employee_prefix = "/employee"
// Define API endpoints for different prefixes
const endpoints = {
  auth: {
    verifyToken: `${baseURL}${auth_prefix}/verificar-token/`,
    login: `${baseURL}${auth_prefix}/login/`,
  },
  client: {
    marcar_corte: `${baseURL}${client_prefix}/marcarcorte/`,
    usuario: `${baseURL}${client_prefix}/usuario/`,
    pegar_cortes: ({ client_id }) => `${baseURL}${client_prefix}/pegarcortes/${client_id}`,
    editar: `${baseURL}${client_prefix}/editar_cliente/`,
    cadastrar: `${baseURL}${client_prefix}/cadastrar/`,
    upload: `${baseURL}${client_prefix}/upload/`,
  },
  manager: {
    cadastrar: `${baseURL}${manager_prefix}/cadastrar_funcionario/`,
    listar_usuarios: `${baseURL}${manager_prefix}/listar_usuarios/`,
    deletar_funcionario: ({ funcid }) => `${baseURL}${manager_prefix}/deletar_funcionario/${funcid}`,
    listar_funcionarios: `${baseURL}${manager_prefix}/listar_funcionarios/`,
  },
  schedule: {
    deletar: ({ id }) => `${baseURL}${schedule_prefix}/deletarcorte/${id}`,
    atualizar: ({ id }) => `${baseURL}${schedule_prefix}/atualizarcortes/${id}`,
  },
  employee: {
    pegarTodosCortes: `${baseURL}${employee_prefix}/pegartodoscortes/`,
    pegarNomesUsuario: ({ id }) => `${baseURL}${employee_prefix}/usuarionames/${id}`,
  },
};

function getEndpoint_auth(name) {
  var path = endpoints.auth[name]
  return path
}
function getEndpoint_client(name) {
  var path = endpoints.client[name]
  return path
}
function getEndpoint_manager(name) {
  var path = endpoints.manager[name]
  return path
}
function getEndpoint_schedule(name) {
  var path = endpoints.manager[name]
  return path
}
function getEndpoint_employee(name) {
  var path = endpoints.employee[name]
  return path
}