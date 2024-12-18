export interface WordPattern {
  pattern: string;
  knownLetters: { [key: number]: string };
  presentLetters: string[];
  absentLetters: string[];
}

export interface WordleResult {
  suggestions: string[];
  letterFrequencies: {
    letter: string;
    frequency: number;
    percentage: number;
  }[];
  patternAnalysis: {
    pattern: string;
    count: number;
    percentage: number;
  }[];
  statistics: {
    totalWords: number;
    averageLength: number;
    commonPatterns: string[];
  };
}