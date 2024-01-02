import React from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { Segment } from './utils';

interface SegmentCanvasProps {
  segments: Segment[];
}

export const SegmentCanvas: React.FC<SegmentCanvasProps> = ({ segments }) => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {segments.map((segment, i) => (
          <Line
            key={i}
            points={[
              segment.start.x,
              segment.start.y,
              segment.end.x,
              segment.end.y,
            ]}
            stroke="black"
            strokeWidth={2}
          />
        ))}
      </Layer>
    </Stage>
  );
};
