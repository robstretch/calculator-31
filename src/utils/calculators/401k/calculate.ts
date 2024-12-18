import { Input401k, Result401k, ContributionLimits } from './types';

const CONTRIBUTION_LIMITS_2024: ContributionLimits = {
  employeeUnder50: 23000,
  employeeOver50: 30500,
  employerMax: 43000,
  totalMax: 66000
};

function calculateEmployerMatch(
  salary: number,
  contributionPercent: number,
  matchPercent: number,
  matchLimit: number
): number {
  const employeeContribution = salary * (contributionPercent / 100);
  const potentialMatch = salary * (matchPercent / 100);
  return Math.min(potentialMatch, employeeContribution, salary * (matchLimit / 100));
}

export function calculate401k(input: Input401k): Result401k {
  const yearlyBreakdown = [];
  let totalEmployeeContribution = 0;
  let totalEmployerContribution = 0;
  let currentBalance = input.currentBalance;
  let currentSalary = input.currentSalary;

  for (let age = input.currentAge; age <= input.retirementAge; age++) {
    const isOver50 = age >= 50;
    const yearlyLimit = isOver50 ? 
      CONTRIBUTION_LIMITS_2024.employeeOver50 : 
      CONTRIBUTION_LIMITS_2024.employeeUnder50;

    // Calculate contributions
    const employeeContribution = Math.min(
      currentSalary * (input.contributionPercent / 100),
      yearlyLimit
    );

    const employerContribution = calculateEmployerMatch(
      currentSalary,
      input.contributionPercent,
      input.employerMatch,
      input.employerMatchLimit
    );

    // Calculate returns
    const startBalance = currentBalance;
    currentBalance = (currentBalance + employeeContribution + employerContribution) * 
      (1 + input.annualReturn / 100);

    totalEmployeeContribution += employeeContribution;
    totalEmployerContribution += employerContribution;

    yearlyBreakdown.push({
      age,
      salary: currentSalary,
      employeeContribution,
      employerContribution,
      yearEndBalance: currentBalance,
      totalContributed: totalEmployeeContribution + totalEmployerContribution,
      totalEarnings: currentBalance - (totalEmployeeContribution + totalEmployerContribution)
    });

    // Apply annual raise if specified
    if (input.annualRaise) {
      currentSalary *= (1 + input.annualRaise / 100);
    }
  }

  // Calculate metrics
  const effectiveMatchRate = (totalEmployerContribution / totalEmployeeContribution) * 100;
  const projectedIncome = currentBalance * 0.04; // 4% withdrawal rule
  const replacementRatio = (projectedIncome / input.currentSalary) * 100;

  // Generate recommendations
  const recommendations = [
    {
      category: 'Contribution Rate',
      suggestion: input.contributionPercent < input.employerMatchLimit ?
        'Increase contributions to get full employer match' :
        'Good job maximizing employer match'
    },
    {
      category: 'Investment Strategy',
      suggestion: input.currentAge < 40 ?
        'Consider aggressive growth funds for long-term growth' :
        'Start shifting to more conservative investments'
    },
    {
      category: 'Catch-up Contributions',
      suggestion: input.currentAge >= 50 ?
        'Take advantage of catch-up contributions' :
        'Plan for catch-up contributions when eligible'
    },
    {
      category: 'Retirement Income',
      suggestion: replacementRatio < 70 ?
        'Consider increasing contributions to improve income replacement' :
        'On track for comfortable retirement income'
    }
  ];

  return {
    projectedBalance: currentBalance,
    totalContributions: {
      employee: totalEmployeeContribution,
      employer: totalEmployerContribution,
      total: totalEmployeeContribution + totalEmployerContribution
    },
    yearlyBreakdown,
    metrics: {
      effectiveMatchRate,
      projectedIncome,
      replacementRatio
    },
    recommendations
  };
}