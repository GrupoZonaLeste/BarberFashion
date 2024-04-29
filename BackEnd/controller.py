from bson.objectid import ObjectId
from typing import Dict, List
from model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId

class Controller:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)

    def insert_document(self,cliente: Cliente) -> dict:
        filter = {"email": cliente.email}
        count = self.get_current_collection().count_documents(filter)
        print(count)
        if(count > 0):
            return {"status" : "EMAIL CADASTRADO"}
        else:
            response: InsertOneResult = self.get_current_collection().insert_one(cliente.model_dump())
            return{"status": "OK"}
    
    def check_Login(self, cliente: ClienteLogin) -> dict:
        filter={
        '$and': [
        {
            'email': cliente.email
        }, {
            'password': cliente.password
        }
        ]
        }   
        count = self.get_current_collection().count_documents(filter)
        if(count > 0):
            return {"status":"LOGIN CORRETO"}
        else:
            return{"status":"LOGIN NAO EXISTE"}