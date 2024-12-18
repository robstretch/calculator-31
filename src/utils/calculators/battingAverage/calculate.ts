import { BattingStats, BattingAverageResult } from './types';

function getRating(average: number): string {
  if (average >= 0.300) return 'Excellent';
  if (average >= 0.275) return 'Above Average';
  if (average >= 0.250) return 'Average';
  if (average >= 0.225) return 'Below Average';
  return 'Poor';
}

export function calculateBattingAverage(stats: BattingStats): BattingAverageResult {
  const battingAverage = stats.atBats > 0 ? stats.hits / stats.atBats : 0;
  
  // Project to full season (assuming 550 at-bats for a full season)
  const fullSeasonAtBats = 550;
  const projectedHits = Math.round(battingAverage * fullSeasonAtBats);

  const rating = getRating(battingAverage);

  const ranking = [
    {
      category: 'Current Average',
      rating,
      description: `${(battingAverage * 1000).toFixed(0)} is considered ${rating.toLowerCase()}`
    },
    {
      category: 'Hit Rate',
      rating: stats.hits > stats.atBats / 3 ? 'Good' : 'Needs Improvement',
      description: `${stats.hits} hits in ${stats.atBats} at-bats`
    },
    {
      category: 'Sample Size',
      rating: stats.atBats > 100 ? 'Reliable' : 'Small Sample',
      description: stats.atBats > 100 ? 'Sufficient at-bats for analysis' : 'More at-bats needed for accuracy'
    }
  ];

  const recommendations = [
    {
      category: 'Performance',
      suggestion: battingAverage < 0.250 ?
        'Focus on plate discipline and contact rate' :
        'Maintain current approach at the plate'
    },
    {
      category: 'Sample Size',
      suggestion: stats.atBats < 100 ?
        'Continue accumulating at-bats for more reliable statistics' :
        'Statistics are now statistically significant'
    },
    {
      category: 'Projection',
      suggestion: `On pace for ${projectedHits} hits in a full season`
    },
    {
      category: 'Development',
      suggestion: battingAverage < 0.300 ?
        'Work on hitting mechanics and pitch selection' :
        'Focus on maintaining consistent performance'
    }
  ];

  return {
    battingAverage,
    projectedStats: {
      hits: projectedHits,
      atBats: fullSeasonAtBats,
      average: battingAverage
    },
    ranking,
    recommendations
  };
}