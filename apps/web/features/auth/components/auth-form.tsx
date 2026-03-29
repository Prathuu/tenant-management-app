"use client";

import { useState } from "react";
import { GlassCard } from "@/components/glass/glass-card";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { cn } from "@/lib/utils";

export const AuthForm = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const isLogin = mode === "login";

  return (
    <div className="flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md space-y-6" enableHover={false}>
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            {isLogin ? "Welcome back" : "Create account"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isLogin
              ? "Enter your credentials to continue"
              : "Start managing your properties"}
          </p>
        </div>

        {/* Forms (with subtle transition) */}
        <div className="relative w-full">
          <div
            key={mode}
            className="transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-5"
          >
            {isLogin ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>

        {/* Bottom Switch */}
        <div className="text-center text-sm text-muted-foreground">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("register")}
                className="text-[rgb(var(--primary))] font-medium hover:underline transition cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-[rgb(var(--primary))] font-medium hover:underline transition cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </GlassCard>
    </div>
  );
};
