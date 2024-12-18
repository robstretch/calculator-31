export interface DogAgeInput {
  age: number;
  ageUnit: 'years' | 'months';
  breed: string;
  size: 'small' | 'medium' | 'large' | 'giant';
  weight: number;
}

export interface DogAgeResult {
  humanAge: number;
  lifeExpectancy: number;
  ageCategory: string;
  milestones: {
    stage: string;
    dogAge: number;
    humanAge: number;
    description: string;
  }[];
  healthRecommendations: {
    category: string;
    suggestion: string;
  }[];
  breedSpecifics: {
    factor: string;
    value: string;
    impact: string;
  }[];
}