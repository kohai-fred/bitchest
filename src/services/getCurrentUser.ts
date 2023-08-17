import { UserType } from "@src/types/user.type";
import axiosInstance from "./axiosInstance";
import { getUserCookies } from "@src/utils/cookiesUser";

const token = getUserCookies()?.token;

export async function getCurrentUser(): Promise<UserType> {
  const [res, status, message] = await axiosInstance({
    url: "/current-user",
  });
  if (status) throw new Error(message);

  return res.data;
}
