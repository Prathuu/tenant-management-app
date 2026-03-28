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
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={form.formState.errors.email ? "mb-1" : "mb-4"}>
        <GlassInput
          placeholder="Email"
          {...form.register("email")}
          endIcon={<UserRound size={18} />}
          error={!!form.formState.errors.email}
        />
      </div>
      {form.formState.errors.email && (
        <p className="text-red-500 text-sm px-3 mb-1">
          {form.formState.errors.email.message}
        </p>
      )}

      <div className={form.formState.errors.password ? "mb-1" : "mb-4"}>
        <GlassInput
          type="password"
          placeholder="Password"
          {...form.register("password")}
          error={!!form.formState.errors.password}
        />
      </div>
      {form.formState.errors.password && (
        <p className="text-red-500 text-sm px-3 mb-1">
          {form.formState.errors.password.message}
        </p>
      )}

      <GlassButton type="submit" className="mx-auto w-full" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </GlassButton>
    </form>
  );
};
