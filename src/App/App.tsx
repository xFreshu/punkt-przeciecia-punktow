import React, { useState, useEffect } from 'react';
import { SegmentCanvas } from '../SegmentCanvas/SegmentCanvas';
import { SegmentForm } from '../SegmentForm/SegmentForm';
import { Segment, generateRandomSegment, checkIntersection } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Definicja typu zwracanego przez funkcję checkIntersection
const App = () => {
  const [segments, setSegments] = useState<Segment[]>([
    generateRandomSegment(),
    generateRandomSegment(),
  ]);

  useEffect(() => {
    const result: any = checkIntersection(segments[0], segments[1]);

    if (result.intersect) {
      let message;
      if (result.point) {
        // Przecięcie w jednym punkcie
        message =
          `Odcinki: ${formatSegment(segments[0])} i ${formatSegment(
            segments[1]
          )} ` +
          `się przecinają w punkcie: (${result.point.x.toFixed(
            2
          )}, ${result.point.y.toFixed(2)})`;
      } else {
        // Przecięcie na fragmencie (odcinki leżą na sobie)
        // Używam segmentów bezpośrednio, ponieważ wynik nie zawiera konkretnego punktu przecięcia
        message =
          `Odcinki: ${formatSegment(segments[0])} i ${formatSegment(
            segments[1]
          )} ` + `leżą na sobie.`;
      }
      showSuccessToast(message);
    } else {
      const message = `Odcinki: ${formatSegment(segments[0])} i ${formatSegment(
        segments[1]
      )} się nie przecinają`;

      showErrorToast(message);
    }
  }, [segments]);

  const handleNewSegments = (segment1: Segment, segment2: Segment) => {
    setSegments([segment1, segment2]);
  };

  const formatSegment = (segment: Segment) => {
    return `(${segment.start.x}, ${segment.start.y}) do (${segment.end.x}, ${segment.end.y})`;
  };

  const showSuccessToast = (message: string) => {
    toast.success(message);
  };

  const showErrorToast = (message: string) => {
    toast.error(message);
  };

  return (
    <div>
      <SegmentForm onNewSegment={handleNewSegments} />
      <SegmentCanvas segments={segments} />
      <ToastContainer />
    </div>
  );
};

export default App;
