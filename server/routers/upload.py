from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
import os
from uuid import uuid4

router = APIRouter()

UPLOAD_DIR = "static/images/events"

# Asegurarse de que exista la carpeta
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Archivo no es una imagen")

    filename = f"{uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Retorna una ruta relativa para usarla en el frontend
    return JSONResponse(content={"image_url": f"/{file_path}"})
