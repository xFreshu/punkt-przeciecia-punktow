export interface Point {
  x: number;
  y: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export const generateRandomPoint = (): Point => {
  const range = 40; // Zakres od 0 do 39
  const offset = 20; // Przesunięcie o 20, co daje zakres od -20 do 19
  return {
    x: Math.floor(Math.random() * range) - offset,
    y: Math.floor(Math.random() * range) - offset,
  };
};

export const generateRandomSegment = (): Segment => ({
  start: generateRandomPoint(),
  end: generateRandomPoint(),
});

export const checkIntersection = (seg1: Segment, seg2: Segment): boolean => {
  // Definicja pomocnicza do sprawdzania, czy punkt leży na odcinku
  const onSegment = (p: Point, q: Point, r: Point): boolean =>
    q.x <= Math.max(p.x, r.x) &&
    q.x >= Math.min(p.x, r.x) &&
    q.y <= Math.max(p.y, r.y) &&
    q.y >= Math.min(p.y, r.y);

  // Definicja pomocnicza do obliczania orientacji trzech punktów
  const orientation = (p: Point, q: Point, r: Point): number => {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return val > 0 ? 1 : 2;
  };

  // Obliczanie orientacji dla różnych kombinacji punktów końcowych segmentów
  const o1 = orientation(seg1.start, seg1.end, seg2.start);
  const o2 = orientation(seg1.start, seg1.end, seg2.end);
  const o3 = orientation(seg2.start, seg2.end, seg1.start);
  const o4 = orientation(seg2.start, seg2.end, seg1.end);

  // Sprawdzenie warunków przecięcia się odcinków
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSegment(seg1.start, seg2.start, seg1.end)) return true;
  if (o2 === 0 && onSegment(seg1.start, seg2.end, seg1.end)) return true;
  if (o3 === 0 && onSegment(seg2.start, seg1.start, seg2.end)) return true;
  return o4 === 0 && onSegment(seg2.start, seg1.end, seg2.end);
};
