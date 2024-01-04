export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export const generateRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * 10),
  y: Math.floor(Math.random() * 10),
});

export const generateRandomSegment = (): Segment => ({
  start: generateRandomPoint(),
  end: generateRandomPoint(),
});
