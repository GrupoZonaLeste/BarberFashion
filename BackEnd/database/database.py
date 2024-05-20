from pymongo import MongoClient
from bson import ObjectId


MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['Barbearia']


