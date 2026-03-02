"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    PlusCircle,
    Palette,
    Settings,
    LogOut,
    Sparkles,
    ChevronRight,
    Zap
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
    { name: "Create Post", href: "/create", icon: PlusCircle, badge: "AI" },
    { name: "Brand Setup", href: "/onboarding", icon: Palette, badge: null },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="w-72 bg-slate-950 text-white h-screen flex flex-col p-6 border-r border-slate-900 overflow-hidden relative group">
            {/* Background Glow Overlay */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[120px] rounded-full -mr-32 -mt-32 transition-colors group-hover:bg-indigo-500/15" />

            <div className="flex items-center gap-3 mb-10 px-2 relative">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center p-2.5 shadow-2xl ring-1 ring-white/10 group-hover:ring-indigo-500/50 transition-all duration-500">
                    <img src="/logo-icon.png" alt="BrandForge Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tighter uppercase leading-none text-white">
                        BrandForge <span className="text-indigo-500 italic block text-[10px] tracking-widest mt-1 opacity-70">Neural Engine</span>
                    </h1>
                </div>
            </div>

            <nav className="flex-1 space-y-2 relative">
                <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Main Menu</div>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group/item relative overflow-hidden",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/20"
                                    : "text-slate-500 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800"
                            )}
                        >
                            <div className="flex items-center gap-3 relative z-10 font-bold text-sm">
                                <Icon size={20} className={cn(isActive ? "text-white" : "text-slate-600 group-hover/item:text-indigo-400 transition-colors")} />
                                <span>{item.name}</span>
                            </div>

                            {item.badge && (
                                <span className={cn(
                                    "text-[9px] font-black px-1.5 py-0.5 rounded-full relative z-10 tracking-widest uppercase",
                                    isActive ? "bg-white/20 text-white" : "bg-indigo-600/10 text-indigo-500"
                                )}>
                                    {item.badge}
                                </span>
                            )}

                            {isActive && (
                                <div className="absolute right-0 top-0 bottom-0 w-1 bg-white rounded-l-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="relative pt-6 border-t border-slate-900 space-y-4">
                {/* User Status Card */}
                {session?.user && (
                    <div className="bg-slate-900/40 border border-slate-800 p-4 rounded-2xl flex items-center gap-3 hover:bg-slate-900 transition-colors cursor-pointer group/user">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 ring-2 ring-indigo-500/20 group-hover/user:ring-indigo-500/50 transition-all">
                            <img src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`} alt="User" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-white truncate">{session.user.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold truncate tracking-tight">{session.user.email}</p>
                        </div>
                        <ChevronRight size={14} className="text-slate-600 group-hover/user:text-white transition-opacity" />
                    </div>
                )}

                <button
                    onClick={() => signOut()}
                    className="flex items-center gap-3 px-4 py-3.5 w-full text-slate-500 hover:text-white hover:bg-slate-900 border border-transparent hover:border-red-500/10 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest"
                >
                    <LogOut size={16} />
                    <span>Logout Account</span>
                </button>

                <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden group/upgrade">
                    <Zap className="absolute top-2 right-2 text-indigo-500/20 w-12 h-12 -rotate-12 transition-transform group-hover/upgrade:scale-125 duration-700" />
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1 relative z-10">Pro Plan</p>
                    <p className="text-xs font-bold text-white relative z-10 leading-tight">Generate higher resolution designs.</p>
                    <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest py-2.5 rounded-xl transition-all shadow-[0_4px_15px_rgba(79,70,229,0.3)] hover:scale-[1.02] active:scale-95">
                        Upgrade
                    </button>
                </div>
            </div>
        </div>
    );
}
