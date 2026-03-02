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
    Lock
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
        <div className="flex h-screen bg-[#fcfdfe]">
            <Sidebar />
            <main className="flex-1 overflow-auto custom-scrollbar flex items-center justify-center p-12">
                <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Form Left Side */}
                    <div className="lg:col-span-3 space-y-10 animate-in fade-in slide-in-from-left-8 duration-500">
                        <header>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl ring-4 ring-indigo-50 shadow-sm relative overflow-hidden group">
                                    <Sparkles size={20} className="relative z-10 animate-pulse" />
                                    <div className="absolute inset-0 bg-indigo-200/20 group-hover:scale-150 transition-transform duration-700" />
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Generation Engine Suite</span>
                            </div>
                            <h2 className="text-5xl font-black text-slate-900 leading-[1.1] tracking-tight mb-4 uppercase italic">
                                Create <span className="text-indigo-600">Magic</span> Content.
                            </h2>
                            <p className="text-slate-500 font-bold text-sm tracking-tight leading-relaxed max-w-md">
                                Define your vision, and our neural engine will generate a comprehensive design elements array tailored to your platform.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Step 1: Topic & Description */}
                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Type size={12} className="text-indigo-500" /> Defining the Topic
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="What's the core focus?"
                                        value={formData.topic}
                                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl px-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all h-14 uppercase tracking-wider placeholder:text-slate-300"
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Info size={12} className="text-indigo-500" /> Key Messaging / Context
                                    </label>
                                    <textarea
                                        placeholder="Add specific details or CTA instructions..."
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl px-6 py-5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all h-40 resize-none font-medium leading-relaxed placeholder:text-slate-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Step 2: Settings Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Platform Opt.</label>
                                    <div className="space-y-2">
                                        {platformOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, platform: opt.id })}
                                                className={cn(
                                                    "w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left group/btn",
                                                    formData.platform === opt.id
                                                        ? "bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-900/10"
                                                        : "bg-white border-slate-100/50 text-slate-400 hover:border-slate-300 hover:text-slate-900"
                                                )}
                                            >
                                                <div className={cn(
                                                    "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover/btn:scale-110",
                                                    formData.platform === opt.id ? "bg-white/20" : "bg-slate-50 text-slate-400"
                                                )}>
                                                    <opt.icon size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xs uppercase tracking-widest leading-none">{opt.id}</p>
                                                    <p className={cn("text-[9px] font-bold mt-1 opacity-60 leading-tight", formData.platform === opt.id ? "text-white" : "text-slate-400")}>
                                                        {opt.description}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ratio Spec.</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {ratioOptions.map((opt) => (
                                            <button
                                                key={opt.id}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, aspectRatio: opt.id })}
                                                className={cn(
                                                    "flex items-center justify-between p-4 rounded-2xl border transition-all",
                                                    formData.aspectRatio === opt.id
                                                        ? "bg-slate-950 text-white border-slate-900 shadow-xl"
                                                        : "bg-slate-50 border-transparent text-slate-400 hover:bg-slate-100"
                                                )}
                                            >
                                                <div className="text-left">
                                                    <p className="font-black text-xs uppercase tracking-widest leading-none">{opt.id}</p>
                                                    <p className="text-[9px] font-bold mt-1 opacity-60 leading-tight">{opt.desc}</p>
                                                </div>
                                                <div className={cn(
                                                    "w-1.5 h-1.5 rounded-full transition-all",
                                                    formData.aspectRatio === opt.id ? "bg-indigo-500 scale-150 shadow-[0_0_8px_rgba(99,102,241,0.8)]" : "bg-slate-200"
                                                )} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-indigo-600 text-white font-black py-6 rounded-3xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl shadow-indigo-900/10 hover:scale-[1.01] active:scale-95 uppercase tracking-widest text-[12px] group/submit"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Processing Intelligence...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={22} className="group-hover:rotate-12 transition-transform" />
                                        Initialize AI Generation
                                        <ArrowRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Preview/Info Right Side */}
                    <div className="lg:col-span-2 hidden lg:block animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                        <div className="sticky top-12 space-y-8">
                            <div className="bg-slate-950 rounded-[3rem] p-10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[120px] rounded-full -mr-32 -mt-32" />
                                <div className="relative z-10 space-y-10">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center text-white ring-1 ring-white/20 group-hover:scale-110 transition-transform duration-700">
                                        <Zap size={32} className="text-indigo-400 group-hover:animate-pulse" />
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Instant Branding <span className="text-indigo-500 font-bold block text-sm tracking-widest mt-1 opacity-70 not-italic">Powered by Neural Canvas</span></h4>
                                        <div className="space-y-3">
                                            {[
                                                "Neural element distribution.",
                                                "Platform-specific aspect tuning.",
                                                "AI content generation layer.",
                                                "JSON structure initialization."
                                            ].map((text, i) => (
                                                <div key={i} className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                    <CheckCircle2 size={12} className="text-emerald-500" /> {text}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
                                        <div className="flex items-center justify-between opacity-50">
                                            <span className="text-[10px] font-black uppercase text-white tracking-widest">Credits</span>
                                            <span className="text-[10px] font-black text-indigo-400">12 / 100</span>
                                        </div>
                                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 w-[12%] rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                    <Lock size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Secure Suite</p>
                                    <p className="text-xs font-bold text-slate-900 opacity-80 leading-relaxed">Your data is stored in the cloud with SOC-2 compliant encryption.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
