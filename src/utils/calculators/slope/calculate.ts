import { Point, SlopeResult } from './types';

function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function calculateSlope(point1: Point, point2: Point): SlopeResult {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  
  // Calculate slope
  const slope = dx === 0 ? undefined : dy / dx;
  
  // Calculate angle
  const angle = slope === undefined ? 90 : radiansToDegrees(Math.atan(slope));
  
  // Calculate perpendicular slope
  const perpendicular = slope === undefined ? 0 : slope === 0 ? undefined : -1 / slope;
  
  // Calculate y-intercept (b in y = mx + b)
  const yIntercept = slope === undefined ? undefined : point1.y - (slope * point1.x);
  
  // Generate equation
  let equation: string;
  if (slope === undefined) {
    equation = `x = ${point1.x}`;
  } else if (slope === 0) {
    equation = `y = ${point1.y}`;
  } else {
    equation = `y = ${slope.toFixed(2)}x ${yIntercept! >= 0 ? '+' : ''}${yIntercept!.toFixed(2)}`;
  }

  const calculations = [
    {
      step: 'Change in Y',
      formula: 'y₂ - y₁',
      result: `${point2.y} - ${point1.y} = ${dy}`
    },
    {
      step: 'Change in X',
      formula: 'x₂ - x₁',
      result: `${point2.x} - ${point1.x} = ${dx}`
    },
    {
      step: 'Slope',
      formula: '(y₂ - y₁) ÷ (x₂ - x₁)',
      result: slope === undefined ? 'Undefined (vertical line)' : slope.toFixed(4)
    }
  ];

  if (slope !== undefined) {
    calculations.push({
      step: 'Angle',
      formula: 'arctan(slope)',
      result: `${angle.toFixed(2)}°`
    });
  }

  if (yIntercept !== undefined) {
    calculations.push({
      step: 'Y-Intercept',
      formula: 'y₁ - (slope × x₁)',
      result: yIntercept.toFixed(4)
    });
  }

  const points = [
    {
      type: 'Original Points',
      coordinates: [point1, point2]
    }
  ];

  return {
    slope,
    angle,
    perpendicular,
    yIntercept,
    equation,
    calculations,
    points
  };
}