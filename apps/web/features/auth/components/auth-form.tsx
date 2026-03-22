"use client";

import {
  GlassTabs,
  GlassTabsList,
  GlassTabsTrigger,
  GlassTabsContent,
} from "@/components/glass/glass-tabs";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { GlassCard } from "@/components/glass/glass-card";

export const AuthForm = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Welcome</h2>
          <p className="text-sm text-muted-foreground">
            Manage your properties effortlessly
          </p>
        </div>

        {/* Glass Tabs */}
        <GlassTabs defaultValue="login" className="space-y-5">
          <GlassTabsList>
            <GlassTabsTrigger value="login">Login</GlassTabsTrigger>

            <GlassTabsTrigger value="register">Register</GlassTabsTrigger>
          </GlassTabsList>

          <GlassTabsContent value="login">
            <LoginForm />
          </GlassTabsContent>

          <GlassTabsContent value="register">
            <RegisterForm />
          </GlassTabsContent>
        </GlassTabs>
      </GlassCard>
    </div>
  );
};
