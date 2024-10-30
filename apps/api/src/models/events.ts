export interface Event {
    name: string;
    description: string;
    category: string;
    price: number;
    stock: number;
    image: string;
  }

  export interface Coupons {
    productId: number;
    discount_percentage: number;
    start_date: number;
    end_date: number;
  }


  
  