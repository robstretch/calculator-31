import { Point, Shape, CentroidResult } from './types';

function calculateTriangleCentroid(points: Point[]): { centroid: Point; area: number } {
  const x = (points[0].x + points[1].x + points[2].x) / 3;
  const y = (points[0].y + points[1].y + points[2].y) / 3;
  
  // Calculate area using shoelace formula
  const area = Math.abs(
    (points[0].x * (points[1].y - points[2].y) +
     points[1].x * (points[2].y - points[0].y) +
     points[2].x * (points[0].y - points[1].y)) / 2
  );

  return {
    centroid: { x, y },
    area
  };
}

function calculateRectangleCentroid(width: number, height: number): { centroid: Point; area: number } {
  return {
    centroid: { x: width / 2, y: height / 2 },
    area: width * height
  };
}

function calculateCircleCentroid(radius: number): { centroid: Point; area: number } {
  return {
    centroid: { x: 0, y: 0 }, // Assuming circle is centered at origin
    area: Math.PI * radius * radius
  };
}

export function calculateCentroid(shape: Shape): CentroidResult {
  let result: { centroid: Point; area: number };
  const calculations: { step: string; formula: string; result: string; }[] = [];

  switch (shape.type) {
    case 'triangle':
      if (!shape.points || shape.points.length !== 3) {
        throw new Error('Triangle requires exactly 3 points');
      }
      result = calculateTriangleCentroid(shape.points);
      calculations.push(
        {
          step: 'X-Coordinate',
          formula: '(x₁ + x₂ + x₃) / 3',
          result: result.centroid.x.toFixed(2)
        },
        {
          step: 'Y-Coordinate',
          formula: '(y₁ + y₂ + y₃) / 3',
          result: result.centroid.y.toFixed(2)
        },
        {
          step: 'Area',
          formula: '|(x₁(y₂ - y₃) + x₂(y₃ - y₁) + x₃(y₁ - y₂))| / 2',
          result: result.area.toFixed(2)
        }
      );
      break;

    case 'rectangle':
      if (!shape.width || !shape.height) {
        throw new Error('Rectangle requires width and height');
      }
      result = calculateRectangleCentroid(shape.width, shape.height);
      calculations.push(
        {
          step: 'X-Coordinate',
          formula: 'width / 2',
          result: result.centroid.x.toFixed(2)
        },
        {
          step: 'Y-Coordinate',
          formula: 'height / 2',
          result: result.centroid.y.toFixed(2)
        },
        {
          step: 'Area',
          formula: 'width × height',
          result: result.area.toFixed(2)
        }
      );
      break;

    case 'circle':
      if (!shape.radius) {
        throw new Error('Circle requires radius');
      }
      result = calculateCircleCentroid(shape.radius);
      calculations.push(
        {
          step: 'X-Coordinate',
          formula: '0 (center)',
          result: '0.00'
        },
        {
          step: 'Y-Coordinate',
          formula: '0 (center)',
          result: '0.00'
        },
        {
          step: 'Area',
          formula: 'πr²',
          result: result.area.toFixed(2)
        }
      );
      break;

    default:
      throw new Error('Invalid shape type');
  }

  const properties = [
    {
      property: 'Area',
      value: result.area,
      description: 'Total area of the shape'
    },
    {
      property: 'X-Coordinate',
      value: result.centroid.x,
      description: 'X position of centroid'
    },
    {
      property: 'Y-Coordinate',
      value: result.centroid.y,
      description: 'Y position of centroid'
    }
  ];

  const recommendations = [
    {
      category: 'Verification',
      suggestion: 'Cross-check centroid location using physical model'
    },
    {
      category: 'Applications',
      suggestion: 'Use centroid for balance point in physical objects'
    },
    {
      category: 'Accuracy',
      suggestion: 'Consider using more decimal places for precise calculations'
    },
    {
      category: 'Balance',
      suggestion: 'Ensure even weight distribution around centroid'
    }
  ];

  return {
    centroid: result.centroid,
    area: result.area,
    calculations,
    properties,
    recommendations
  };
}