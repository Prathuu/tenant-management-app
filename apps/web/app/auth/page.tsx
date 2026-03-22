import { AuthForm } from "@/features/auth/components/auth-form";
import { AuthVisual } from "@/features/auth/components/auth-visual";

export default function AuthPage() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen">
      <AuthVisual />
      <AuthForm />
    </div>
  );
}
