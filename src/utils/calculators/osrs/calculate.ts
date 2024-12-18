import { OsrsSkill, OsrsAction, OsrsResult } from './types';

// XP formula: Math.floor(level + 300 * Math.pow(2, level / 7))
function getLevelXp(level: number): number {
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(i + 300 * Math.pow(2, i / 7));
  }
  return Math.floor(xp / 4);
}

function getLevel(xp: number): number {
  let level = 1;
  let levelXp = 0;
  while (levelXp < xp && level < 99) {
    levelXp = getLevelXp(level + 1);
    if (levelXp <= xp) level++;
  }
  return level;
}

export function calculateOsrs(skill: OsrsSkill, action: OsrsAction): OsrsResult {
  // Calculate XP needed
  const targetXp = skill.targetXp || getLevelXp(skill.targetLevel);
  const xpNeeded = Math.max(0, targetXp - skill.currentXp);
  
  // Calculate actions needed
  const actionsNeeded = Math.ceil(xpNeeded / action.xpPerAction);
  
  // Calculate time estimate (assuming 2500 actions per hour base rate)
  const actionsPerHour = 2500;
  const hours = Math.floor(actionsNeeded / actionsPerHour);
  const minutes = Math.round((actionsNeeded % actionsPerHour) / (actionsPerHour / 60));

  // Calculate level milestones
  const levelMilestones = [];
  for (let level = skill.currentLevel + 1; level <= skill.targetLevel; level++) {
    const levelXp = getLevelXp(level);
    const xpToLevel = Math.max(0, levelXp - skill.currentXp);
    levelMilestones.push({
      level,
      xpRequired: xpToLevel,
      actionsRemaining: Math.ceil(xpToLevel / action.xpPerAction)
    });
  }

  // Calculate efficiency metrics
  const xpPerHour = action.xpPerAction * actionsPerHour;
  const costPerXp = action.cost ? action.cost / action.xpPerAction : undefined;
  const totalCost = action.cost ? action.cost * actionsNeeded : undefined;

  // Generate recommendations
  const recommendations = [
    {
      category: 'Training Method',
      suggestion: action.levelRequired > skill.currentLevel ?
        'Choose a training method suitable for your current level' :
        'Method is appropriate for your level'
    },
    {
      category: 'Efficiency',
      suggestion: costPerXp && costPerXp > 10 ?
        'Consider cheaper alternatives for training' :
        'Good balance of XP and cost'
    },
    {
      category: 'Time Management',
      suggestion: hours > 10 ?
        'Break training into smaller sessions' :
        'Goal is achievable in a reasonable time'
    },
    {
      category: 'Requirements',
      suggestion: action.itemsRequired?.length ?
        'Ensure you have all required items before starting' :
        'No special items required'
    }
  ];

  return {
    xpNeeded,
    actionsNeeded,
    estimatedCost: totalCost,
    timeEstimate: { hours, minutes },
    levelMilestones,
    recommendations,
    efficiency: {
      xpPerHour,
      costPerXp,
      profitLoss: totalCost ? -totalCost : undefined
    }
  };
}