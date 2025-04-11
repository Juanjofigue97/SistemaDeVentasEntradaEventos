#Compra y gestión de entradas
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Ticket, Event, Discount, User, EntryType
from sqlalchemy.sql import func
from schemas import TicketCreate, TicketOut
from routers.auth import get_current_user
from utils import send_email
from typing import List
import datetime

router = APIRouter(prefix="/tickets", tags=["Tickets"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[TicketOut])
def get_all_tickets(db: Session = Depends(get_db)):
    tickets = db.query(Ticket).all()
    return tickets

@router.post("/", response_model=TicketOut)
def buy_ticket(
    ticket: TicketCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Verificar que el evento exista
    event = db.query(Event).filter(Event.id == ticket.event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    # Verificar que el tipo de entrada exista y pertenezca al evento
    entry_type = db.query(EntryType).filter(
        EntryType.id == ticket.entry_type_id,
        EntryType.event_id == event.id
    ).first()
    if not entry_type:
        raise HTTPException(status_code=404, detail="Tipo de entrada no válido para este evento")

    # Verificar disponibilidad
    total_tickets_of_type = (
        db.query(func.sum(Ticket.quantity))
        .filter(Ticket.entry_type_id == entry_type.id)
        .scalar() or 0
    )

    if entry_type.capacity - total_tickets_of_type < ticket.quantity:
        raise HTTPException(status_code=400, detail="No hay suficientes entradas disponibles de este tipo")

    # Calcular precio y descuento
    price_per_ticket = entry_type.price
    discount_amount = 0

    if ticket.discount_code:
        discount = db.query(Discount).filter(Discount.code == ticket.discount_code, Discount.is_active == True).first()
        if not discount:
            raise HTTPException(status_code=400, detail="Código de descuento inválido")
        discount_amount = price_per_ticket * (discount.percentage / 100)

    final_price = (price_per_ticket - discount_amount) * ticket.quantity

    # Crear ticket
    new_ticket = Ticket(
        user_id=current_user.id,
        event_id=event.id,
        entry_type_id=entry_type.id,
        quantity=ticket.quantity,
        total_price=final_price
    )

    # Actualizar contador general del evento
    event.tickets_sold += ticket.quantity

    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    result = send_email(TicketOut.from_orm(new_ticket), current_user.id)
    return new_ticket

@router.get("/validate-discount")
def validate_discount(
    event_id: int = Query(...),
    entry_type_id: int = Query(...),
    quantity: int = Query(...),
    discount_code: str = Query(...),
    db: Session = Depends(get_db)
):
    # Verificar evento
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    # Verificar tipo de entrada
    entry_type = db.query(EntryType).filter(
        EntryType.id == entry_type_id,
        EntryType.event_id == event.id
    ).first()
    if not entry_type:
        raise HTTPException(status_code=404, detail="Tipo de entrada no válido para este evento")

    # Calcular precio
    price_per_ticket = entry_type.price
    discount = db.query(Discount).filter(
        Discount.code == discount_code,
        Discount.is_active == True
    ).first()

    if not discount:
        raise HTTPException(status_code=400, detail="Código de descuento inválido")

    discount_percentage = discount.percentage
    discount_amount = price_per_ticket * (discount.percentage / 100)
    final_price = (price_per_ticket - discount_amount) * quantity

    return {
        "valid": True,
        "price_per_ticket": price_per_ticket,
        "discount_percentage": discount_percentage,
        "final_price": final_price,
        "quantity": quantity
    }

