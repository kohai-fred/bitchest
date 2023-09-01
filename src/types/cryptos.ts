export type Crypto = {
  id: number;
  name: string;
  symbol: string;
  updated_at: string;
  created_at: string;
};
export type CotationType = {
  created_at: string;
  crypto_currency_id: number;
  id: number;
  price: string;
  timestamp: string;
  updated_at: string;
};

export type LatestCotation = Crypto & { latest_cotation: CotationType };
