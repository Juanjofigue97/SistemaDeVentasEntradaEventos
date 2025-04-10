#Listado de eventos
from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from database import SessionLocal
from fastapi.responses import HTMLResponse, JSONResponse
from models import Event, EntryType
from schemas import EventOut
from typing import List

router = APIRouter(prefix="/events", tags=["Events"])
templates = Jinja2Templates(directory="templates")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[EventOut])
def list_events(db: Session = Depends(get_db)):
    return db.query(Event).all()

@router.get("/comprar/{evento_id}/{user_id}", response_class=HTMLResponse)
def comprar_entrada(evento_id: int, user_id: int, request: Request):
    return templates.TemplateResponse("tickets.html", {"request": request})

@router.get("/{eventoId}/entry-types", response_class=JSONResponse)
def entry_types(eventoId: int, db: Session = Depends(get_db)):
    return db.query(EntryType).filter(EntryType.event_id == eventoId).all()