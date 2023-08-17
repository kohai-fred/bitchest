import { FormValuesUser } from "@src/components/ModalUserForm";
import axiosInstance from "./axiosInstance";
import { UserType } from "@src/types/user.type";

export async function createUser(user: FormValuesUser) {
  const [res, status, message] = await axiosInstance({
    url: `/admin/users`,
    data: user,
    method: "post",
  });
  if (status) {
    throw new Error(message);
  }
  return res.data;
}

export async function updateUser(user: FormValuesUser) {
  const [res, status, message] = await axiosInstance({
    url: `/admin/users/${user.id}`,
    data: user,
    method: "put",
  });
  if (status) {
    throw new Error(message);
  }

  return res.data;
}

export async function deleteUser(userId: number) {
  const [res, status, message] = await axiosInstance({
    url: `/admin/users/${userId}`,
    method: "delete",
  });
  if (status) throw new Error(message);

  return res.data;
}

export async function getAllUsers(): Promise<UserType[]> {
  const [res, status, message] = await axiosInstance({
    url: "/admin/users",
  });
  if (status) throw new Error(message);

  return res.data;
}

export async function emailIsAlreadyTaken(
  email: string
): Promise<{ exists: boolean; email: string }> {
  const content = JSON.stringify({ email: email });
  const [res, status, message] = await axiosInstance({
    url: "/check-email",
    data: { email },
    method: "post",
  });

  return res.data;
}
