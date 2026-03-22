"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { GlassCard } from "@/components/glass/glass-card";

export const AuthForm = () => {
  return (
    <div className="flex items-center justify-center p-6">
      <GlassCard className="w-full max-w-md p-6 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Welcome</h2>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </GlassCard>
    </div>
  );
};
