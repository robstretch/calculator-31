import { ProRataInput, ProRataResult } from './types';

export function calculateProRata(input: ProRataInput): ProRataResult {
  // Calculate pro-rata entitlement
  const entitlement = Math.floor((input.currentHolding / input.totalShares) * input.newShares);
  
  // Calculate cost of participation
  const cost = entitlement * input.sharePrice;
  
  // Calculate new holding if participating
  const newHolding = {
    shares: input.currentHolding + entitlement,
    percentage: ((input.currentHolding + entitlement) / (input.totalShares + input.newShares)) * 100,
    value: (input.currentHolding + entitlement) * input.sharePrice
  };
  
  // Calculate dilution
  const currentPercentage = (input.currentHolding / input.totalShares) * 100;
  const dilutedPercentage = (input.currentHolding / (input.totalShares + input.newShares)) * 100;
  
  const dilution = {
    withoutParticipation: currentPercentage - dilutedPercentage,
    withParticipation: currentPercentage - newHolding.percentage
  };

  // Generate calculation steps
  const calculations = [
    {
      step: 'Pro-rata Entitlement',
      formula: '(Current Shares / Total Shares) × New Shares',
      result: entitlement
    },
    {
      step: 'Participation Cost',
      formula: 'Entitlement × Share Price',
      result: cost
    },
    {
      step: 'New Ownership Percentage',
      formula: '(Current + New Shares) / (Total + New Shares) × 100',
      result: newHolding.percentage
    },
    {
      step: 'Dilution Without Participation',
      formula: 'Current % - ((Current Shares) / (Total + New Shares) × 100)',
      result: dilution.withoutParticipation
    }
  ];

  // Generate recommendations
  const recommendations = [
    {
      category: 'Participation',
      suggestion: dilution.withoutParticipation > 5 ?
        'Consider participating to avoid significant dilution' :
        'Minimal dilution impact if not participating'
    },
    {
      category: 'Investment',
      suggestion: cost > newHolding.value * 0.1 ?
        'Significant investment required - review capital availability' :
        'Investment amount within reasonable range'
    },
    {
      category: 'Timing',
      suggestion: 'Ensure response within offer period to maintain rights'
    },
    {
      category: 'Documentation',
      suggestion: 'Keep records of all transactions and communications'
    }
  ];

  return {
    entitlement,
    cost,
    newHolding,
    dilution,
    calculations,
    recommendations
  };
}