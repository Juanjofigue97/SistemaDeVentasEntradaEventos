// services/eventService.ts

import { Event } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_URL = `${API_URL}/admin/eventos`;

// Obtener todos los eventos públicos (sin autenticación)
export async function getEvents(): Promise<Event[]> {
  const res = await fetch("https://server-production-f37c.up.railway.app/events/");
  if (!res.ok) throw new Error("Error al obtener eventos");
  return res.json();
}

// Crear evento con FormData (incluye imagen)
export async function createEvent(formData: FormData) {
  const response = await fetch(`${API_URL}/admin/eventos`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Error creando el evento");
  }

  return await response.json();
}


export const updateEvent = async (id: number, data: FormData) => {
  const response = await fetch(`${API_URL}/admin/eventos/${id}`, {
    method: "PUT",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Error actualizando evento");
  }

  return await response.json();
};

// Eliminar evento
export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${ADMIN_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar evento");
}

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload-image/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await response.json();
  return data.image_url; // asegúrate de que el backend devuelva este campo
}
