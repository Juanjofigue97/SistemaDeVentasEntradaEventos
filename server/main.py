from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from routers import auth, events, tickets, users, admin, upload
from database import Base, engine
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Base.metadata.drop_all(bind=engine) 
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Eventia - Sistema de Entradas")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Configurar plantillas
templates = Jinja2Templates(directory="templates")

origins = [
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",
    "https://eventia-venta-entradas.up.railway.app",
    "https://server-production-f37c.up.railway.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # También puedes usar ["*"] para permitir todos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(auth.router)
app.include_router(events.router)
app.include_router(tickets.router)
app.include_router(users.router)
app.include_router(admin.router)

# Rutas de frontend
@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse("login.html", {"request": request})

@app.get("/dashboard", response_class=HTMLResponse)
def dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.get("/register", response_class=HTMLResponse)
def show_register(request: Request):
    return templates.TemplateResponse("register.html", {"request": request})

@app.get("/admin", response_class=HTMLResponse)
def show_admin(request: Request):
    return templates.TemplateResponse("admin.html", {"request": request})

# if __name__ == "__main__":
#     uvicorn.run(app, host='localhost', port=8013)