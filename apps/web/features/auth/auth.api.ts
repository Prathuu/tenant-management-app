import { api } from "@/lib/api";
import { LoginPayload, LoginResponse } from "./auth.types";
import { useRouter } from "next/navigation";

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export function logout() {
  const router = useRouter();
  localStorage.removeItem("accessToken");

  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  router.push("/login");
}
