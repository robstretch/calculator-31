import { FenceSection, FenceResult } from './types';

const MATERIAL_PRICES = {
  post: 15,        // Price per post
  rail: 8,         // Price per rail
  picket: 3,       // Price per picket
  gate: 75,        // Price per gate
  concrete: 5,     // Price per bag
  hardware: 2      // Price per picket for screws/nails
};

export function calculateFence(sections: FenceSection[]): FenceResult {
  let totalLength = 0;
  let gateCount = 0;

  // Calculate total length and count gates
  sections.forEach(section => {
    totalLength += section.length;
    if (section.gateWidth) {
      gateCount++;
      totalLength -= section.gateWidth;
    }
  });

  // Calculate materials needed
  const postSpacing = 8; // feet between posts
  const railsPerSection = 2; // top and bottom rails
  const picketSpacing = 0.167; // 2 inches between pickets

  const postCount = Math.ceil(totalLength / postSpacing) + 1;
  const railCount = Math.ceil(totalLength / 16) * railsPerSection;
  const picketCount = Math.ceil(totalLength / picketSpacing);

  // Calculate materials list
  const materials = [
    {
      type: '4x4 Posts',
      amount: postCount,
      unit: 'pieces'
    },
    {
      type: '2x4 Rails',
      amount: railCount,
      unit: 'pieces'
    },
    {
      type: 'Fence Pickets',
      amount: picketCount,
      unit: 'pieces'
    },
    {
      type: 'Concrete Mix',
      amount: postCount,
      unit: 'bags'
    },
    {
      type: 'Gate Hardware',
      amount: gateCount,
      unit: 'sets'
    }
  ];

  // Calculate costs
  const materialsCost = 
    (postCount * MATERIAL_PRICES.post) +
    (railCount * MATERIAL_PRICES.rail) +
    (picketCount * MATERIAL_PRICES.picket) +
    (gateCount * MATERIAL_PRICES.gate) +
    (postCount * MATERIAL_PRICES.concrete);
  
  const hardwareCost = picketCount * MATERIAL_PRICES.hardware;

  // Generate recommendations
  const recommendations = [
    {
      category: 'Installation',
      suggestion: 'Set posts at least 2 feet deep and use concrete for stability'
    },
    {
      category: 'Materials',
      suggestion: 'Use pressure-treated lumber for ground contact posts'
    },
    {
      category: 'Maintenance',
      suggestion: 'Apply water sealant after installation and reapply every 2-3 years'
    },
    {
      category: 'Planning',
      suggestion: 'Check local building codes and property lines before installation'
    }
  ];

  return {
    totalLength,
    postCount,
    railCount,
    picketCount,
    gateCount,
    materials,
    estimatedCost: {
      materials: Math.round(materialsCost),
      hardware: Math.round(hardwareCost),
      total: Math.round(materialsCost + hardwareCost)
    },
    recommendations
  };
}