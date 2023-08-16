import { UserType } from "@src/types/user.type";
import { setUserCookies } from "@src/utils/cookiesUser";
import axiosInstance from "./axiosInstance";

export async function authenticateUser(payload: string) {
  const [res, status, message] = await axiosInstance({
    url: "/login",
    data: JSON.parse(payload),
    method: "post",
  });
  if (status) throw new Error(message);
  setUserCookies(res.token, res.user as UserType);
  return res;
}
