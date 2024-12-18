import { RoundingResult, RoundingMethod } from './types';

function roundUp(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.ceil(num * multiplier) / multiplier;
}

function roundDown(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.floor(num * multiplier) / multiplier;
}

function roundNearest(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.round(num * multiplier) / multiplier;
}

function truncate(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  return Math.trunc(num * multiplier) / multiplier;
}

function roundBankers(num: number, decimals: number = 0): number {
  const multiplier = Math.pow(10, decimals);
  const scaled = num * multiplier;
  const rounded = Math.round(scaled);
  if (Math.abs(scaled - rounded) === 0.5) {
    return (rounded % 2 === 0 ? rounded : rounded - 1) / multiplier;
  }
  return rounded / multiplier;
}

function roundToMultiple(num: number, multiple: number): number {
  return Math.round(num / multiple) * multiple;
}

export function calculateRounding(
  number: number,
  method: RoundingMethod,
  decimals: number = 0,
  nearestValue?: number
): RoundingResult {
  const steps: string[] = [];
  let rounded: number;

  steps.push(`Starting with number: ${number}`);

  switch (method) {
    case 'up':
      rounded = roundUp(number, decimals);
      steps.push(`Rounding up to ${decimals} decimal places`);
      break;

    case 'down':
      rounded = roundDown(number, decimals);
      steps.push(`Rounding down to ${decimals} decimal places`);
      break;

    case 'nearest':
      rounded = roundNearest(number, decimals);
      steps.push(`Rounding to nearest number with ${decimals} decimal places`);
      break;

    case 'truncate':
      rounded = truncate(number, decimals);
      steps.push(`Truncating to ${decimals} decimal places`);
      break;

    case 'bankers':
      rounded = roundBankers(number, decimals);
      steps.push(`Using banker's rounding (round to nearest even) with ${decimals} decimal places`);
      break;

    case 'nearest-multiple':
      if (!nearestValue) throw new Error('Nearest value must be provided for nearest-multiple rounding');
      rounded = roundToMultiple(number, nearestValue);
      steps.push(`Rounding to nearest multiple of ${nearestValue}`);
      break;

    default:
      throw new Error('Invalid rounding method');
  }

  steps.push(`Final result: ${rounded}`);

  return {
    original: number,
    rounded,
    method,
    steps,
    nearestValue
  };
}