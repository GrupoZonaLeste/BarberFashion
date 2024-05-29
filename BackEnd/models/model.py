from pydantic import BaseModel, EmailStr
from typing import Optional


class Cliente(BaseModel):
    name: str
    email: Optional[str]
    phone: Optional[str]
    password: str
    client_id: int

class ClienteLogin(BaseModel):
    email: str
    password: str

class Funcionario(BaseModel):
    name: str
    email: Optional[str]
    password: str
    servicos: dict
    funcionario_id: int

class Gerente(BaseModel):
    name: str
    email: Optional[str]
    password: str
    gerente_id: int

class CodeSchema(BaseModel):
    email: EmailStr
    code: str