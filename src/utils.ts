export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export const generateRandomPoint = (): Point => ({
  x: Math.floor(Math.random() * window.innerWidth),
  y: Math.floor(Math.random() * window.innerHeight),
});

export const generateRandomSegment = (): Segment => ({
  start: generateRandomPoint(),
  end: generateRandomPoint(),
});
