import axios from "axios";
import { Ticket, TicketCreate } from "../types/ticket";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllTickets = async (): Promise<Ticket[]> => {
  const response = await axios.get(`${API_URL}/tickets`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const buyTicket = async (ticket: TicketCreate): Promise<Ticket> => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_URL}/tickets`, ticket, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const validateDiscount = async ({
  event_id,
  entry_type_id,
  quantity,
  discount_code,
}: {
  event_id: number;
  entry_type_id: number;
  quantity: number;
  discount_code: string;
}): Promise<{
  valid: boolean;
  price_per_ticket: number;
  discount_percentage: number;
  final_price: number;
  quantity: number;
}> => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/tickets/validate-discount`, {
    params: {
      event_id,
      entry_type_id,
      quantity,
      discount_code,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getEntryTypesByEvent = async (eventId: number) => {
  const response = await axios.get(`${API_URL}/admin/entradas?event_id=${eventId}`);
  return response.data;
};