"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Text, Group, Circle } from 'react-konva';
import { useEditorStore } from '@/store/useEditorStore';

interface TemplateProps {
    width: number;
    height: number;
    stageRef: React.RefObject<any>;
}

export default function SaleTemplate({ width, height, stageRef }: TemplateProps) {
    const {
        fields,
        backgroundColor,
        primaryColor,
        fontFamily
    } = useEditorStore();

    const { headline, discountText, description, ctaText } = fields;

    return (
        <Stage width={width} height={height} ref={stageRef}>
            <Layer>
                {/* Solid/Gradient Background */}
                <Rect
                    width={width}
                    height={height}
                    fill={backgroundColor || "#f8fafc"}
                    fillLinearGradientStartPoint={{ x: 0, y: 0 }}
                    fillLinearGradientEndPoint={{ x: width, y: height }}
                    fillLinearGradientColorStops={[0, backgroundColor, 1, '#e2e8f0']}
                />

                {/* Accent Decorative */}
                <Circle
                    x={width}
                    y={0}
                    radius={width * 0.4}
                    fill={primaryColor}
                    opacity={0.15}
                />

                {/* Percentage Circle / Big Numeric Emphasis */}
                <Group x={width / 2} y={height / 2 - 40} draggable>
                    <Circle
                        radius={width * 0.25}
                        fill={primaryColor}
                        shadowBlur={20}
                        shadowOpacity={0.2}
                    />
                    <Text
                        text={discountText || "50% OFF"}
                        width={width * 0.4}
                        offsetX={width * 0.2}
                        y={-25}
                        fontSize={width * 0.08}
                        fontFamily={fontFamily}
                        fontStyle="900"
                        fill="white"
                        align="center"
                    />
                </Group>

                {/* Sale Headline above */}
                <Text
                    text={(headline || "MEGA SALE EVENT").toUpperCase()}
                    width={width}
                    y={height * 0.15}
                    fontSize={width * 0.1}
                    fontFamily={fontFamily}
                    fontStyle="900"
                    fill={primaryColor}
                    align="center"
                    draggable
                />

                {/* Description below */}
                <Text
                    text={description || "Grab your favorite items now at a massive discount!"}
                    width={width - 80}
                    x={40}
                    y={height * 0.7}
                    fontSize={width * 0.035}
                    fontFamily={fontFamily}
                    fill="#475569"
                    align="center"
                    lineHeight={1.4}
                    draggable
                />

                {/* CTA Button below */}
                <Group x={width / 2 - 100} y={height * 0.82} draggable>
                    <Rect
                        width={200}
                        height={50}
                        fill={primaryColor}
                        cornerRadius={10}
                        shadowBlur={10}
                        shadowOpacity={0.1}
                    />
                    <Text
                        text={ctaText || "SHOP NOW"}
                        width={200}
                        height={50}
                        fontSize={18}
                        fontFamily={fontFamily}
                        fontStyle="bold"
                        fill="white"
                        align="center"
                        verticalAlign="middle"
                    />
                </Group>
            </Layer>
        </Stage>
    );
}
