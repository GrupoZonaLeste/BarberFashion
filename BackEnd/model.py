from pydantic import BaseModel
from typing import Optional

class Item(BaseModel):
    id: Optional[str] 
    name: str
    description: Optional[str]
    price: Optional[float]

class ItemSend(BaseModel):
    name: str
    description: Optional[str]
    price: Optional[float]

class Cliente(BaseModel):
    name: str
    email: Optional[str]
    telefone: Optional[str]
    password: str

class ClienteLogin(BaseModel):
    email: str
    password: str

