import { WordPattern, WordleResult } from './types';
import { wordList } from './wordList';

function calculateLetterFrequencies(words: string[]): { letter: string; frequency: number; percentage: number; }[] {
  const frequencies: { [key: string]: number } = {};
  let totalLetters = 0;

  words.forEach(word => {
    [...word].forEach(letter => {
      frequencies[letter] = (frequencies[letter] || 0) + 1;
      totalLetters++;
    });
  });

  return Object.entries(frequencies)
    .map(([letter, frequency]) => ({
      letter,
      frequency,
      percentage: (frequency / totalLetters) * 100
    }))
    .sort((a, b) => b.frequency - a.frequency);
}

function findCommonPatterns(words: string[]): { pattern: string; count: number; percentage: number; }[] {
  const patterns: { [key: string]: number } = {};
  
  words.forEach(word => {
    const pattern = word.replace(/[a-z]/g, '*');
    patterns[pattern] = (patterns[pattern] || 0) + 1;
  });

  return Object.entries(patterns)
    .map(([pattern, count]) => ({
      pattern,
      count,
      percentage: (count / words.length) * 100
    }))
    .sort((a, b) => b.count - a.count);
}

function wordMatchesPattern(word: string, pattern: WordPattern): boolean {
  // Check known letters
  for (const [position, letter] of Object.entries(pattern.knownLetters)) {
    if (word[parseInt(position)] !== letter) return false;
  }

  // Check present letters
  for (const letter of pattern.presentLetters) {
    if (!word.includes(letter)) return false;
  }

  // Check absent letters
  for (const letter of pattern.absentLetters) {
    if (word.includes(letter)) return false;
  }

  return true;
}

export function analyzeWordle(pattern: WordPattern): WordleResult {
  // Filter words based on pattern
  const suggestions = wordList.filter(word => wordMatchesPattern(word, pattern));

  // Calculate letter frequencies
  const letterFrequencies = calculateLetterFrequencies(suggestions);

  // Find common patterns
  const patternAnalysis = findCommonPatterns(suggestions);

  // Calculate statistics
  const totalWords = suggestions.length;
  const averageLength = suggestions.reduce((sum, word) => sum + word.length, 0) / totalWords;
  const commonPatterns = patternAnalysis.slice(0, 5).map(p => p.pattern);

  return {
    suggestions: suggestions.slice(0, 20), // Limit to top 20 suggestions
    letterFrequencies,
    patternAnalysis,
    statistics: {
      totalWords,
      averageLength,
      commonPatterns
    }
  };
}