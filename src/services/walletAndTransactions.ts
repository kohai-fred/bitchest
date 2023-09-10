import { TransactionClientHistory } from "@src/types/transaction.type";
import axiosInstance from "./axiosInstance";

type BuyCryptoProps = {
  crypto_id: number;
  quantity: string;
};

const URLS = {
  balance: "client/wallet/balance",
  transactionClientHistory: "client/transactions-history",
  cryptoRemainingQuantity: "client/crypto-remaining-quantity/",
  ownedCrypto: "client/owned-crypto",
  buy: "client/buy-crypto",
  sell: "client/sell-crypto",
};
const PROMISE_URLS = [
  URLS.balance,
  URLS.transactionClientHistory,
  URLS.ownedCrypto,
];

export async function getBalance() {
  const [res, status, error] = await axiosInstance({
    url: URLS.balance,
  });
  if (status) throw new Error(error);
  return res.data;
}

export async function getTransactionsHistory(): Promise<TransactionClientHistory> {
  const [res, status, error] = await axiosInstance({
    url: URLS.transactionClientHistory,
  });
  if (status) throw new Error(error);
  return res.data;
}

export async function getInfoClientTransactions() {
  const res = await Promise.all(
    PROMISE_URLS.map((url) => axiosInstance({ url }))
  );
  const arrayOfError = res.filter((r) => r[1]);
  if (arrayOfError.length > 0) throw new Error("Une erreur est survenue");

  const data = res.reduce((acc, [res]) => {
    acc.push(res.data);
    return acc;
  }, []);
  return {
    wallet: {
      ...data[0],
      transactionClientHistory: data[1],
      ownedCrypto: data[2],
    },
  };
}

export async function buyCrypto({ crypto_id, quantity }: BuyCryptoProps) {
  const res = await axiosInstance({
    url: URLS.buy,
    method: "post",
    data: {
      crypto_id,
      quantity,
    },
  });
  return res;
}

export async function getRemainingQuantityOfCrypto(id: number) {
  const [res, status, error] = await axiosInstance({
    url: URLS.cryptoRemainingQuantity + id,
  });

  if (status) throw new Error(error);
  return res.data;
}

export async function sellCrypto(id: number) {
  const res = await axiosInstance({
    url: URLS.sell,
    method: "post",
    data: {
      crypto_id: id,
    },
  });

  return res;
}
