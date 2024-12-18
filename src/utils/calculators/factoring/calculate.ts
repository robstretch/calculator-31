import { FactoringInput, FactoringResult } from './types';

function findGCF(terms: number[]): number {
  const gcd = (a: number, b: number): number => b === 0 ? Math.abs(a) : gcd(b, a % b);
  return terms.reduce((a, b) => gcd(a, b));
}

function isSquare(n: number): boolean {
  const root = Math.sqrt(n);
  return root === Math.floor(root);
}

export function calculateFactoring(input: FactoringInput): FactoringResult {
  const steps = [];
  let factored = input.expression;
  const roots: number[] = [];

  // Common factoring methods
  const methods = [
    {
      name: 'Greatest Common Factor',
      pattern: 'ax + ay = a(x + y)',
      example: '6x² + 12x = 6x(x + 2)'
    },
    {
      name: 'Difference of Squares',
      pattern: 'a² - b² = (a + b)(a - b)',
      example: 'x² - 16 = (x + 4)(x - 4)'
    },
    {
      name: 'Perfect Square Trinomial',
      pattern: 'x² + 2ax + a² = (x + a)²',
      example: 'x² + 6x + 9 = (x + 3)²'
    },
    {
      name: 'Grouping',
      pattern: 'ax + ay + bx + by = (a + b)(x + y)',
      example: '2x + 2y + 3x + 3y = (2 + 3)(x + y)'
    }
  ];

  // Generate visualization points
  const visualPoints = [];
  for (let x = -10; x <= 10; x++) {
    try {
      const y = eval(input.expression.replace(/x/g, x.toString()));
      visualPoints.push({ x, y });
    } catch (e) {
      // Skip invalid points
    }
  }

  // Attempt factoring based on pattern recognition
  if (input.expression.match(/^x\^2[-+]\d+$/)) {
    // Difference/sum of squares
    const constant = parseInt(input.expression.split(/[-+]/)[1]);
    if (isSquare(constant)) {
      const root = Math.sqrt(constant);
      const operator = input.expression.includes('-') ? '-' : '+';
      factored = `(x + ${root})(x ${operator === '+' ? '-' : '+'} ${root})`;
      
      steps.push({
        method: 'Difference of Squares',
        expression: factored,
        explanation: `Recognize a² ${operator} b² pattern`
      });

      roots.push(-root, root);
    }
  }

  return {
    factored,
    steps,
    roots,
    methods,
    visualPoints
  };
}