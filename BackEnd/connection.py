from pymongo import MongoClient
from mongo_db_config import mongo_db_meta

class DBConnectionHandler:
    def __init__(self) -> None:
        #CONEXAO ATLAS
        #self.__connection_string ='mongodb+srv://Adm:admbarbearia@barbearia.xhdorgr.mongodb.net/'
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