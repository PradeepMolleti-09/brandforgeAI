import Link from "next/link";
import { Sparkles, Zap, Shield, Target, ArrowRight, Monitor, Layers, MousePointer2 } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="h-24 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-10 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 transition-all group-hover:scale-105 duration-500 overflow-hidden">
            <img src="/logo-b.png" alt="BrandForge Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl font-black tracking-tighter text-slate-950 uppercase italic leading-none">BrandForge <span className="text-indigo-600 not-italic">AI</span></span>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            {['Platform', 'Solutions', 'Pricing'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-indigo-600 transition-all relative group/link">
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover/link:w-full transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>
          {session ? (
            <Link href="/dashboard" className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-900/10 hover:scale-[1.05] active:scale-95 flex items-center gap-2 group">
              Console Suite
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                <ArrowRight size={10} />
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors px-4">Login</Link>
              <Link href="/dashboard" className="bg-slate-950 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-900/20 hover:scale-[1.05] active:scale-95">
                Join Network
              </Link>
            </div>
          )}
        </div>
      </nav>

      <main className="relative">
        {/* Background Animated Decorations */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 blur-[120px] rounded-full -mr-96 -mt-96 animate-blob" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full -ml-96 -translate-y-1/2 animate-blob [animation-delay:4s]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full animate-blob [animation-delay:8s]" />

        {/* Hero Section */}
        <section className="pt-32 pb-48 px-10 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-3 bg-white border border-slate-100 text-slate-800 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-12 shadow-2xl shadow-indigo-900/5 transition-all hover:border-indigo-200 cursor-pointer animate-reveal opacity-0 [animation-fill-mode:forwards]">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="opacity-60">Neural Design Protocol v2.5</span>
            </div>

            <h1 className="text-7xl lg:text-[10rem] font-black text-slate-950 leading-[0.8] tracking-tighter mb-12 uppercase italic relative group animate-blur-in opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms]">
              <div className="inline-block transition-transform duration-700 group-hover:scale-95">Design</div>
              <br />
              <span className="text-indigo-600 not-italic relative inline-block transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1">
                Momentum.
                <div className="absolute -bottom-4 left-0 right-0 h-4 bg-indigo-100/50 -rotate-1 rounded-full -z-10 group-hover:rotate-0 transition-transform duration-700" />
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-400 font-bold max-w-2xl mb-16 leading-tight tracking-tight uppercase animate-reveal opacity-0 [animation-fill-mode:forwards] [animation-delay:600ms]">
              The professional standard for high-fidelity social assets. Built on neural logic, engineered for humans.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 animate-reveal opacity-0 [animation-fill-mode:forwards] [animation-delay:800ms]">
              <Link href="/dashboard" className="relative group overflow-hidden bg-indigo-600 text-white px-12 py-7 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.2em] transition-all shadow-[0_20px_60px_-15px_rgba(79,70,229,0.4)] hover:scale-[1.05] active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-in-out" />
                <span className="relative z-10">{session ? "Open Console" : "Begin Generation"}</span>
              </Link>
              <div className="flex flex-col text-left group/status cursor-help">
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div
                      key={i}
                      className="w-1.5 h-4 bg-indigo-600/20 rounded-full group-hover/status:bg-indigo-600 transition-colors"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">
                  Neural Engine <br />
                  <span className="text-indigo-600">Active Protocol.</span>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float opacity-40">
              <div className="w-1 h-12 bg-gradient-to-b from-indigo-600 to-transparent rounded-full md:block hidden" />
            </div>
          </div>
        </section>

        {/* Feature Dashboard Preview */}
        <section className="px-10 -mt-24 mb-48 relative z-10 animate-reveal opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[3.5rem] p-12 lg:p-24 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-slate-900 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full -mr-64 -mt-64 group-hover:bg-indigo-600/20 transition-all duration-1000" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-12">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-6xl font-black text-white leading-none uppercase italic tracking-tighter">
                    Infinite <span className="text-indigo-500">Variations.</span>
                  </h2>
                  <p className="text-slate-500 font-bold text-lg leading-relaxed max-w-sm">
                    Not just templates. Our engine builds a custom UI elements array for every single prompt.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {[
                    { icon: Layers, title: "Layered Control", desc: "Every element is independently editable." },
                    { icon: Monitor, title: "Platform Tuning", desc: "Auto-scaled for Instagram & LinkedIn." },
                    { icon: MousePointer2, title: "Neural Logic", desc: "Intelligent background & color pairing." }
                  ].map((f, i) => (
                    <div key={i} className={`flex gap-6 items-start group/feature animate-reveal opacity-0 [animation-fill-mode:forwards] reveal-delay-${i + 1}`}>
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 group-hover/feature:bg-indigo-600 group-hover/feature:text-white transition-all duration-500 shadow-xl border border-white/5 group-hover/feature:scale-110">
                        <f.icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-white font-black uppercase tracking-widest text-sm mb-1">{f.title}</h4>
                        <p className="text-slate-500 text-sm font-bold">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative animate-blur-in opacity-0 [animation-fill-mode:forwards] [animation-delay:600ms]">
                <div className="bg-gradient-to-tr from-indigo-600 to-purple-600 aspect-square rounded-[3rem] p-8 shadow-2xl relative z-10">
                  <div className="bg-white/10 backdrop-blur-xl h-full w-full rounded-[2rem] border border-white/20 flex flex-col justify-between p-8">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <div className="w-8 h-1 bg-white/40 rounded-full" />
                        <div className="w-3 h-1 bg-white/40 rounded-full" />
                      </div>
                      <div className="h-6 bg-white/20 rounded-lg w-3/4" />
                    </div>
                    <div className="space-y-4">
                      <div className="h-4 bg-white/10 rounded-lg w-full" />
                      <div className="h-4 bg-white/5 rounded-lg w-2/3" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10" />
                      <div className="w-12 h-12 bg-white/20 rounded-xl" />
                    </div>
                  </div>
                </div>
                {/* Decos */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -z-10" />
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid High Impact */}
        <section id="features" className="px-10 py-48 bg-slate-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32 animate-reveal opacity-0 [animation-fill-mode:forwards]">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-4">Core Technology</p>
              <h2 className="text-6xl font-black text-slate-950 uppercase tracking-tighter leading-none italic">Neural <span className="text-indigo-600">Post</span> Processing.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: Zap,
                  title: "Instant Rendering",
                  desc: "Neural element distribution in under 3 seconds. Ready for editor suite.",
                  color: "bg-indigo-50 text-indigo-600"
                },
                {
                  icon: Target,
                  title: "Brand Fidelity",
                  desc: "Strictly enforces your DNA setup across color, font, and aesthetic tone.",
                  color: "bg-emerald-50 text-emerald-600"
                },
                {
                  icon: Shield,
                  title: "High-Res Export",
                  desc: "Proprietary PNG rendering up to 2x Retina resolution for print and digital.",
                  color: "bg-purple-50 text-purple-600"
                }
              ].map((feature, i) => (
                <div key={i} className={`group bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 card-hover animate-reveal opacity-0 [animation-fill-mode:forwards] reveal-delay-${i + 1}`}>
                  <div className={`w-20 h-20 ${feature.color} rounded-[2rem] flex items-center justify-center mb-8 ring-8 ring-slate-50 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-950 mb-4 uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-slate-400 font-bold leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-32 px-10 border-t border-slate-100 bg-white animate-reveal opacity-0 [animation-fill-mode:forwards] [animation-delay:1000ms]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3 justify-center md:justify-start grayscale opacity-60 hover:grayscale-0 transition-all duration-500">
              <div className="w-10 h-10 bg-slate-100 rounded-xl p-2 ring-1 ring-slate-200">
                <img src="/logo-b.png" alt="BrandForge Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-slate-950 uppercase italic tracking-tighter">BrandForge AI</span>
            </div>
            <p className="text-slate-400 font-bold text-sm leading-relaxed">The professional standard for neural design generation. Built for brands that demand consistency.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-indigo-600 transition-colors">Twitter</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-indigo-600 transition-colors">Discord</a>
            </div>
            <p className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">© 2026 Neural Post Engine Labs. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
