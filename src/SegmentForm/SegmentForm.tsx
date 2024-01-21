import React, { useState } from 'react';
import { Segment, generateRandomSegment } from '../utils';
import {
  Form,
  SegmentContainer,
  Input,
  SubmitButton,
  ButtonsContainer,
} from './SegmentForm.styled';

// Typ propsów dla SegmentForm
export interface SegmentFormProps {
  onNewSegment: (segment1: Segment, segment2: Segment) => void;
}

// Komponent formularza do wprowadzania danych segmentów
export const SegmentForm: React.FC<SegmentFormProps> = ({ onNewSegment }) => {
  // Stan dla przechowywania danych pierwszego i drugiego segmentu
  const [segment1, setSegment1] = useState<Segment>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [segment2, setSegment2] = useState<Segment>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });

  // Obsługa wysłania formularza
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewSegment(segment1, segment2);
  };

  // Funkcja do wypełnienia segmentów losowymi wartościami
  const fillWithRandomSegments = () => {
    setSegment1(generateRandomSegment());
    setSegment2(generateRandomSegment());
  };

  // Funkcja do obsługi zmiany wartości w inputach
  const handleSegmentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    segment: Segment,
    setSegment: React.Dispatch<React.SetStateAction<Segment>>,
    point: 'start' | 'end'
  ) => {
    const { name, value } = e.target;
    setSegment({
      ...segment,
      [point]: {
        ...segment[point],
        [name]: parseInt(value, 10),
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Kontener dla wprowadzania danych pierwszego segmentu */}
      <SegmentContainer>
        <h3>Odcinek 1</h3>
        {/* Inputy dla pierwszego segmentu (start x, start y, end x, end y) */}
        {/* ... kod inputów ... */}
      </SegmentContainer>

      {/* Kontener dla wprowadzania danych drugiego segmentu */}
      <SegmentContainer>
        <h3>Odcinek 2</h3>
        {/* Inputy dla drugiego segmentu (start x, start y, end x, end y) */}
        {/* ... kod inputów ... */}
      </SegmentContainer>

      {/* Przyciski do generowania losowych segmentów i do wysyłania formularza */}
      <ButtonsContainer>
        <SubmitButton type="button" onClick={fillWithRandomSegments}>
          Wypełnij losowymi liczbami
        </SubmitButton>
        <SubmitButton type="submit">Sprawdź przecięcia</SubmitButton>
      </ButtonsContainer>
    </Form>
  );
};
