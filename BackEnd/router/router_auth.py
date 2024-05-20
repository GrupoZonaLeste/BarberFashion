from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
##Classes locais
from controllers.controller import Controller
from models.model import *
from database.connection import *
from database.database import *
from controllers.tokens import Token

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()

@router.get("/verificar-token/")
def verificar_token(token: str):
    try:
        payload = jwt_token.verificar_token(token) 
        exp = payload.get('exp')
        if exp:
            exp_date = datetime.fromtimestamp(exp)
            if exp_date > datetime.now():
                print(exp_date)
                print(datetime.now())
                return {"status": "Token válido"}
            else:
                raise HTTPException(status_code=401, detail="Token expirado")
        else:
            raise HTTPException(status_code=401, detail="Token inválido")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao verificar token")
    
@router.post("/login/")
def login(email: str, senha: str, request: Request):
    tipousuario = controller.tipoUsuario(email)
    email_decoded = unquote(email)
    resultado = controller.login(email_decoded, senha, tipousuario, request )
    if resultado:
        return {"status": "Login bem-sucedido","token" : resultado, "tipo_usuario": tipousuario}
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")