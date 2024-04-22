from pymongo import MongoClient

MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['teste-python']
collection_cadastro = database['collection-teste']

async def adicionar_cadastro(user: dict):
    collection_cadastro.insert_one(user)