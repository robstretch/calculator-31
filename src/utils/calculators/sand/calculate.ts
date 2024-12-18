import { SandArea, SandResult } from './types';

const CUBIC_FEET_PER_YARD = 27;
const POUNDS_PER_CUBIC_FOOT = 100; // Average for sand
const POUNDS_PER_BAG = 50; // Standard bag size
const PRICE_PER_TON_BULK = 30;
const PRICE_PER_BAG = 5;
const DELIVERY_BASE = 75;
const DELIVERY_PER_TON = 5;

export function calculateSand(areas: SandArea[]): SandResult {
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
  const tons = (totalCubicFeet * POUNDS_PER_CUBIC_FOOT) / 2000; // Convert to tons
  const bagsNeeded = Math.ceil((totalCubicFeet * POUNDS_PER_CUBIC_FOOT) / POUNDS_PER_BAG);
  const coverage = totalCubicFeet * 12; // Coverage in square feet at 1 inch depth

  // Calculate costs
  const bulkCost = tons * PRICE_PER_TON_BULK;
  const baggedCost = bagsNeeded * PRICE_PER_BAG;
  const deliveryCost = DELIVERY_BASE + (tons * DELIVERY_PER_TON);

  // Generate recommendations
  const recommendations = [
    {
      category: 'Sand Type',
      suggestion: coverage > 500 
        ? 'Consider masonry sand for large areas'
        : 'Play sand recommended for small projects'
    },
    {
      category: 'Installation',
      suggestion: 'Compact sand in 2-inch layers for best results'
    },
    {
      category: 'Delivery',
      suggestion: tons > 1 
        ? 'Bulk delivery recommended for cost savings'
        : 'Bagged sand may be more practical for small projects'
    },
    {
      category: 'Site Prep',
      suggestion: 'Ensure proper drainage and use landscape fabric underneath'
    }
  ];

  return {
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicFeet: Math.round(totalCubicFeet * 100) / 100,
    tons: Math.round(tons * 100) / 100,
    coverage: Math.round(coverage),
    bagsNeeded,
    estimatedCost: {
      bulk: Math.round(bulkCost),
      bagged: Math.round(baggedCost),
      delivery: Math.round(deliveryCost),
      total: Math.round(Math.min(bulkCost + deliveryCost, baggedCost))
    },
    recommendations
  };
}