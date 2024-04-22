from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from database import *

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/cadastrar')
async def pegarDados(dados: dict = Body(...)):
    await adicionar_cadastro(dados)
    return "usuario criado!!"