import { CountryCode } from './category';

export type StockPrice = {
  name: string;
  price: number;
};

export type ClosedPrice = {
  name: string;
  price?: number;
  closedPrice?: number;
};

export type RealtimeStockPrice = {
  name: string;
  price: number;
  closedPrice: number;
  difference: number;
  changeRate: number;
};

export type HoldingStock = {
  name: string;
  amount: number;
  price: number;
  country: Omit<CountryCode, 'all'>;
  evaluationAmount: number;
};
