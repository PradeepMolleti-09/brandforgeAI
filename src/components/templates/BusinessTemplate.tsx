"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';
import useImage from 'use-image';

interface TemplateProps {
    width: number;
    height: number;
    stageRef: React.RefObject<any>;
}

export default function BusinessTemplate({ width, height, stageRef }: TemplateProps) {
    const {
        fields,
        backgroundColor,
        primaryColor,
        fontFamily,
        sideImage,
        logoUrl
    } = useEditorStore();

    const [sideImg] = useImage(sideImage || "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80", 'anonymous');
    const [logoImg] = useImage(logoUrl, 'anonymous');

    const { headline, subheading, bulletPoints, contactText } = fields;

    return (
        <Stage width={width} height={height} ref={stageRef}>
            <Layer>
                {/* Clean Background */}
                <Rect
                    width={width}
                    height={height}
                    fill={backgroundColor || "#ffffff"}
                />

                {/* Optional side image (Right half) */}
                <Group x={width / 2} width={width / 2} height={height}>
                    {sideImg && (
                        <KonvaImage
                            image={sideImg}
                            width={width / 2}
                            height={height}
                            style={{ objectFit: 'cover' }}
                        />
                    )}
                    <Rect width={width / 2} height={height} fill={primaryColor} opacity={0.1} />
                </Group>

                {/* Professional Layout Structure (Left half content) */}
                <Group x={width * 0.08} y={height * 0.12}>
                    <Text
                        text={headline || "GROW YOUR BUSINESS"}
                        width={width * 0.4}
                        fontSize={width * 0.07}
                        fontFamily={fontFamily}
                        fontStyle="900"
                        fill="#1e293b"
                        lineHeight={1.2}
                        draggable
                    />

                    <Text
                        text={subheading || "Innovative strategies to scale your enterprise."}
                        y={width * 0.2}
                        width={width * 0.4}
                        fontSize={width * 0.035}
                        fontFamily={fontFamily}
                        fill="#64748b"
                        lineHeight={1.4}
                        draggable
                    />

                    {/* Bullet points section */}
                    <Group y={width * 0.35}>
                        {(bulletPoints || ["Market Research", "Financial Strategy", "Brand Growth"]).map((p: string, i: number) => (
                            <Group key={i} y={i * (width * 0.06)}>
                                <Rect
                                    width={12}
                                    height={12}
                                    fill={primaryColor}
                                    offsetX={-5}
                                    y={6}
                                    cornerRadius={3}
                                />
                                <Text
                                    text={p}
                                    x={25}
                                    fontSize={width * 0.03}
                                    fontFamily={fontFamily}
                                    fill="#475569"
                                />
                            </Group>
                        ))}
                    </Group>
                </Group>

                {/* Footer / CTA section */}
                <Group y={height - 80} x={width * 0.08}>
                    <Rect
                        width={width * 0.35}
                        height={2}
                        fill="#e2e8f0"
                        y={-20}
                    />
                    <Text
                        text={contactText || "VISIT US AT: WWW.BRANDFORGE.AI"}
                        fontSize={14}
                        fontFamily={fontFamily}
                        fontStyle="bold"
                        fill={primaryColor}
                        letterSpacing={1.5}
                        draggable
                    />
                </Group>

                {/* Logo Top Left */}
                {logoImg && (
                    <KonvaImage
                        image={logoImg}
                        width={40}
                        height={40}
                        x={width * 0.08}
                        y={20}
                        draggable
                    />
                )}
            </Layer>
        </Stage>
    );
}
