"use client";

import { useEditorStore } from "@/store/useEditorStore";
import {
    Download,
    Share2,
    ChevronLeft,
    LayoutDashboard,
    CloudIcon,
    CheckCircle2,
    History,
    Sparkles,
    Settings
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface EditorHeaderProps {
    design: any;
}

export default function EditorHeader({ design }: EditorHeaderProps) {
    const { isExporting, setIsExporting, undo, redo, past, future } = useEditorStore();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-30 shadow-sm">
            <div className="flex items-center gap-6">
                <Link
                    href="/dashboard"
                    className="w-12 h-12 bg-white/50 border border-slate-200 rounded-2xl flex items-center justify-center p-2 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-indigo-50/50 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <img src="/logo-icon.png" alt="BrandForge Logo" className="w-full h-full object-contain relative z-10 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </Link>

                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h1 className="text-xs md:text-sm font-black text-slate-800 tracking-tight uppercase max-w-[120px] md:max-w-[200px] truncate">
                            {design.topic || "BrandForge AI"}
                        </h1>
                        <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded-full">
                            <Sparkles size={10} className="text-indigo-600" />
                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">AI Powered</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                        <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                            <CloudIcon size={10} className="md:size-3" />
                            <span className="hidden xs:inline">Saved to cloud</span>
                        </div>
                        <span className="hidden xs:block w-1 h-1 bg-slate-200 rounded-full" />
                        <span className="text-[9px] md:text-[10px] text-indigo-500 font-black uppercase tracking-wider">v1.2.4</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center gap-1 mr-4 border-r border-slate-100 pr-4">
                    <button
                        onClick={undo}
                        disabled={past.length === 0}
                        className={cn(
                            "p-2 rounded-lg transition-all",
                            past.length > 0 ? "text-slate-600 hover:bg-slate-50" : "text-slate-300 cursor-not-allowed"
                        )}
                        title="Undo"
                    >
                        <History size={18} className="rotate-[-90deg]" />
                    </button>
                    <button
                        onClick={redo}
                        disabled={future.length === 0}
                        className={cn(
                            "p-2 rounded-lg transition-all",
                            future.length > 0 ? "text-slate-600 hover:bg-slate-50" : "text-slate-300 cursor-not-allowed"
                        )}
                        title="Redo"
                    >
                        <History size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 text-slate-600 text-xs font-black uppercase tracking-widest hover:bg-slate-50 rounded-xl transition-all">
                        <Share2 size={16} />
                        <span>Share</span>
                    </button>

                    <button
                        onClick={() => setIsExporting(true)}
                        disabled={isExporting}
                        className={cn(
                            "flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-200 active:scale-95",
                            isExporting
                                ? "bg-slate-100 text-slate-400 cursor-wait"
                                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-300"
                        )}
                    >
                        {isExporting ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-indigo-200 border-t-white rounded-full animate-spin" />
                                <span>Exporting...</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Download size={16} />
                                <span>Download</span>
                            </div>
                        )}
                    </button>
                </div>

                <div className="w-px h-8 bg-slate-100 mx-2" />

                <button className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm hover:ring-2 hover:ring-indigo-500 transition-all overflow-hidden flex items-center justify-center p-0.5">
                    <img src="https://ui-avatars.com/api/?name=User&background=6366f1&color=fff" className="w-full h-full rounded-full" />
                </button>
            </div>
        </header>
    );
}
