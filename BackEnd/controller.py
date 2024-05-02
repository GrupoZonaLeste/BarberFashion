from bson.objectid import ObjectId
from typing import Dict, List
from model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from tokens import Token
import hashlib

class Controller:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()
    
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
        
    def listar_usuario_por_email(self, email):
        usuario = self.get_current_collection().find_one({'email': email})
        return usuario
    
    def check_Login(self, cliente: ClienteLogin) -> dict:
        filter={'$and': [{'email': cliente.email}, {'password': cliente.password}]}   

        count = self.get_current_collection().count_documents(filter)
        if(count > 0):
            return {"status":"LOGIN CORRETO"}
        else:
            return{"status":"LOGIN NAO EXISTE"}
        
    def login(self, email: str, senha: str, request) -> bool:
        jwt_token = Token()  
        user_agent = request.headers.get("user-agent")
        client_ip = request.client.host
        usuario = self.listar_usuario_por_email(email)
        print(usuario)
        if usuario:
            senha_armazenada = usuario.get('password')
            print(senha_armazenada)
            senha_criptografada = hashlib.sha256(senha.encode()).hexdigest()
            print(senha_criptografada)
            if senha_armazenada == senha_criptografada:
                jwt = jwt_token.gerar_token(usuario['name'], client_ip) 
                return [jwt]
        return False
    
    def qtd_ids(self):
        return self.get_current_collection().count_documents({}) + 1
    
    def tipoUsuario(self, email):
        usuario1 = self.get_current_collection().find_one({'$and': [{'cliente': {'$exists': True}}, {'email': email}]})
        usuario2 = self.get_current_collection().find_one({'$and': [{'adm': {'$exists': True}}, {'email': email}]})
        usuario3 = self.get_current_collection().find_one({'$and': [{'funcionario': {'$exists': True}}, {'email': email}]})
        if(usuario1):
            return {'cliente'}
        elif(usuario2):
            return {'adm'}
        elif(usuario3):
            return {'funcionario'}


