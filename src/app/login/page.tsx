import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function LoginPage() {
  return (
    <AuthPageShell
      eyebrow="Authentication"
      title="Welcome back"
      description="Sign in to your Supabase-backed Next.js app and pick up where you left off."
    >
      <AuthForm mode="login" />
    </AuthPageShell>
  );
}