export interface CookingInput {
  servings: number;
  originalServings: number;
  temperature?: {
    value: number;
    unit: 'F' | 'C';
  };
  time?: {
    hours: number;
    minutes: number;
  };
  weight?: {
    value: number;
    unit: 'lbs' | 'kg';
  };
}

export interface CookingResult {
  ingredients: {
    original: number;
    scaled: number;
    unit: string;
    name: string;
  }[];
  temperature?: {
    fahrenheit: number;
    celsius: number;
  };
  time?: {
    hours: number;
    minutes: number;
  };
  weight?: {
    pounds: number;
    kilograms: number;
  };
  conversions: {
    category: string;
    original: string;
    converted: string;
  }[];
  recommendations: {
    category: string;
    suggestion: string;
  }[];
}