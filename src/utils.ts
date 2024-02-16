export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export interface IntersectionResult {
  intersect: boolean;
  point?: Point;
  segmentIndex?: number;
}

export const generateRandomPoint = (): Point => {
  const range = 20; // Zakres od 0 do 39
  const offset = 10; // Przesunięcie o 20, co daje zakres od -20 do 19
  return {
    x: Math.floor(Math.random() * range) - offset,
    y: Math.floor(Math.random() * range) - offset,
  };
};

export const generateRandomSegment = (): Segment => ({
  start: generateRandomPoint(),
  end: generateRandomPoint(),
});

/**
 * Sprawdza, czy dwa odcinki na płaszczyźnie się przecinają.
 * @param seg1 Pierwszy odcinek, reprezentowany jako obiekt Segment.
 * @param seg2 Drugi odcinek, reprezentowany jako obiekt Segment.
 * @returns Wartość logiczna wskazująca, czy odcinki się przecinają.
 */
export const checkIntersection = (
  seg1: Segment,
  seg2: Segment
): IntersectionResult => {
  const crossProduct = (v1: Point, v2: Point) => v1.x * v2.y - v1.y * v2.x;
  const subtract = (p1: Point, p2: Point) => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  });

  const r = subtract(seg1.end, seg1.start);
  const s = subtract(seg2.end, seg2.start);

  const uNumerator = crossProduct(subtract(seg2.start, seg1.start), r);
  const denominator = crossProduct(r, s);

  if (denominator === 0) {
    if (uNumerator !== 0) {
      // Odcinki są równoległe i nie leżą na sobie.
      return { intersect: false };
    }
    // Odcinki są kolinearne. Należy sprawdzić, czy mają punkty wspólne.
    const t0 =
      ((seg2.start.x - seg1.start.x) * r.x +
        (seg2.start.y - seg1.start.y) * r.y) /
      (r.x * r.x + r.y * r.y);
    const t1 = t0 + (s.x * r.x + s.y * r.y) / (r.x * r.x + r.y * r.y);

    if ((t0 < 0 && t1 < 0) || (t0 > 1 && t1 > 1)) {
      // Odcinki są kolinearne, ale nie mają punktów wspólnych.
      return { intersect: false };
    }
    // Odcinki są kolinearne i mają punkty wspólne.
    return { intersect: true, segmentIndex: uNumerator === 0 ? 1 : undefined };
  }

  const u = uNumerator / denominator;
  const t = crossProduct(subtract(seg2.start, seg1.start), s) / denominator;

  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    // Odcinki przecinają się w punkcie.
    const intersectionPoint = {
      x: seg1.start.x + t * (seg1.end.x - seg1.start.x),
      y: seg1.start.y + t * (seg1.end.y - seg1.start.y),
    };
    return { intersect: true, point: intersectionPoint, segmentIndex: 1 };
  }

  return { intersect: false };
};
