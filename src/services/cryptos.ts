import { CotationType, Crypto, LatestCotation } from "@src/types/cryptos";
import axiosInstance from "./axiosInstance";

export async function getLatestCryptosCotation(): Promise<LatestCotation[]> {
  const [res, status, message] = await axiosInstance({
    url: `/latest-cotations`,
  });
  if (status) {
    throw new Error(message);
  }
  return res.data;
}

export async function getCryptoDetails(id: string): Promise<{
  cryptocurrency: Crypto;
  cotations: CotationType[];
}> {
  const [res, status, message] = await axiosInstance({
    url: `/crypto/${id}`,
  });

  if (status) {
    throw new Error(message);
  }
  return res.data;
}
