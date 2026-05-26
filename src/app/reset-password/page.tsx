import { AuthForm } from "@/components/auth/auth-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function ResetPasswordPage() {
  return (
    <AuthPageShell
      eyebrow="Authentication"
      title="Set a new password"
      description="Open this page from the Supabase reset email, then update the password on the active session."
    >
      <AuthForm mode="reset" />
    </AuthPageShell>
  );
}