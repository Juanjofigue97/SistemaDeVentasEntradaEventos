import { Event } from "../types/event";

const API_URL = import.meta.env.VITE_API_URL + "/admin/eventos";

export async function getEvents(): Promise<Event[]> {
  const res = await fetch(import.meta.env.VITE_API_URL + "/events");
  if (!res.ok) throw new Error("Error al obtener eventos");
  return res.json();
}

export async function createEvent(event: Event): Promise<Event> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Error al crear evento");
  return res.json();
}

export async function updateEvent(id: number, event: Event): Promise<Event> {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });
  if (!res.ok) throw new Error("Error al actualizar evento");
  return res.json();
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar evento");
}

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Error al subir la imagen");
  }

  const data = await response.json();
  return data.url; // esta será la URL completa que puedes guardar en tu evento
};
