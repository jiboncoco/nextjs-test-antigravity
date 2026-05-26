import type { ReactNode } from "react";

type AuthPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthPageShell({
  eyebrow,
  title,
  description,
  children,
}: AuthPageShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col font-sans text-[var(--foreground)]">
      {/* Navbar */}
      <header className="flex h-24 items-center justify-between px-8 lg:px-12 relative z-10">
        <div className="flex items-center space-x-12">
          <div className="text-2xl font-bold tracking-tight text-white/5 bg-[#D97757] px-4 py-2 rounded-xl text-[var(--background)]">ARTBYCODE</div>
          <div className="hidden items-center space-x-2 border-b border-[var(--border)] pb-1 text-sm md:flex">
            <span className="text-[var(--muted)]">Sales@Artbycode.uk</span>
            <span>→</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm font-medium">
          <button className="hidden p-2 md:block">
            {/* Globe icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </button>
          <a href="/register" className="hidden md:inline-block">Sign up</a>
          <button className="rounded-xl border border-transparent bg-[#D97757]/80 hover:bg-[#D97757] px-5 py-2.5 text-black font-semibold transition">
            Request Demo
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative flex flex-1 items-center justify-center p-4">
        {/* Background Illustrations Mockup (CSS) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden lg:block">
          {/* Left blocks */}
          <div className="absolute bottom-[20%] left-[15%] flex space-x-4">
            <div className="h-48 w-24 bg-[#f8b86e] rounded-sm relative overflow-hidden">
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-black"></div>
              <div className="absolute top-12 left-10 w-3 h-3 rounded-full bg-black"></div>
              <div className="absolute top-24 left-6 w-2 h-2 rounded-full bg-black"></div>
              <div className="absolute top-36 left-12 w-3 h-3 rounded-full bg-black"></div>
              <div className="absolute bottom-6 left-4 w-2 h-2 rounded-full bg-black"></div>
            </div>
            <div className="h-24 w-24 bg-white border border-[var(--border)] rounded-sm mt-auto relative flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l7-7 7 7"/>
                <path d="M12 19V5"/>
              </svg>
            </div>
          </div>
          
          {/* Abstract lines on the left */}
          <svg className="absolute top-[30%] left-[10%]" width="100" height="50" viewBox="0 0 100 50">
            <path d="M0,25 Q25,0 50,25 T100,25" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
          <div className="absolute top-[40%] left-[20%] w-2 h-2 rounded-full border border-black"></div>

          {/* Right blocks */}
          <div className="absolute bottom-[18%] right-[15%] h-56 w-28 bg-[#f8b86e] rounded-sm relative overflow-hidden">
             <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-black"></div>
             <div className="absolute top-16 left-6 w-2 h-2 rounded-full bg-black"></div>
             <div className="absolute top-28 left-16 w-2 h-2 rounded-full bg-black"></div>
             <div className="absolute top-40 left-8 w-3 h-3 rounded-full bg-black"></div>
          </div>
        </div>

        <div className="z-10 w-full max-w-[440px] rounded-[2rem] border border-[var(--border)] bg-[white] p-8 shadow-sm sm:p-12">
          {children}
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-[var(--foreground)] font-medium z-10 relative">
        Copyright @wework 2022 | Privacy Policy
      </footer>
    </div>
  );
}