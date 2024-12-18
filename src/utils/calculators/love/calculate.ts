import { LoveInput, LoveResult } from './types';

function calculateLifePathNumber(birthdate: string): number {
  const numbers = birthdate.split('-').join('').split('').map(Number);
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum > 9 ? Math.floor(sum / 10) + (sum % 10) : sum;
}

function getZodiacCompatibility(sign1: string, sign2: string): number {
  const compatibilityMatrix: { [key: string]: { [key: string]: number } } = {
    aries: { leo: 95, sagittarius: 90, gemini: 85, aquarius: 80 },
    taurus: { virgo: 95, capricorn: 90, cancer: 85, pisces: 80 },
    gemini: { libra: 95, aquarius: 90, leo: 85, aries: 80 },
    cancer: { scorpio: 95, pisces: 90, virgo: 85, taurus: 80 },
    leo: { aries: 95, sagittarius: 90, libra: 85, gemini: 80 },
    virgo: { taurus: 95, capricorn: 90, cancer: 85, scorpio: 80 },
    libra: { gemini: 95, aquarius: 90, leo: 85, sagittarius: 80 },
    scorpio: { cancer: 95, pisces: 90, virgo: 85, capricorn: 80 },
    sagittarius: { aries: 95, leo: 90, libra: 85, aquarius: 80 },
    capricorn: { taurus: 95, virgo: 90, scorpio: 85, pisces: 80 },
    aquarius: { gemini: 95, libra: 90, aries: 85, sagittarius: 80 },
    pisces: { cancer: 95, scorpio: 90, taurus: 85, capricorn: 80 }
  };

  const sign1Lower = sign1.toLowerCase();
  const sign2Lower = sign2.toLowerCase();

  if (sign1Lower === sign2Lower) return 85;
  return compatibilityMatrix[sign1Lower]?.[sign2Lower] || 60;
}

function getLifePathCompatibility(num1: number, num2: number): string {
  if (num1 === num2) return 'Perfect harmony in life goals and values';
  if (Math.abs(num1 - num2) === 1) return 'Complementary life paths with growth potential';
  if ([3, 6, 9].includes(num1) && [3, 6, 9].includes(num2)) return 'Strong creative and expressive connection';
  if ([2, 4, 8].includes(num1) && [2, 4, 8].includes(num2)) return 'Practical and stable partnership';
  return 'Unique combination offering opportunities for growth';
}

export function calculateLove(input: LoveInput): LoveResult {
  // Calculate base compatibility scores
  const nameCompatibility = Math.random() * 20 + 60; // Simplified for example
  const zodiacCompatibility = input.zodiacSign1 && input.zodiacSign2 
    ? getZodiacCompatibility(input.zodiacSign1, input.zodiacSign2)
    : 75;

  // Calculate life path numbers
  const lifePathNumber1 = calculateLifePathNumber(input.birthdate1);
  const lifePathNumber2 = calculateLifePathNumber(input.birthdate2);
  const numerologyCompatibility = Math.abs(lifePathNumber1 - lifePathNumber2) < 3 ? 90 : 70;

  // Calculate category scores
  const categories = {
    emotional: Math.round((zodiacCompatibility * 0.6 + nameCompatibility * 0.4) * 100) / 100,
    intellectual: Math.round((numerologyCompatibility * 0.5 + nameCompatibility * 0.5) * 100) / 100,
    physical: Math.round((zodiacCompatibility * 0.7 + numerologyCompatibility * 0.3) * 100) / 100,
    spiritual: Math.round((numerologyCompatibility * 0.6 + zodiacCompatibility * 0.4) * 100) / 100
  };

  // Calculate overall compatibility score
  const compatibilityScore = Math.round(
    (categories.emotional + categories.intellectual + categories.physical + categories.spiritual) / 4
  );

  const analysis = [
    {
      category: 'Emotional Connection',
      score: categories.emotional,
      description: categories.emotional > 80 
        ? 'Strong emotional bond with natural understanding'
        : 'Potential for emotional growth through communication'
    },
    {
      category: 'Intellectual Compatibility',
      score: categories.intellectual,
      description: categories.intellectual > 80
        ? 'Great mental connection and shared interests'
        : 'Opportunity to learn from different perspectives'
    },
    {
      category: 'Physical Chemistry',
      score: categories.physical,
      description: categories.physical > 80
        ? 'Strong physical attraction and natural chemistry'
        : 'Physical connection can grow with time and trust'
    },
    {
      category: 'Spiritual Alignment',
      score: categories.spiritual,
      description: categories.spiritual > 80
        ? 'Deep spiritual connection and shared values'
        : 'Potential for spiritual growth together'
    }
  ];

  const recommendations = [
    {
      category: 'Communication',
      suggestion: categories.emotional < 80
        ? 'Focus on open and honest communication to build emotional connection'
        : 'Maintain strong communication to preserve emotional bond'
    },
    {
      category: 'Activities',
      suggestion: categories.intellectual < 80
        ? 'Engage in shared learning experiences and intellectual discussions'
        : 'Continue exploring new interests together'
    },
    {
      category: 'Connection',
      suggestion: categories.physical < 80
        ? 'Spend quality time together to build physical comfort'
        : 'Maintain physical connection through shared activities'
    },
    {
      category: 'Growth',
      suggestion: categories.spiritual < 80
        ? 'Explore spiritual or philosophical topics together'
        : 'Continue supporting each other\'s personal growth'
    }
  ];

  return {
    compatibilityScore,
    categories,
    analysis,
    recommendations,
    numerology: {
      lifePathNumber1,
      lifePathNumber2,
      compatibility: getLifePathCompatibility(lifePathNumber1, lifePathNumber2)
    }
  };
}