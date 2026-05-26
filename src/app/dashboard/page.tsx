export default function DashboardPage() {
  return (
    <main className="relative min-h-screen bg-[#F9Fafc] overflow-hidden flex flex-col items-center justify-center font-serif text-[var(--foreground)]">
      {/* Decorative Illustrations (Background) */}
      
      {/* Top right floating book & plane */}
      <div className="absolute top-16 right-1/4 opacity-80 hidden lg:block">
        <svg width="80" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 transform rotate-12">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          <path d="M8 7h6"/><path d="M8 11h8"/>
        </svg>
      </div>

      <div className="absolute top-32 right-1/3 opacity-50 hidden lg:block">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="transform -rotate-45">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </div>

      {/* Bottom left globe */}
      <div className="absolute bottom-16 left-1/4 opacity-80 hidden lg:block">
        <svg width="100" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 transform -rotate-12">
          <circle cx="12" cy="10" r="8"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 8 15.3 15.3 0 0 1-4 8 15.3 15.3 0 0 1-4-8 15.3 15.3 0 0 1 4-8z"/>
          <path d="M4 10h16"/>
          <path d="M12 18v4"/><path d="M8 22h8"/>
        </svg>
      </div>

      {/* Shapes mimicking avatars */}
      
      {/* Top Left Avatar */}
      <div className="absolute top-20 left-24 w-32 h-32 bg-[#bf6fe4] rounded-tl-[3rem] rounded-br-[3rem] transform rotate-45 flex items-center justify-center hidden lg:flex overflow-hidden">
         <div className="transform -rotate-45 w-20 h-20 bg-gray-200 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-xs">👤</div>
      </div>
      
      {/* Bottom Left Avatar */}
      <div className="absolute bottom-20 left-12 w-32 h-32 bg-[#ef879c] rounded-t-full hidden lg:flex items-end justify-center overflow-hidden">
        <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-sm mb-[-2rem] flex items-center justify-center text-xs">👤</div>
      </div>

      {/* Top Right Avatar */}
      <div className="absolute top-24 right-20 w-32 h-40 bg-[#8cb6f5] rounded-[3rem] hidden lg:flex items-center justify-center overflow-hidden">
        <div className="w-24 h-24 bg-gray-200 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-xs">👤</div>
      </div>

      {/* Bottom Right Avatar */}
      <div className="absolute bottom-24 right-24 w-40 h-24 bg-[#ffac52] rounded-[3rem] hidden lg:flex items-center justify-center overflow-hidden">
        <div className="w-20 h-20 bg-gray-200 rounded-full border-4 border-white shadow-sm flex items-center justify-center text-xs">👤</div>
      </div>


      {/* Small floating dots */}
      <div className="absolute top-8 right-1/2 w-4 h-4 bg-[#8cb6f5] rounded-full opacity-70"></div>
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-[#e85d4e] rounded-full opacity-90 hidden lg:block"></div>
      <div className="absolute bottom-32 left-1/3 w-3 h-3 bg-[#e85d4e] rounded-full opacity-90 hidden lg:block"></div>
      <div className="absolute top-1/2 left-20 w-4 h-4 bg-[#bf6fe4] rounded-full opacity-80 hidden lg:block"></div>
      <div className="absolute bottom-10 right-32 w-5 h-5 bg-[#bf6fe4] rounded-full opacity-80 hidden lg:block"></div>


      <div className="z-10 text-center max-w-4xl px-4 relative flex flex-col items-center">
        <div className="relative inline-block mb-1 -ml-16">
          <span className="absolute -left-16 -top-4 text-7xl text-[#f8b86e] font-sans font-medium mix-blend-multiply opacity-80 rotate-12">+</span>
          <span className="absolute -left-4 -top-8 w-6 h-6 border-4 border-[#f8b86e] rounded-full mix-blend-multiply opacity-80"></span>
          <h1 className="text-[7rem] md:text-[8rem] text-[#282d49] font-normal tracking-tight leading-none">
            Take it
          </h1>
        </div>
        
        <div className="flex items-center justify-center space-x-6 my-2 relative">
          <div className="bg-[#282d49] text-white rounded-3xl px-8 py-2 shadow-sm border-2 border-[#282d49] outline outline-1 outline-offset-4 outline-[#282d49] inline-flex items-center justify-center h-[6rem]">
            <span className="text-6xl md:text-7xl lowercase pt-2">the</span>
          </div>
          <div className="flex flex-col items-start leading-none space-y-4">
            <span className="text-7xl md:text-[8rem] text-[#282d49] lowercase -mt-4">to</span>
            <span className="text-7xl md:text-[8rem] text-[#282d49] lowercase z-10 -ml-4">next</span>
          </div>
          
          <button className="absolute right-[-10rem] top-8 rounded-[2rem] border border-gray-400 bg-white px-8 py-3 text-lg font-bold text-[#282d49] transition hover:bg-gray-50 flex items-center justify-center shadow-sm w-40 whitespace-nowrap hidden md:flex z-50">
            Let's start
          </button>
        </div>

        <div className="relative inline-block mt-0 ml-16">
          <h1 className="text-[7.5rem] md:text-[8.5rem] text-[#282d49] tracking-tight relative z-10 leading-none">
            levels
          </h1>
          <div className="absolute right-[-1rem] top-4 w-28 h-28 border-[6px] border-[#f8b86e] rounded-full z-0 opacity-80 mix-blend-multiply"></div>
        </div>

        <button className="mt-12 rounded-[2rem] border border-gray-400 bg-white px-10 py-4 text-lg font-bold text-[#282d49] transition hover:bg-gray-50 flex items-center justify-center shadow-sm md:hidden">
          Let's start
        </button>
      </div>
    </main>
  );
}
