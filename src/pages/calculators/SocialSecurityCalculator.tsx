import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateSocialSecurity } from '../../utils/calculators/socialSecurity/calculate';
import { SocialSecurityInput } from '../../utils/calculators/socialSecurity/types';
import { formatCurrency } from '../../utils/format';

export function SocialSecurityCalculator() {
  const [input, setInput] = useState<SocialSecurityInput>({
    birthYear: 1960,
    retirementAge: 67,
    currentIncome: 50000,
    lastYearWorked: 2024,
    maritalStatus: 'single'
  });

  const result = calculateSocialSecurity(input);

  return (
    <div>
      <SEO
        title="Social Security Calculator | Estimate Retirement Benefits"
        description="Calculate your estimated Social Security retirement benefits based on your age, income, and retirement plans. Get personalized recommendations for maximizing your benefits."
        keywords={[
          'social security calculator',
          'retirement benefits',
          'social security estimate',
          'retirement planning',
          'ssa calculator',
          'benefit calculator'
        ]}
        canonicalUrl="/social-security-calculator"
      />

      <CalculatorLayout
        title="Social Security Calculator"
        description="Estimate your Social Security retirement benefits and explore strategies to maximize them"
        icon={<DollarSign />}
      >
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="Birth Year"
                  value={input.birthYear}
                  onChange={(value) => setInput({ ...input, birthYear: parseInt(value) || 1960 })}
                  min={1900}
                  max={2024}
                />
                <CalculatorInput
                  label="Planned Retirement Age"
                  value={input.retirementAge}
                  onChange={(value) => setInput({ ...input, retirementAge: parseInt(value) || 67 })}
                  min={62}
                  max={70}
                />
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={input.maritalStatus}
                  onChange={(e) => setInput({ ...input, maritalStatus: e.target.value as SocialSecurityInput['maritalStatus'] })}
                >
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Income Information</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="Current Annual Income"
                  value={input.currentIncome}
                  onChange={(value) => setInput({ ...input, currentIncome: parseInt(value) || 0 })}
                  min={0}
                  max={1000000}
                />
                <CalculatorInput
                  label="Last Year Worked"
                  value={input.lastYearWorked}
                  onChange={(value) => setInput({ ...input, lastYearWorked: parseInt(value) || 2024 })}
                  min={2024}
                  max={2100}
                />
                {['married', 'divorced', 'widowed'].includes(input.maritalStatus) && (
                  <CalculatorInput
                    label="Spouse's Monthly Benefit"
                    value={input.spouseBenefit || 0}
                    onChange={(value) => setInput({ ...input, spouseBenefit: parseInt(value) || 0 })}
                    min={0}
                    max={10000}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Estimated Benefits</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Monthly Benefit"
                value={formatCurrency(result.monthlyBenefit)}
                helpText="Your estimated monthly Social Security benefit"
              />
              <CalculatorResult
                label="Yearly Benefit"
                value={formatCurrency(result.yearlyBenefit)}
                helpText="Total annual Social Security payments"
              />
              <CalculatorResult
                label="Full Retirement Age"
                value={`${result.fullRetirementAge.years} years, ${result.fullRetirementAge.months} months`}
                helpText="Age at which you qualify for full benefits"
              />
              {result.spousalBenefit && (
                <CalculatorResult
                  label="Spousal Benefit"
                  value={formatCurrency(result.spousalBenefit)}
                  helpText="Maximum benefit based on spouse's earnings"
                />
              )}
              {result.survivorBenefit && (
                <CalculatorResult
                  label="Survivor Benefit"
                  value={formatCurrency(result.survivorBenefit)}
                  helpText="Maximum survivor benefit if eligible"
                />
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <h4 className="font-medium text-gray-700">{rec.category}</h4>
                  <p className="text-gray-600 mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Lifetime Benefit Estimates</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Benefits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.estimatedTotalBenefits.map((estimate, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{estimate.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(estimate.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}