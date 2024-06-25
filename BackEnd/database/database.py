from pymongo import MongoClient
from bson import ObjectId


MONGO_CONNECTION_STRING = MongoClient("mongodb://mongo:IPCrnLmUBIxbhIMrgnBOGTCeNxnavxOp@viaduct.proxy.rlwy.net:39450")
database = MONGO_CONNECTION_STRING['Barbearia']


