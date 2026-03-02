"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import axios from "axios";
import {
    Palette,
    MousePointer2,
    CheckCircle2,
    Sparkles,
    ArrowRight,
    Info,
    Globe,
    ShieldCheck,
    Fingerprint,
    Type
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Onboarding() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [brand, setBrand] = useState({
        logoUrl: "",
        primaryColor: "#4f46e5",
        secondaryColor: "#ffffff",
        tone: "Professional",
        motto: "",
        industry: "",
        fontPreference: "Modern",
    });

    useEffect(() => {
        const fetchBrand = async () => {
            try {
                const res = await axios.get("/api/brand");
                if (res.data._id) {
                    setBrand(res.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBrand();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("/api/brand", brand);
            router.push("/dashboard");
        } catch (err) {
            alert("Error saving brand details");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#fcfdfe]">
            <Sidebar />
            <main className="flex-1 overflow-auto custom-scrollbar p-12">
                <div className="max-w-4xl mx-auto py-8">
                    <header className="mb-12">
                        <div className="flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl ring-4 ring-indigo-50 shadow-sm relative overflow-hidden group">
                                <Fingerprint size={20} className="relative z-10" />
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">Identity Configuration</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-2 uppercase italic leading-none">
                            Brand <span className="text-indigo-600">DNA</span> Setup.
                        </h2>
                        <p className="text-slate-500 font-bold text-sm max-w-md">Configure your aesthetic guidelines. Our AI uses these parameters to ensure every generated post feels authentically yours.</p>
                    </header>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                        {/* Control Section */}
                        <div className="lg:col-span-2 space-y-10 animate-in fade-in slide-in-from-left-8 duration-500 delay-100">
                            {/* Visual identity */}
                            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-4">
                                    Visual Identity Core
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Primary Color</label>
                                        <div className="flex gap-3 items-center bg-slate-50 border border-slate-200/50 p-2 rounded-2xl">
                                            <input
                                                type="color"
                                                value={brand.primaryColor}
                                                onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                                                className="h-10 w-12 rounded-xl border-none cursor-pointer bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={brand.primaryColor}
                                                onChange={(e) => setBrand({ ...brand, primaryColor: e.target.value })}
                                                className="flex-1 bg-transparent text-sm font-bold uppercase text-slate-600 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Secondary Color</label>
                                        <div className="flex gap-3 items-center bg-slate-50 border border-slate-200/50 p-2 rounded-2xl">
                                            <input
                                                type="color"
                                                value={brand.secondaryColor}
                                                onChange={(e) => setBrand({ ...brand, secondaryColor: e.target.value })}
                                                className="h-10 w-12 rounded-xl border-none cursor-pointer bg-transparent"
                                            />
                                            <input
                                                type="text"
                                                value={brand.secondaryColor}
                                                onChange={(e) => setBrand({ ...brand, secondaryColor: e.target.value })}
                                                className="flex-1 bg-transparent text-sm font-bold uppercase text-slate-600 focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Metadata */}
                            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-4">
                                    Industry & Context
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Target Industry</label>
                                        <div className="relative group">
                                            <Globe size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="e.g. Fintech Pro, Luxury Fashion"
                                                value={brand.industry}
                                                onChange={(e) => setBrand({ ...brand, industry: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-medium"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Brand Motto</label>
                                        <div className="relative group">
                                            <Sparkles size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                            <input
                                                type="text"
                                                placeholder="Your core tagline..."
                                                value={brand.motto}
                                                onChange={(e) => setBrand({ ...brand, motto: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-200/50 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all placeholder:text-slate-300 placeholder:font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Styling */}
                            <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 border-b border-slate-50 pb-4">
                                    Aesthetic Direction
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Brand Tone</label>
                                        <select
                                            value={brand.tone}
                                            onChange={(e) => setBrand({ ...brand, tone: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                                        >
                                            {["Professional", "Friendly", "Premium", "Bold", "Playful"].map(t => <option key={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-800 uppercase tracking-widest pl-1">Font Family</label>
                                        <select
                                            value={brand.fontPreference}
                                            onChange={(e) => setBrand({ ...brand, fontPreference: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                                        >
                                            {["Modern", "Serif", "Minimal", "Creative", "Display"].map(f => <option key={f}>{f}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-950 text-white font-black py-6 rounded-3xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-4 disabled:opacity-50 shadow-2xl hover:scale-[1.01] active:scale-95 uppercase tracking-widest text-[12px] group/submit"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        Updating Profile...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle2 size={20} className="group-hover:scale-110 transition-transform" />
                                        Save Brand Identity
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Preview Column */}
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                            <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full -mr-16 -mt-16" />
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] relative z-10">Neural Persona Preview</h4>

                                <div className="space-y-8 relative z-10">
                                    <div className="aspect-[4/5] bg-white rounded-[2rem] shadow-xl p-8 flex flex-col justify-between border border-slate-100 group-hover:rotate-1 transition-transform duration-700">
                                        <div className="space-y-3">
                                            <div
                                                className="w-16 h-1 bg-indigo-600 rounded-full"
                                                style={{ backgroundColor: brand.primaryColor }}
                                            />
                                            <div className="h-8 bg-slate-50 rounded-lg w-3/4" />
                                            <div className="h-4 bg-slate-50 rounded-lg w-1/2" />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="text-center">
                                                <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-2">Primary Palette</p>
                                                <div className="flex justify-center gap-2">
                                                    <div className="w-8 h-8 rounded-full shadow-inner ring-4 ring-slate-50" style={{ backgroundColor: brand.primaryColor }} />
                                                    <div className="w-8 h-8 rounded-full shadow-inner ring-4 ring-slate-50" style={{ backgroundColor: brand.secondaryColor }} />
                                                </div>
                                            </div>

                                            <div className="p-4 bg-slate-50 rounded-2xl text-center space-y-1 border border-slate-100/50">
                                                <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter" style={{ color: brand.primaryColor }}>{brand.tone} Aesthetic</p>
                                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{brand.fontPreference} Typeface</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-white space-y-3 shadow-inner">
                                        <div className="flex items-center gap-3">
                                            <ShieldCheck size={16} className="text-emerald-500" />
                                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Brand Consistency Enforced</span>
                                        </div>
                                        <p className="text-[9px] font-bold text-slate-400 leading-relaxed italic">Our AI cross-references this profile for every canvas generation to maintain 100% brand fidelity.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border border-slate-100 rounded-[2.5rem] bg-indigo-600/5 flex items-start gap-4 ring-1 ring-indigo-100 shadow-sm shadow-indigo-100/50">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center shrink-0 shadow-lg ring-4 ring-white">
                                    <Sparkles size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-indigo-700 uppercase tracking-widest">Live Integration</p>
                                    <p className="text-[10px] font-bold text-indigo-600/60 leading-relaxed uppercase tracking-widest">Changes are processed in real-time across all templates.</p>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
