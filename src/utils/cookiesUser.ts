import Cookies from "js-cookie";
import type { UserType } from "@src/types/user.type.ts";

const COOKIE_NAME = "bitchest_user";

export function setUserCookies(user: UserType): void {
  const { role, id } = user;
  Cookies.set(COOKIE_NAME, JSON.stringify({ role, id }));
}

export function getUserCookies(): null | {
  role: "admin" | "client";
  id: number;
} {
  const user = Cookies.get(COOKIE_NAME);
  if (!user) return null;
  return JSON.parse(user);
}

export function removeUserCookies(): void {
  Cookies.remove(COOKIE_NAME);
}
