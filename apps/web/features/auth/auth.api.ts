import { api } from "@/lib/api";
import { LoginPayload } from "./auth.types";

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);
