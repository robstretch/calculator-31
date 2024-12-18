export interface GematriaResult {
  total: number;
  breakdown: {
    letter: string;
    value: number;
  }[];
  reducedValue: number;
  wordCount: number;
  letterCount: number;
  type: 'hebrew' | 'english';
  equivalentWords: string[];
}