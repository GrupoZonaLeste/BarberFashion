from bson.objectid import ObjectId
from typing import Dict, List
from models.model import *
from pymongo.results import InsertOneResult, UpdateResult, DeleteResult
from bson.objectid import ObjectId
from controllers.tokens import Token
import hashlib
import re

class Controller_manager:
    def __init__(self, db_connection) -> None:
        self.__collection_name = "cliente"
        self.__collection_name_services = "servicos"
        self.__collection_name_historico = "historico"
        self.__db_connection = db_connection

    def get_current_collection(self):
        return self.__db_connection.get_collection(self.__collection_name)
    
    def get_current_collection_services(self):
        return self.__db_connection.get_collection(self.__collection_name_services)
    
    def get_current_collection_historico(self):
        return self.__db_connection.get_collection(self.__collection_name_historico)
    
    def listar_funcionarios(self):
        funcionarios = []
        for i in self.get_current_collection().find({'funcionario_id': {'$exists': True}}):
            funcionarios.append(i)
        for i in funcionarios:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return funcionarios
    
    def editar_funcionario(self, funcid, data: dict):
        self.get_current_collection().update_one({"funcionario_id": int(funcid)}, {"$set": data})
    
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
            return{"status": "OK", "funcid": funcionario.funcionario_id}
        
    def criar_servicos(self, servico):
        if len(self.listar_servicos()) > 0:
            for i in self.listar_servicos():
                if i.get('nome') == servico.get("nome"):
                    return
            self.get_current_collection_services().insert_one(servico)
        else:
            self.get_current_collection_services().insert_one(servico)

    
    def listar_servicos(self):
        servicos = []
        for i in self.get_current_collection_services().find({}):
            servicos.append(i)
        for i in servicos:
            i["_id"] = f"ObjectId({str(i['_id'])})"
        return servicos
    
    def count_servicos(self, date: str):
        servicos = self.listar_servicos()
        count_servicos = []
        total_servicos = 0
        total_dinheiro = 0
        total_cancelado = 0
        for i in servicos:
            query = self.get_current_collection_historico().count_documents({'$and': [{'data': re.compile(date)},{'servico': i['nome']}]})
            
            if(query > 0):
                count_servicos.append(query)
            else:
                count_servicos.append(0)
            
            for j in self.get_current_collection_historico().find({'$and': [{'data': re.compile(date)},{'servico': i['nome']}]}):
                total_dinheiro += int(j['preco'])
            
            total_cancelado = self.get_current_collection_historico().count_documents({'$and': [{'data': re.compile(date)},{'servico': i['nome']}, {'status': 'cancelado'}]} )
        
        for i in count_servicos:
            total_servicos += i

        

        return {'count_servicos': count_servicos, 'total_servicos': total_servicos, 'total_dinheiro': total_dinheiro, 'total_cancelado': total_cancelado}
    
    def editar_servico(self, nome: str, data: dict):
        self.get_current_collection_services().update_one({"nome": nome}, {"$set": data})
    
    def excluir_servico(self, nome: str):
        self.get_current_collection_services().delete_one({"nome": nome})
    
    ##operacional
    def qtd_ids_funcionario(self):
        return self.get_current_collection().count_documents({'funcionario_id': {'$exists': True}}) + 1
    def _hash_password(self, password):
        return hashlib.sha256(password.encode()).hexdigest()

