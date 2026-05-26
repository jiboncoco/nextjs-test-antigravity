"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createSupabaseClient, supabaseConfigured } from "@/lib/supabase/client";

type SessionSummary = {
  email: string;
  userId: string;
  createdAt: string;
} | null;

export function DashboardPage() {
  const router = useRouter();
  const [sessionSummary, setSessionSummary] = useState<SessionSummary>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSession() {
      if (!supabaseConfigured) {
        if (active) {
          setError("Configure Supabase environment variables to view the dashboard.");
          setLoading(false);
        }
        return;
      }

      const supabase = createSupabaseClient();

      if (!supabase) {
        if (active) {
          setError("Supabase client could not be initialized.");
          setLoading(false);
        }
        return;
      }

      const { data } = await supabase.auth.getUser();

      if (!active) {
        return;
      }

      if (!data.user) {
        router.replace("/login");
        return;
      }

      setSessionSummary({
        email: data.user.email ?? "Unknown email",
        userId: data.user.id,
        createdAt: data.user.created_at ?? "Unknown",
      });
      setLoading(false);
    }

    void loadSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleSignOut() {
    const supabase = createSupabaseClient();

    if (!supabase) {
      setError("Configure Supabase environment variables before signing out.");
      return;
    }

    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden px-6 py-8 text-[var(--foreground)] sm:px-8 lg:px-10">
      <div className="absolute inset-0 bg-transparent" />
      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col gap-8 rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm xl:p-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#D97757]">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl">
              Your app workspace
            </h1>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <Link
              href="/"
              className="rounded-full border border-[var(--border)] bg-transparent px-4 py-2 text-[var(--foreground)] transition hover:bg-[var(--foreground)] hover:text-[var(--background)]"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full bg-[#D97757] px-4 py-2 text-white transition hover:bg-[#C96747]"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
            <h2 className="text-base font-semibold text-[var(--foreground)]">Authentication</h2>
            <p className="mt-2 leading-6">
              Use Supabase auth for sign-in, registration, password reset, and session management.
            </p>
          </article>
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
            <h2 className="text-base font-semibold text-[var(--foreground)]">Database</h2>
            <p className="mt-2 leading-6">
              The included SQL example creates a <span className="font-mono text-[#D97757]">profiles</span> table that matches authenticated users.
            </p>
          </article>
          <article className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
            <h2 className="text-base font-semibold text-[var(--foreground)]">RLS</h2>
            <p className="mt-2 leading-6">
              Row-level security policies keep each user limited to their own profile row.
            </p>
          </article>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-[#D97757]">
              Current session
            </p>
            <div className="mt-4 space-y-4 text-sm text-[var(--muted)]">
              {loading ? <p>Loading session...</p> : null}
              {error ? (
                <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-rose-500">
                  {error}
                </p>
              ) : null}
              {sessionSummary ? (
                <div className="space-y-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
                  <p>
                    <span className="font-medium text-[var(--foreground)]">Email:</span> {sessionSummary.email}
                  </p>
                  <p>
                    <span className="font-medium text-[var(--foreground)]">User ID:</span> {sessionSummary.userId}
                  </p>
                  <p>
                    <span className="text-slate-400">Created:</span> {sessionSummary.createdAt}
                  </p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-6 shadow-xl shadow-slate-950/25">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-200/80">
              Suggested next steps
            </p>
            <div className="mt-4 space-y-4 text-sm text-slate-300">
              <p className="leading-6">
                Create a <span className="font-mono text-cyan-100">profiles</span> table, then attach it to the authenticated user ID so your app can store display names and avatars.
              </p>
              <p className="leading-6">
                Add additional tables for whatever your app needs next, and keep them protected with RLS policies tied to <span className="font-mono text-cyan-100">auth.uid()</span>.
              </p>
              <p className="leading-6">
                The dashboard is intentionally simple so you can replace it with your real product flow later.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}