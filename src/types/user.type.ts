import { USER_ROLE } from "@src/constants/userRoles";

export type UserType = {
  created_at: string;
  email: string;
  email_verified_at: null;
  id: number;
  role: (typeof USER_ROLE)[number];
  firstname: string;
  lastname: string;
  updated_at: string;
  token: string;
};
