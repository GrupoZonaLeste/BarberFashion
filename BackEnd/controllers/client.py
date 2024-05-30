from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib

class Controller_client:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def inserir_cliente(self,cliente: Cliente) -> dict:
        filter = {"email": cliente.email}
        count = self.get_current_collection().count_documents(filter)
        print(count)
        if(count > 0):
            return {"status" : "EMAIL CADASTRADO"}
        else:
            cliente.password = self._hash_password(cliente.password)
            self.get_current_collection().insert_one(cliente.model_dump())
            return{"status": "OK"}
        
    def listar_usuario_por_id(self, id: int):
        usuario = self.get_current_collection().find_one({'client_id': id})
        if(usuario):
            user = {'name': usuario.get('name'), 'email': usuario.get('email'), 'phone': usuario.get('phone')}
            return user
        else:
            return {"status":"ID_NOT_FOUND"}

    def editar_cliente(self,id,name, email,phone):
        usuario = self.get_current_collection().find_one({'client_id':id})
        itens = { "$set": { "name": name, 
                           "email":email,
                           "phone":phone
                           }}
        try:
            self.get_current_collection().update_one({'client_id': id},itens)
            return({"status":"OK"})
        except:
            return({"status":"ERROR"})
    ##operacional    
    def qtd_ids_cliente(self):
        return self.get_current_collection().count_documents({'client_id': {'$exists': True}}) + 1
    
    def hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

    def alterar_senha(self, email:str, nova_senha:str):
        nova_senha_cripto = hashlib.sha256(nova_senha.encode()).hexdigest()
        try:
            result = self.get_current_collection().update_one(
                {'email': email},
                {'$set': {'password': nova_senha_cripto}}
            )
            if result.matched_count > 0:
                return {"status": "OK", "message": "Senha atualizada com sucesso."}
            else:
                return {"status": "ERROR", "message": "Email não encontrado."}
        except Exception as e:
            return {"status": "ERROR", "message": str(e)}