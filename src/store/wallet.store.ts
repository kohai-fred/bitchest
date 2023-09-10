import { getTransactionsHistory } from "@src/services/walletAndTransactions";
import type {
  OwnedCryptoType,
  TransactionClientHistory,
} from "@src/types/transaction.type";
import { create } from "zustand";

type WalletState = {
  wallet: {
    balance: string;
    ownedCrypto: OwnedCryptoType[];
    transactionClientHistory: TransactionClientHistory;
  };
};

type ActionWalletType = {
  initWallet: (wallet: WalletState["wallet"]) => void;
  addBalance: (balance: string) => void;
  setNewBalance: (balance: string) => void;
  getOwnedCryptoById: (id: number) => OwnedCryptoType;
  getIdOfOwnedCryptos: () => number[];
  removeOwnedCryptoById: (id: number) => void;
  setOfOwnedCryptos: (crypto: OwnedCryptoType[]) => void;
  updateTransactionClientHistory: () => void;
};

const initWallet: WalletState = {
  wallet: {
    balance: "0",
    ownedCrypto: [],
    transactionClientHistory: {},
  },
};

export const useWalletStore = create<WalletState & ActionWalletType>(
  (set, get) => ({
    ...initWallet,
    initWallet: (wallet) =>
      set((state) => ({ ...state, wallet: { ...wallet } })),
    addBalance: (balance) =>
      set((state) => ({
        ...state,
        wallet: { ...state.wallet, balance: state.wallet.balance + balance },
      })),
    setNewBalance: (balance) =>
      set((state) => ({ ...state, wallet: { ...state.wallet, balance } })),

    getOwnedCryptoById: (id) => {
      const { ownedCrypto } = get().wallet;
      const crypto = ownedCrypto.filter((c) => c.id === id)[0];
      return crypto;
    },
    getIdOfOwnedCryptos: () => {
      const { ownedCrypto } = get().wallet;
      const arrayOfIds = ownedCrypto.map((crypto) => crypto.id);
      return arrayOfIds;
    },
    removeOwnedCryptoById: (id) => {
      set((state) => {
        const { ownedCrypto } = state.wallet;
        const arrayOfIds = state.getIdOfOwnedCryptos();
        const index = arrayOfIds.indexOf(id);
        ownedCrypto.splice(index, 1);
        return { ...state };
      });
    },
    setOfOwnedCryptos: (crypto) =>
      set((state) => ({
        ...state,
        wallet: { ...state.wallet, ownedCrypto: crypto },
      })),
    updateTransactionClientHistory: async () => {
      const transactionClientHistory = await getTransactionsHistory();
      set((state) => {
        return {
          ...state,
          wallet: {
            ...state.wallet,
            transactionClientHistory,
          },
        };
      });
    },
  })
);
