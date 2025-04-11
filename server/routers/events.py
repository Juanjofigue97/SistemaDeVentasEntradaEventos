#Listado de eventos
from fastapi import APIRouter, Depends, HTTPException, Request
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

@router.get("/{event_id}", response_model=EventOut)
def get_event_by_id(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    return event

@router.get("/comprar/{evento_id}/{user_id}", response_class=HTMLResponse)
def comprar_entrada(evento_id: int, user_id: int, request: Request):
    return templates.TemplateResponse("tickets.html", {"request": request})

@router.get("/{eventoId}/entry-types", response_class=JSONResponse)
def entry_types(eventoId: int, db: Session = Depends(get_db)):
    return db.query(EntryType).filter(EntryType.event_id == eventoId).all()