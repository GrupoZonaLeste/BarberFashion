from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import Controller
from model import *
from connection import *

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