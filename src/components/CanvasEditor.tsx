"use client";

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Circle, Transformer, Group } from 'react-konva';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Plus,
    Minus,
    Maximize,
    MousePointer2,
    Move,
    Eye,
    Grid,
    Target
} from 'lucide-react';
import { useEditorStore, CanvasElement, BASE_WIDTH, getBaseDimensions } from '@/store/useEditorStore';
import useImage from 'use-image';
import { cn } from '@/lib/utils';

const ElementRenderer = ({
    element,
    isSelected,
    onSelect,
    onChange,
    onCommit
}: {
    element: CanvasElement,
    isSelected: boolean,
    onSelect: () => void,
    onChange: (updates: Partial<CanvasElement>) => void,
    onCommit: () => void
}) => {
    const shapeRef = useRef<any>(null);
    const trRef = useRef<any>(null);
    const [img] = useImage(element.imageUrl || '', 'anonymous');

    useEffect(() => {
        if (element.type === 'text' && element.fontFamily) {
            const font = `${element.fontWeight || 'normal'} 16px "${element.fontFamily}"`;
            document.fonts.load(font).then(() => {
                if (shapeRef.current) shapeRef.current.getLayer()?.batchDraw();
            });
        }
    }, [element.fontFamily, element.fontWeight, element.text]);

    useEffect(() => {
        if (isSelected && trRef.current && shapeRef.current) {
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer()?.batchDraw();
        }
    }, [isSelected, element]);

    const commonProps = {
        id: element.id,
        x: element.x,
        y: element.y,
        width: element.width,
        height: element.height,
        rotation: element.rotation,
        opacity: element.opacity,
        draggable: true,
        onClick: (e: any) => {
            e.cancelBubble = true;
            onSelect();
        },
        onTap: (e: any) => {
            e.cancelBubble = true;
            onSelect();
        },
        onDragStart: () => onCommit(),
        onDragEnd: (e: any) => {
            onChange({ x: e.target.x(), y: e.target.y() });
        },
        onTransformStart: () => onCommit(),
        onTransformEnd: (e: any) => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            node.scaleX(1);
            node.scaleY(1);

            const updates: Partial<CanvasElement> = {
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY),
                rotation: node.rotation(),
            };

            if (element.type === 'text' && element.fontSize) {
                if (Math.abs(scaleY - 1) > 0.01) updates.fontSize = Math.round(element.fontSize * scaleY);
            }
            onChange(updates);
        },
        ref: shapeRef,
    };

    return (
        <Group>
            {element.type === 'rect' && (
                <Rect {...commonProps} fill={element.fill} cornerRadius={element.cornerRadius} stroke={element.stroke} strokeWidth={element.strokeWidth} />
            )}
            {element.type === 'circle' && (
                <Circle {...commonProps} fill={element.fill} stroke={element.stroke} strokeWidth={element.strokeWidth} />
            )}
            {element.type === 'text' && (
                <Text
                    {...commonProps}
                    text={element.text}
                    fill={element.fill}
                    fontSize={element.fontSize}
                    fontFamily={element.fontFamily}
                    fontWeight={element.fontWeight}
                    fontStyle={element.fontStyle}
                    align={element.textAlign}
                    letterSpacing={element.letterSpacing}
                    wrap="char"
                />
            )}
            {element.type === 'image' && (
                <KonvaImage {...commonProps} image={img} fill={img ? undefined : '#f1f5f9'} />
            )}
            {isSelected && (
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => (newBox.width < 5 || newBox.height < 5 ? oldBox : newBox)}
                    anchorFill="#4f46e5"
                    anchorStroke="#fff"
                    anchorStrokeWidth={2}
                    anchorSize={10}
                    anchorCornerRadius={2}
                    borderStroke="#4f46e5"
                    borderStrokeWidth={2}
                    padding={2}
                    rotateAnchorOffset={24}
                />
            )}
        </Group>
    );
};

export default function CanvasEditor() {
    const {
        elements,
        selectedId,
        setSelectedId,
        updateElement,
        aspectRatio,
        backgroundColor,
        isLeftSidebarOpen,
        isRightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        isExporting,
        setIsExporting,
        commitState
    } = useEditorStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<any>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [zoom, setZoom] = useState(1);

    const [showGrid, setShowGrid] = useState(true);
    const [previewMode, setPreviewMode] = useState(false);

    const baseDims = useMemo(() => getBaseDimensions(aspectRatio), [aspectRatio]);

    useEffect(() => {
        const updateSize = () => {
            if (!containerRef.current) return;
            const container = containerRef.current;
            const padding = previewMode ? 0 : 160;
            const containerWidth = container.clientWidth - padding;
            const containerHeight = container.clientHeight - padding;

            let targetWidth, targetHeight;
            const ar = baseDims.width / baseDims.height;

            if (containerWidth / containerHeight > ar) {
                targetHeight = containerHeight;
                targetWidth = containerHeight * ar;
            } else {
                targetWidth = containerWidth;
                targetHeight = containerWidth / ar;
            }

            setDimensions({ width: targetWidth, height: targetHeight });
        };

        const timer = setTimeout(updateSize, 100);
        window.addEventListener('resize', updateSize);
        return () => {
            window.removeEventListener('resize', updateSize);
            clearTimeout(timer);
        };
    }, [aspectRatio, baseDims, isLeftSidebarOpen, isRightSidebarOpen, previewMode]);

    const checkDeselect = (e: any) => {
        if (e.target === e.target.getStage() || e.target.id() === 'bg-rect') setSelectedId(null);
    };

    const handleZoom = (type: 'in' | 'out' | 'fit') => {
        if (type === 'in') setZoom(z => Math.min(z + 0.1, 3));
        if (type === 'out') setZoom(z => Math.max(z - 0.1, 0.5));
        if (type === 'fit') setZoom(1);
    }

    return (
        <div className={cn("flex-1 flex flex-col overflow-hidden relative transition-colors duration-500", previewMode ? "bg-slate-950" : "bg-[#f0f2f5]")}>
            {/* Context Tooltips / Floating Nav */}
            {!previewMode && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-white shadow-2xl shadow-indigo-500/10 px-4 py-2 rounded-[2rem] z-30 transition-all hover:bg-white scale-90 md:scale-100">
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100/50 rounded-full border border-slate-100">
                        <Target size={12} className="text-indigo-600" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{aspectRatio} CANVAS</span>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-1">
                        <button onClick={() => handleZoom('out')} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                            <Minus size={14} />
                        </button>
                        <span className="text-[10px] font-black text-slate-800 w-12 text-center uppercase tracking-widest leading-none">{(zoom * 100).toFixed(0)}%</span>
                        <button onClick={() => handleZoom('in')} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all">
                            <Plus size={14} />
                        </button>
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <button onClick={() => handleZoom('fit')} className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all" title="Fit to screen">
                        <Maximize size={14} />
                    </button>
                </div>
            )}

            {/* Canvas Container */}
            <div
                ref={containerRef}
                className={cn(
                    "flex-1 flex items-center justify-center relative overflow-hidden transition-all duration-500",
                    previewMode ? "p-0" : "p-4 sm:p-20 cursor-grab active:cursor-grabbing"
                )}
            >
                {/* Background Grid Pattern */}
                {!previewMode && showGrid && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                )}

                {/* Sidebar Re-open Controls */}
                {!previewMode && !isLeftSidebarOpen && (
                    <button onClick={toggleLeftSidebar} className="fixed left-2 md:left-6 top-1/2 -translate-y-1/2 w-8 h-16 md:w-10 md:h-24 bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all z-20 group">
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                )}
                {!previewMode && !isRightSidebarOpen && (
                    <button onClick={toggleRightSidebar} className="fixed right-2 md:right-6 top-1/2 -translate-y-1/2 w-8 h-16 md:w-10 md:h-24 bg-white border border-slate-200 rounded-xl md:rounded-2xl shadow-2xl flex items-center justify-center text-indigo-600 hover:bg-indigo-50 transition-all z-20 group">
                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                )}

                <div
                    className={cn(
                        "relative",
                        previewMode ? "" : "shadow-[0_32px_120px_rgba(30,41,59,0.12)] rounded-sm overflow-hidden"
                    )}
                    style={{
                        width: dimensions.width,
                        height: dimensions.height,
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center center'
                    }}
                >
                    <Stage
                        width={dimensions.width}
                        height={dimensions.height}
                        scaleX={dimensions.width / baseDims.width}
                        scaleY={dimensions.height / baseDims.height}
                        ref={stageRef}
                        onMouseDown={checkDeselect}
                        onTouchStart={checkDeselect}
                    >
                        <Layer>
                            <Rect
                                id="bg-rect"
                                width={baseDims.width}
                                height={baseDims.height}
                                fill={backgroundColor}
                            />
                            {elements.map((el) => (
                                <ElementRenderer
                                    key={el.id}
                                    element={el}
                                    isSelected={!previewMode && el.id === selectedId}
                                    onSelect={() => !previewMode && setSelectedId(el.id)}
                                    onChange={(updates) => updateElement(el.id, updates)}
                                    onCommit={() => commitState()}
                                />
                            ))}
                        </Layer>
                    </Stage>
                </div>
            </div>

            {/* Quick Actions (Bottom Bar) */}
            <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-slate-900 border border-slate-800 shadow-2xl shadow-black/20 px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl z-20 scale-90 sm:scale-100">
                <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className={cn(
                        "flex items-center gap-2 px-2 sm:px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-transparent",
                        previewMode ? "bg-indigo-600 text-white" : "text-white hover:bg-slate-800 hover:border-slate-700"
                    )}
                >
                    <Eye size={14} className="sm:size-3.5" />
                    <span className="hidden sm:inline">{previewMode ? "Exit" : "Preview"}</span>
                </button>
                <div className="w-px h-4 bg-slate-800" />
                <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={cn(
                        "flex items-center gap-2 px-2 sm:px-3 py-1.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-lg transition-all border border-transparent",
                        showGrid ? "text-indigo-400" : "text-white hover:bg-slate-800 hover:border-slate-700"
                    )}
                >
                    <Grid size={14} className="sm:size-3.5" />
                    <span className="hidden sm:inline">Guides</span>
                </button>
                <div className="hidden sm:flex items-center gap-1 mx-2">
                    <div className="w-px h-4 bg-slate-800" />
                </div>
                <div className="flex items-center gap-2 ml-1 sm:ml-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[8px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest italic tracking-tighter">Live</span>
                </div>
            </div>
        </div>
    );
}
