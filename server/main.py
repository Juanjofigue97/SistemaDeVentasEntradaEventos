from fastapi import FastAPI
from routers import auth, events, tickets, users, admin
from database import Base, engine
import uvicorn

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Eventia - Sistema de Entradas")

app.include_router(auth.router)
app.include_router(events.router)
app.include_router(tickets.router)
app.include_router(users.router)
app.include_router(admin.router)

if __name__ == "__main__":
    uvicorn.run(app, host='localhost', port=8013)