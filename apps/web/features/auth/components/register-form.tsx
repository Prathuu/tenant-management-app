"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "../schema";
import { useAuth } from "../auth.hooks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/glass/glass-button";
import { GlassInput } from "@/components/glass/glass-input";
import { Mail, UserRound } from "lucide-react";

export const RegisterForm = () => {
  const { register: registerUserFn, loading } = useAuth();

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterInput) => {
    registerUserFn({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={form.formState.errors.name ? "mb-1" : "mb-4"}>
        <GlassInput
          placeholder="Name"
          {...form.register("name")}
          endIcon={<UserRound size={18} />}
          error={!!form.formState.errors.name}
        />
      </div>
      {form.formState.errors.name && (
        <p className="text-red-500 text-sm px-3 mb-1">
          {form.formState.errors.name.message}
        </p>
      )}
      <div className={form.formState.errors.email ? "mb-1" : "mb-4"}>
        <GlassInput
          placeholder="Email"
          {...form.register("email")}
          endIcon={<Mail size={18} />}
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

      <div className={form.formState.errors.confirmPassword ? "mb-1" : "mb-4"}>
        <GlassInput
          type="password"
          placeholder="Confirm Password"
          {...form.register("confirmPassword")}
          error={!!form.formState.errors.confirmPassword}
        />
      </div>
      {form.formState.errors.confirmPassword && (
        <p className="text-red-500 text-sm px-3 mb-1">
          {form.formState.errors.confirmPassword.message}
        </p>
      )}

      <GlassButton type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </GlassButton>
    </form>
  );
};
