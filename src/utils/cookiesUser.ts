import Cookies from "js-cookie";
import type { UserCookieType, UserType } from "@src/types/user.type.ts";

const COOKIE_NAME = "bitchest_user";

export function setUserCookies(user: UserType): void {
  const { role, id, token } = user;
  Cookies.set(COOKIE_NAME, JSON.stringify({ role, id, token }));
}

export function getUserCookies(): null | UserCookieType {
  const user = Cookies.get(COOKIE_NAME);
  if (!user) return null;
  return JSON.parse(user);
}

export function removeUserCookies(): void {
  Cookies.remove(COOKIE_NAME);
}
