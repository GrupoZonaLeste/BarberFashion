from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from controllers.controller import Controller
from models.model import *
from database.connection import *
from database.database import *
from service.cors import add_cors
from datetime import datetime, timezone
from urllib.parse import unquote
from controllers.tokens import Token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import shutil
import os
from fastapi.staticfiles import StaticFiles
##importando rotas:
from router.router_client import router as client_router
from router.router_auth import router as auth_router
from router.router_schedule import router as schedule_router
from router.router_manager import router as manager_router
from router.router_employee import router as employee_router

app = FastAPI(debug=True)
add_cors(app)
app.include_router(client_router, prefix="/client", tags=["clientes"])
app.include_router(auth_router, prefix="/auth", tags=["autenticação"])
app.include_router(schedule_router, prefix="/schedule", tags=["agendamentos"])
app.include_router(manager_router, prefix="/manager", tags=["gerente"])
app.include_router(employee_router, prefix="/employee", tags=["funcionario"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)