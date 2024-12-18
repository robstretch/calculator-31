import { categories } from './categories';

export function getCalculatorCount(): number {
  return categories.reduce((total, category) => total + category.calculators.length, 0);
}