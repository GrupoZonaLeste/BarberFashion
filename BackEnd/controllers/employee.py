from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib

class Controller_employee:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def retornar_nome_cliente(self, client_id):
        usuario = self.get_current_collection().find_one({'client_id': int(client_id)})
        user = { "name": usuario.get('name')}
        return user
    
    def funcionarios_qualificados(self, servico):
        funcionario = []
        for i in self.get_current_collection().find({f"servicos.{servico}": 1}):
            funcionario.append(i)
        for i in funcionario:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return funcionario
