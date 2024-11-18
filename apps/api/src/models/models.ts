export interface Event {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    image: string | null;
  }

export interface Payment {
  orderId: string;
  gross_amount: number;
  payment_type: string;
}

export interface Coupons {
  productId: number;
  discount_percentage: number;
  start_date: number;
  end_date: number;
}
 
export interface Auth {
  email: string;
  name: string;
  password: string;
  role: string;
}
export interface EmailModel {
  from: string | undefined;
  to: string;
  subject: string;
  template: string;
  context: any;
}

  
  