import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateInvestment } from '../../utils/calculators/investment/calculate';
import { InvestmentInput } from '../../utils/calculators/investment/types';
import { formatCurrency, formatNumber } from '../../utils/format';

export function InvestmentCalculator() {
  const [input, setInput] = useState<InvestmentInput>({
    initialAmount: 10000,
    monthlyContribution: 500,
    years: 20,
    annualReturn: 8,
    compoundingFrequency: 'monthly',
    inflationRate: 2.5,
    taxRate: 25
  });

  const result = calculateInvestment(input);

  return (
    <div>
      <SEO
        title="Investment Calculator | Compound Interest & Returns"
        description="Calculate potential investment returns with our comprehensive investment calculator. Plan your financial future with compound interest projections."
        keywords={[
          'investment calculator',
          'compound interest',
          'investment returns',
          'financial planning',
          'retirement calculator',
          'wealth calculator'
        ]}
        canonicalUrl="/investment-calculator"
      />

      <CalculatorLayout
        title="Investment Calculator"
        description="Calculate potential investment returns with compound interest and regular contributions"
        icon={<DollarSign />}
      >
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="Initial Investment"
                  value={input.initialAmount}
                  onChange={(value) => setInput({ ...input, initialAmount: parseFloat(value) || 0 })}
                  min={0}
                />
                <CalculatorInput
                  label="Monthly Contribution"
                  value={input.monthlyContribution}
                  onChange={(value) => setInput({ ...input, monthlyContribution: parseFloat(value) || 0 })}
                  min={0}
                />
                <CalculatorInput
                  label="Investment Period (Years)"
                  value={input.years}
                  onChange={(value) => setInput({ ...input, years: parseInt(value) || 0 })}
                  min={1}
                  max={50}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Return Details</h3>
              <div className="space-y-4">
                <CalculatorInput
                  label="Annual Return (%)"
                  value={input.annualReturn}
                  onChange={(value) => setInput({ ...input, annualReturn: parseFloat(value) || 0 })}
                  min={0}
                  max={30}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Compounding Frequency
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    value={input.compoundingFrequency}
                    onChange={(e) => setInput({ ...input, compoundingFrequency: e.target.value as InvestmentInput['compoundingFrequency'] })}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="annually">Annually</option>
                  </select>
                </div>
                <CalculatorInput
                  label="Inflation Rate (%)"
                  value={input.inflationRate || 0}
                  onChange={(value) => setInput({ ...input, inflationRate: parseFloat(value) || undefined })}
                  min={0}
                  max={10}
                />
                <CalculatorInput
                  label="Tax Rate (%)"
                  value={input.taxRate || 0}
                  onChange={(value) => setInput({ ...input, taxRate: parseFloat(value) || undefined })}
                  min={0}
                  max={50}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Investment Results</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Final Balance"
                value={formatCurrency(result.finalBalance)}
                helpText="Total investment value at the end of the period"
              />
              <CalculatorResult
                label="Total Contributions"
                value={formatCurrency(result.totalContributions)}
                helpText="Sum of initial investment and all contributions"
              />
              <CalculatorResult
                label="Total Earnings"
                value={formatCurrency(result.totalEarnings)}
                helpText="Total interest earned through compound growth"
              />
              {result.inflationAdjustedBalance && (
                <CalculatorResult
                  label="Inflation-Adjusted Balance"
                  value={formatCurrency(result.inflationAdjustedBalance)}
                  helpText="Final balance adjusted for inflation"
                />
              )}
              <CalculatorResult
                label="Effective Annual Rate"
                value={`${formatNumber(result.metrics.effectiveAnnualRate)}%`}
                helpText="Actual annual return including compound effect"
              />
              {result.metrics.realReturnRate && (
                <CalculatorResult
                  label="Real Return Rate"
                  value={`${formatNumber(result.metrics.realReturnRate)}%`}
                  helpText="Return rate adjusted for inflation"
                />
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Yearly Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earnings</th>
                    {input.inflationRate && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Real Value</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {result.yearlyBreakdown.map((year) => (
                    <tr key={year.year}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{year.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(year.balance)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(year.contributions)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(year.earnings)}</td>
                      {year.inflationAdjusted && (
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(year.inflationAdjusted)}</td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
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
        </div>
      </CalculatorLayout>
    </div>
  );
}