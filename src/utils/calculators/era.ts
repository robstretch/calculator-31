export interface ERAResult {
  era: number;
  whip: number;
  k9: number;
  stats: {
    inningsPitched: number;
    earnedRuns: number;
    hits: number;
    walks: number;
    strikeouts: number;
  };
  rating: string;
  comparison: {
    mlbAverage: number;
    difference: number;
    percentile: number;
  };
}

function getRating(era: number): string {
  if (era < 2.00) return 'Elite';
  if (era < 3.00) return 'Excellent';
  if (era < 4.00) return 'Above Average';
  if (era < 5.00) return 'Average';
  return 'Below Average';
}

export function calculateERA(
  earnedRuns: number,
  inningsPitched: number,
  hits: number = 0,
  walks: number = 0,
  strikeouts: number = 0
): ERAResult {
  // Calculate ERA: (earned runs ÷ innings pitched) × 9
  const era = Math.round((earnedRuns / inningsPitched) * 9 * 100) / 100;
  
  // Calculate WHIP (Walks + Hits per Inning Pitched)
  const whip = Math.round(((hits + walks) / inningsPitched) * 100) / 100;
  
  // Calculate K/9 (Strikeouts per 9 innings)
  const k9 = Math.round((strikeouts / inningsPitched) * 9 * 100) / 100;

  // MLB average ERA is typically around 4.00
  const mlbAverage = 4.00;
  const difference = Math.round((mlbAverage - era) * 100) / 100;
  
  // Calculate rough percentile (lower ERA is better)
  const percentile = Math.max(0, Math.min(100, Math.round((5 - era) / 5 * 100)));

  return {
    era,
    whip,
    k9,
    stats: {
      inningsPitched,
      earnedRuns,
      hits,
      walks,
      strikeouts
    },
    rating: getRating(era),
    comparison: {
      mlbAverage,
      difference,
      percentile
    }
  };
}