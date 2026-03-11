import { useMutation } from "@tanstack/react-query";
import { login } from "./auth.api";

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.accessToken);

      window.location.href = "/dashboard";
    },
  });
};
