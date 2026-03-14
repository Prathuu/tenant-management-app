import { api } from "@/lib/api";
import { LoginPayload, LoginResponse } from "./auth.types";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);

  return data;
};

export function logout() {
  localStorage.removeItem("access_token");
}
