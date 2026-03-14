import { api } from "@/lib/api";
import { LoginPayload } from "./auth.types";

export const login = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const logout = async () => {
  await api.post("/auth/logout");
};
