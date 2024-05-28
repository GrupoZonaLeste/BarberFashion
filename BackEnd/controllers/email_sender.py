import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from config.email_config import SMTP_SERVER, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD
from controllers.temporary_code import *
from controllers.login import *
from pymongo import MongoClient
from database.database import MONGO_CONNECTION_STRING



#encaplusar em outra classe depois
MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['Barbearia']
collection = database['cliente']

def send_email(to_email: str, subject: str, message: str):
    try:
        # Configura a mensagem
        msg = MIMEMultipart()
        msg['From'] = SMTP_USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))
        
        # Conecta ao servidor SMTP
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        
        # Envia o email
        server.send_message(msg)
        server.quit()
        print("Email enviado com sucesso")
    except Exception as e:
        print(f"Falha ao enviar email: {e}")

def gerar_codigo(email: str):
    usuario = verifica_email(email)
    if(usuario):
        print(usuario)
        code = store_temporary_code(email)
        subject = "Recuperação de Senha"
        message = f"Seu código de recuperação de senha é: {code}"
        send_email(email, subject, message)
        return usuario
    else:
        return "usuário não encontrado"

    
def verifica_email(email: str):
    filter={
    'email': email
    }
    project={
    '_id': 0
    }
    usuario = collection.find_one(filter=filter, projection = project)
    return usuario