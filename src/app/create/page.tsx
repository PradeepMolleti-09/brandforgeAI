"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import {
    Loader2,
    Sparkles,
    ChevronRight,
    Info,
    Monitor,
    Layout,
    ArrowRight,
    Zap,
    Shapes,
    Type,
    CheckCircle2,
    Lock,
    Globe,
    Rocket
} from "lucide-react";
import { cn } from "@/lib/utils";

const platformOptions = [
    { id: 'Instagram', description: 'Visual-first posts (1:1, 4:5)', icon: Monitor },
    { id: 'LinkedIn', description: 'Professional updates & carousels', icon: Layout },
    { id: 'Poster', description: 'High-res dramatic layouts', icon: Shapes },
];

const ratioOptions = [
    { id: '1:1', name: 'Square', desc: 'Instagram Feed' },
    { id: '4:5', name: 'Portrait', desc: 'Instagram/Facebook' },
    { id: '16:9', name: 'Landscape', desc: 'YouTube/Hero' },
    { id: '9:16', name: 'Story', desc: 'TikTok/Reels' },
    { id: '2:3', name: 'Pinterest', desc: 'Standard Pin' },
];

export default function CreatePost() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        topic: "",
        description: "",
        platform: "Instagram",
        aspectRatio: "1:1",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("/api/generate", formData);
            router.push(`/editor/${res.data._id}`);
        } catch (err: any) {
            alert(err.response?.data?.error || "Error generating post");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <Sidebar />
            <main className="flex-1 overflow-auto custom-scrollbar relative">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-indigo-500/5 blur-[120px] rounded-full -mr-[10vw] -mt-[10vh] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30vw] h-[30vh] bg-blue-500/5 blur-[100px] rounded-full -ml-[5vw] -mb-[5vh] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-8 py-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                        {/* Main Interaction Area */}
                        <div className="lg:col-span-7 space-y-12">
                            <header className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full">
                                    <Sparkles size={14} className="text-indigo-600 animate-pulse" />
                                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Neural Canvas Engine v2.0</span>
                                </div>
                                <h1 className="text-6xl font-black text-slate-900 leading-[1] tracking-tight italic uppercase">
                                    Forge your <br />
                                    <span className="text-indigo-600">Brand Identity.</span>
                                </h1>
                                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">
                                    Input your vision and let our AI orchestrate a professional,
                                    high-conversion social suite in seconds.
                                </p>
                            </header>

                            <form onSubmit={handleSubmit} className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                                {/* Core Inputs Card */}
                                <div className="bg-white border border-slate-200/60 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Defining the Topic
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="e.g. Summer Collection Launch 2024"
                                                value={formData.topic}
                                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-5 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all uppercase tracking-wider placeholder:text-slate-300 shadow-inner"
                                                required
                                            />
                                            <Type size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Strategic Context
                                        </label>
                                        <div className="relative group">
                                            <textarea
                                                placeholder="Describe the mood, target audience, and key call-to-actions..."
                                                value={formData.description}
                                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-6 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-500/20 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all h-40 resize-none leading-relaxed placeholder:text-slate-300 shadow-inner"
                                                required
                                            />
                                            <Info size={18} className="absolute right-6 top-6 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>

                                {/* Platform & Ratio Selection */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] block text-center">Output Platform</label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {platformOptions.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, platform: opt.id })}
                                                    className={cn(
                                                        "flex items-center gap-4 p-5 rounded-3xl border-2 transition-all text-left relative overflow-hidden group/btn",
                                                        formData.platform === opt.id
                                                            ? "bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-900/20"
                                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-700"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover/btn:scale-110",
                                                        formData.platform === opt.id ? "bg-indigo-600 text-white" : "bg-slate-50 text-slate-400"
                                                    )}>
                                                        <opt.icon size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-[11px] uppercase tracking-widest leading-none mb-1">{opt.id}</p>
                                                        <p className={cn("text-[9px] font-bold opacity-60 leading-tight", formData.platform === opt.id ? "text-slate-300" : "text-slate-400")}>
                                                            {opt.description}
                                                        </p>
                                                    </div>
                                                    {formData.platform === opt.id && (
                                                        <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.3em] block text-center">Aspect Tuning</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {ratioOptions.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, aspectRatio: opt.id })}
                                                    className={cn(
                                                        "flex flex-col items-center justify-center p-6 rounded-3xl border-2 transition-all relative group/ratio",
                                                        formData.aspectRatio === opt.id
                                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-900/30"
                                                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-300 hover:text-slate-700"
                                                    )}
                                                >
                                                    <p className="font-black text-lg tracking-tighter mb-1">{opt.id}</p>
                                                    <p className={cn("text-[8px] font-black uppercase tracking-widest opacity-60", formData.aspectRatio === opt.id ? "text-white" : "text-slate-400")}>{opt.name}</p>

                                                    {formData.aspectRatio === opt.id && (
                                                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full opacity-50" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative overflow-hidden bg-slate-900 text-white font-black py-8 rounded-[2rem] hover:bg-black transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.01] active:scale-95 group/submit"
                                >
                                    {/* Animated Background Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 translate-x-[-100%] group-hover/submit:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

                                    {loading ? (
                                        <div className="flex items-center gap-4">
                                            <Loader2 size={24} className="animate-spin text-indigo-400" />
                                            <span className="uppercase tracking-[0.2em] text-sm">Synchronizing Intelligence...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Sparkles size={24} className="text-indigo-400 group-hover:rotate-12 transition-transform" />
                                            <span className="uppercase tracking-[0.3em] text-sm relative z-10">Initialize Production</span>
                                            <ArrowRight size={20} className="text-white/40 group-hover:translate-x-2 group-hover:text-white transition-all" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Status / Insight Panel */}
                        <div className="lg:col-span-5 hidden lg:block">
                            <div className="sticky top-12 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">

                                {/* Engine Card */}
                                <div className="bg-slate-900 rounded-[3rem] p-12 relative overflow-hidden text-white shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full -mr-32 -mt-32" />
                                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full -ml-24 -mb-24" />

                                    <div className="relative z-10 space-y-12">
                                        <div className="flex items-center justify-between">
                                            <div className="w-16 h-16 bg-white/5 backdrop-blur-2xl rounded-3xl flex items-center justify-center border border-white/10 shadow-inner">
                                                <Rocket size={32} className="text-indigo-400" />
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Engine Load</div>
                                                <div className="text-2xl font-black tracking-tighter italic">OPTIMAL</div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-3xl font-black italic uppercase leading-tight tracking-tighter">
                                                Strategic <br />
                                                <span className="text-indigo-500">Automation.</span>
                                            </h4>
                                            <div className="space-y-4">
                                                {[
                                                    { text: "Neural Distribution Layer", icon: Shapes },
                                                    { text: "Dynamic Aspect Matching", icon: Layout },
                                                    { text: "Creative Asset Synthesis", icon: Zap },
                                                    { text: "Production-Ready Export", icon: Globe }
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-4 group/item">
                                                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-600 transition-colors duration-500">
                                                            <item.icon size={14} className="text-white" />
                                                        </div>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover/item:text-white transition-colors">
                                                            {item.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Credit Bar */}
                                        <div className="pt-8 border-t border-white/5">
                                            <div className="bg-white/5 rounded-3xl p-6 space-y-4 border border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Workspace Credits</span>
                                                    <span className="text-[10px] font-black text-indigo-400">88 REMAINING</span>
                                                </div>
                                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-indigo-500 w-[88%] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy Card */}
                                <div className="bg-white/50 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 shadow-sm flex items-center gap-6">
                                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-50">
                                        <Lock size={24} className="text-indigo-600/30" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Encrypted Suite</p>
                                        <p className="text-sm font-bold text-slate-900 leading-relaxed italic truncate w-48">AES-256 SECURED CLOUD</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
