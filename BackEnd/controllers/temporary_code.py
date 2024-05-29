import random
import string
import time

temporary_codes = {}

def generate_temporary_code():
    return ''.join(random.choices(string.digits, k=6))

def store_temporary_code(email: str):
    code = generate_temporary_code()
    expiration_time = time.time() + 300  # Código válido por 5 minutos
    temporary_codes[email] = {'code': code, 'expires': expiration_time}
    return code