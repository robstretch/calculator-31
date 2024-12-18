import { ServiceType, GratuityResult } from './types';

export const serviceTypes: { [key: string]: ServiceType } = {
  restaurant: {
    category: 'Restaurant',
    baseRate: 0.18,
    qualityFactors: {
      poor: 0.10,
      fair: 0.15,
      good: 0.18,
      excellent: 0.22
    }
  },
  salon: {
    category: 'Hair/Beauty Salon',
    baseRate: 0.20,
    qualityFactors: {
      poor: 0.15,
      fair: 0.18,
      good: 0.20,
      excellent: 0.25
    }
  },
  taxi: {
    category: 'Taxi/Rideshare',
    baseRate: 0.15,
    qualityFactors: {
      poor: 0.10,
      fair: 0.15,
      good: 0.18,
      excellent: 0.20
    }
  },
  delivery: {
    category: 'Food Delivery',
    baseRate: 0.15,
    qualityFactors: {
      poor: 0.10,
      fair: 0.15,
      good: 0.18,
      excellent: 0.20
    }
  },
  hotel: {
    category: 'Hotel Services',
    baseRate: 0.10,
    qualityFactors: {
      poor: 0.05,
      fair: 0.08,
      good: 0.10,
      excellent: 0.15
    }
  }
};

export function calculateGratuity(
  amount: number,
  serviceType: string,
  serviceQuality: 'poor' | 'fair' | 'good' | 'excellent',
  splitBetween?: number
): GratuityResult {
  const service = serviceTypes[serviceType];
  const tipRate = service.qualityFactors[serviceQuality];
  const suggestedTip = amount * tipRate;
  const totalAmount = amount + suggestedTip;

  const recommendations = [
    {
      category: 'Base Recommendation',
      suggestion: `Standard gratuity for ${service.category} is ${(service.baseRate * 100).toFixed(0)}%`
    },
    {
      category: 'Service Quality',
      suggestion: `For ${serviceQuality} service, consider ${(tipRate * 100).toFixed(0)}%`
    },
    {
      category: 'Additional Factors',
      suggestion: 'Consider group size, complexity of service, and extra attention received'
    }
  ];

  return {
    baseAmount: amount,
    suggestedTip,
    totalAmount,
    tipPercentage: tipRate * 100,
    splitAmount: splitBetween ? totalAmount / splitBetween : undefined,
    recommendations,
    industryStandard: {
      minimum: service.qualityFactors.poor * 100,
      average: service.baseRate * 100,
      exceptional: service.qualityFactors.excellent * 100
    }
  };
}