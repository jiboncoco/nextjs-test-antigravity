import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function ForgotPasswordPage() {
  return (
    <AuthPageShell
      eyebrow="Authentication"
      title="Recover your account"
      description="Request a Supabase password reset link and use the emailed redirect to choose a new password."
    >
      <AuthForm mode="forgot" />
    </AuthPageShell>
  );
}