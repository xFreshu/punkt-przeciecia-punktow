import React, { useState } from 'react';
import { Segment, generateRandomSegment } from '../utils';
import {
  Form,
  SegmentContainer,
  Input,
  SubmitButton,
  ButtonsContainer,
} from './SegmentForm.styled';

interface SegmentFormProps {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNewSegment(segment1, segment2);
  };

  const fillWithRandomSegments = () => {
    setSegment1(generateRandomSegment());
    setSegment2(generateRandomSegment());
  };

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
      <SegmentContainer>
        <h3>Odcinek 1</h3>
        Start x:{' '}
        <Input
          type="number"
          name="x"
          value={segment1.start.x}
          onChange={(e) =>
            handleSegmentChange(e, segment1, setSegment1, 'start')
          }
        />
        Start y:
        <Input
          type="number"
          name="y"
          value={segment1.start.y}
          onChange={(e) =>
            handleSegmentChange(e, segment1, setSegment1, 'start')
          }
        />
        End x:{' '}
        <Input
          type="number"
          name="x"
          value={segment1.end.x}
          onChange={(e) => handleSegmentChange(e, segment1, setSegment1, 'end')}
        />
        End y:{' '}
        <Input
          type="number"
          name="y"
          value={segment1.end.y}
          onChange={(e) => handleSegmentChange(e, segment1, setSegment1, 'end')}
        />
      </SegmentContainer>
      <SegmentContainer>
        <h3>Odcinek 2</h3>
        Start x:{' '}
        <Input
          type="number"
          name="x"
          value={segment2.start.x}
          onChange={(e) =>
            handleSegmentChange(e, segment2, setSegment2, 'start')
          }
        />
        Start y:{' '}
        <Input
          type="number"
          name="y"
          value={segment2.start.y}
          onChange={(e) =>
            handleSegmentChange(e, segment2, setSegment2, 'start')
          }
        />
        End x:{' '}
        <Input
          type="number"
          name="x"
          value={segment2.end.x}
          onChange={(e) => handleSegmentChange(e, segment2, setSegment2, 'end')}
        />
        End y:{' '}
        <Input
          type="number"
          name="y"
          value={segment2.end.y}
          onChange={(e) => handleSegmentChange(e, segment2, setSegment2, 'end')}
        />
      </SegmentContainer>
      <ButtonsContainer>
        <SubmitButton type="button" onClick={fillWithRandomSegments}>
          Wypełnij losowymi liczbami
        </SubmitButton>
        <SubmitButton type="submit">Sprawdź przecięcia</SubmitButton>
      </ButtonsContainer>
    </Form>
  );
};
