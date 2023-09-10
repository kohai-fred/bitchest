import type { Crypto } from "@src/types/cryptos";
import { create } from "zustand";

type CryptoState = {
  currencies: Crypto[];
};

type ActionCryptoType = {
  setCryptoCurrencies: (currencies: CryptoState["currencies"]) => void;
};

const initCrypto: CryptoState = {
  currencies: [],
};

export const useCryptoStore = create<CryptoState & ActionCryptoType>((set) => ({
  ...initCrypto,
  setCryptoCurrencies: (currencies) =>
    set((state) => ({ ...state, currencies })),
}));
