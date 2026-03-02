"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group, Image as KonvaImage, Circle } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';
import useImage from 'use-image';

interface TemplateProps {
    width: number;
    height: number;
    stageRef: React.RefObject<any>;
}

export default function EventTemplate({ width, height, stageRef }: TemplateProps) {
    const {
        fields,
        backgroundImage,
        primaryColor,
        fontFamily,
        logoUrl
    } = useEditorStore();

    const [bgImg] = useImage(backgroundImage || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80", 'anonymous');
    const [logoImg] = useImage(logoUrl, 'anonymous');

    const { eventTitle, date, location, ctaText } = fields;

    return (
        <Stage width={width} height={height} ref={stageRef}>
            <Layer>
                {/* Decorative Background */}
                {bgImg ? (
                    <KonvaImage
                        image={bgImg}
                        width={width}
                        height={height}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Rect width={width} height={height} fill="#111827" />
                )}

                {/* Dark Overlay with Blur Effect */}
                <Rect
                    width={width}
                    height={height}
                    fill="black"
                    opacity={0.4}
                />

                {/* Decorative Accents (Blobs/Glow) */}
                <Circle
                    x={width * 0.1}
                    y={height * 0.15}
                    radius={width * 0.2}
                    fill={primaryColor}
                    opacity={0.3}
                    shadowBlur={100}
                    shadowColor={primaryColor}
                />

                <Circle
                    x={width * 0.8}
                    y={height * 0.8}
                    radius={width * 0.3}
                    fill={primaryColor}
                    opacity={0.2}
                    shadowBlur={150}
                    shadowColor={primaryColor}
                />

                {/* Event Center Layout */}
                <Group x={width / 2} y={height / 2 - 80} draggable>
                    <Text
                        text={(eventTitle || "SUMMER FESTIVAL").toUpperCase()}
                        width={width * 0.8}
                        offsetX={width * 0.4}
                        fontSize={width * 0.1}
                        fontFamily={fontFamily}
                        fontStyle="900"
                        fill="white"
                        align="center"
                        shadowBlur={15}
                        shadowColor="black"
                    />

                    <Text
                        text={date || "OCTOBER 12-14, 2026"}
                        y={width * 0.15}
                        width={width * 0.8}
                        offsetX={width * 0.4}
                        fontSize={width * 0.05}
                        fontFamily={fontFamily}
                        fontStyle="bold"
                        fill={primaryColor}
                        align="center"
                    />

                    <Text
                        text={location || "CONVENTION CENTER, NEW YORK"}
                        y={width * 0.25}
                        width={width * 0.8}
                        offsetX={width * 0.4}
                        fontSize={width * 0.035}
                        fontFamily={fontFamily}
                        fontStyle="300"
                        fill="#cbd5e1"
                        align="center"
                        letterSpacing={2}
                    />
                </Group>

                {/* Register CTA at bottom */}
                <Group x={width / 2 - 120} y={height - 120} draggable>
                    <Rect
                        width={240}
                        height={60}
                        fill={primaryColor}
                        cornerRadius={30}
                        shadowBlur={20}
                        shadowOpacity={0.3}
                        shadowColor={primaryColor}
                    />
                    <Text
                        text={ctaText || "REGISTER NOW"}
                        width={240}
                        height={60}
                        fontSize={20}
                        fontFamily={fontFamily}
                        fontStyle="bold"
                        fill="white"
                        align="center"
                        verticalAlign="middle"
                        letterSpacing={1}
                    />
                </Group>

                {/* Logo Top Center */}
                {logoImg && (
                    <KonvaImage
                        image={logoImg}
                        width={50}
                        height={50}
                        x={width / 2 - 25}
                        y={30}
                        draggable
                    />
                )}
            </Layer>
        </Stage>
    );
}
