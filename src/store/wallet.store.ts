import { set } from "js-cookie";
import { create } from "zustand";

type WalletState = {
  wallet: {
    balance: string;
    idsCryptoTransaction: number[];
    allClientTransactions: [];
  };
};

type InitWallet = {
  balance: string;
  idsCryptoTransaction: [];
  allClientTransactions: [];
};

type ActionWalletType = {
  initWallet: (wallet: WalletState) => void;
  addBalance: (balance: string) => void;
  setNewBalance: (balance: string) => void;
  addNewIdsCryptoTransaction: (id: number) => void;
  removeIdsCryptoTransaction: (id: number) => void;
};

const initWallet: WalletState = {
  wallet: {
    balance: "0",
    idsCryptoTransaction: [],
    allClientTransactions: [],
  },
};

export const useWalletStore = create<WalletState & ActionWalletType>((set) => ({
  ...initWallet,
  initWallet: (wallet) => set((state) => ({ ...state, ...wallet })),
  addBalance: (balance) =>
    set((state) => ({
      ...state,
      wallet: { ...state.wallet, balance: state.wallet.balance + balance },
    })),
  setNewBalance: (balance) =>
    set((state) => ({ ...state, wallet: { ...state.wallet, balance } })),
  addNewIdsCryptoTransaction: (id) => {
    set((state) => {
      if (state.wallet.idsCryptoTransaction.includes(id)) return { ...state };
      state.wallet.idsCryptoTransaction.push(id);

      return { ...state };
    });
  },
  removeIdsCryptoTransaction: (id) => {
    set((state) => {
      if (!state.wallet.idsCryptoTransaction.includes(id)) return { ...state };
      const { idsCryptoTransaction } = state.wallet;
      const index = idsCryptoTransaction.indexOf(id);
      idsCryptoTransaction.splice(index, 1);
      return { ...state };
    });
  },
}));
