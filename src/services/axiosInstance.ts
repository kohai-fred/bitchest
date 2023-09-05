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

axiosBase.interceptors.response.use(
  (response) => response,
  (error) => error
);

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

  if (res.request.status !== 200) {
    const message = res.request.responseText ?? res.request.statusText;
    return [res, res.request.status, message];
  }

  if (res.data.status !== 200) {
    return [res, res.data.status, res.data.message];
  }

  return [res.data, null, null];
}

export default axiosInstance;
