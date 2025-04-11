# admin.py
from dotenv import load_dotenv
import os

load_dotenv()

from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import SessionLocal
from typing import List
from datetime import datetime
import shutil
import os

import models, schemas
import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

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
        # Subir imagen a Cloudinary
        cloudinary_response = cloudinary.uploader.upload(image.file)
        image_url = cloudinary_response.get("secure_url")

        nuevo_evento = models.Event(
            name=name,
            description=description,
            date=datetime.fromisoformat(date),
            location=location,
            price=price,
            capacity=capacity,
            image=image_url,  # Guardamos la URL
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
        # Subir nueva imagen a Cloudinary
        result = cloudinary.uploader.upload(image.file, folder="eventia/images")
        image_url = result.get("secure_url")

        # Eliminar imagen anterior si deseas (opcional y si guardabas URL anterior)
        # Cloudinary no elimina automáticamente a menos que lo hagas manual

        evento.image = image_url

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
# READ - todos o por evento
@router.get("/entradas", response_model=List[schemas.EntryTypeOut])
def listar_tipos_entrada(event_id: int = None, db: Session = Depends(get_db)):
    if event_id:
        return db.query(models.EntryType).filter(models.EntryType.event_id == event_id).all()
    return db.query(models.EntryType).all()

# UPDATE
@router.put("/entradas/{entry_id}", response_model=schemas.EntryTypeOut)
def actualizar_tipo_entrada(entry_id: int, data: schemas.EntryTypeCreate, db: Session = Depends(get_db)):
    tipo_entrada = db.query(models.EntryType).get(entry_id)
    if not tipo_entrada:
        raise HTTPException(status_code=404, detail="Tipo de entrada no encontrado")

    for key, value in data.dict().items():
        setattr(tipo_entrada, key, value)

    db.commit()
    db.refresh(tipo_entrada)
    return tipo_entrada

# DELETE
@router.delete("/entradas/{entry_id}", response_model=schemas.EntryTypeOut)
def eliminar_tipo_entrada(entry_id: int, db: Session = Depends(get_db)):
    tipo_entrada = db.query(models.EntryType).get(entry_id)
    if not tipo_entrada:
        raise HTTPException(status_code=404, detail="Tipo de entrada no encontrado")

    db.delete(tipo_entrada)
    db.commit()
    return tipo_entrada

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

# Listar todos los descuentos
@router.get("/descuentos", response_model=list[schemas.Discount])
def listar_descuentos(db: Session = Depends(get_db)):
    return db.query(models.Discount).all()

# Obtener un descuento por ID
@router.get("/descuentos/{descuento_id}", response_model=schemas.Discount)
def obtener_descuento(descuento_id: int, db: Session = Depends(get_db)):
    descuento = db.query(models.Discount).filter_by(id=descuento_id).first()
    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado.")
    return descuento

# Actualizar un descuento
@router.put("/descuentos/{descuento_id}", response_model=schemas.Discount)
def actualizar_descuento(descuento_id: int, datos: schemas.Discount, db: Session = Depends(get_db)):
    descuento = db.query(models.Discount).filter_by(id=descuento_id).first()
    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado.")
    
    descuento.code = datos.code
    descuento.percentage = datos.percentage
    descuento.is_active = datos.is_active

    db.commit()
    db.refresh(descuento)
    return descuento

# Eliminar un descuento (borrado lógico)
@router.delete("/descuentos/{descuento_id}", response_model=schemas.Discount)
def eliminar_descuento(descuento_id: int, db: Session = Depends(get_db)):
    descuento = db.query(models.Discount).filter_by(id=descuento_id).first()
    if not descuento:
        raise HTTPException(status_code=404, detail="Descuento no encontrado.")

    descuento.is_active = False  # borrado lógico
    db.commit()
    db.refresh(descuento)
    return descuento
