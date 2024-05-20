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