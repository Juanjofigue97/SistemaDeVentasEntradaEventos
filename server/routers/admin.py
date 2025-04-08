# admin.py

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import List
import models, schemas


router = APIRouter(prefix="/admin", tags=["Admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear evento
@router.post("/eventos", response_model=schemas.EventOut)
def crear_evento(event: schemas.EventOut, db: Session = Depends(get_db)):
    nuevo_evento = models.Event(**event.dict())
    db.add(nuevo_evento)
    db.commit()
    db.refresh(nuevo_evento)
    return nuevo_evento

# Actualizar evento
@router.put("/eventos/{evento_id}", response_model=schemas.EventOut)
def actualizar_evento(evento_id: int, evento_actualizado: schemas.EventOut, db: Session = Depends(get_db)):
    evento = db.query(models.Event).get(evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    for k, v in evento_actualizado.dict().items():
        setattr(evento, k, v)
    db.commit()
    db.refresh(evento)
    return evento

# Eliminar evento
@router.delete("/eventos/{evento_id}")
def eliminar_evento(evento_id: int, db: Session = Depends(get_db)):
    evento = db.query(models.Event).get(evento_id)
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    db.delete(evento)
    db.commit()
    return {"detail": "Evento eliminado"}

# Crear tipo de entrada
@router.post("/entradas", response_model=List[schemas.EntryTypeOut])
def crear_tipo_entrada(entries: List[schemas.EntryTypeCreate], db: Session = Depends(get_db)):
    nuevos_tipos = []
    for entry in entries:
        tipo_entrada = models.EntryType(**entry.dict())
        db.add(tipo_entrada)
        nuevos_tipos.append(tipo_entrada)
    db.commit()
    for tipo in nuevos_tipos:
        db.refresh(tipo)
    return nuevos_tipos

# Crear código de descuento
@router.post("/descuentos", response_model=schemas.Discount)
def crear_descuento(descuento: schemas.Discount, db: Session = Depends(get_db)):
    existente = db.query(models.Discount).filter_by(code=descuento.code).first()
    if existente:
        raise HTTPException(status_code=400, detail="El código de descuento ya existe.")
    nuevo_descuento = models.Discount(**descuento.dict())
    db.add(nuevo_descuento)
    db.commit()
    db.refresh(nuevo_descuento)
    return nuevo_descuento
