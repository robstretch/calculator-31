export interface PoolSaltResult {
  saltNeeded: number;
  currentLevel: number;
  targetLevel: number;
  maintenanceAmount: number;
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  estimatedCost: {
    initial: number;
    annual: number;
  };
}

const SALT_PRICE_PER_POUND = 0.15; // Average price per pound
const TARGET_SALT_LEVEL = 3200; // Ideal salt level in ppm
const SALT_DENSITY = 0.0375; // Pounds of salt per gallon to raise ppm by 1000

export function calculatePoolSalt(
  gallons: number,
  currentPPM: number = 0,
  targetPPM: number = TARGET_SALT_LEVEL
): PoolSaltResult {
  // Calculate pounds of salt needed
  const ppmIncrease = targetPPM - currentPPM;
  const saltNeeded = Math.max(0, (ppmIncrease / 1000) * gallons * SALT_DENSITY);
  
  // Calculate annual maintenance amount (accounting for water loss/backwash)
  const maintenanceAmount = gallons * 0.002; // Approximately 0.2% per month

  // Calculate costs
  const initialCost = saltNeeded * SALT_PRICE_PER_POUND;
  const annualCost = maintenanceAmount * SALT_PRICE_PER_POUND * 12;

  // Generate recommendations based on current levels
  const recommendations = [
    {
      category: 'Initial Setup',
      suggestion: currentPPM === 0 
        ? 'Add salt in stages over 24 hours, running pump continuously'
        : 'Add required salt and run pump for 24 hours to distribute'
    },
    {
      category: 'Maintenance',
      suggestion: 'Check salt levels monthly and after heavy rain'
    },
    {
      category: 'Cell Maintenance',
      suggestion: 'Inspect and clean salt cell every 3 months'
    },
    {
      category: 'Water Balance',
      suggestion: 'Maintain pH between 7.2-7.6 for optimal salt cell performance'
    }
  ];

  return {
    saltNeeded: Math.round(saltNeeded),
    currentLevel: currentPPM,
    targetLevel: targetPPM,
    maintenanceAmount: Math.round(maintenanceAmount),
    recommendations,
    estimatedCost: {
      initial: Math.round(initialCost),
      annual: Math.round(annualCost)
    }
  };
}