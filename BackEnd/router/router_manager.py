from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
##Classes locais
from controllers.tokens import Token
from controllers.manager import Controller_manager
from models.model import *
from database.connection import *

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller_manager(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

@router.get('/listar_funcionarios/')
async def get_funcionarios():
    return controller.listar_funcionarios()

@router.delete('/deletar_funcionario/{funcid}')
async def delete_funcionarios(funcid: int):
    return controller.excluir_funcionario(funcid)

@router.get('/listar_usuarios/')
async def listar_todos_usuarios():
    return controller.listar_usuarios()

@router.post("/cadastrar_funcionario")
async def add_func(funcionario: Funcionario = Body(...)):
    funcionario.funcionario_id = controller.qtd_ids_funcionario()
    return controller.inserir_funcionario(funcionario)