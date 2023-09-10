export type TransactionType = {
  created_at: string;
  crypto_currency_id: number;
  id: number;
  price: string;
  quantity: string;
  type: "buy" | "sell";
  updated_at: string;
  user_id: number;
};

export type OwnedCryptoType = {
  id: number;
  name: string;
  symbol: string;
  available_quantity_to_sell: number;
  latest_cotation: string;
  potential_gain: number;
};

export type TransactionDataType = {
  name: string;
  symbol: string;
  id: number;
  user_id: number;
  crypto_currency_id: number;
  quantity: string;
  price: string;
  type: "buy" | "sell";
  created_at: string;
  crypto_price_cotation: string;
  percentage_gain_loss: null | number;
  amount_gain_loss: null | number;
};

export type TransactionClientHistory = {
  [key: string]: TransactionDataType[];
};
