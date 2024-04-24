from pymongo import MongoClient
from bson import ObjectId

MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['teste-python']
collection_cortes = database['collection-cortes']

async def adicionar_corte(corte: dict):
    collection_cortes.insert_one(corte)

async def pegar_cortes():
    datas = []
    for i in collection_cortes.find({}):
        datas.append(i)
    for i in datas:
        i["_id"] = f"ObjectId({str(i['_id'])})"       
    return datas

async def deletar_cortes(id: str):
    collection_cortes.delete_one({"_id": ObjectId(id)})