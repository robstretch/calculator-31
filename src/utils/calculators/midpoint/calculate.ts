import { Point, MidpointResult } from './types';

function calculateDistance(point1: Point, point2: Point): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  const dz = (point2.z !== undefined && point1.z !== undefined) ? point2.z - point1.z : 0;
  
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function calculateSlope(point1: Point, point2: Point): number | undefined {
  const dx = point2.x - point1.x;
  if (dx === 0) return undefined; // Vertical line
  return (point2.y - point1.y) / dx;
}

export function calculateMidpoint(point1: Point, point2: Point): MidpointResult {
  const midpoint: Point = {
    x: (point1.x + point2.x) / 2,
    y: (point1.y + point2.y) / 2
  };

  if (point1.z !== undefined && point2.z !== undefined) {
    midpoint.z = (point1.z + point2.z) / 2;
  }

  const distance = calculateDistance(point1, point2);
  const slope = calculateSlope(point1, point2);

  const calculations = [
    {
      step: 'X-Coordinate',
      formula: '(x₁ + x₂) ÷ 2',
      result: `(${point1.x} + ${point2.x}) ÷ 2 = ${midpoint.x}`
    },
    {
      step: 'Y-Coordinate',
      formula: '(y₁ + y₂) ÷ 2',
      result: `(${point1.y} + ${point2.y}) ÷ 2 = ${midpoint.y}`
    }
  ];

  if (midpoint.z !== undefined) {
    calculations.push({
      step: 'Z-Coordinate',
      formula: '(z₁ + z₂) ÷ 2',
      result: `(${point1.z} + ${point2.z}) ÷ 2 = ${midpoint.z}`
    });
  }

  calculations.push({
    step: 'Distance',
    formula: '√[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]',
    result: `${distance.toFixed(4)} units`
  });

  if (slope !== undefined) {
    calculations.push({
      step: 'Slope',
      formula: '(y₂ - y₁) ÷ (x₂ - x₁)',
      result: slope.toFixed(4)
    });
  }

  const coordinates = [
    {
      type: '2D Points',
      points: [
        { x: point1.x, y: point1.y },
        { x: point2.x, y: point2.y },
        { x: midpoint.x, y: midpoint.y }
      ]
    }
  ];

  if (midpoint.z !== undefined) {
    coordinates.push({
      type: '3D Points',
      points: [
        { x: point1.x, y: point1.y, z: point1.z },
        { x: point2.x, y: point2.y, z: point2.z },
        { x: midpoint.x, y: midpoint.y, z: midpoint.z }
      ]
    });
  }

  return {
    midpoint,
    distance,
    slope,
    calculations,
    coordinates
  };
}