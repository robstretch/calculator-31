import { Element, AtomicMassResult } from './types';

const ATOMIC_MASSES = {
  H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.811, C: 12.011,
  N: 14.007, O: 15.999, F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305,
  Al: 26.982, Si: 28.086, P: 30.974, S: 32.065, Cl: 35.453, Ar: 39.948,
  K: 39.098, Ca: 40.078, Fe: 55.845, Cu: 63.546, Zn: 65.380, Ag: 107.868,
  Au: 196.967
};

export function calculateAtomicMass(elements: Element[]): AtomicMassResult {
  // Calculate total mass
  const totalMass = elements.reduce((sum, element) => 
    sum + element.mass * element.count, 0);

  // Calculate composition percentages
  const composition = elements.map(element => ({
    element: element.symbol,
    mass: element.mass * element.count,
    percentage: (element.mass * element.count / totalMass) * 100
  }));

  // Calculate molar mass (g/mol)
  const molarMass = totalMass;

  // Generate empirical formula
  const gcd = elements.reduce((a, b) => {
    const count = b.count;
    return count ? gcd(count, a % count) : a;
  }, elements[0].count);

  const empiricalFormula = elements
    .map(element => element.symbol + (element.count / gcd > 1 ? element.count / gcd : ''))
    .join('');

  // Generate calculation steps
  const calculations = [
    {
      step: 'Total Mass',
      formula: 'Σ(atomic mass × count)',
      result: totalMass
    },
    {
      step: 'Molar Mass',
      formula: 'Total mass in g/mol',
      result: molarMass
    },
    {
      step: 'GCD of Counts',
      formula: 'Greatest Common Divisor',
      result: gcd
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Precision',
      suggestion: 'Use atomic masses to 4 decimal places for accurate calculations'
    },
    {
      category: 'Verification',
      suggestion: 'Cross-reference with periodic table values'
    },
    {
      category: 'Applications',
      suggestion: 'Use molar mass for stoichiometric calculations'
    },
    {
      category: 'Empirical Formula',
      suggestion: 'Verify empirical formula matches experimental data'
    }
  ];

  return {
    totalMass,
    composition,
    molarMass,
    empiricalFormula,
    calculations,
    recommendations
  };
}