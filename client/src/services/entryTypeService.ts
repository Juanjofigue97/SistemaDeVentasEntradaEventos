import axios from "axios";
import { EntryType, EntryTypeCreate } from "../types/entryType";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_URL = `${API_URL}/admin`;

export const getAllEntryTypes = async () => {
  const response = await axios.get<EntryType[]>(`${ADMIN_URL}/entradas`);
  return response.data;
};

export const createEntryType = async (entry: EntryTypeCreate) => {
  const response = await axios.post<EntryType[]>(`${ADMIN_URL}/entradas`, [entry]);
  return response.data[0]; // asumimos que devuelve una lista y tomamos el primero
};

export const updateEntryType = async (id: number, entry: EntryTypeCreate) => {
  const response = await axios.put<EntryType>(`${ADMIN_URL}/entradas/${id}`, entry);
  return response.data;
};

export const deleteEntryType = async (id: number) => {
  const response = await axios.delete(`${ADMIN_URL}/entradas/${id}`);
  return response.data;
};
