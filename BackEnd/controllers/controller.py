from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
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
        
    def listar_usuario_por_email(self, email):
        usuario = self.get_current_collection().find_one({'email': email})
        return usuario
    
    def listar_usuario_por_id(self, id: int):
        usuario = self.get_current_collection().find_one({'client_id': id})
        if(usuario):
            user = {'name': usuario.get('name'), 'email': usuario.get('email'), 'phone': usuario.get('phone')}
            return user
        else:
            return {"status":"ID_NOT_FOUND"}
        
    def retornar_nome_cliente(self, client_id):
        usuario = self.get_current_collection().find_one({'client_id': int(client_id)})
        user = { "name": usuario.get('name')}
        return user

    def listar_funcionarios(self):
        funcionarios = []
        for i in self.get_current_collection().find({'funcionario_id': {'$exists': True}}):
            funcionarios.append(i)
        for i in funcionarios:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return funcionarios
    
    def excluir_funcionario(self, funcid):
        self.get_current_collection().delete_one({'funcionario_id': funcid})

        
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

