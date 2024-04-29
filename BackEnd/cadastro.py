from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from controller import Controller
from model import *
from connection import *
from database import *

db_handle = DBConnectionHandler()
db_handle.connect_to_db()
db_connection = db_handle.get_db_connection()
controller = Controller(db_connection)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/cadastrar/")
async def add_item(cliente: Cliente):
    return controller.insert_document(cliente)

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