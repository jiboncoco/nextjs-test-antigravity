import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function RegisterPage() {
  return (
    <AuthPageShell
      eyebrow="Authentication"
      title="Create your account"
      description="Register a new Supabase user and get ready to connect database tables, policies, and app data."
    >
      <AuthForm mode="register" />
    </AuthPageShell>
  );
}