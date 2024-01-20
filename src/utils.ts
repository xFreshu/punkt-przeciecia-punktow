export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export const generateRandomPoint = (): Point => {
  const range = 20;
  const offset = 20;
  return {
    x: Math.floor(Math.random() * range) - offset,
    y: Math.floor(Math.random() * range) - offset,
  };
};

export const generateRandomSegment = (): Segment => ({
  start: generateRandomPoint(),
  end: generateRandomPoint(),
});
