from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from controller import Controller
from model import *
from connection import *
from database import *
from datetime import datetime, timezone
from urllib.parse import unquote
from tokens import Token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller(db_connection)

security = HTTPBearer()
app = FastAPI()
jwt_token = Token()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/cadastrar/")
async def add_item(cliente: Cliente):
    cliente.cliente = controller.qtd_ids()
    return controller.inserir_cliente(cliente)

@app.post("/logar/")
async def add_item(cliente: ClienteLogin):
    return controller.check_Login(cliente)

@app.post('/marcarcorte')
async def addCorteNoBanco(corte: dict = Body(...)):
    await adicionar_corte(corte)
    return "CORTE MARCARDO E ENVIADO AO BANCO"

@app.get('/pegarcortes')
async def pegarCortes():
    dados = await pegar_cortes() 
    return dados

@app.delete('/deletarcorte/{id}')
async def deletecorte(id):
    await deletar_cortes(id)
    return "CORTE DELETADO"

@app.put('/atualizarcortes/{id}')
async def atualizarCortes(id , dados: dict = Body(...)):
    await atualizar_cortes(id, dados)
    return "CORTE ATUALIZADO"

@app.get("/verificar-token/")
def verificar_token(token: str):
    try:
        payload = jwt_token.verificar_token(token) 
        exp = payload.get('exp')
        if exp:
            exp_date = datetime.fromtimestamp(exp)
            if exp_date > datetime.now():
                print(exp_date)
                print(datetime.now())
                return {"message": "Token válido"}
            else:
                raise HTTPException(status_code=401, detail="Token expirado")
        else:
            raise HTTPException(status_code=401, detail="Token inválido")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao verificar token")
    
@app.post("/login/")
def login(email: str, senha: str, request: Request):
    email_decoded = unquote(email)
    resultado = controller.login(email_decoded, senha, request)
    if resultado:
        tipousuario = controller.tipoUsuario(email)
        print(resultado)
        return {"message": "Login bem-sucedido","token" : resultado, "tipo_usuario": tipousuario}
    else:
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    
    