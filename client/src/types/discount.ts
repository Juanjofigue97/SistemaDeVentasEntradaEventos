export interface Discount {
    id: number;
    code: string;
    percentage: number;
    is_active: boolean;
  }
  
  export interface DiscountCreate {
    code: string;
    percentage: number;
    is_active: boolean;
  }