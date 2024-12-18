import { GravelArea, GravelResult } from './types';

const CUBIC_FEET_PER_YARD = 27;
const TONS_PER_CUBIC_YARD = 1.4; // Average for gravel
const GRAVEL_PRICE_PER_TON = 30;
const DELIVERY_BASE_PRICE = 100;
const DELIVERY_PER_TON = 5;

export function calculateGravel(areas: GravelArea[]): GravelResult {
  let totalCubicFeet = 0;

  // Calculate total cubic feet needed
  areas.forEach(area => {
    let squareFeet: number;
    
    if (area.shape === 'rectangular') {
      squareFeet = area.length * area.width;
    } else {
      // Circular area
      const radius = area.length / 2; // Length is diameter
      squareFeet = Math.PI * radius * radius;
    }

    // Convert depth from inches to feet
    const depthInFeet = area.depth / 12;
    totalCubicFeet += squareFeet * depthInFeet;
  });

  const cubicYards = totalCubicFeet / CUBIC_FEET_PER_YARD;
  const tons = cubicYards * TONS_PER_CUBIC_YARD;
  const coverage = totalCubicFeet * 12; // Coverage in square feet at 1 inch depth

  // Calculate costs
  const gravelCost = tons * GRAVEL_PRICE_PER_TON;
  const deliveryCost = DELIVERY_BASE_PRICE + (tons * DELIVERY_PER_TON);

  // Generate recommendations
  const recommendations = [
    {
      category: 'Gravel Type',
      suggestion: tons > 10 ? 'Consider #57 stone for better drainage' : 'Pea gravel recommended for small areas'
    },
    {
      category: 'Installation',
      suggestion: 'Install landscape fabric underneath to prevent weed growth'
    },
    {
      category: 'Maintenance',
      suggestion: 'Plan to add 10-15% more gravel every 2-3 years for settling'
    },
    {
      category: 'Drainage',
      suggestion: 'Ensure proper slope away from buildings (1" per 10 feet)'
    }
  ];

  return {
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicFeet: Math.round(totalCubicFeet * 100) / 100,
    tons: Math.round(tons * 100) / 100,
    coverage: Math.round(coverage),
    estimatedCost: {
      gravel: Math.round(gravelCost),
      delivery: Math.round(deliveryCost),
      total: Math.round(gravelCost + deliveryCost)
    },
    recommendations
  };
}