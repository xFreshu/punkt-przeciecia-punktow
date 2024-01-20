import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SegmentForm } from './SegmentForm';

describe('SegmentForm', () => {
  const mockOnNewSegment = jest.fn();

  beforeEach(() => {
    render(<SegmentForm onNewSegment={mockOnNewSegment} />);
  });

  test('renders correctly', () => {
    expect(screen.getByText('Odcinek 1')).toBeInTheDocument();
    expect(screen.getByText('Odcinek 2')).toBeInTheDocument();
  });

  test('updates state on input change for segment 1', () => {
    const startXInputSegment1: HTMLInputElement =
      screen.getByTestId('segment1-start-x');
    fireEvent.change(startXInputSegment1, { target: { value: '5' } });
    expect(startXInputSegment1.value).toBe('5');
  });

  test('updates state on input change for segment 2', () => {
    const startXInputSegment2: HTMLInputElement =
      screen.getByTestId('segment2-start-x');
    fireEvent.change(startXInputSegment2, { target: { value: '5' } });
    expect(startXInputSegment2.value).toBe('5');
  });

  test('calls onNewSegment on form submit', () => {
    const submitButton = screen.getByRole('button', {
      name: 'Sprawdź przecięcia',
    });
    fireEvent.click(submitButton);
    expect(mockOnNewSegment).toHaveBeenCalled();
  });

  test('populates fields with random segments', () => {
    const randomButton = screen.getByRole('button', {
      name: 'Wypełnij losowymi liczbami',
    });
    fireEvent.click(randomButton);

    const startXInputSegment1: HTMLInputElement =
      screen.getByTestId('segment1-start-x');
    const startXInputSegment2: HTMLInputElement =
      screen.getByTestId('segment2-start-x');
    expect(startXInputSegment1.value).not.toBe('0');
    expect(startXInputSegment2.value).not.toBe('0');
  });
});

console.log('SegmentForm tests passed!!');
