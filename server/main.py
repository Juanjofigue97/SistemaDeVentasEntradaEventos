from fastapi import FastAPI
from routers import auth, events, tickets, users, admin
from database import Base, engine
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Eventia - Sistema de Entradas")

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "https://eventia-venta-entradas.up.railway.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # También puedes usar ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(tickets.router)
app.include_router(users.router)
app.include_router(admin.router)

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8013)