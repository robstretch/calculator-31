import { TreeDetails, TreeRemovalResult } from './types';

const BASE_COST_PER_FOOT = 25;
const DIAMETER_MULTIPLIER = 15;

const LOCATION_MULTIPLIERS = {
  easy: 1,
  moderate: 1.5,
  difficult: 2
};

const CONDITION_MULTIPLIERS = {
  healthy: 1,
  diseased: 1.2,
  dead: 1.4
};

function calculateBaseCost(height: number, diameter: number): number {
  return (height * BASE_COST_PER_FOOT) + (diameter * DIAMETER_MULTIPLIER);
}

function calculateAdditionalCosts(tree: TreeDetails): {
  category: string;
  amount: number;
  reason: string;
}[] {
  const costs = [];

  if (tree.nearStructures) {
    costs.push({
      category: 'Protection',
      amount: 300,
      reason: 'Special equipment needed for structure protection'
    });
  }

  if (tree.powerLines) {
    costs.push({
      category: 'Safety',
      amount: 400,
      reason: 'Additional safety measures for power line proximity'
    });
  }

  if (tree.stumpRemoval) {
    costs.push({
      category: 'Stump Removal',
      amount: Math.max(150, tree.diameter * 20),
      reason: 'Stump grinding and removal'
    });
  }

  return costs;
}

function determineEquipment(tree: TreeDetails): {
  type: string;
  reason: string;
}[] {
  const equipment = [];

  if (tree.height > 30) {
    equipment.push({
      type: 'Crane',
      reason: 'Required for safe removal of tall tree sections'
    });
  }

  if (tree.location === 'difficult' || tree.nearStructures) {
    equipment.push({
      type: 'Specialized Rigging Equipment',
      reason: 'Needed for controlled lowering of branches'
    });
  }

  equipment.push({
    type: 'Chainsaws',
    reason: 'Primary cutting equipment'
  });

  if (tree.stumpRemoval) {
    equipment.push({
      type: 'Stump Grinder',
      reason: 'Required for stump removal'
    });
  }

  return equipment;
}

function checkPermitRequirements(tree: TreeDetails): {
  required: boolean;
  type: string;
  estimatedCost: number;
} {
  if (tree.height > 40 || tree.diameter > 24 || tree.nearStructures) {
    return {
      required: true,
      type: 'Tree Removal Permit',
      estimatedCost: 150
    };
  }

  return {
    required: false,
    type: 'None Required',
    estimatedCost: 0
  };
}

export function calculateTreeRemoval(tree: TreeDetails): TreeRemovalResult {
  // Calculate base cost
  const baseCost = calculateBaseCost(tree.height, tree.diameter);
  
  // Apply location and condition multipliers
  const adjustedBaseCost = baseCost * 
    LOCATION_MULTIPLIERS[tree.location] * 
    CONDITION_MULTIPLIERS[tree.condition];

  // Calculate additional costs
  const additionalCosts = calculateAdditionalCosts(tree);
  const totalAdditionalCosts = additionalCosts.reduce((sum, cost) => sum + cost.amount, 0);

  // Determine required equipment
  const equipment = determineEquipment(tree);

  // Check permit requirements
  const permits = [checkPermitRequirements(tree)];

  // Calculate total cost
  const totalCost = adjustedBaseCost + totalAdditionalCosts + 
    permits.reduce((sum, permit) => sum + permit.estimatedCost, 0);

  // Estimate time and crew requirements
  const timeEstimate = {
    hours: Math.ceil(tree.height / 10 + (tree.location === 'difficult' ? 4 : 2)),
    crew: tree.height > 30 ? 4 : 3
  };

  // Generate recommendations
  const recommendations = [
    {
      category: 'Timing',
      suggestion: 'Schedule removal during off-season for better rates'
    },
    {
      category: 'Preparation',
      suggestion: tree.nearStructures ?
        'Clear area around tree and protect nearby structures' :
        'Clear area around tree for equipment access'
    },
    {
      category: 'Safety',
      suggestion: tree.powerLines ?
        'Coordinate with utility company before removal' :
        'Ensure clear drop zones and escape routes'
    },
    {
      category: 'Cleanup',
      suggestion: 'Consider wood recycling or repurposing options'
    }
  ];

  return {
    baseCost: Math.round(adjustedBaseCost),
    additionalCosts,
    totalCost: Math.round(totalCost),
    timeEstimate,
    equipment,
    permits,
    recommendations
  };
}