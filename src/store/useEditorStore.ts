import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { generateTemplate, TemplateType } from '@/lib/TemplateGenerator';

export type ElementType = 'text' | 'image' | 'rect' | 'circle' | 'line' | 'group';
export type AspectRatio = '1:1' | '4:5' | '16:9' | '9:16' | '2:3';

export const BASE_WIDTH = 1000;

export const getBaseDimensions = (ratio: AspectRatio) => {
    const ratioMap: Record<AspectRatio, number> = {
        '1:1': 1,
        '4:5': 0.8,
        '16:9': 16 / 9,
        '9:16': 9 / 16,
        '2:3': 2 / 3
    };
    return {
        width: BASE_WIDTH,
        height: BASE_WIDTH / (ratioMap[ratio] || 1)
    };
};

export interface CanvasElement {
    id: string;
    type: ElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    opacity: number;
    fill: string;
    stroke?: string;
    strokeWidth?: number;
    fontSize?: number;
    fontFamily?: string;
    fontWeight?: string;
    textAlign?: string;
    text?: string;
    imageUrl?: string;
    cornerRadius?: number;
    shadowBlur?: number;
    shadowOpacity?: number;
    shadowColor?: string;
    fontStyle?: string;
    letterSpacing?: number;
}

export interface EditorState {
    designId: string | null;
    aspectRatio: AspectRatio;
    elements: CanvasElement[];
    selectedId: string | null;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
    isExporting: boolean;
    headline: string;
    subtitle: string;
    cta: string;
    uploadedImages: string[];
    isLeftSidebarOpen: boolean;
    isRightSidebarOpen: boolean;

    // History
    past: CanvasElement[][];
    future: CanvasElement[][];

    // Actions
    setDesignData: (data: any) => void;
    setAspectRatio: (ratio: AspectRatio) => void;
    setElements: (elements: CanvasElement[]) => void;
    addElement: (element: Partial<CanvasElement>) => void;
    updateElement: (id: string, updates: Partial<CanvasElement>) => void;
    removeElement: (id: string) => void;
    duplicateElement: (id: string) => void;
    setSelectedId: (id: string | null) => void;
    setBackgroundColor: (color: string) => void;
    reorderElement: (id: string, direction: 'forward' | 'backward' | 'front' | 'back') => void;
    setIsExporting: (status: boolean) => void;
    setHeadline: (text: string) => void;
    setSubtitle: (text: string) => void;
    setCta: (text: string) => void;
    addUploadedImage: (url: string) => void;
    setLeftSidebarOpen: (open: boolean) => void;
    setRightSidebarOpen: (open: boolean) => void;
    toggleLeftSidebar: () => void;
    toggleRightSidebar: () => void;
    undo: () => void;
    redo: () => void;
    commitState: () => void;
}

const MAX_HISTORY = 50;

export const useEditorStore = create<EditorState>((set, get) => ({
    designId: null,
    aspectRatio: '1:1',
    elements: [],
    selectedId: null,
    backgroundColor: '#ffffff',
    primaryColor: '#4f46e5',
    secondaryColor: '#ffffff',
    isExporting: false,
    headline: '',
    subtitle: '',
    cta: '',
    uploadedImages: [],
    isLeftSidebarOpen: true,
    isRightSidebarOpen: true,

    past: [],
    future: [],

    commitState: () => {
        const { elements, past } = get();
        set({
            past: [elements, ...past].slice(0, MAX_HISTORY),
            future: []
        });
    },

    setDesignData: (data: any) => {
        let finalElements = data.elementsJson || [];
        const ai = data.aiContent || {};
        const output = data.aiOutputJson || {};

        const h = ai.headline || (output.headlines && output.headlines[0]) || data.topic || '';
        const s = ai.subtitle || (output.captions && output.captions[0]) || '';
        const c = ai.cta || (output.ctas && output.ctas[0]) || 'GET STARTED';

        if (finalElements.length === 0) {
            const templateType = (ai.templateSuggestion as TemplateType) || 'movie';
            const bg = (output.imageUrls && output.imageUrls[0]) || null;
            const baseDims = getBaseDimensions(data.aspectRatio || '1:1');

            finalElements = generateTemplate(templateType, {
                width: baseDims.width,
                height: baseDims.height,
                headline: h,
                subtitle: s,
                cta: c,
                primaryColor: data.brand?.primaryColor || '#4f46e5',
                secondaryColor: data.brand?.secondaryColor || '#ffffff',
                backgroundImage: bg
            });
        }

        set({
            designId: data._id,
            aspectRatio: data.aspectRatio || '1:1',
            elements: finalElements,
            backgroundColor: data.layoutJson?.backgroundColor || '#ffffff',
            primaryColor: data.brand?.primaryColor || '#4f46e5',
            secondaryColor: data.brand?.secondaryColor || '#ffffff',
            headline: h,
            subtitle: s,
            cta: c,
            past: [],
            future: []
        });
    },

    setAspectRatio: (ratio) => set({ aspectRatio: ratio }),

    setElements: (elements) => {
        get().commitState();
        set({ elements });
    },

    addElement: (element) => {
        get().commitState();
        const { elements: current, aspectRatio } = get();
        const baseDims = getBaseDimensions(aspectRatio);
        const newEl: CanvasElement = {
            id: uuidv4(),
            type: 'text',
            x: baseDims.width / 2 - 150,
            y: baseDims.height / 2 - 25,
            width: 300,
            height: 50,
            rotation: 0,
            opacity: 1,
            fill: '#000000',
            fontSize: 40,
            fontFamily: 'Inter',
            text: 'New Text',
            ...element
        } as CanvasElement;

        set({
            elements: [...current, newEl],
            selectedId: newEl.id
        });
    },

    updateElement: (id, updates) => {
        const { elements: current, past } = get();
        // Skip background rect updates from simple history if they are just selection/temp
        // But here updates could be critical. We push to history if it's a significant change.
        // For drag/transform, it's better to push on End.

        set({
            // Push to past only for discrete actions, but for simplicity we do it here
            // If dragging, updates will be frequent. Let's assume the caller manages End.
            // Actually, updateElement is called for everything.
            // Let's only push to history if elements actually change significantly
            elements: current.map((el) => el.id === id ? { ...el, ...updates } : el)
        });
    },

    removeElement: (id) => {
        get().commitState();
        const { elements: current } = get();
        set({
            elements: current.filter((el) => el.id !== id),
            selectedId: get().selectedId === id ? null : get().selectedId
        });
    },

    duplicateElement: (id) => {
        get().commitState();
        const { elements: current } = get();
        const el = current.find((e) => e.id === id);
        if (!el) return;
        const newEl = { ...el, id: uuidv4(), x: el.x + 20, y: el.y + 20 };
        set({
            elements: [...current, newEl],
            selectedId: newEl.id
        });
    },

    setSelectedId: (id) => set({ selectedId: id }),

    setBackgroundColor: (color) => set({ backgroundColor: color }),

    reorderElement: (id, direction) => {
        get().commitState();
        const { elements: current } = get();
        const index = current.findIndex((el) => el.id === id);
        if (index === -1) return;
        const newElements = [...current];
        const el = newElements.splice(index, 1)[0];

        if (direction === 'forward') newElements.splice(Math.min(index + 1, current.length), 0, el);
        else if (direction === 'backward') newElements.splice(Math.max(index - 1, 0), 0, el);
        else if (direction === 'front') newElements.push(el);
        else if (direction === 'back') newElements.unshift(el);

        set({
            elements: newElements
        });
    },

    setIsExporting: (status) => set({ isExporting: status }),
    setHeadline: (text) => set({ headline: text }),
    setSubtitle: (text) => set({ subtitle: text }),
    setCta: (text) => set({ cta: text }),
    addUploadedImage: (url) => set((state) => ({ uploadedImages: [...state.uploadedImages, url] })),

    setLeftSidebarOpen: (open) => set({ isLeftSidebarOpen: open }),
    setRightSidebarOpen: (open) => set({ isRightSidebarOpen: open }),
    toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
    toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),

    undo: () => {
        const { past, elements, future } = get();
        if (past.length === 0) return;

        const previous = past[0];
        const newPast = past.slice(1);

        set({
            past: newPast,
            elements: previous,
            future: [elements, ...future]
        });
    },

    redo: () => {
        const { past, elements, future } = get();
        if (future.length === 0) return;

        const next = future[0];
        const newFuture = future.slice(1);

        set({
            past: [elements, ...past],
            elements: next,
            future: newFuture
        });
    }
}));
