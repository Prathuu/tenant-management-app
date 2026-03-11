"use client";

import { useState } from "react";
import { useLogin } from "@/features/auth/auth.hooks";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">{isPending ? "Logging in..." : "Login"}</button>
    </form>
  );
}
