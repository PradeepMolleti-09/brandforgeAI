"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';

interface TemplateProps {
    width: number;
    height: number;
    stageRef: React.RefObject<any>;
}

export default function MinimalTemplate({ width, height, stageRef }: TemplateProps) {
    const {
        fields,
        backgroundColor,
        primaryColor,
        fontFamily
    } = useEditorStore();

    const { mainLine1, mainLine2, tagline } = fields;

    return (
        <Stage width={width} height={height} ref={stageRef}>
            <Layer>
                {/* Plain Background */}
                <Rect
                    width={width}
                    height={height}
                    fill={backgroundColor || "#f1f5f9"}
                />

                {/* Vertical Branding / Accent line */}
                <Rect
                    x={width * 0.15}
                    y={height * 0.15}
                    width={8}
                    height={height * 0.7}
                    fill={primaryColor}
                    opacity={0.8}
                />

                {/* Stacked Large Typography */}
                <Group x={width * 0.22} y={height * 0.25} draggable>
                    <Text
                        text={(mainLine1 || "MINIMAL").toUpperCase()}
                        width={width * 0.7}
                        fontSize={width * 0.15}
                        fontFamily={fontFamily}
                        fontStyle="900"
                        fill="#1e1b4b" // Deep indigo/black
                        lineHeight={0.9}
                    />

                    <Text
                        text={(mainLine2 || "AESTHETIC").toUpperCase()}
                        y={height * 0.14}
                        width={width * 0.7}
                        fontSize={width * 0.13}
                        fontFamily={fontFamily}
                        fontStyle="300"
                        fill={primaryColor}
                        lineHeight={1.1}
                        letterSpacing={-2}
                    />
                </Group>

                {/* Tagline at bottom */}
                <Group y={height * 0.75} x={width * 0.22} draggable>
                    <Rect width={40} height={2} fill={primaryColor} y={-10} />
                    <Text
                        text={tagline || "Less is more in the world of design."}
                        width={width * 0.6}
                        fontSize={width * 0.04}
                        fontFamily={fontFamily}
                        fontStyle="medium"
                        fill="#64748b"
                        lineHeight={1.4}
                    />
                </Group>

                {/* Footer simple mark */}
                <Text
                    text="BRANDPOST AI"
                    x={width * 0.15}
                    y={height - 40}
                    fontSize={10}
                    fontFamily={fontFamily}
                    fontStyle="bold"
                    fill="#cbd5e1"
                    letterSpacing={4}
                />
            </Layer>
        </Stage>
    );
}
