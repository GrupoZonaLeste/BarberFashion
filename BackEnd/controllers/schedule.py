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
collection_historico = database['historico']

async def adicionar_corte(corte: dict):
    collection_cortes.insert_one(corte)

async def pegar_cortes(client_id):
    datas = []
    print(client_id)
    for i in collection_cortes.find({'client_id': int(client_id)}):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas

async def pegar_todos_cortes(funcid):
    datas = []
    for i in collection_cortes.find({"funcionario_id": int(funcid)}):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas

     
async def pegar_cortes_agendados():
    datas = []
    for i in collection_cortes.find({"status": "confirmado"} ):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas

async def deletar_cortes(id: str):
    collection_cortes.delete_one({"_id": ObjectId(id)})

async def atualizar_cortes(id: str , dados: str):
        collection_cortes.update_many({"_id": ObjectId(id)} , {"$set": dados})

async def adicionar_historico():
        cortes = [] 
        for i in collection_cortes.find({'$or':[{'status': 'realizado'}, {'status': 'cancelado'}] }):
            i["_id"] = f"ObjectId({str(i['_id'])})"
            cortes.append(i)
        if(len(cortes) > 0):
            collection_historico.insert_many(cortes)
        collection_cortes.delete_many({'$or':[{'status': 'realizado'}, {'status': 'cancelado'}] })
        

async def pegar_cortes_realizados(clientid, funcid):
    await adicionar_historico()
    filtro = {}
    if(clientid == '0' and funcid != '0'):
        filtro = {"funcionario_id": int(funcid), "status": "realizado"}
    elif(funcid == '0' and clientid != '0'):
        filtro = {"client_id": int(clientid), "status": "realizado"}
    elif(clientid == '0' and funcid == '0'):
        filtro = {"status": "realizado"}

    datas = []
    for i in collection_historico.find(filtro):
        i["_id"] = f"ObjectId({str(i['_id'])})"
        datas.append(i)
    return datas


