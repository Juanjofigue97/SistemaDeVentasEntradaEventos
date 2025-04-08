from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ticket
from schemas import TicketOut
from utils import send_email
from typing import List

router = APIRouter(prefix="/user", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users/{user_id}/tickets", response_model=List[TicketOut])
def user_tickets(user_id: int, db: Session = Depends(get_db)):
    return db.query(Ticket).filter(Ticket.user_id == user_id).all()

@router.post("/users/{user_id}/send_email")
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
