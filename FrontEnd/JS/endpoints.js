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
    verificar: `${baseURL}${auth_prefix}/verificar-token/`,
    login: `${baseURL}${auth_prefix}/login/`,
    solicitar_recuperacao: `${baseURL}${auth_prefix}/recuperar-senha/`,
    verificar_codigo: `${baseURL}${auth_prefix}/verificar-codigo/`,
  },
  client: {
    marcar_corte: `${baseURL}${client_prefix}/marcarcorte/`,
    get_usuario: `${baseURL}${client_prefix}/usuario/`,
    pegar_cortes: ({ client_id }) => `${baseURL}${client_prefix}/pegarcortes/${client_id}`,
    editar: `${baseURL}${client_prefix}/editar_cliente/`,
    cadastrar: `${baseURL}${client_prefix}/cadastrar/`,
    upload: `${baseURL}${client_prefix}/upload/`,
    funcionario_nome: ({ funcionario_id }) => `${baseURL}${client_prefix}/funcionarionames/${funcionario_id}`,
  },
  manager: {
    cadastrar: `${baseURL}${manager_prefix}/cadastrar_funcionario/`,
    listar_usuarios: `${baseURL}${manager_prefix}/listar_usuarios/`,
    deletar_funcionario: ({ funcid }) => `${baseURL}${manager_prefix}/deletar_funcionario/${funcid}`,
    listar_funcionarios: `${baseURL}${manager_prefix}/listar_funcionarios/`,
    editar_funcionario: ({ funcid }) => `${baseURL}${manager_prefix}/editar_funcionario/${funcid}`,
    foto_funcionarios: `${baseURL}${manager_prefix}/upload_funcionario/`,
    cadastrar_servicos: `${baseURL}${manager_prefix}/cadastrar_servico/`,
    foto_servicos: `${baseURL}${manager_prefix}/upload/`,
    listar_servicos: `${baseURL}${manager_prefix}/listar_servicos`,
    deletar_servicos: ({ nome }) => `${baseURL}${manager_prefix}/deletar_servico/${nome}`,
    editar_servicos: ({ nome }) => `${baseURL}${manager_prefix}/editar_servico/${nome}`,
    listar_agendamentos: `${baseURL}${manager_prefix}/listar_cortes_agendados/`,
    count_servicos: ({ date }) => `${baseURL}${manager_prefix}/count_servicos/${date}`
  },
  schedule: { 
    deletar: ({id}) => `${baseURL}${schedule_prefix}/deletarcorte/${id}`,
    atualizar: ({id}) => `${baseURL}${schedule_prefix}/atualizarcortes/${id}`,
    cortes_realizados: ({clientid, funcid}) => `${baseURL}${schedule_prefix}/cortes_realizados/${clientid}/${funcid}/`
  },
  employee: {
    pegar_todos_cortes: ({funcid}) => `${baseURL}${employee_prefix}/pegartodoscortes/${funcid}`,
    pegar_nomes_usuario: ({id}) => `${baseURL}${employee_prefix}/usuarionames/${id}`,
    funcionarios_qualificados: ({corte}) => `${baseURL}${employee_prefix}/listar_funcionarios_qualificados/${corte}`
  },
};

function getEndpoint_auth(name) {
  return endpoints.auth[name]
  
}
function getEndpoint_client(name) {
  return endpoints.client[name]
}
function getEndpoint_manager(name) {
  return endpoints.manager[name]
}
function getEndpoint_schedule(name) {
  return endpoints.schedule[name]
}
function getEndpoint_employee(name) {
  return endpoints.employee[name]
}