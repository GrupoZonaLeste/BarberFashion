from pymongo import MongoClient
from pymongo.server_api import ServerApi
from config.mongo_db_config import mongo_db_meta
from pymongo.mongo_client import MongoClient
class DBConnectionHandler:
    def __init__(self) -> None:
        #CONEXAO ATLASs
        #self.__connection_string ='mongodb+srv://Adm:<Adm>@barbearia.xhdorgr.mongodb.net/?retryWrites=true&w=majority&appName=Barbearia'
        #CONEXAO LOCAL  
        self.__connection_string ='mongodb://{}:{}/'.format(
        mongo_db_meta["HOST"],
        mongo_db_meta["PORT"]
        )
        self.__database_name = mongo_db_meta["DB_NAME"]
        self.__client = None
        self.__db_connection = None
    def connect_to_db(self):
        self.__client = MongoClient(self.__connection_string)
        self.__db_connection = self.__client[self.__database_name]

    def get_db_connection(self):
        return self.__db_connection
    
    def get_db_client(self):
        return self.__client