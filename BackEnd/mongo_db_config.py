from os import environ

mongo_db_meta = {
    "HOST" : environ.get("MONGO_HOST", "localhost"),
    "PORT" : environ.get("MONGO_PORT", 27017),
    "DB_NAME" : environ.get("MONGO_NAME", "Barbearia")
}