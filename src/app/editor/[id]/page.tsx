"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import EditorSidebar from "@/components/EditorSidebar";
import EditorControls from "@/components/EditorControls";
import EditorHeader from "@/components/EditorHeader";
import { DesignService } from "@/services/DesignService";
import { useEditorStore } from "@/store/useEditorStore";
import { Loader2, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

const CanvasEditor = dynamic(() => import("@/components/CanvasEditor"), { ssr: false });

/**
 * Productive MVP Level UI and Service-ready Editor Page
 */
export default function EditorPage() {
    const { status } = useSession();
    const { id } = useParams() as { id: string };
    const [design, setDesign] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const setDesignData = useEditorStore((state) => state.setDesignData);

    useEffect(() => {
        const fetchDesign = async () => {
            if (status !== "authenticated") {
                if (status === "unauthenticated") setIsLoading(false);
                return;
            }

            try {
                const data = await DesignService.getDesignById(id);
                setDesign(data);
                setDesignData(data);
            } catch (err) {
                console.error("Failed to fetch design:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchDesign();
    }, [id, setDesignData, status]);

    if (status === "loading" || isLoading) {
        return (
            <div className="flex flex-col h-screen items-center justify-center bg-slate-50 gap-4">
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-24 h-24 border-4 border-indigo-100 rounded-full border-t-indigo-600 animate-spin" />
                    <Loader2 className="animate-spin text-indigo-200" size={32} />
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Initialising Engine</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1 animate-pulse">Neural training in progress...</p>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50 p-6 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-[120px]" />
                </div>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100 max-w-md w-full text-center relative z-10">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner shadow-indigo-100">
                        <Lock size={38} className="animate-bounce" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Access Restricted</h2>
                    <p className="text-slate-500 mb-10 font-medium leading-relaxed italic">The brandforge engine requires authentication for creative operations.</p>

                    <button
                        onClick={() => signIn("google", { callbackUrl: window.location.href })}
                        className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-slate-800 transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-slate-200 uppercase tracking-widest text-xs"
                    >
                        Sign in with Google
                    </button>

                    <Link href="/" className="inline-block mt-8 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors">
                        ← Exit to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    if (!design) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-slate-50 text-center p-6">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                    <Lock size={32} />
                </div>
                <h1 className="text-xl font-bold text-slate-900 mb-2">Design Not Found</h1>
                <p className="text-slate-500 mb-8 max-w-xs">The design variation you are looking for does not exist or has been deleted.</p>
                <Link href="/dashboard" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold">Return to Dashboard</Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-slate-900 overflow-hidden font-sans">
            <EditorHeader design={design} />

            <div className="flex-1 flex overflow-hidden bg-[#f0f2f5]">
                <EditorSidebar />
                <div className="flex-1 flex flex-col relative overflow-hidden">
                    <CanvasEditor />
                </div>
                <EditorControls design={design} />
            </div>
        </div>
    );
}
