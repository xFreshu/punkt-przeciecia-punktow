import React, { useState, useEffect } from 'react';
import { SegmentCanvas } from '../SegmentCanvas/SegmentCanvas';
import { SegmentForm } from '../SegmentForm/SegmentForm';
import { Segment, generateRandomSegment, checkIntersection } from '../utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // Stan przechowujący dwa segmenty, inicjalizowany losowymi segmentami
  const [segments, setSegments] = useState<Segment[]>([
    generateRandomSegment(),
    generateRandomSegment(),
  ]);

  // Efekt, który uruchamia się za każdym razem, gdy zmieniają się segmenty
  useEffect(() => {
    // Sprawdzanie, czy segmenty się przecinają
    const doesIntersect = checkIntersection(segments[0], segments[1]);
    // Tworzenie wiadomości do wyświetlenia w toaście
    const message =
      `Odcinki: ${formatSegment(segments[0])} i ${formatSegment(
        segments[1]
      )} ` + `${doesIntersect ? 'się przecinają' : 'się nie przecinają'}`;

    // Wyświetlanie odpowiedniego toastu w zależności od wyniku
    if (doesIntersect) {
      showSuccessToast(message);
    } else {
      showErrorToast(message);
    }
  }, [segments]);

  // Funkcja obsługująca aktualizację segmentów
  const handleNewSegments = (segment1: Segment, segment2: Segment) => {
    setSegments([segment1, segment2]);
  };

  // Funkcja formatująca segment do postaci tekstowej
  const formatSegment = (segment: Segment) => {
    return `(${segment.start.x}, ${segment.start.y}) do (${segment.end.x}, ${segment.end.y})`;
  };

  // Funkcja wyświetlająca zielony toast
  const showSuccessToast = (message: string) => {
    toast.success(message, {
      // konfiguracja toastu
    });
  };

  // Funkcja wyświetlająca czerwony toast
  const showErrorToast = (message: string) => {
    toast.error(message, {
      // konfiguracja toastu
    });
  };

  return (
    <div>
      {/* Formularz do wprowadzania nowych segmentów */}
      <SegmentForm onNewSegment={handleNewSegments} />
      {/* Komponent wyświetlający segmenty */}
      <SegmentCanvas segments={segments} />
      {/* Kontener dla toastów */}
      <ToastContainer />
    </div>
  );
};

export default App;
