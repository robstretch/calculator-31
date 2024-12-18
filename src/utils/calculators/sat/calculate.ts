import { SATScores, SATResult } from './types';

// Conversion tables (simplified for example)
const READING_CONVERSION = {
  52: 800, 51: 780, 50: 760, 49: 740, 48: 720,
  47: 700, 46: 680, 45: 670, 44: 660, 43: 650,
  42: 640, 41: 630, 40: 620, 39: 610, 38: 600
};

const MATH_CONVERSION = {
  58: 800, 57: 780, 56: 760, 55: 740, 54: 720,
  53: 700, 52: 680, 51: 670, 50: 660, 49: 650,
  48: 640, 47: 630, 46: 620, 45: 610, 44: 600
};

const WRITING_CONVERSION = {
  44: 400, 43: 390, 42: 380, 41: 370, 40: 360,
  39: 350, 38: 340, 37: 330, 36: 320, 35: 310
};

function convertRawScore(raw: number, conversionTable: { [key: number]: number }): number {
  const scores = Object.entries(conversionTable).map(([raw, scaled]) => ({
    raw: parseInt(raw),
    scaled
  }));
  
  const match = scores.find(score => raw >= score.raw);
  return match ? match.scaled : Math.max(200, raw * 10);
}

function calculatePercentile(score: number, mean: number, stdDev: number): number {
  const zScore = (score - mean) / stdDev;
  const percentile = (1 - 0.5 * (1 + Math.erf(-zScore / Math.sqrt(2)))) * 100;
  return Math.round(percentile);
}

export function calculateSAT(scores: SATScores): SATResult {
  // Convert raw scores to scaled scores
  const readingScore = convertRawScore(scores.readingRaw, READING_CONVERSION);
  const mathScore = convertRawScore(scores.mathRaw, MATH_CONVERSION);
  const writingScore = convertRawScore(scores.writingRaw, WRITING_CONVERSION);

  // Calculate Evidence-Based Reading and Writing score
  const evidenceBasedReading = Math.round((readingScore + writingScore) / 2);

  // Calculate total score
  const totalScore = evidenceBasedReading + mathScore;

  // Calculate percentiles (using approximate normal distribution)
  const percentiles = {
    total: calculatePercentile(totalScore, 1060, 195),
    reading: calculatePercentile(readingScore, 530, 100),
    math: calculatePercentile(mathScore, 530, 100)
  };

  // Generate college readiness benchmarks
  const collegeReadiness = [
    {
      benchmark: 'Evidence-Based Reading and Writing',
      status: evidenceBasedReading >= 480 ? 'Met' : 'Not Met',
      recommendation: evidenceBasedReading >= 480 ?
        'Continue strengthening reading and writing skills' :
        'Focus on reading comprehension and writing practice'
    },
    {
      benchmark: 'Math',
      status: mathScore >= 530 ? 'Met' : 'Not Met',
      recommendation: mathScore >= 530 ?
        'Continue developing advanced math skills' :
        'Review core math concepts and practice problem-solving'
    },
    {
      benchmark: 'Overall College Readiness',
      status: totalScore >= 1010 ? 'Met' : 'Not Met',
      recommendation: totalScore >= 1010 ?
        'Well-prepared for college-level work' :
        'Consider additional preparation and support resources'
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Study Strategy',
      suggestion: totalScore < 1200 ?
        'Focus on practice tests and identifying weak areas' :
        'Maintain strong study habits and target specific improvements'
    },
    {
      category: 'Test Timing',
      suggestion: 'Practice with timed sections to improve speed and accuracy'
    },
    {
      category: 'Subject Focus',
      suggestion: mathScore < evidenceBasedReading ?
        'Prioritize math practice and problem-solving strategies' :
        'Continue balanced preparation across all sections'
    },
    {
      category: 'Resources',
      suggestion: totalScore < 1100 ?
        'Consider SAT prep courses or tutoring' :
        'Use targeted practice materials for specific areas'
    }
  ];

  return {
    totalScore,
    sectionScores: {
      reading: readingScore,
      math: mathScore,
      writing: writingScore
    },
    compositeScores: {
      evidenceBasedReading,
      math: mathScore
    },
    percentiles,
    recommendations,
    collegeReadiness
  };
}