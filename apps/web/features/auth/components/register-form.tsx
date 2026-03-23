"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "../schema";
import { useAuth } from "../auth.hooks";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GlassButton } from "@/components/glass/glass-button";

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
      <Input placeholder="Name" {...form.register("name")} />
      <Input placeholder="Email" {...form.register("email")} />
      <Input
        type="password"
        placeholder="Password"
        {...form.register("password")}
      />
      <Input
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
