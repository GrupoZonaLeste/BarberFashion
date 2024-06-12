from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
##Classes locais
from controllers.tokens import Token
from models.model import *
from database.connection import *
from controllers.schedule import *
from router.router_auth import verificar_token

## db_handle = DBConnectionHandler()
## db_handle.connect_to_db()
## db_connection = db_handle.get_db_connection()
## controller = Controller(db_connection)
security = HTTPBearer()
jwt_token = Token()
router = APIRouter()


@router.put('/atualizarcortes/{id}')
async def atualizarCortes(id , dados: dict = Body(...), token: str = Depends(verificar_token)):
    await atualizar_cortes(id, dados)
    return "CORTE ATUALIZADO"

@router.delete('/deletarcorte/{id}')
async def deletecorte(id, token: str = Depends(verificar_token)):
    await deletar_cortes(id)
    return "CORTE DELETADO"

@router.get('/cortes_realizados/{clientid}/{funcid}/')
async def cortesRealizados(clientid, funcid, token: str = Depends(verificar_token)):
    dados = await pegar_cortes_realizados(clientid, funcid)
    return dados