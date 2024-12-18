export interface A1CResult {
  a1c: number;
  averageBloodSugar: number;
  range: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  recommendations: {
    category: string;
    suggestion: string;
  }[];
  dailyReadings: {
    time: string;
    targetRange: {
      min: number;
      max: number;
    };
  }[];
}

function getRiskLevel(a1c: number): 'low' | 'moderate' | 'high' | 'very-high' {
  if (a1c < 5.7) return 'low';
  if (a1c < 6.5) return 'moderate';
  if (a1c < 8.0) return 'high';
  return 'very-high';
}

function getRange(a1c: number): string {
  if (a1c < 5.7) return 'Normal';
  if (a1c < 6.5) return 'Prediabetes';
  return 'Diabetes';
}

export function calculateA1C(
  bloodSugar: number,
  measurementType: 'a1c' | 'glucose'
): A1CResult {
  let a1c: number;
  let averageBloodSugar: number;

  if (measurementType === 'a1c') {
    a1c = bloodSugar;
    // Convert A1C to average blood sugar (mg/dL)
    averageBloodSugar = (a1c * 28.7) - 46.7;
  } else {
    // Convert average blood sugar to A1C
    a1c = (bloodSugar + 46.7) / 28.7;
    averageBloodSugar = bloodSugar;
  }

  const riskLevel = getRiskLevel(a1c);
  const range = getRange(a1c);

  const recommendations = [
    {
      category: 'Diet',
      suggestion: 'Monitor carbohydrate intake and focus on low glycemic index foods'
    },
    {
      category: 'Exercise',
      suggestion: '150 minutes of moderate-intensity aerobic activity per week'
    },
    {
      category: 'Monitoring',
      suggestion: 'Check blood sugar levels regularly and keep a log'
    },
    {
      category: 'Lifestyle',
      suggestion: 'Maintain a healthy weight and manage stress levels'
    }
  ];

  const dailyReadings = [
    {
      time: 'Fasting/Before Breakfast',
      targetRange: { min: 80, max: 130 }
    },
    {
      time: '2 Hours After Meals',
      targetRange: { min: 80, max: 180 }
    },
    {
      time: 'Before Meals',
      targetRange: { min: 80, max: 130 }
    },
    {
      time: 'Bedtime',
      targetRange: { min: 100, max: 140 }
    }
  ];

  return {
    a1c: Math.round(a1c * 10) / 10,
    averageBloodSugar: Math.round(averageBloodSugar),
    range,
    riskLevel,
    recommendations,
    dailyReadings
  };
}