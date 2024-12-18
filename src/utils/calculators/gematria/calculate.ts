import { hebrewGematria, englishGematria } from './constants';
import { GematriaResult } from './types';

function reduceToSingleDigit(num: number): number {
  if (num < 10) return num;
  return reduceToSingleDigit(
    num.toString()
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0)
  );
}

export function calculateGematria(
  text: string,
  type: 'hebrew' | 'english'
): GematriaResult {
  const gematriaMap = type === 'hebrew' ? hebrewGematria : englishGematria;
  const breakdown: { letter: string; value: number; }[] = [];
  let total = 0;

  // Clean and process the text
  const cleanText = type === 'hebrew' 
    ? text.replace(/[^\u0590-\u05FF\s]/g, '')
    : text.toLowerCase().replace(/[^a-z\s]/g, '');

  const words = cleanText.trim().split(/\s+/);
  const letters = cleanText.replace(/\s/g, '').split('');

  // Calculate values
  letters.forEach(letter => {
    const value = gematriaMap[letter] || 0;
    total += value;
    breakdown.push({ letter, value });
  });

  // Find equivalent words (simple implementation - can be expanded)
  const equivalentWords = [
    type === 'hebrew' ? 'אהבה' : 'love', // Example equivalent word
    type === 'hebrew' ? 'אחד' : 'one'    // Example equivalent word
  ].filter(word => {
    const wordValue = word.split('').reduce((sum, letter) => sum + (gematriaMap[letter] || 0), 0);
    return wordValue === total;
  });

  return {
    total,
    breakdown,
    reducedValue: reduceToSingleDigit(total),
    wordCount: words.length,
    letterCount: letters.length,
    type,
    equivalentWords
  };
}