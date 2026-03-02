"use client";

import { getBaseDimensions, useEditorStore, CanvasElement } from "@/store/useEditorStore";
import {
    Layout,
    Shapes,
    Type,
    Shield,
    Upload,
    Wrench,
    Folder,
    Grid2X2,
    Sparkles,
    Search,
    Plus,
    Box,
    X,
    MessageSquare,
    Zap,
    MousePointer2,
    Image as ImageIcon,
    Square,
    Play,
    Music,
    BarChart3,
    Table,
    Mic,
    ChevronLeft,
    ChevronRight,
    Circle,
    Minus,
    Smile,
    Heart,
    Star,
    ArrowUpRight,
    Layers,
    History,
    Settings2,
    Palette,
    Flame,
    Coffee,
    Cloud,
    Camera,
    Bell,
    Award,
    Loader2
} from "lucide-react";
import { useState, useRef } from "react";
import { generateTemplate, TemplateType } from "@/lib/TemplateGenerator";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
    { id: 'templates', label: 'Layouts', icon: Layout },
    { id: 'elements', label: 'Assets', icon: Shapes },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'brand', label: 'Identity', icon: Shield },
    { id: 'uploads', label: 'Files', icon: Upload },
    { id: 'magic', label: 'Magic', icon: Sparkles },
    { id: 'projects', label: 'Space', icon: Folder },
];

const templatesList: { id: TemplateType; name: string; image: string; category: string }[] = [
    { id: 'movie', name: 'Cinematic Noir', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=400&fit=crop', category: 'Entertainment' },
    { id: 'event', name: 'Modern Kinetic', image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=400&fit=crop', category: 'Social' },
    { id: 'product', name: 'Swiss Minimal', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', category: 'Commercial' },
    { id: 'vogue', name: 'Editorial Luxe', image: 'https://images.unsplash.com/photo-1539109139133-e44985595d9b?w=400&h=400&fit=crop', category: 'Lifestyle' },
    { id: 'fitness_pro', name: 'Dynamic Force', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop', category: 'Action' },
    { id: 'business', name: 'Corporate Pro', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400', category: 'Professional' },
    { id: 'minimal', name: 'Pure White', image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=400', category: 'Art' },
    { id: 'neon', name: 'Cyber Glow', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', category: 'Nightlife' },
    { id: 'real_estate', name: 'Modern Living', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400', category: 'Property' },
    { id: 'tech_minimal', name: 'Silicon Valley', image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400', category: 'Tech' },
    { id: 'food_menu', name: 'Gourmet', image: 'https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?w=400', category: 'Food' },
    { id: 'luxury_gold', name: 'Imperial', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400', category: 'Luxury' },
    { id: 'brutalist', name: 'Harsh Brutal', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400', category: 'Modern' },
    { id: 'cyberpunk', name: 'Neon City', image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400', category: 'Futuristic' },
    { id: 'nature_travel', name: 'Eco Explorer', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400', category: 'Nature' },
    { id: 'app_showcase', name: 'Mobile First', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400', category: 'Apps' }
];

const fontCombinations = [
    { name: 'Impactful', font: 'Anton', weight: 'normal', color: '#dc2626' },
    { name: 'Futuristic', font: 'Orbitron', weight: '900', color: '#4f46e5' },
    { name: 'Elegant', font: 'Playfair Display', weight: '900', style: 'italic' },
    { name: 'Modern', font: 'Montserrat', weight: '900', caps: true },
    { name: 'Technical', font: 'JetBrains Mono', weight: 'normal' },
    { name: 'Retro', font: 'Bungee Shade', weight: 'normal' },
    { name: 'Classic', font: 'Cinzel', weight: '700' },
    { name: 'Playful', font: 'Luckiest Guy', weight: 'normal' },
    { name: 'Script', font: 'Dancing Script', weight: '700' },
    { name: 'High Fashion', font: 'Cinzel Decorative', weight: '900' }
];

const assetStickers = [
    { name: 'Gradient Orb', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', tags: ['bg', 'modern'] },
    { name: 'Cyber Mesh', image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=200&h=200&fit=crop', tags: ['tech', 'line'] },
    { name: 'Gold Dust', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?w=200&h=200&fit=crop', tags: ['luxury', 'sparkle'] },
    { name: 'Eco Leaf', image: 'https://images.unsplash.com/photo-1501004318641-739e828d1751?w=200&h=200&fit=crop', tags: ['nature', 'clean'] },
    { name: 'Neon Flare', image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=200&fit=crop', tags: ['vibrant', 'color'] },
    { name: 'Abstract Flow', image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=200&h=200&fit=crop', tags: ['art', 'smooth'] }
];

export default function EditorSidebar() {
    const {
        setElements,
        aspectRatio,
        addElement,
        primaryColor,
        headline,
        subtitle,
        cta,
        uploadedImages,
        addUploadedImage,
        isLeftSidebarOpen,
        setLeftSidebarOpen,
        setRightSidebarOpen
    } = useEditorStore();

    const [activeTab, setActiveTab] = useState('templates');
    const [searchQuery, setSearchQuery] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const closeSidebars = () => {
        setLeftSidebarOpen(false);
        setRightSidebarOpen(false);
    };

    const addElementAndClose = (el: Partial<CanvasElement>) => {
        addElement(el);
        closeSidebars();
    };

    const handleApplyTemplate = async (id: TemplateType) => {
        const template = templatesList.find(t => t.id === id);

        const baseDims = getBaseDimensions(aspectRatio);
        const w = baseDims.width;
        const h = baseDims.height;

        const newElements = generateTemplate(id, {
            width: w,
            height: h,
            primaryColor,
            headline: headline || "EDITABLE TITLE",
            subtitle: subtitle || "Double-click to edit your content.",
            backgroundImage: template?.image,
            cta: cta || "JOIN NOW"
        });
        setElements(newElements);
        closeSidebars();
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            try {
                const base64data = reader.result as string;
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ image: base64data }),
                });

                if (response.ok) {
                    const data = await response.json();
                    addUploadedImage(data.url);
                }
            } catch (err) {
                console.error("Upload failed:", err);
            } finally {
                setIsUploading(false);
            }
        };
    };

    const filteredTemplates = templatesList.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredStickers = assetStickers.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
    );

    return (
        <div className={cn(
            "flex h-full z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all",
            "fixed inset-y-0 left-0 md:relative md:inset-auto"
        )}>
            {/* Nav Rail (Primary) */}
            <nav className="w-16 md:w-20 bg-white border-r border-slate-100 flex flex-col items-center py-6 gap-2 z-20">
                {sidebarNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setLeftSidebarOpen(true);
                            }}
                            className={cn(
                                "relative w-10 h-10 md:w-12 md:h-12 rounded-[1rem] md:rounded-[1.2rem] flex flex-col items-center justify-center transition-all duration-300 group",
                                isActive
                                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100"
                                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <Icon size={isActive ? 18 : 16} strokeWidth={isActive ? 2.5 : 2} />
                            <span className={cn(
                                "hidden md:block text-[8px] font-black uppercase tracking-widest mt-1",
                                isActive ? "text-indigo-100/70" : "text-slate-300"
                            )}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="absolute left-[calc(100%+8px)] md:left-[calc(100%+14px)] w-1 h-4 md:w-1.5 md:h-6 bg-indigo-600 rounded-full animate-in slide-in-from-left-2 duration-300" />
                            )}
                        </button>
                    );
                })}

                <div className="mt-auto flex flex-col gap-2">
                    <button className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] md:rounded-[1.2rem] flex items-center justify-center text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                        <History size={16} />
                    </button>
                </div>
            </nav>

            {/* Content Drawer (Secondary) */}
            {isLeftSidebarOpen && (
                <aside className={cn(
                    "fixed inset-y-0 left-16 md:relative md:left-0 z-10 w-[calc(100vw-64px)] sm:w-72 bg-white border-r border-slate-100 flex flex-col h-full animate-in slide-in-from-left-4 duration-500 ease-out shadow-xl"
                )}>
                    {/* Header Section */}
                    <div className="p-6 pb-4 border-b border-slate-50 relative">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tighter">
                                {sidebarNavItems.find(i => i.id === activeTab)?.label}
                            </h2>
                            <button
                                onClick={() => setLeftSidebarOpen(false)}
                                className="p-1.5 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all"
                            >
                                <ChevronLeft size={16} />
                            </button>
                        </div>

                        <div className="relative group/search">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/search:text-indigo-500 transition-colors">
                                <Search size={14} />
                            </div>
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 placeholder:text-slate-300 focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-200 outline-none transition-all shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto p-6 scroll-smooth custom-scrollbar">
                        {activeTab === 'templates' && (
                            <div className="grid grid-cols-1 gap-4">
                                {filteredTemplates.map((tpl) => (
                                    <button
                                        key={tpl.id}
                                        onClick={() => handleApplyTemplate(tpl.id)}
                                        className="group relative h-48 rounded-[2rem] overflow-hidden border-4 border-white shadow-xl shadow-slate-200/50 hover:scale-[1.02] active:scale-95 transition-all duration-500"
                                    >
                                        <img src={tpl.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <p className="text-[10px] font-black tracking-widest text-indigo-400 uppercase mb-1">{tpl.category}</p>
                                            <p className="text-xs font-black text-white uppercase tracking-tight">{tpl.name}</p>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                                            <Plus size={14} className="text-white" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {activeTab === 'elements' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Constructors</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        <button
                                            onClick={() => addElementAndClose({ type: 'rect', fill: '#4f46e5', width: 200, height: 200, cornerRadius: 10 })}
                                            className="h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all group"
                                        >
                                            <Square size={20} className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
                                        </button>
                                        <button
                                            onClick={() => addElementAndClose({ type: 'circle', fill: '#f43f5e', width: 200, height: 200 })}
                                            className="h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all group"
                                        >
                                            <Circle size={20} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                                        </button>
                                        <button
                                            onClick={() => addElementAndClose({ type: 'line', stroke: '#10b981', strokeWidth: 4, width: 200, height: 4 })}
                                            className="h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center hover:bg-white hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-50 transition-all group"
                                        >
                                            <Minus size={20} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Graphic Stickers</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {filteredStickers.map((item, idx) => {
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => addElementAndClose({ type: 'image', imageUrl: item.image, width: 200, height: 200, opacity: 0.9 })}
                                                    className="group h-32 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:bg-white hover:border-indigo-200 hover:shadow-lg transition-all relative"
                                                >
                                                    <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-2 text-[8px] font-black uppercase text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {item.name}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'text' && (
                            <div className="space-y-6">
                                <button
                                    onClick={() => addElementAndClose({ type: 'text', text: 'HEADLINE', fontSize: 120, fontWeight: '900', textAlign: 'center' })}
                                    className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-200"
                                >
                                    Add Display Text
                                </button>
                                <button
                                    onClick={() => addElementAndClose({ type: 'text', text: 'Sub-heading content goes here.', fontSize: 40, fontWeight: '500' })}
                                    className="w-full bg-white border-2 border-slate-100 text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-600 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Add Subheading
                                </button>

                                <div className="pt-6 space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Neural Typography</label>
                                    <div className="grid grid-cols-1 gap-2">
                                        {fontCombinations.map(ts => (
                                            <button
                                                key={ts.name}
                                                onClick={() => addElementAndClose({
                                                    type: 'text',
                                                    text: ts.name.toUpperCase(),
                                                    fontSize: 60,
                                                    fontFamily: ts.font,
                                                    fontWeight: ts.weight || '900',
                                                    fontStyle: ts.style || 'normal',
                                                    fill: ts.color || '#000'
                                                })}
                                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:border-indigo-200 transition-all text-left"
                                            >
                                                <span style={{ fontFamily: ts.font, fontWeight: ts.weight || '900' }} className="text-md text-slate-800">{ts.name}</span>
                                                <Plus size={14} className="text-slate-300 group-hover:text-indigo-600" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'uploads' && (
                            <div className="space-y-6">
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading}
                                    className="w-full border-4 border-dashed border-slate-100 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group"
                                >
                                    <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner shadow-indigo-100">
                                        {isUploading ? <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : <Upload size={28} />}
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">Drop files here</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">PNG, JPG, SVG (Max 10MB)</p>
                                    </div>
                                </button>
                                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />

                                <div className="grid grid-cols-2 gap-3">
                                    {uploadedImages.map((url, i) => (
                                        <button
                                            key={i}
                                            onClick={() => addElementAndClose({ type: 'image', imageUrl: url, width: 300, height: 300 })}
                                            className="aspect-square rounded-[1.5rem] overflow-hidden border-2 border-white shadow-lg shadow-slate-200 hover:scale-[1.04] transition-all"
                                        >
                                            <img src={url} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'magic' && (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4 space-y-8 animate-in zoom-in-95 duration-500">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-[2.5rem] flex items-center justify-center relative z-10 shadow-inner shadow-indigo-100">
                                        {isUploading ? <Loader2 className="animate-spin" size={42} /> : <Sparkles size={42} />}
                                    </div>
                                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping -z-0" />
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-4 border-white">
                                        <Zap size={14} fill="currentColor" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">Neural Refinement</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest max-w-[200px] mx-auto leading-relaxed">
                                        Let BrandForge AI optimize your layout, color harmony, and composition.
                                    </p>
                                </div>

                                <div className="w-full space-y-3">
                                    <button
                                        onClick={() => {
                                            const templates: TemplateType[] = ['movie', 'vogue', 'minimal', 'neon', 'brutalist', 'cyberpunk'];
                                            const randomTpl = templates[Math.floor(Math.random() * templates.length)];
                                            handleApplyTemplate(randomTpl);
                                        }}
                                        className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-3 group"
                                    >
                                        <Sparkles size={16} className="text-indigo-400 group-hover:rotate-12 transition-transform" />
                                        Auto-Refine Layout
                                    </button>

                                    <button
                                        onClick={() => {
                                            const colors = ['#dc2626', '#10b981', '#4f46e5', '#f59e0b', '#7c3aed', '#000000'];
                                            const randomColor = colors[Math.floor(Math.random() * colors.length)];
                                            // Directly update primary color in store and re-apply template
                                            useEditorStore.setState({ primaryColor: randomColor });
                                            // We need to re-apply the current style or just notify. 
                                            // For now, let's just use the shuffle logic.
                                            const currentElements = useEditorStore.getState().elements;
                                            const newElements = currentElements.map(el =>
                                                (el.type === 'rect' || el.type === 'circle') ? { ...el, fill: randomColor } : el
                                            );
                                            setElements(newElements);
                                        }}
                                        className="w-full bg-white border-2 border-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-indigo-200 hover:text-indigo-600 active:scale-95 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Palette size={16} />
                                        Shuffle Palette
                                    </button>
                                </div>

                                <div className="pt-4 border-t border-slate-50 w-full">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-300 tracking-widest mb-4">
                                        <span>AI Processing Nodes</span>
                                        <span className="text-emerald-500">Active</span>
                                    </div>
                                    <div className="flex gap-1.5 justify-center">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <div key={i} className="h-1 w-8 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s`, width: `${Math.random() * 100}%` }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </aside>
            )}
        </div>
    );
}
