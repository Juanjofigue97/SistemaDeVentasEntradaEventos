from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ticket
from schemas import TicketOut
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
