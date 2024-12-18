export interface BAHResult {
  monthlyAllowance: number;
  annualAllowance: number;
  housingType: string;
  utilities: number;
  rentCap: number;
  costOfLivingAdjustment: number;
}

export interface Location {
  name: string;
  zip: string;
  costIndex: number;
}

// Base rates for 2024 (example data - in production, this would come from an API)
const baseRates: { [key: string]: { with: number; without: number } } = {
  'E-1': { with: 1230, without: 923 },
  'E-2': { with: 1230, without: 923 },
  'E-3': { with: 1230, without: 923 },
  'E-4': { with: 1383, without: 1037 },
  'E-5': { with: 1494, without: 1121 },
  'E-6': { with: 1665, without: 1249 },
  'E-7': { with: 1779, without: 1334 },
  'E-8': { with: 1887, without: 1415 },
  'E-9': { with: 1998, without: 1499 },
  'W-1': { with: 1665, without: 1249 },
  'W-2': { with: 1887, without: 1415 },
  'W-3': { with: 1998, without: 1499 },
  'W-4': { with: 2109, without: 1582 },
  'W-5': { with: 2220, without: 1665 },
  'O-1E': { with: 1779, without: 1334 },
  'O-2E': { with: 1887, without: 1415 },
  'O-3E': { with: 1998, without: 1499 },
  'O-1': { with: 1494, without: 1121 },
  'O-2': { with: 1665, without: 1249 },
  'O-3': { with: 1887, without: 1415 },
  'O-4': { with: 2109, without: 1582 },
  'O-5': { with: 2220, without: 1665 },
  'O-6': { with: 2331, without: 1748 },
  'O-7': { with: 2442, without: 1832 }
};

export function calculateBAH(
  rank: string,
  hasDependents: boolean,
  location: Location
): BAHResult {
  // Get base rate for rank and dependency status
  const baseRate = baseRates[rank][hasDependents ? 'with' : 'without'];
  
  // Apply location cost adjustment
  const costAdjustment = location.costIndex / 100;
  const monthlyAllowance = Math.round(baseRate * costAdjustment);
  
  // Calculate utilities (estimated as 15% of monthly allowance)
  const utilities = Math.round(monthlyAllowance * 0.15);
  
  // Calculate rent cap (monthly allowance minus utilities)
  const rentCap = monthlyAllowance - utilities;

  return {
    monthlyAllowance,
    annualAllowance: monthlyAllowance * 12,
    housingType: monthlyAllowance > 2000 ? 'Single Family Home' : 'Apartment/Townhouse',
    utilities,
    rentCap,
    costOfLivingAdjustment: Math.round((costAdjustment - 1) * 100)
  };
}

// Example locations (in production, this would be a complete database)
export const locations: Location[] = [
  { name: 'Washington, DC', zip: '20001', costIndex: 185 },
  { name: 'San Diego, CA', zip: '92101', costIndex: 175 },
  { name: 'Norfolk, VA', zip: '23501', costIndex: 125 },
  { name: 'Fort Hood, TX', zip: '76544', costIndex: 95 },
  { name: 'Fort Bragg, NC', zip: '28307', costIndex: 105 },
  { name: 'Joint Base Lewis-McChord, WA', zip: '98433', costIndex: 145 },
  { name: 'Pearl Harbor, HI', zip: '96860', costIndex: 195 },
  { name: 'Camp Pendleton, CA', zip: '92055', costIndex: 165 },
  { name: 'Fort Campbell, KY', zip: '42223', costIndex: 100 },
  { name: 'Fort Benning, GA', zip: '31905', costIndex: 98 }
];