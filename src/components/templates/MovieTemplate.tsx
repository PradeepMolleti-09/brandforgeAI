"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage, Group } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';
import useImage from 'use-image';

interface TemplateProps {
    width: number;
    height: number;
    stageRef: React.RefObject<any>;
}

export default function MovieTemplate({ width, height, stageRef }: TemplateProps) {
    const {
        fields,
        backgroundImage,
        logoUrl,
        primaryColor,
        fontFamily
    } = useEditorStore();

    const [bgImg] = useImage(backgroundImage, 'anonymous');
    const [logoImg] = useImage(logoUrl, 'anonymous');

    const { title, subtitle, releaseDate } = fields;

    return (
        <Stage width={width} height={height} ref={stageRef}>
            <Layer>
                {/* Background Image */}
                {bgImg ? (
                    <KonvaImage
                        image={bgImg}
                        width={width}
                        height={height}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <Rect width={width} height={height} fill="#1a1a1a" />
                )}

                {/* Dark Overlay (Bottom Fade) */}
                <Rect
                    width={width}
                    height={height / 2}
                    y={height / 2}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: 0, y: height / 2 }}
                    fillLinearGradientColorStops={[0, 'transparent', 1, 'rgba(0,0,0,0.9)']}
                />

                {/* Title Section (Bottom Third) */}
                <Group y={height * 0.65}>
                    <Text
                        text={(title || "MOVIE TITLE").toUpperCase()}
                        width={width}
                        fontSize={width * 0.12}
                        fontFamily={fontFamily}
                        fontStyle="900"
                        fill="white"
                        align="center"
                        shadowBlur={10}
                        shadowColor="black"
                        draggable
                    />

                    <Text
                        text={subtitle || "A STORY OF EPIC PROPORTIONS"}
                        y={width * 0.15}
                        width={width}
                        fontSize={width * 0.04}
                        fontFamily={fontFamily}
                        fontStyle="300"
                        fill="white"
                        align="center"
                        letterSpacing={2}
                        draggable
                    />
                </Group>

                {/* Release Date */}
                <Text
                    text={releaseDate || "COMING SOON 2026"}
                    y={height - 50}
                    width={width}
                    fontSize={14}
                    fontFamily={fontFamily}
                    fontStyle="bold"
                    fill="white"
                    align="center"
                    letterSpacing={4}
                    draggable
                />

                {/* Logo top-right */}
                {logoImg && (
                    <KonvaImage
                        image={logoImg}
                        width={width * 0.1}
                        height={width * 0.1}
                        x={width - (width * 0.1) - 20}
                        y={20}
                        draggable
                    />
                )}
            </Layer>
        </Stage>
    );
}
