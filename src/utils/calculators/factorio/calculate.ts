import { FactorioInput, FactorioResult } from './types';

const MACHINE_BASE_SPEED = {
  assembler: 0.75,
  furnace: 2,
  'chemical-plant': 1,
  refinery: 1
};

const MODULE_EFFECTS = {
  speed: {
    bonus: 0.2,
    energyPenalty: 0.5
  },
  productivity: {
    bonus: 0.04,
    speedPenalty: 0.15,
    energyPenalty: 0.8
  }
};

function calculateModuleEffects(speedModules: number = 0, productivityModules: number = 0) {
  const speedBonus = speedModules * MODULE_EFFECTS.speed.bonus;
  const productivityBonus = productivityModules * MODULE_EFFECTS.productivity.bonus;
  const speedPenalty = productivityModules * MODULE_EFFECTS.productivity.speedPenalty;
  const energyPenalty = (speedModules * MODULE_EFFECTS.speed.energyPenalty) +
                       (productivityModules * MODULE_EFFECTS.productivity.energyPenalty);

  return {
    totalSpeedMultiplier: 1 + speedBonus - speedPenalty,
    productivityMultiplier: 1 + productivityBonus,
    energyMultiplier: 1 + energyPenalty
  };
}

export function calculateFactorio(input: FactorioInput): FactorioResult {
  // Calculate base machine speed
  const baseSpeed = MACHINE_BASE_SPEED[input.recipe.machineType] * input.machineSpeed;

  // Calculate module effects
  const moduleEffects = calculateModuleEffects(
    input.speedModules,
    input.productivityModules
  );

  // Calculate crafts per second
  const craftsPerSecond = baseSpeed * moduleEffects.totalSpeedMultiplier / input.recipe.craftingTime;

  // Calculate machines needed
  const outputPerMachine = craftsPerSecond * input.recipe.output * moduleEffects.productivityMultiplier;
  const machinesNeeded = Math.ceil(input.targetOutput / outputPerMachine);

  // Calculate actual output
  const actualOutput = outputPerMachine * machinesNeeded;

  // Calculate ingredient requirements
  const ingredients = input.recipe.ingredients.map(ingredient => ({
    item: ingredient.item,
    amountPerSecond: (ingredient.amount * craftsPerSecond * machinesNeeded),
    amountPerMinute: (ingredient.amount * craftsPerSecond * machinesNeeded * 60)
  }));

  // Calculate efficiency metrics
  const efficiency = {
    machineEfficiency: (input.targetOutput / actualOutput) * 100,
    powerConsumption: machinesNeeded * moduleEffects.energyMultiplier * 100, // Base power units
    pollution: machinesNeeded * moduleEffects.energyMultiplier * 2 // Base pollution units
  };

  // Generate module recommendations
  const recommendedModules = [];
  if (input.recipe.craftingTime > 1) {
    recommendedModules.push('Speed Module');
  }
  if (input.recipe.ingredients.length > 2) {
    recommendedModules.push('Productivity Module');
  }

  // Generate recommendations
  const recommendations = [
    {
      category: 'Machine Count',
      suggestion: machinesNeeded > 10 ?
        'Consider beacon setup to reduce machine count' :
        'Direct machine setup is appropriate'
    },
    {
      category: 'Module Choice',
      suggestion: input.recipe.craftingTime > 1 ?
        'Use speed modules to improve throughput' :
        'Productivity modules recommended for resource efficiency'
    },
    {
      category: 'Power Usage',
      suggestion: moduleEffects.energyMultiplier > 2 ?
        'Consider solar power or nuclear power for high energy demand' :
        'Standard power setup should be sufficient'
    },
    {
      category: 'Layout',
      suggestion: machinesNeeded > 5 ?
        'Use parallel machine setup with shared input/output belts' :
        'Simple inline setup recommended'
    }
  ];

  return {
    machinesNeeded,
    actualOutput,
    ingredients,
    efficiency,
    modules: {
      recommended: recommendedModules,
      impact: {
        speed: moduleEffects.totalSpeedMultiplier,
        productivity: moduleEffects.productivityMultiplier,
        energy: moduleEffects.energyMultiplier
      }
    },
    recommendations
  };
}