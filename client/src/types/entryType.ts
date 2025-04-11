export interface EntryType {
    id: number;
    event_id: number;
    name: string;
    price: number;
    capacity: number;
  }
  
  export interface EntryTypeCreate {
    event_id: number;
    name: string;
    price: number;
    capacity: number;
  }
  