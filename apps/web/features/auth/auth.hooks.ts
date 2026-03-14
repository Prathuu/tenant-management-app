"use client";

import { useMutation } from "@tanstack/react-query";
import { login } from "./auth.api";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,

    onSuccess: () => {
      router.push("/dashboard/buildings");
    },
  });
};
