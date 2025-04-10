# admin.py

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import List
from datetime import datetime
import shutil
import os

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

async def crear_evento(
    name: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    location: str = Form(...),
    price: float = Form(...),
    capacity: int = Form(...),
    estado: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    try:
        filename = f"img_{image.filename}"
        image_path = os.path.join("static", "images", filename).replace("\\", "/")

        # Guardar imagen
        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Crear evento en la base de datos
        nuevo_evento = models.Event(
            name=name,
            description=description,
            date=datetime.fromisoformat(date),
            location=location,
            price=price,
            capacity=capacity,
            image=image_path,  # Guardás la ruta relativa o absoluta
            estado=estado
        )

        db.add(nuevo_evento)
        db.commit()
        db.refresh(nuevo_evento)

        return nuevo_evento
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear evento: {e}")

# Actualizar evento
@router.put("/eventos/{evento_id}", response_model=schemas.EventOut)
async def actualizar_evento(
    evento_id: int,
    name: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    location: str = Form(...),
    price: float = Form(...),
    capacity: int = Form(...),
    estado: str = Form(...),
    image: UploadFile = File(None),  # imagen opcional
    db: Session = Depends(get_db)
):
    evento = db.query(models.Event).filter(models.Event.id == evento_id).first()
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    evento.name = name
    evento.description = description
    evento.date = datetime.fromisoformat(date)
    evento.location = location
    evento.price = price
    evento.capacity = capacity
    evento.estado = estado

    if image:
        # Guardar nueva imagen
        filename = f"img_{image.filename}"
        image_path = os.path.join("static", "images", filename).replace("\\", "/")

        with open(image_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Opcional: eliminar la imagen anterior si existe
        if evento.image and os.path.exists(evento.image):
            os.remove(evento.image)

        evento.image = image_path

    db.commit()
    db.refresh(evento)
    return evento

# Eliminar evento
@router.delete("/eventos/{evento_id}")
def eliminar_evento(evento_id: int, db: Session = Depends(get_db)):
    evento = db.query(models.Event).filter(models.Event.id == evento_id).first()
    if not evento:
        raise HTTPException(status_code=404, detail="Evento no encontrado")
    
    # Eliminar la imagen si existe
    if evento.image and os.path.exists(evento.image):
        os.remove(evento.image)

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
