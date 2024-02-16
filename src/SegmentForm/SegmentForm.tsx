import React, { useState } from 'react';
import { Segment, generateRandomSegment } from '../utils';
import {
  Form,
  SegmentContainer,
  Input,
  SubmitButton,
  ButtonsContainer,
} from './SegmentForm.styled';

export interface SegmentFormProps {
  onNewSegment: (segment1: Segment, segment2: Segment) => void;
}

export const SegmentForm: React.FC<SegmentFormProps> = ({ onNewSegment }) => {
  const [segment1, setSegment1] = useState<Segment>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [segment2, setSegment2] = useState<Segment>({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });
  const [error, setError] = useState('');

  const handleSegmentChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    segment: Segment,
    setSegment: React.Dispatch<React.SetStateAction<Segment>>,
    point: 'start' | 'end'
  ) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? 0 : parseInt(value, 10);

    setSegment({
      ...segment,
      [point]: {
        ...segment[point],
        [name]: parsedValue,
      },
    });
  };

  const areAllValuesZero = (segment: Segment) => {
    return (
      Object.values(segment.start).every((v) => v === 0) &&
      Object.values(segment.end).every((v) => v === 0)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (areAllValuesZero(segment1) && areAllValuesZero(segment2)) {
      setError('Nie można wygenerować odcinków z samych zer.');
      return;
    }

    setError('');
    onNewSegment(segment1, segment2);
  };

  const fillWithRandomSegments = () => {
    setSegment1(generateRandomSegment());
    setSegment2(generateRandomSegment());
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Kontener dla wprowadzania danych pierwszego segmentu */}
      <SegmentContainer>
        <h3>Odcinek 1</h3>
        <label htmlFor="startX1">Start X</label>
        <Input
          id="startX1"
          name="x"
          type="number"
          min="-10"
          max="10"
          value={segment1.start.x}
          onChange={(e) =>
            handleSegmentChange(e, segment1, setSegment1, 'start')
          }
        />
        <label htmlFor="startY1">Start Y</label>
        <Input
          id="startY1"
          name="y"
          type="number"
          min="-10"
          max="10"
          value={segment1.start.y}
          onChange={(e) =>
            handleSegmentChange(e, segment1, setSegment1, 'start')
          }
        />
        <label htmlFor="endX1">End X</label>
        <Input
          id="endX1"
          name="x"
          type="number"
          min="-10"
          max="10"
          value={segment1.end.x}
          onChange={(e) => handleSegmentChange(e, segment1, setSegment1, 'end')}
        />
        <label htmlFor="endY1">End Y</label>
        <Input
          id="endY1"
          name="y"
          type="number"
          min="-10"
          max="10"
          value={segment1.end.y}
          onChange={(e) => handleSegmentChange(e, segment1, setSegment1, 'end')}
        />
      </SegmentContainer>
      {/* Kontener dla wprowadzania danych drugiego segmentu */}
      <SegmentContainer>
        <h3>Odcinek 2</h3>
        <label htmlFor="startX2">Start X</label>
        <Input
          id="startX2"
          name="x"
          type="number"
          min="-10"
          max="10"
          value={segment2.start.x}
          onChange={(e) =>
            handleSegmentChange(e, segment2, setSegment2, 'start')
          }
        />
        <label htmlFor="startY2">Start Y</label>
        <Input
          id="startY2"
          name="y"
          type="number"
          min="-10"
          max="10"
          value={segment2.start.y}
          onChange={(e) =>
            handleSegmentChange(e, segment2, setSegment2, 'start')
          }
        />
        <label htmlFor="endX2">End X</label>
        <Input
          id="endX2"
          name="x"
          type="number"
          min="-10"
          max="10"
          value={segment2.end.x}
          onChange={(e) => handleSegmentChange(e, segment2, setSegment2, 'end')}
        />
        <label htmlFor="endY2">End Y</label>
        <Input
          id="endY2"
          name="y"
          type="number"
          min="-10"
          max="10"
          value={segment2.end.y}
          onChange={(e) => handleSegmentChange(e, segment2, setSegment2, 'end')}
        />
      </SegmentContainer>
      {/* Przyciski do generowania losowych segmentów i do wysyłania formularza */}
      <ButtonsContainer>
        <SubmitButton type="button" onClick={fillWithRandomSegments}>
          Wypełnij losowymi liczbami
        </SubmitButton>
        <SubmitButton type="submit">Sprawdź przecięcia</SubmitButton>
      </ButtonsContainer>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </Form>
  );
};
