import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SegmentCanvas } from './SegmentCanvas';
import { Segment } from '../utils';

describe('SegmentCanvas', () => {
  test('renders without crashing', () => {
    render(<SegmentCanvas segments={[]} />);
  });

  test('renders correct number of segments', () => {
    const segments: Segment[] = [
      { start: { x: 0, y: 0 }, end: { x: 10, y: 10 } },
      { start: { x: 10, y: 10 }, end: { x: 20, y: 20 } },
    ];

    const { getAllByRole } = render(<SegmentCanvas segments={segments} />);
    const lines = getAllByRole('presentation');
    expect(lines.length).toBe(segments.length);
  });
});
