from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
from fastapi import File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from fastapi.staticfiles import StaticFiles
##Classes locais
from controllers.client import Controller_client
from models.model import *
from database.connection import *
from controllers.schedule import *
from controllers.tokens import Token

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller_client(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

router.mount("/static", StaticFiles(directory="clientes_pictures"), name="static")

@router.post("/upload/")
async def upload_image(image: UploadFile = File(...), id: int = Optional):
    # Diretório onde as imagens serão salvas
    upload_folder = "clientes_pictures"
    file_extension = os.path.splitext(image.filename)[1]

    # Cria o novo nome do arquivo usando o ID do usuário e a extensão do arquivo original
    new_filename = f"user_{id}{file_extension}"

    # Caminho completo para salvar a imagem
    image_path = os.path.join(upload_folder, new_filename)
   
    # Cria o diretório de upload se não existir
    os.makedirs(upload_folder, exist_ok=True)

    # Salva a imagem no diretório
    with open(image_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return JSONResponse({"filename": new_filename})

@router.post("/cadastrar/")
async def add_item(cliente: Cliente):
    cliente.client_id = controller.qtd_ids_cliente()
    return controller.inserir_cliente(cliente)

@router.post('/editar_cliente/')
async def editar_cliente(id: int, name: str , email: str, phone: str ):
    return controller.editar_cliente(id,name,email ,phone)

@router.post('/marcarcorte')
async def addCorteNoBanco(corte: dict = Body(...)):
    await adicionar_corte(corte)
    return "CORTE MARCARDO E ENVIADO AO BANCO"

@router.get('/pegarcortes/{client_id}')
async def pegarCortes(client_id):
    dados = await pegar_cortes(client_id) 
    return dados

@router.get('/usuario')
async def get_usuario(id: int):
    return controller.listar_usuario_por_id(id)

@router.post("/alterar_senha/")
async def alterar_senha(new_senha: AlterarSenha):
    email = new_senha.email
    nova_senha = new_senha.password
    return controller.alterar_senha(email, nova_senha)