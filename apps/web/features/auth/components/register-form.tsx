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
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <GlassInput
        placeholder="Name"
        {...form.register("name")}
        endIcon={<UserRound size={18} />}
      />
      <GlassInput
        placeholder="Email"
        {...form.register("email")}
        endIcon={<Mail size={18} />}
      />
      <GlassInput
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      <GlassInput
        type="password"
        placeholder="Confirm Password"
        {...form.register("confirmPassword")}
      />

      <GlassButton type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account..." : "Register"}
      </GlassButton>
    </form>
  );
};
