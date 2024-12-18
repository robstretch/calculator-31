import { TopsoilArea, TopsoilResult } from './types';

const CUBIC_FEET_PER_YARD = 27;
const POUNDS_PER_CUBIC_FOOT = 75; // Average for topsoil
const PRICE_PER_CUBIC_YARD = 35;
const PRICE_PER_40LB_BAG = 4;
const DELIVERY_BASE = 75;
const DELIVERY_PER_YARD = 10;

export function calculateTopsoil(areas: TopsoilArea[]): TopsoilResult {
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

    // Adjust for slope if provided
    if (area.slopePercent) {
      squareFeet *= (1 + (area.slopePercent / 100));
    }

    // Convert depth from inches to feet
    const depthInFeet = area.depth / 12;
    totalCubicFeet += squareFeet * depthInFeet;
  });

  const cubicYards = totalCubicFeet / CUBIC_FEET_PER_YARD;
  const tons = (totalCubicFeet * POUNDS_PER_CUBIC_FOOT) / 2000;
  const bagsNeeded = Math.ceil((totalCubicFeet * POUNDS_PER_CUBIC_FOOT) / 40); // 40lb bags
  const coverage = totalCubicFeet * 12; // Coverage in square feet at 1 inch depth

  // Calculate costs
  const bulkCost = Math.round(cubicYards * PRICE_PER_CUBIC_YARD);
  const baggedCost = Math.round(bagsNeeded * PRICE_PER_40LB_BAG);
  const deliveryCost = Math.round(DELIVERY_BASE + (cubicYards * DELIVERY_PER_YARD));

  const soilTypes = [
    {
      type: 'Garden Mix',
      description: 'Rich in organic matter, ideal for gardens',
      bestFor: ['Vegetable gardens', 'Flower beds', 'Raised beds']
    },
    {
      type: 'Screened Topsoil',
      description: 'Clean, rock-free soil for general use',
      bestFor: ['Lawn establishment', 'Filling low spots', 'General landscaping']
    },
    {
      type: 'Premium Blend',
      description: 'Mix of topsoil and compost',
      bestFor: ['New plantings', 'Garden preparation', 'Soil amendment']
    }
  ];

  const recommendations = [
    {
      category: 'Soil Type',
      suggestion: coverage > 1000 
        ? 'Consider bulk delivery for large area'
        : 'Bagged soil may be more practical for small projects'
    },
    {
      category: 'Site Preparation',
      suggestion: 'Remove existing vegetation and debris before adding topsoil'
    },
    {
      category: 'Installation',
      suggestion: 'Spread soil in 2-3 inch layers and lightly compact between layers'
    },
    {
      category: 'Timing',
      suggestion: 'Best installed during dry weather for easier working conditions'
    }
  ];

  return {
    cubicYards: Math.round(cubicYards * 100) / 100,
    cubicFeet: Math.round(totalCubicFeet * 100) / 100,
    tons: Math.round(tons * 100) / 100,
    coverage: Math.round(coverage),
    estimatedCost: {
      bulk: bulkCost,
      bagged: baggedCost,
      delivery: deliveryCost,
      total: Math.min(bulkCost + deliveryCost, baggedCost)
    },
    recommendations,
    soilTypes
  };
}