"use client";

import { useMutation } from "@tanstack/react-query";
import { login, logout } from "./auth.api";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onError: (error: any) => {
      alert(error?.response?.data?.message || "Login failed");
    },
    onSuccess: () => {
      router.push("/dashboard/buildings");
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return handleLogout;
};
