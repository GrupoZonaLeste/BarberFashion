from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from controllers.controller import Controller
from models.model import *
from database.connection import *
from database.database import *
from datetime import datetime, timezone
from urllib.parse import unquote
from controllers.tokens import Token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from fastapi.staticfiles import StaticFiles


db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

@router.get('/pegartodoscortes/')
async def PegarTodosCortes():
    dados = await pegar_todos_cortes()
    return dados

@router.delete('/deletarcorte/{id}')
async def deletecorte(id):
    await deletar_cortes(id)
    return "CORTE DELETADO"

@router.put('/atualizarcortes/{id}')
async def atualizarCortes(id , dados: dict = Body(...)):
    await atualizar_cortes(id, dados)
    return "CORTE ATUALIZADO"

@router.get('/usuarionames/{id}')
async def getUsuarioNome(id):
    return controller.retornar_nome_cliente(id)