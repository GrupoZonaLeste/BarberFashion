from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib

class Controller_manager:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def listar_funcionarios(self):
        funcionarios = []
        for i in self.get_current_collection().find({'funcionario_id': {'$exists': True}}):
            funcionarios.append(i)
        for i in funcionarios:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return funcionarios
    
    def excluir_funcionario(self, funcid):
        self.get_current_collection().delete_one({'funcionario_id': funcid})

    def listar_usuarios(self):
        usuarios = []
        for i in self.get_current_collection().find({'client_id': {'$exists': True}}):
            usuarios.append(i)
        for i in usuarios:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return usuarios

    def inserir_funcionario(self,funcionario: Funcionario) -> dict:
        filter = {"email": funcionario.email}
        count = self.get_current_collection().count_documents(filter)
        print(count)
        if(count > 0):
            return {"status" : "EMAIL CADASTRADO"}
        else:
            funcionario.password = self._hash_password(funcionario.password)
            self.get_current_collection().insert_one(funcionario.model_dump())
            return{"status": "OK"}
    ##operacional
    def qtd_ids_funcionario(self):
        return self.get_current_collection().count_documents({'funcionario_id': {'$exists': True}}) + 1
    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()