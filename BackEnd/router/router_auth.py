from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
##Classes locais
from controllers.login import Controller_auth
from models.model import *
from database.connection import *
from controllers.tokens import Token
from controllers.email_sender import *
from models.model import CodeSchema
from controllers import client
from controllers.client import Controller_client

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller_auth(db_connection)
controller_client = Controller_client(db_connection)
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

@router.post("/recuperar-senha/")
def solicitar_recuperacao(email: str):
    try:
        gerar_codigo(email)
        return {"message": "Código de recuperação de senha enviado com sucesso"}
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Falha ao enviar o código de recuperação")

@router.post("/verificar-codigo/")
async def verificar_codigo(code_data: CodeSchema):
    email = code_data.email
    code = code_data.code

    if email in temporary_codes:
        stored_code = temporary_codes[email]['code']
        expiration_time = temporary_codes[email]['expires']
        
        if time.time() > expiration_time:
            raise HTTPException(status_code=400, detail="Código expirado")
        
        if stored_code == code:
            return {"status": "OK"}
        else:
            raise HTTPException(status_code=400, detail="Código inválido")
    else:
        raise HTTPException(status_code=400, detail="Nenhum código encontrado para este email")
    
@router.post("/alterar_senha/")
async def alterar_senha(new_senha: AlterarSenha):
    email = new_senha.email
    nova_senha = new_senha.password
    return controller_client.alterar_senha(email, nova_senha)

@router.post("/cadastrar/")
async def cadastrar(cliente: Cliente):
    cliente.client_id = controller.qtd_ids_cliente()
    return controller_client.inserir_cliente(cliente)

