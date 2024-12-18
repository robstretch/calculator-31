import { DifferentialEquationResult, EquationType } from './types';

function identifyEquationType(equation: string): EquationType {
  if (equation.includes("y''")) return 'second-order';
  if (equation.includes('=') && 
      equation.split('=')[0].includes('y') && 
      equation.split('=')[0].includes('x')) return 'separable';
  if (equation.includes("y'")) return 'first-order';
  return 'linear';
}

function determineOrder(equation: string): number {
  if (equation.includes("y''")) return 2;
  if (equation.includes("y'")) return 1;
  return 0;
}

function checkLinear(equation: string): boolean {
  return !equation.includes('y^') && !equation.includes('y*y');
}

function solveSeparableEquation(equation: string): string[] {
  const steps = [];
  steps.push('Separate variables by moving all y terms to one side and x terms to the other');
  steps.push('Integrate both sides');
  steps.push('Solve for y');
  return steps;
}

function solveLinearEquation(equation: string): string[] {
  const steps = [];
  steps.push('Rearrange to standard form: dy/dx + P(x)y = Q(x)');
  steps.push('Find integrating factor μ(x) = e^∫P(x)dx');
  steps.push('Multiply both sides by integrating factor');
  steps.push('Integrate both sides');
  steps.push('Solve for y');
  return steps;
}

export function calculateDifferentialEquation(
  equation: string,
  initialConditions?: { x: number; y: number; }
): DifferentialEquationResult {
  const type = identifyEquationType(equation);
  const order = determineOrder(equation);
  const isLinear = checkLinear(equation);
  const isSeparable = type === 'separable';

  let steps: string[];
  let solution: string;
  let generalSolution: string;

  if (isSeparable) {
    steps = solveSeparableEquation(equation);
    generalSolution = 'y = C₁e^x'; // Simplified example
    solution = initialConditions 
      ? `y = ${initialConditions.y}e^(x-${initialConditions.x})`
      : generalSolution;
  } else {
    steps = solveLinearEquation(equation);
    generalSolution = 'y = Ce^(-∫P(x)dx) + e^(-∫P(x)dx)∫Q(x)e^(∫P(x)dx)dx';
    solution = initialConditions
      ? `Particular solution with y(${initialConditions.x}) = ${initialConditions.y}`
      : generalSolution;
  }

  return {
    solution,
    steps,
    type,
    order,
    isLinear,
    isSeparable,
    generalSolution,
    particularSolution: initialConditions ? solution : undefined
  };
}