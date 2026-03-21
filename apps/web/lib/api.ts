import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // REQUIRED for cookies
});

/**
 * Global API error handling
 */
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    toast.error(message, {
      className:
        "bg-white/5 backdrop-blur-2xl border border-white/10 text-white shadow-2xl rounded-xl",
    });

    // DO NOT redirect on login/register errors
    const isAuthPage =
      window.location.pathname.includes("/login") ||
      window.location.pathname.includes("/register");

    if (error.response?.status === 401 && !isAuthPage) {
      console.warn("Unauthorized - redirecting");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);
