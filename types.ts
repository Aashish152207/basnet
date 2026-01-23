
export type Role = 'admin' | 'customer';

export interface User {
  id: string;
  username: string;
  role: Role;
}

export interface DiamondPack {
  id: string;
  amount: number;
  bonus: number;
  price: number;
  currency: string;
  icon: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
}

export interface Order {
  id: string;
  customerId: string;
  username: string;
  diamondPackId: string;
  amount: number;
  price: number;
  status: 'pending' | 'completed' | 'rejected';
  screenshotUrl: string | null;
  timestamp: number;
}

export interface AppState {
  diamonds: DiamondPack[];
  news: NewsItem[];
  orders: Order[];
  qrCodeUrl: string;
}
