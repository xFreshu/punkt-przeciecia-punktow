import React, { useState, useEffect } from 'react';
import { SegmentCanvas } from '../SegmentCanvas/SegmentCanvas';
import { SegmentForm } from '../SegmentForm/SegmentForm';
import { Segment, generateRandomSegment, Point } from '../utils';

const App = () => {
  const [segments, setSegments] = useState<Segment[]>([
    generateRandomSegment(),
    generateRandomSegment(),
  ]);
  const [intersect, setIntersect] = useState<boolean>(false);

  const checkIntersection = (seg1: Segment, seg2: Segment): boolean => {
    const onSegment = (p: Point, q: Point, r: Point): boolean =>
      q.x <= Math.max(p.x, r.x) &&
      q.x >= Math.min(p.x, r.x) &&
      q.y <= Math.max(p.y, r.y) &&
      q.y >= Math.min(p.y, r.y);

    const orientation = (p: Point, q: Point, r: Point): number => {
      const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
      if (val === 0) return 0;
      return val > 0 ? 1 : 2;
    };

    const o1 = orientation(seg1.start, seg1.end, seg2.start);
    const o2 = orientation(seg1.start, seg1.end, seg2.end);
    const o3 = orientation(seg2.start, seg2.end, seg1.start);
    const o4 = orientation(seg2.start, seg2.end, seg1.end);

    if (o1 !== o2 && o3 !== o4) return true;

    if (o1 === 0 && onSegment(seg1.start, seg2.start, seg1.end)) return true;
    if (o2 === 0 && onSegment(seg1.start, seg2.end, seg1.end)) return true;
    if (o3 === 0 && onSegment(seg2.start, seg1.start, seg2.end)) return true;
    if (o4 === 0 && onSegment(seg2.start, seg1.end, seg2.end)) return true;

    return false;
  };

  useEffect(() => {
    setIntersect(checkIntersection(segments[0], segments[1]));
  }, [segments]);

  const handleNewSegments = (segment1: Segment, segment2: Segment) => {
    setSegments([segment1, segment2]);
    setIntersect(checkIntersection(segment1, segment2));
  };
  return (
    <div>
      <SegmentForm onNewSegment={handleNewSegments} />
      {intersect ? (
        <p>Odcinki się przecinają</p>
      ) : (
        <p>Odcinki się nie przecinają</p>
      )}
      <SegmentCanvas segments={segments} />
    </div>
  );
};

export default App;
