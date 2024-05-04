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
    phone: Optional[str]
    password: str
    client_id: int

class ClienteLogin(BaseModel):
    email: str
    password: str

