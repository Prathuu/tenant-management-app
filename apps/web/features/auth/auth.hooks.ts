import { useState } from "react";
import { loginUser, registerUser } from "../auth/auth.api";
import { toast } from "sonner";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      await loginUser(data);
      toast.success("Logged in");
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await registerUser(data);
      toast.success("Account created");
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading };
};
