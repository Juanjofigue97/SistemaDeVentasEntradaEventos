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
  const response = await axios.post(`${API_URL}/tickets`, ticket, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
