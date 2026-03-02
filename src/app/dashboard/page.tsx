"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import Link from "next/link";
import {
    Plus,
    History as HistoryIcon,
    ArrowRight,
    Loader2,
    Lock,
    Clock,
    Layers,
    Monitor,
    Sparkles,
    MousePointer2,
    Calendar,
    Search,
    SlidersHorizontal,
    MoreHorizontal
} from "lucide-react";
import { useSession, signIn } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDesigns = async () => {
            if (status !== "authenticated") return;
            try {
                const res = await axios.get("/api/design");
                setDesigns(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDesigns();
    }, [status]);

    if (status === "loading") {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 p-6">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-900/10 border border-slate-100 max-w-md w-full text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full -mr-32 -mt-32 group-hover:bg-indigo-500/10 transition-colors" />

                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-10 relative ring-1 ring-slate-100 shadow-2xl shadow-indigo-900/10 group-hover:scale-105 transition-transform duration-500 p-5">
                        <img src="/logo-icon.png" alt="BrandForge Logo" className="w-full h-full object-contain" />
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-6">
                        <Lock size={12} className="text-indigo-600" />
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Secure Console Suite</span>
                    </div>

                    <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight uppercase italic leading-none">
                        Access <span className="text-indigo-600">Neural Hub.</span>
                    </h2>
                    <p className="text-slate-500 mb-10 font-medium leading-relaxed">Sign in to sync your brand assets and unlock professional post generation.</p>
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full bg-slate-950 text-white font-black py-5 rounded-2xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-[11px]"
                    >
                        Authenticate with Google
                    </button>
                    <Link href="/" className="inline-block mt-8 text-slate-400 font-bold transition-colors hover:text-slate-600 uppercase tracking-widest text-[10px]">Back to home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#fcfdfe]">
            <Sidebar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="max-w-7xl mx-auto px-10 py-12">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Brand Dashboard</h1>
                                <span className="text-[10px] font-black bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full uppercase tracking-tighter shadow-sm border border-emerald-200/50">Live</span>
                            </div>
                            <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
                                <Monitor size={14} className="text-slate-400" /> Professional Design Suite for {session?.user?.name}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative group/search hidden md:block">
                                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-hover/search:text-indigo-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search designs..."
                                    className="bg-slate-100 border border-slate-200/50 rounded-2xl pl-12 pr-6 py-3.5 text-sm font-bold text-slate-800 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all w-64 h-12"
                                />
                            </div>
                            <Link
                                href="/create"
                                className="bg-indigo-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 hover:scale-[1.02] active:scale-95 uppercase tracking-widest text-[10px] h-12"
                            >
                                <Plus size={18} />
                                New Design
                            </Link>
                        </div>
                    </header>

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Designs Created", value: designs.length, icon: HistoryIcon, color: "indigo" },
                            { label: "Active Platform", value: "Instagram", icon: Monitor, color: "emerald" },
                            { label: "Credits Rem.", value: "85%", icon: Sparkles, color: "purple" },
                            { label: "Team Members", value: "1", icon: Layers, color: "blue" }
                        ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                    <p className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 bg-${stat.color}-50 text-${stat.color}-600 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                                    <stat.icon size={22} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                        {/* Feed Column */}
                        <div className="lg:col-span-3 space-y-10">
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                        Recent Creations <span className="text-slate-300 font-light">/</span> <span className="text-indigo-600 text-[10px] tracking-tighter lowercase bg-indigo-50 px-2 py-0.5 rounded-full">{designs.length}</span>
                                    </h3>
                                    <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors">
                                        View All Analytics <ArrowRight size={14} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                    {/* Action Card */}
                                    <div className="group relative h-72 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-900/10">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-indigo-600 to-purple-600 group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                            <div>
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white mb-4 ring-1 ring-white/30">
                                                    <Sparkles size={24} className="animate-pulse" />
                                                </div>
                                                <h4 className="text-2xl font-black text-white leading-tight mb-2 uppercase tracking-tighter">AI-Driven Content Engine.</h4>
                                                <p className="text-indigo-100 text-sm font-medium opacity-80 leading-relaxed">Instantly generate high-fidelity posts from just a topic.</p>
                                            </div>
                                            <Link href="/create" className="bg-white text-indigo-700 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:bg-slate-50 active:scale-95 transition-all">
                                                Start Generating <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* List Logic */}
                                    {loading ? (
                                        [1, 2].map(i => (
                                            <div key={i} className="bg-white border border-slate-100/50 rounded-[2rem] h-72 animate-pulse overflow-hidden p-4 space-y-4">
                                                <div className="h-44 bg-slate-50 rounded-2xl w-full" />
                                                <div className="h-4 bg-slate-100 rounded w-3/4 mx-2" />
                                                <div className="h-3 bg-slate-50 rounded w-1/2 mx-2" />
                                            </div>
                                        ))
                                    ) : designs.length > 0 ? (
                                        designs.map((design: any) => (
                                            <Link
                                                key={design._id}
                                                href={`/editor/${design._id}`}
                                                className="bg-white p-5 rounded-[2rem] border border-slate-100/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group flex flex-col h-72 relative"
                                            >
                                                <div className="absolute top-7 right-7 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <div className="bg-indigo-600 text-white p-2 rounded-xl shadow-lg ring-4 ring-white">
                                                        <MousePointer2 size={16} />
                                                    </div>
                                                </div>

                                                <div className="flex-1 rounded-2xl mb-5 overflow-hidden relative bg-slate-50 ring-1 ring-slate-100 shadow-inner group-hover:ring-indigo-100 transition-all">
                                                    {design.finalImageUrl || design.aiOutputJson.imageUrls?.[0] ? (
                                                        <img src={design.finalImageUrl || design.aiOutputJson.imageUrls[0]} alt={design.topic} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-200 uppercase font-black tracking-widest text-[8px]">No Preview Available</div>
                                                    )}

                                                    <div className="absolute bottom-3 left-3 flex gap-1.5 overflow-hidden">
                                                        <div className="bg-black/70 backdrop-blur px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-white/20">
                                                            {design.platform}
                                                        </div>
                                                        <div className="bg-indigo-600/90 backdrop-blur px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest text-white border border-indigo-400/20">
                                                            {design.aspectRatio}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <h4 className="font-black text-slate-900 truncate leading-none mb-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight text-sm">
                                                        {design.topic}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                        <Clock size={10} /> {new Date(design.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center text-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] h-72">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-6 ring-8 ring-slate-100/50">
                                                <HistoryIcon size={32} />
                                            </div>
                                            <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-1">Canvas is Empty</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest max-w-[180px]">Your generation history will appear here.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Metadata/Filter Column */}
                        <div className="space-y-8">
                            <div className="bg-white border border-slate-100 shadow-sm rounded-[2rem] p-8 space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Filters</h4>
                                    <SlidersHorizontal size={14} className="text-slate-400" />
                                </div>
                                <div className="space-y-3">
                                    <button className="w-full flex items-center justify-between p-4 bg-indigo-50 border border-indigo-100 rounded-2xl group transition-all">
                                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">All Assets</span>
                                        <span className="text-[10px] font-black bg-indigo-200/50 text-indigo-700 px-2 py-0.5 rounded-full">{designs.length}</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl group transition-all grayscale hover:grayscale-0">
                                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">Instagram</span>
                                        <span className="text-[10px] font-black bg-slate-200/50 text-slate-600 px-2 py-0.5 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            {designs.filter((d: any) => d.platform === 'Instagram').length}
                                        </span>
                                    </button>
                                    <button className="w-full flex items-center justify-between p-4 bg-slate-50 border border-transparent hover:border-slate-100 rounded-2xl group transition-all grayscale hover:grayscale-0">
                                        <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 transition-colors">LinkedIn</span>
                                        <span className="text-[10px] font-black bg-slate-200/50 text-slate-600 px-2 py-0.5 rounded-full group-hover:bg-slate-900 group-hover:text-white transition-all">
                                            {designs.filter((d: any) => d.platform === 'LinkedIn').length}
                                        </span>
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] overflow-hidden p-8 relative group cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/20 transition-all border border-slate-800">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-indigo-600/30 transition-all" />
                                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                    <div>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white mb-4 ring-4 ring-indigo-900/50 shadow-lg">
                                            <Calendar size={18} />
                                        </div>
                                        <h4 className="text-lg font-black text-white leading-tight uppercase tracking-widest">Schedule Content.</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Coming Q3 2026</p>
                                    </div>
                                    <button className="text-[10px] font-black text-white flex items-center gap-2 group-hover:gap-4 transition-all uppercase tracking-[0.2em]">
                                        Join Waitlist <ArrowRight size={14} className="text-indigo-500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
