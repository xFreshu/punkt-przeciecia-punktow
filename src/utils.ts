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

/**
 * Sprawdza, czy dwa odcinki na płaszczyźnie się przecinają.
 * @param seg1 Pierwszy odcinek, reprezentowany jako obiekt Segment.
 * @param seg2 Drugi odcinek, reprezentowany jako obiekt Segment.
 * @returns Wartość logiczna wskazująca, czy odcinki się przecinają.
 * Jeżeli odcinki przecinają się, to program określa zbiór, na którym następuje przecięcie:
 * - punkt i jego współrzędne, albo
 * - odcinek i współrzędne jego końców.
 */
export const checkIntersection = (seg1: Segment, seg2: Segment) => {
  // Funkcja obliczająca iloczyn wektorowy dwóch punktów.
  const crossProduct = (v1: Point, v2: Point) => v1.x * v2.y - v1.y * v2.x;

  // Funkcja obliczająca różnicę dwóch punktów.
  const subtract = (p1: Point, p2: Point) => ({
    x: p1.x - p2.x,
    y: p1.y - p2.y,
  });

  // Obliczenie wektora reprezentującego pierwszy odcinek.
  const r = subtract(seg1.end, seg1.start);

  // Obliczenie wektora reprezentującego drugi odcinek.
  const s = subtract(seg2.end, seg2.start);

  // Obliczenie iloczynu wektorowego (numeratory).
  const uNumerator = crossProduct(subtract(seg2.start, seg1.start), r);

  // Obliczenie iloczynu wektorowego (mianownik).
  const denominator = crossProduct(r, s);

  // Sprawdzenie, czy mianownik nie jest równy zero (czy odcinki są równoległe).
  if (denominator === 0) {
    // Jeśli mianownik jest równy zero, sprawdź, czy numeratory są również równe zero.
    return uNumerator === 0;
  }

  // Obliczenie parametru u.
  const u = uNumerator / denominator;

  // Obliczenie parametru t.
  const t = crossProduct(subtract(seg2.start, seg1.start), s) / denominator;

  // Sprawdzenie, czy punkt przecięcia leży na obu odcinkach.
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    const intersectionPoint = {
      x: seg1.start.x + t * (seg1.end.x - seg1.start.x),
      y: seg1.start.y + t * (seg1.end.y - seg1.start.y),
    };
    return { intersect: true, point: intersectionPoint, segmentIndex: 1 };
  } else {
    return { intersect: false };
  }
};
