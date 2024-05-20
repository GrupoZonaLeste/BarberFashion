from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from controllers.tokens import Token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
##Classes locais
from controllers.employee import Controller_employee
from models.model import *
from database.connection import *
from controllers.schedule import *


db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller_employee(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

@router.get('/pegartodoscortes/')
async def PegarTodosCortes():
    dados = await pegar_todos_cortes()
    return dados

@router.get('/usuarionames/{id}')
async def getUsuarioNome(id):
    return controller.retornar_nome_cliente(id)