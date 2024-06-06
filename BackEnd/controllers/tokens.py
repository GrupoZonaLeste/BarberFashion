from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta, timezone

class Token:
    def __init__(self):
        self.secret_key = 'qwedfghhjkoi87555553dffdssss'
        self.algorithm = 'HS256'

    def verificar_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirado")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    def gerar_token(self, nome: str, client_ip: str, cliente_id: int) -> str:
        payload = {
            "iss": client_ip,
            'sub': cliente_id,
            'name':nome,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=10000000),
            #role = 1 para identificar que é um cliente comum
            'role': 1

        }
        jwt_token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return jwt_token
    def gerar_token_funcionario(self, nome: str, client_ip: str, func_id: int) -> str:
        payload = {
            "iss": client_ip,
            'sub': func_id,
            'name':nome,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=10000000),
            #role = 2 para identificar que é um funcionario
            'role': 2

        }
        jwt_token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return jwt_token
    
    def gerar_token_gerente(self, nome: str, client_ip: str, gerente_id: int) -> str:
        payload = {
            "iss": client_ip,
            'sub': gerente_id,
            'name':nome,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=10000000) ,
            #role = 3 para identificar que é um gerente
            'role': 3

        }
        jwt_token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return jwt_token