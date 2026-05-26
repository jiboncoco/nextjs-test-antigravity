"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { createSupabaseClient, supabaseConfigured } from "@/lib/supabase/client";

type AuthMode = "login" | "register" | "forgot" | "reset";

type AuthFormProps = {
  mode: AuthMode;
};

const inputClassName =
  "mt-2 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[#D97757] focus:ring-2 focus:ring-[var(--ring-highlight)]";

function getAppRedirectUrl(pathname: string) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  return new URL(pathname, appUrl).toString();
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const title = {
    login: "Sign in",
    register: "Create account",
    forgot: "Reset your password",
    reset: "Choose a new password",
  }[mode];

  const submitLabel = {
    login: "Sign in",
    register: "Create account",
    forgot: "Send reset email",
    reset: "Update password",
  }[mode];

  const showEmail = mode !== "reset";
  const showPasswordInput = mode !== "forgot";
  const showConfirm = mode === "register" || mode === "reset";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("");

    if (!supabaseConfigured) {
      setError(
        "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local before using the forms.",
      );
      return;
    }

    if ((mode === "register" || mode === "reset") && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const supabase = createSupabaseClient();

    if (!supabase) {
      setError("Supabase client could not be created. Check your environment values.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          throw signInError;
        }

        router.replace("/dashboard");
        router.refresh();
        return;
      }

      if (mode === "register") {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: getAppRedirectUrl("/login"),
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (data.session) {
          router.replace("/dashboard");
          router.refresh();
          return;
        }

        setStatus("Account created. Check your inbox to confirm your email address.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        return;
      }

      if (mode === "forgot") {
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: getAppRedirectUrl("/reset-password"),
        });

        if (resetError) {
          throw resetError;
        }

        setStatus("If the account exists, a password reset link has been sent.");
        setEmail("");
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        throw updateError;
      }

      setStatus("Password updated. You can sign in with the new password now.");
      setPassword("");
      setConfirmPassword("");
      router.replace("/login");
      router.refresh();
    } catch (submissionError) {
      const message =
        submissionError instanceof Error
          ? submissionError.message
          : "Something went wrong while talking to Supabase.";

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return ( 
    <div className="space-y-6 flex flex-col items-center">
      <div className="space-y-3 text-center w-full">
        <h2 className="text-3xl font-bold text-[var(--foreground)]">
          {mode === "login" ? "Agent Login" : title}
        </h2>
        <p className="text-sm leading-6 text-[var(--muted)]">
          {mode === "login" ? "Hey, Enter your details to get sign in to your account" :
           mode === "register" ? "Create a new account." :
           mode === "forgot" ? "Send a reset link to the email address on file." :
           "Set a fresh password."}
        </p>
      </div>

      <form className="space-y-4 w-full" onSubmit={handleSubmit}>
        {showEmail ? (
          <div className="relative">
            <input
              className={inputClassName + " pr-12 text-[var(--foreground)] placeholder:text-[var(--muted)] bg-transparent"}
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={mode === "login" ? "Enter Email / Phone No" : "Email"}
              autoComplete="email"
              required
            />
            {mode === "login" && (
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <div className="h-4 w-4 rounded-full border-2 border-[var(--muted)]"></div>
              </div>
            )}
          </div>
        ) : null}

        {mode !== "forgot" ? (
          <div className="relative">
            <input
              className={inputClassName + " pr-16 text-[var(--foreground)] placeholder:text-[var(--muted)] bg-transparent"}
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={mode === "login" ? "Passcode" : "Password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={8}
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                type="button"
                className="text-xs font-semibold text-[var(--foreground)] mt-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Show" : "Hide"}
              </button>
            </div>
          </div>
        ) : null}

        {showConfirm ? (
          <div className="relative">
            <input
              className={inputClassName + " pr-16 text-[var(--foreground)] placeholder:text-[var(--muted)] bg-transparent"}
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <div className="absolute inset-y-0 right-4 flex items-center">
              <button
                type="button"
                className="text-xs font-semibold text-[var(--foreground)] mt-2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Show" : "Hide"}
              </button>
            </div>
          </div>
        ) : null}

        {mode === "login" && (
          <div className="text-left w-full mt-2 mb-4">
            <Link href="/forgot-password" className="text-xs font-medium text-[var(--foreground)]">
              Having trouble in sign in?
            </Link>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-[#f8b86e] px-4 py-4 text-sm font-bold text-black transition hover:bg-[#D97757] focus:outline-none focus:ring-2 focus:ring-[#D97757] focus:ring-offset-2 disabled:opacity-50"
        >
          {loading ? "Please wait..." : submitLabel}
        </button>
        
        {mode === "login" && (
          <div className="mt-8 space-y-6 w-full">
            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-[var(--border)]"></div>
              <span className="flex-shrink-0 mx-4 text-[var(--muted)] text-sm font-medium">— Or Sign in with —</span>
              <div className="flex-grow border-t border-[var(--border)]"></div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button type="button" className="flex items-center justify-center space-x-2 rounded-xl border border-[var(--border)] py-3 text-sm font-semibold transition hover:bg-black/5">
                <span className="font-bold text-lg">M</span> <span className="hidden sm:inline">Gmail</span>
              </button>
              <button type="button" className="flex items-center justify-center space-x-2 rounded-xl border border-[var(--border)] py-3 text-sm font-semibold transition hover:bg-black/5">
                <span className="font-bold text-lg"></span> <span className="hidden sm:inline">Apple ID</span>
              </button>
              <button type="button" className="flex items-center justify-center space-x-2 rounded-xl border border-[var(--border)] py-3 text-sm font-semibold transition hover:bg-black/5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span className="hidden sm:inline">Github</span>
              </button>
            </div>

            <div className="text-center text-xs font-medium pt-4">
              <span className="text-[var(--muted)]">Don't have an account? </span>
              <Link href="/register" className="text-[var(--foreground)] font-bold">Request Now</Link>
            </div>
          </div>
        )}

        {status && (
          <div className="rounded-xl bg-green-50 p-4 text-sm text-green-900 border border-green-200 mt-4">
            {status}
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-900 border border-red-200 mt-4">
            {error}
          </div>
        )}

        {mode !== "login" && (
          <div className="flex items-center justify-center mt-6">
            {mode === "register" || mode === "forgot" ? (
              <Link href="/login" className="text-sm font-semibold text-[#D97757] hover:underline">
                Back to sign in
              </Link>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
