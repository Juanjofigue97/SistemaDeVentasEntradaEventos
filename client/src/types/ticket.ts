export interface TicketCreate {
    event_id: number;
    entry_type_id: number;
    quantity: number;
    discount_code?: string;
  }
  
  export interface Ticket {
    id: number;
    user_id: number;
    event_id: number;
    entry_type_id: number;
    quantity: number;
    total_price: number;
  }
  