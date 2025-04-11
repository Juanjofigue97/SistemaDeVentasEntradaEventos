from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import EntryType, Ticket, Event
from schemas import TicketOut
from models import Ticket, User
from schemas import TicketOut, UserOut
from utils import send_email
from typing import List

router = APIRouter(prefix="/user", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
@router.get("/", response_model=List[UserOut])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()

@router.get("/{user_id}/tickets")
def user_tickets(user_id: int, db: Session = Depends(get_db)):

    tickets = db.query(Ticket).filter(Ticket.user_id == user_id).all()
    historial = []
    for ticket in tickets:
        evento = db.query(Event).filter(Event.id == ticket.event_id).first()
        entry_type = db.query(EntryType).filter(
            EntryType.id == ticket.entry_type.id,
            EntryType.event_id == ticket.event_id
        ).first()
        data = {
            "name_evento": evento.name,
            "date": evento.date,
            "locacion": evento.location,
            "entradas": ticket.quantity,
            "tipo_entrada": entry_type.name,
            "total": ticket.total_price,
            "estado": evento.estado
        }
        historial.append(data)
    return historial

@router.post("/{user_id}/send_email")
def email_tickets(user_id: int, db: Session = Depends(get_db)):
    tickets = db.query(Ticket).filter(Ticket.user_id == user_id).all()
    if not tickets:
        return {"message": "No se encontraron tickets para este usuario."}
    
    try:
        for ticket in tickets:
            result = send_email(ticket=ticket, user_id=user_id)
            if not result["success"]:
                return {"message": f"Error al enviar correo: {result['error']}"}
        return {"message": "Correo(s) enviados exitosamente."}
    except Exception as e:
        return {"message": f"Error inesperado: {e}"}
