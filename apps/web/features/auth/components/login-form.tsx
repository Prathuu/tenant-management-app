"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "../schema";
import { useAuth } from "../auth.hooks";
import { GlassButton } from "@/components/glass/glass-button";
import { GlassInput } from "@/components/glass/glass-input";
import { UserRound } from "lucide-react";

export const LoginForm = () => {
  const { login, loading } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    login(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <GlassInput
        placeholder="Email"
        {...form.register("email")}
        endIcon={<UserRound size={18} />}
      />
      <GlassInput
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />

      <GlassButton type="submit" className="mx-auto w-full" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </GlassButton>
    </form>
  );
};
