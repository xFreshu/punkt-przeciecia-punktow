// SegmentCanvas.tsx
import React from 'react';
import { Stage, Layer, Line } from 'react-konva'; // Importowanie komponentów z react-konva do rysowania na canvasie
import { Segment } from '../utils'; // Import typu Segment
import { StyledCanvas } from './SegmentCanvas.styled'; // Import stylowanego komponentu Canvas

// Definicja interfejsu dla propsów komponentu SegmentCanvas
interface SegmentCanvasProps {
  segments: Segment[]; // Tablica segmentów do wyświetlenia
}

// Komponent funkcyjny SegmentCanvas, przyjmujący segmenty jako props
export const SegmentCanvas: React.FC<SegmentCanvasProps> = ({ segments }) => {
  // Ustawienie wymiarów canvasa
  const canvasWidth = 800;
  const canvasHeight = 600;
  // Obliczenie centrum canvasa
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  // Skala używana do transformacji punktów
  const scale = 10;

  // Funkcja do transformacji punktów na współrzędne canvasa
  const transformPoint = (x: number, y: number) => ({
    transformedX: centerX + x * scale,
    transformedY: centerY - y * scale,
  });

  return (
    <StyledCanvas>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {segments.map((segment, i) => {
            // Transformacja punktów początkowego i końcowego segmentu
            const { transformedX: startX, transformedY: startY } =
              transformPoint(segment.start.x, segment.start.y);
            const { transformedX: endX, transformedY: endY } = transformPoint(
              segment.end.x,
              segment.end.y
            );

            // Rysowanie linii dla każdego segmentu
            return (
              <Line
                key={i} // Klucz reaktowy dla listy elementów
                points={[startX, startY, endX, endY]} // Punkty linii
                stroke="black" // Kolor linii
                strokeWidth={2} // Grubość linii
              />
            );
          })}
        </Layer>
      </Stage>
    </StyledCanvas>
  );
};
