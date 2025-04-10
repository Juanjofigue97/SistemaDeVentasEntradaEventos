from dotenv import load_dotenv
load_dotenv()

import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Cargar variable de entorno (usa python-dotenv si es necesario)
# DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///../eventia.db")

# Verificar si es SQLite para pasar connect_args
# if DATABASE_URL.startswith("sqlite"):
#     engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
# else:
#     engine = create_engine(DATABASE_URL)

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
