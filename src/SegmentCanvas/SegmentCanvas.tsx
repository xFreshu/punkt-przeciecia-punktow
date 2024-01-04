// SegmentCanvas.tsx
import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Segment } from '../utils';
import { StyledCanvas } from './SegmentCanvas.styled';

interface SegmentCanvasProps {
  segments: Segment[];
}

export const SegmentCanvas: React.FC<SegmentCanvasProps> = ({ segments }) => {
  const canvasWidth = 800;
  const canvasHeight = 600;
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const scale = 10;

  const transformPoint = (x: number, y: number) => ({
    transformedX: centerX + x * scale,
    transformedY: centerY - y * scale,
  });

  return (
    <StyledCanvas>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {segments.map((segment, i) => {
            const { transformedX: startX, transformedY: startY } =
              transformPoint(segment.start.x, segment.start.y);
            const { transformedX: endX, transformedY: endY } = transformPoint(
              segment.end.x,
              segment.end.y
            );

            return (
              <Line
                key={i}
                points={[startX, startY, endX, endY]}
                stroke="black"
                strokeWidth={2}
              />
            );
          })}
        </Layer>
      </Stage>
    </StyledCanvas>
  );
};