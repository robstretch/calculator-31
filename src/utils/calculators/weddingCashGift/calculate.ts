import { WeddingGiftInput, WeddingGiftResult } from './types';

const BASE_AMOUNTS = {
  'immediate-family': { min: 200, max: 500 },
  'relative': { min: 100, max: 200 },
  'close-friend': { min: 100, max: 175 },
  'friend': { min: 75, max: 125 },
  'coworker': { min: 50, max: 100 }
};

const REGIONAL_MULTIPLIERS = {
  northeast: 1.2,
  midwest: 0.9,
  south: 0.9,
  west: 1.1,
  international: 1.3
};

const WEDDING_TYPE_MULTIPLIERS = {
  formal: 1.2,
  semiformal: 1.0,
  casual: 0.8
};

export function calculateWeddingGift(input: WeddingGiftInput): WeddingGiftResult {
  // Get base amount range
  const baseAmount = BASE_AMOUNTS[input.relationship];
  
  // Apply multipliers
  const regionalMultiplier = REGIONAL_MULTIPLIERS[input.region];
  const typeMultiplier = WEDDING_TYPE_MULTIPLIERS[input.weddingType];
  
  // Calculate adjustments
  let minAmount = baseAmount.min * regionalMultiplier * typeMultiplier;
  let maxAmount = baseAmount.max * regionalMultiplier * typeMultiplier;
  
  // Additional adjustments
  if (!input.attending) {
    minAmount *= 0.5;
    maxAmount *= 0.5;
  }
  
  if (input.plusOne) {
    minAmount *= 1.5;
    maxAmount *= 1.5;
  }
  
  if (input.location === 'destination') {
    minAmount *= 0.8;
    maxAmount *= 0.8;
  }

  // Round to nearest 25
  minAmount = Math.round(minAmount / 25) * 25;
  maxAmount = Math.round(maxAmount / 25) * 25;
  const averageAmount = Math.round((minAmount + maxAmount) / 2);

  // Calculate impact factors
  const factors = [
    {
      factor: 'Relationship',
      impact: input.relationship === 'immediate-family' ? 100 :
              input.relationship === 'relative' ? 75 :
              input.relationship === 'close-friend' ? 60 :
              input.relationship === 'friend' ? 40 : 20,
      description: `${input.relationship.replace('-', ' ')} relationship`
    },
    {
      factor: 'Region',
      impact: Math.round((regionalMultiplier - 1) * 100),
      description: `${input.region} regional adjustment`
    },
    {
      factor: 'Wedding Type',
      impact: Math.round((typeMultiplier - 1) * 100),
      description: `${input.weddingType} wedding style`
    }
  ];

  const etiquette = [
    {
      rule: 'Timing',
      description: 'Send gift within 2 months of the wedding'
    },
    {
      rule: 'Presentation',
      description: 'Use a card with thoughtful message for cash gifts'
    },
    {
      rule: 'Registry',
      description: 'Check registry first; cash is great alternative'
    },
    {
      rule: 'Group Gifts',
      description: 'Consider combining with others for larger gifts'
    }
  ];

  const recommendations = [
    {
      category: 'Amount',
      suggestion: input.plusOne ?
        'Consider combined gift amount for you and guest' :
        'Gift amount appropriate for single guest'
    },
    {
      category: 'Presentation',
      suggestion: 'Include thoughtful card with personal message'
    },
    {
      category: 'Timing',
      suggestion: input.attending ?
        'Bring card to wedding or send just before' :
        'Send gift close to wedding date'
    },
    {
      category: 'Budget',
      suggestion: input.location === 'destination' ?
        'Consider travel costs when determining gift amount' :
        'Base amount on relationship and wedding style'
    }
  ];

  return {
    recommendedAmount: {
      min: minAmount,
      max: maxAmount,
      average: averageAmount
    },
    factors,
    etiquette,
    recommendations
  };
}