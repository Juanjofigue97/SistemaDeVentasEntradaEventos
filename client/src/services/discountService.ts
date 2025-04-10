import axios from "axios";
import { Discount } from "../types/discount";

const API_URL = import.meta.env.VITE_API_URL;
const ADMIN_URL = `${API_URL}/admin`;
export const getAllDiscounts = async () => {
  const response = await axios.get<Discount[]>(`${ADMIN_URL}/descuentos`);
  return response.data;
};

export const createDiscount = async (discount: Discount) => {
  const response = await axios.post<Discount>(`${ADMIN_URL}/descuentos`, discount);
  return response.data;
};

export const updateDiscount = async (id: number, discount: Discount) => {
  const response = await axios.put<Discount>(`${ADMIN_URL}/descuentos/${id}`, discount);
  return response.data;
};

export const deleteDiscount = async (id: number) => {
  const response = await axios.delete(`${ADMIN_URL}/descuentos/${id}`);
  return response.data;
};
