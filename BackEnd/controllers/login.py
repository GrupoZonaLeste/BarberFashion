from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib

class Controller_auth:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()
    
    def listar_usuario_por_email(self, email):
        usuario = self.get_current_collection().find_one({'email': email})
        return usuario

    def login(self, email: str, senha: str,tipousuario:str,request) -> bool:
        jwt_token = Token()  
        user_agent = request.headers.get("user-agent")
        client_ip = request.client.host
        usuario = self.listar_usuario_por_email(email)
        print(usuario)
        if usuario:
            if tipousuario == {'cliente'}:
                senha_armazenada = usuario.get('password')
                cliente_id = usuario.get('client_id')
                print(senha_armazenada)
                senha_criptografada = hashlib.sha256(senha.encode()).hexdigest()
                print(senha_criptografada)
                if senha_armazenada == senha_criptografada:
                    jwt = jwt_token.gerar_token(usuario['name'], client_ip, cliente_id) 
                    return [jwt]
                return False
            elif tipousuario == {'funcionario'}:
                senha_armazenada = usuario.get('password')
                func_id = usuario.get('funcionario_id')
                print(str(func_id) + "olaaaaaaaaaaaa")
                print(senha_armazenada)
                senha_criptografada = hashlib.sha256(senha.encode()).hexdigest()
                print(senha_criptografada)
                if senha_armazenada == senha_criptografada:
                    jwt = jwt_token.gerar_token_funcionario(usuario['name'], client_ip, func_id) 
                    return [jwt]
                return False
            elif tipousuario == {'adm'}:
                senha_armazenada = usuario.get('password')
                adm_id = usuario.get('adm_id')
                print(senha_armazenada)
                senha_criptografada = hashlib.sha256(senha.encode()).hexdigest()
                print(senha_criptografada)
                if senha_armazenada == senha_criptografada:
                    jwt = jwt_token.gerar_token_gerente(usuario['name'], client_ip, adm_id) 
                    return [jwt]
                return False
            else:
                return ("Usuario sem permissão de acesso")
        
            
    
    def qtd_ids_cliente(self):
        return self.get_current_collection().count_documents({'client_id': {'$exists': True}}) + 1
    
    def qtd_ids_funcionario(self):
        return self.get_current_collection().count_documents({'funcionario_id': {'$exists': True}}) + 1
    
    def tipoUsuario(self, email):
        usuario1 = self.get_current_collection().find_one({'$and': [{'client_id': {'$exists': True}}, {'email': email}]})
        usuario2 = self.get_current_collection().find_one({'$and': [{'gerente_id': {'$exists': True}}, {'email': email}]})
        usuario3 = self.get_current_collection().find_one({'$and': [{'funcionario_id': {'$exists': True}}, {'email': email}]})
        if(usuario1):
            return {'cliente'}
        elif(usuario2):
            return {'adm'}
        elif(usuario3):
            return {'funcionario'}


