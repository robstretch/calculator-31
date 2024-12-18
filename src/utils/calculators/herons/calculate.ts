import { HeronsInput, HeronsResult } from './types';

function calculateAngle(a: number, b: number, c: number): number {
  return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
}

function getTriangleType(angles: { A: number; B: number; C: number }): string {
  if (angles.A === 90 || angles.B === 90 || angles.C === 90) return 'Right';
  if (angles.A > 90 || angles.B > 90 || angles.C > 90) return 'Obtuse';
  return 'Acute';
}

function validateTriangle(a: number, b: number, c: number): boolean {
  return (
    a + b > c &&
    b + c > a &&
    a + c > b &&
    a > 0 && b > 0 && c > 0
  );
}

export function calculateHerons(input: HeronsInput): HeronsResult {
  const { sideA, sideB, sideC } = input;
  const steps = [];

  // Calculate semiperimeter
  const s = (sideA + sideB + sideC) / 2;
  steps.push({
    step: 'Calculate semiperimeter',
    formula: 's = (a + b + c) / 2',
    result: s
  });

  // Calculate area using Heron's formula
  const area = Math.sqrt(
    s * (s - sideA) * (s - sideB) * (s - sideC)
  );
  steps.push({
    step: "Apply Heron's formula",
    formula: 'A = √(s(s-a)(s-b)(s-c))',
    result: area
  });

  // Calculate angles
  const angles = {
    A: calculateAngle(sideB, sideC, sideA),
    B: calculateAngle(sideA, sideC, sideB),
    C: calculateAngle(sideA, sideB, sideC)
  };

  // Determine triangle type
  const triangleType = getTriangleType(angles);

  // Validate triangle
  const isValid = validateTriangle(sideA, sideB, sideC);

  // Generate recommendations
  const recommendations = [
    {
      category: 'Measurement',
      suggestion: isValid ? 
        'Measurements form a valid triangle' : 
        'Check measurements - triangle inequality violated'
    },
    {
      category: 'Precision',
      suggestion: 'Use consistent units and precise measurements'
    },
    {
      category: 'Applications',
      suggestion: triangleType === 'Right' ?
        'Consider using Pythagorean theorem as alternative' :
        'Heron\'s formula optimal for this triangle type'
    },
    {
      category: 'Verification',
      suggestion: 'Cross-check area using alternative methods'
    }
  ];

  return {
    area: Math.round(area * 1000) / 1000,
    semiperimeter: Math.round(s * 1000) / 1000,
    angles,
    steps,
    validation: {
      isValid,
      message: isValid ? 
        'Triangle is valid' : 
        'These side lengths cannot form a triangle'
    },
    properties: {
      type: triangleType,
      description: `${triangleType} triangle`,
      ratio: triangleType === 'Right' ? '3:4:5' : undefined
    },
    recommendations
  };
}