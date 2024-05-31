from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib
from pymongo import MongoClient
from database.database import MONGO_CONNECTION_STRING

MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['Barbearia']
collection_cortes = database['cortes']
     
async def adicionar_corte(corte: dict):
    collection_cortes.insert_one(corte)

async def pegar_cortes(client_id):
    datas = []
    print(client_id)
    for i in collection_cortes.find({'client_id': int(client_id)}):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas

async def pegar_todos_cortes():
    datas = []
    for i in collection_cortes.find({}):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas
     
async def pegar_cortes_agendados():
    datas = []
    for i in collection_cortes.find({"$and": [{'client_id': {'$exists': True} , 'funcionario_id': {'$exists': True}}] } ):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas

async def deletar_cortes(id: str):
    collection_cortes.delete_one({"_id": ObjectId(id)})

async def atualizar_cortes(id: str , dados: str):
        collection_cortes.update_many({"_id": ObjectId(id)} , {"$set": dados})
    
    