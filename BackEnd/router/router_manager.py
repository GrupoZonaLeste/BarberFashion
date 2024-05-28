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

@router.put('/editar_funcionario/{funcid}')
async def editar_funcionarios(funcid, data = Body(...)):
    return controller.editar_funcionario(funcid, data)

@router.get('/listar_usuarios/')
async def listar_todos_usuarios():
    return controller.listar_usuarios()

@router.post("/cadastrar_funcionario")
async def add_func(funcionario: Funcionario = Body(...)):
    funcionario.funcionario_id = controller.qtd_ids_funcionario()
    return controller.inserir_funcionario(funcionario)

@router.post("/cadastrar_servico")
async def add_servico(servico: dict = Body(...)):
    return controller.criar_servicos(servico)

@router.get("/listar_servicos")
async def listar_todos_servicos():
    return controller.listar_servicos()

@router.delete("/deletar_servico/{nome}")
async def deletar_servico(nome):
    return controller.excluir_servico(nome)

@router.put("/editar_servico/{nome}")
async def edit_servico(nome: str , data: dict = Body(...)):
    return controller.editar_servico(nome, data)