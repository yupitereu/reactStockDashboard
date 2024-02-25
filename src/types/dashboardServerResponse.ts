export type InfoApiResponse = {
  KR: number;
  US: number;
};

export type InfoSocketResponse = {
  type: string;
  country: keyof InfoApiResponse;
  rate: number;
  responseAt: number;
};

export type RateSocketResponse = {
  type: string;
  rate: number;
  responseAt: number;
};

export type StockPriceSocketResponse = {
  type: string;
  country: string;
  name: string;
  price: number;
  responseAt: number;
};

export type MyStocksResponse = {
  name: string;
  country: keyof InfoApiResponse;
  amount: number;
  price: number;
};

export type NewTradeSocketResponse = {
  amount: number;
  country: keyof InfoApiResponse;
  name: string;
  responseAt: number;
  type: string;
};

export type SendSocketResponse = InfoSocketResponse &
  RateSocketResponse &
  StockPriceSocketResponse &
  NewTradeSocketResponse;
