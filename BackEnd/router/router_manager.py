from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
from fastapi.staticfiles import StaticFiles
from fastapi import File, UploadFile
import os
import shutil
from PIL import Image
from fastapi.responses import JSONResponse  
##Classes locais
from controllers.tokens import Token
from controllers.manager import Controller_manager
from controllers.schedule import pegar_cortes_agendados
from models.model import *
from database.connection import *

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller_manager(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

router.mount("/static", StaticFiles(directory="pictures_servicos"), name="static")
router.mount("/static", StaticFiles(directory="pictures_funcionarios"), name="static")


@router.post("/upload/")
async def upload_image(image: UploadFile = File(...), id: str = None):
    if id is None:
        raise HTTPException(status_code=400, detail="ID is required")

    # Diretório onde as imagens serão salvas
    upload_folder = "pictures_servicos"
    file_extension = ".jpeg"

    # Cria o novo nome do arquivo usando o ID do usuário e a extensão do arquivo original
    new_filename = f"servico_{id}{file_extension}"

    # Caminho completo para salvar a imagem
    image_path = os.path.join(upload_folder, new_filename)
   
    # Cria o diretório de upload se não existir
    os.makedirs(upload_folder, exist_ok=True)

    # Salva a imagem no diretório temporariamente
    temp_path = os.path.join(upload_folder, f"temp_{id}{os.path.splitext(image.filename)[1]}")
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Abre a imagem e a converte para WebP
    with Image.open(temp_path) as img:
        img.save(image_path, format="jpeg")

    # Remove a imagem temporária
    os.remove(temp_path)

    return JSONResponse({"filename": new_filename})


@router.post("/upload_funcionario/")
async def upload_image(image: UploadFile = File(...), id: int = None):
    if id is None:
        raise HTTPException(status_code=400, detail="ID is required")

    # Diretório onde as imagens serão salvas
    upload_folder = "pictures_funcionarios"
    file_extension = ".jpeg"

    # Cria o novo nome do arquivo usando o ID do usuário e a extensão do arquivo original
    new_filename = f"funcionario_{id}{file_extension}"

    # Caminho completo para salvar a imagem
    image_path = os.path.join(upload_folder, new_filename)
   
    # Cria o diretório de upload se não existir
    os.makedirs(upload_folder, exist_ok=True)

    # Salva a imagem no diretório temporariamente
    temp_path = os.path.join(upload_folder, f"temp_{id}{os.path.splitext(image.filename)[1]}")
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # Abre a imagem e a converte para WebP
    with Image.open(temp_path) as img:
        img.save(image_path, format="jpeg")

    # Remove a imagem temporária
    os.remove(temp_path)

    return JSONResponse({"filename": new_filename})

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

@router.get("/listar_cortes_agendados")
async def listar_agendamentos():
    return await pegar_cortes_agendados()