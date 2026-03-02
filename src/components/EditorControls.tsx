"use client";

import React, { useState } from 'react';
import { useEditorStore, AspectRatio, CanvasElement } from '@/store/useEditorStore';
import {
    X,
    Trash2,
    Copy,
    MoveUp,
    MoveDown,
    Type,
    Image as ImageIcon,
    Layout,
    Maximize2,
    Layers,
    Settings2,
    Palette,
    Minus,
    Plus,
    ChevronDown,
    Zap,
    Sparkles,
    MousePointer2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EditorControlsProps {
    design: any;
}

export default function EditorControls({ design }: EditorControlsProps) {
    const {
        selectedId,
        elements,
        updateElement,
        removeElement,
        duplicateElement,
        reorderElement,
        aspectRatio,
        setAspectRatio,
        backgroundColor,
        setBackgroundColor,
        isRightSidebarOpen,
        setRightSidebarOpen
    } = useEditorStore();

    const [activeTab, setActiveTab] = useState<'element' | 'global'>('element');

    const selectedElement = elements.find(el => el.id === selectedId);

    return (
        <aside className={cn(
            "fixed inset-y-0 right-0 z-[60] bg-white border-l border-slate-200 flex flex-col transition-all duration-500 ease-in-out shadow-2xl overflow-hidden",
            "w-full sm:w-80 md:relative md:w-80 md:z-20 md:shadow-[-4px_0_24px_rgba(0,0,0,0.02)]",
            isRightSidebarOpen ? "translate-x-0" : "translate-x-full md:hidden"
        )}>
            {/* Mobile Header / Close Bar */}
            <div className="md:hidden flex items-center justify-between p-4 bg-slate-50 border-b border-slate-200 shrink-0">
                <h3 className="text-xs font-black uppercase text-slate-900 tracking-widest">Customization Core</h3>
                <button onClick={() => setRightSidebarOpen(false)} className="p-2 bg-white rounded-full border border-slate-200 shadow-sm active:scale-95 transition-all">
                    <X size={18} />
                </button>
            </div>
            {/* Header with Tabs */}
            <div className="p-4 border-b border-slate-50 flex items-center justify-between shrink-0">
                <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full mr-2 shadow-inner">
                    <button
                        onClick={() => setActiveTab('element')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                            activeTab === 'element' ? "bg-white text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        <MousePointer2 size={12} strokeWidth={3} />
                        Element
                    </button>
                    <button
                        onClick={() => setActiveTab('global')}
                        className={cn(
                            "flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                            activeTab === 'global' ? "bg-white text-indigo-600 shadow-md" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                        )}
                    >
                        <Palette size={12} strokeWidth={3} />
                        Canvas
                    </button>
                </div>
                <button
                    onClick={() => setRightSidebarOpen(false)}
                    className="hidden md:flex p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {activeTab === 'element' ? (
                    <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-right-4 duration-300">
                        {selectedElement ? (
                            <>
                                {/* Selection Context */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                                                {selectedElement.type === 'text' ? <Type size={16} /> : <ImageIcon size={16} />}
                                            </div>
                                            <div>
                                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Object</h3>
                                                <p className="text-xs font-bold text-slate-800 capitalize leading-none mt-1">{selectedElement.type} Layer</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => duplicateElement(selectedId!)} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors" title="Duplicate">
                                                <Copy size={16} />
                                            </button>
                                            <button onClick={() => removeElement(selectedId!)} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 mt-4">
                                        <button onClick={() => reorderElement(selectedId!, 'front')} className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
                                            <MoveUp size={14} />
                                            Front
                                        </button>
                                        <button onClick={() => reorderElement(selectedId!, 'back')} className="flex items-center justify-center gap-2 p-3 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-white hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm active:scale-95">
                                            <MoveDown size={14} />
                                            Back
                                        </button>
                                    </div>
                                </div>

                                <div className="h-px bg-slate-50" />

                                {/* Text Specific Controls */}
                                {selectedElement.type === 'text' && (
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Content Engine</label>
                                            <textarea
                                                value={selectedElement.text || ''}
                                                onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all resize-none min-h-[100px]"
                                                placeholder="Enter creative copy..."
                                            />
                                            <button className="flex items-center gap-2 text-[10px] text-indigo-600 font-black uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                <Sparkles size={12} />
                                                Magic Rewrite
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Typography Systems</label>
                                            <div className="p-1 bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between">
                                                <button
                                                    onClick={() => updateElement(selectedElement.id, { fontSize: Math.max(10, (selectedElement.fontSize || 12) - 1) })}
                                                    className="w-8 h-8 rounded-lg text-slate-400 hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{selectedElement.fontSize} PX</span>
                                                <button
                                                    onClick={() => updateElement(selectedElement.id, { fontSize: (selectedElement.fontSize || 12) + 1 })}
                                                    className="w-8 h-8 rounded-lg text-slate-400 hover:bg-white hover:text-indigo-600 transition-all flex items-center justify-center"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Appearance Engine (Any Object) */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appearance Engine</label>
                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Primary Hue</span>
                                            <div className="flex gap-1">
                                                {['#000000', '#ffffff', '#4f46e5', '#ef4444', '#10b981'].map(c => (
                                                    <button
                                                        key={c}
                                                        onClick={() => updateElement(selectedElement.id, { fill: c })}
                                                        className={cn(
                                                            "w-5 h-5 rounded-full border border-slate-200 shadow-sm transition-transform active:scale-90",
                                                            selectedElement.fill === c && "ring-2 ring-indigo-500 ring-offset-2 scale-110"
                                                        )}
                                                        style={{ backgroundColor: c }}
                                                    />
                                                ))}
                                                <input
                                                    type="color"
                                                    value={selectedElement.fill}
                                                    onChange={(e) => updateElement(selectedElement.id, { fill: e.target.value })}
                                                    className="w-5 h-5 rounded-full border-none p-0 cursor-pointer overflow-hidden appearance-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Luminance</span>
                                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-wider">{(selectedElement.opacity * 100).toFixed(0)}%</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={selectedElement.opacity}
                                                onChange={(e) => updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) })}
                                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center opacity-60">
                                <div className="w-16 h-16 bg-slate-50 border border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center text-slate-300 mb-6">
                                    <MousePointer2 size={24} className="animate-pulse" />
                                </div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose max-w-[120px]">
                                    Select any layer to calibrate
                                </h4>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="p-6 flex flex-col gap-8 animate-in fade-in slide-in-from-left-4 duration-300 font-sans">
                        {/* Canvas Layout Systems */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Layout Blueprints</label>
                            <div className="grid grid-cols-2 gap-2">
                                {(['1:1', '4:5', '16:9', '9:16', '2:3'] as AspectRatio[]).map(ratio => (
                                    <button
                                        key={ratio}
                                        onClick={() => setAspectRatio(ratio)}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all active:scale-95 group",
                                            aspectRatio === ratio
                                                ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm"
                                                : "bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-300"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-8 h-8 rounded border-2 mb-1 group-hover:scale-110 transition-transform",
                                            aspectRatio === ratio ? "border-indigo-600" : "border-slate-300",
                                            ratio === '1:1' && 'w-6 h-6',
                                            ratio === '4:5' && 'w-6 h-7',
                                            ratio === '16:9' && 'w-8 h-4',
                                            ratio === '9:16' && 'w-4 h-8',
                                            ratio === '2:3' && 'w-5 h-7',
                                        )} />
                                        <span className="text-[10px] font-black tracking-widest">{ratio}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-px bg-slate-50" />

                        {/* Global Atmosphere Engine (Background) */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Environment Color</label>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                                <div className="flex gap-2 flex-wrap mb-4 justify-center">
                                    {['#ffffff', '#000000', '#f8fafc', '#4f46e5', '#ef4444', '#10b981', '#f59e0b', '#d946ef'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => setBackgroundColor(c)}
                                            className={cn(
                                                "w-8 h-8 rounded-xl border-2 transition-all active:scale-90 shadow-sm hover:scale-110",
                                                backgroundColor === c ? "border-indigo-600 ring-2 ring-indigo-100" : "border-white"
                                            )}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="w-8 h-8 p-0 border-none rounded-xl cursor-pointer overflow-hidden opacity-0 absolute inset-0 z-10"
                                        />
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-sm flex items-center justify-center">
                                            <Plus size={14} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={backgroundColor.toUpperCase()}
                                        onChange={(e) => setBackgroundColor(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-center text-[10px] font-black tracking-widest text-slate-900 outline-none focus:ring-2 focus:ring-indigo-100 transition-all uppercase"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Palette size={14} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer / Status Area */}
            {selectedElement && (
                <div className="p-4 bg-slate-900 mx-4 mb-6 rounded-2xl shadow-xl shadow-slate-200 flex items-center justify-between border border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-inner">
                            <Zap size={14} fill="currentColor" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-white leading-none tracking-widest uppercase">Precision Edit</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{selectedElement.x.toFixed(0)}, {selectedElement.y.toFixed(0)}</span>
                                <span className="w-1 h-1 bg-indigo-500/30 rounded-full" />
                                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{selectedElement.width.toFixed(0)}w</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
