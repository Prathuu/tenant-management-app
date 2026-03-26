"use client";

import { useState } from "react";
import { GlassCard } from "@/components/glass/glass-card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { cn } from "@/lib/utils";
import { GlassButton } from "@/components/glass/glass-button";

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md space-y-6" enableHover={false}>
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === "login"
              ? "Enter your credentials to continue"
              : "Start managing your properties"}
          </p>
        </div>

        {/* Toggle (clean AF, no bugs) */}
        <div className="flex w-full rounded-xl p-1 bg-[var(--glass-bg)] border border-[var(--glass-border)]">
          <GlassButton
            onClick={() => setMode("login")}
            className={cn(
              "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
              mode === "login"
                ? ""
                : "bg-[var(--accent)] text-[var(--accent-foreground)] shadow",
            )}
          >
            Login
          </GlassButton>

          <GlassButton
            onClick={() => setMode("register")}
            className={cn(
              "flex-1 h-10 rounded-lg text-sm font-medium transition-all",
              mode === "register"
                ? ""
                : "bg-[var(--accent)] text-[var(--accent-foreground)] shadow",
            )}
          >
            Register
          </GlassButton>
        </div>

        {/* Forms */}
        <div className="w-full">
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </GlassCard>
    </div>
  );
};
