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

@router.get('/pegarcortes/{client_id}')
async def pegarCortes(client_id):
    dados = await pegar_cortes(client_id) 
    return dados

