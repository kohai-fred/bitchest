import { getUserCookies } from "@src/utils/cookiesUser";
import axios from "axios";

type AxiosInstance<T> = {
  url: string;
  method?: "get" | "post" | "patch" | "put" | "delete";
  data?: T;
  token?: string;
};

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

export async function axiosInstance<T>({
  url,
  method = "get",
  data,
}: AxiosInstance<T>) {
  const token = getUserCookies()?.token;

  const res = await axiosBase(url, {
    method,
    data,
    headers: {
      Accept: "Content-Type",
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status !== 200) {
    return [res, res.status, res.statusText];
  }

  if (res.data.status !== 200) {
    return [res, res.data.status, res.data.message];
  }

  return [res.data, null, null];
}

export default axiosInstance;
