import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateAPY } from '../../utils/calculators/apy';
import { formatCurrency, formatNumber } from '../../utils/format';

export function APYCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [interestRate, setInterestRate] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually'>('monthly');
  const [years, setYears] = useState('1');

  const results = calculateAPY(
    parseFloat(principal) || 0,
    parseFloat(interestRate) || 0,
    compoundingFrequency,
    parseFloat(years) || 1
  );

  return (
    <CalculatorLayout
      title="APY Calculator"
      description="Calculate Annual Percentage Yield and compound interest earnings"
      icon={<DollarSign />}
    >
      <SEO
        title="APY Calculator | Annual Percentage Yield Calculator"
        description="Calculate Annual Percentage Yield (APY) and compare different compounding frequencies. Free APY calculator for investment and savings analysis."
        keywords={[
          'apy calculator',
          'annual percentage yield calculator',
          'compound interest calculator',
          'interest rate calculator',
          'investment return calculator',
          'savings calculator'
        ]}
        canonicalUrl="/apy-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
          
          <CalculatorInput
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={100}
            placeholder="Enter initial investment"
          />
          
          <CalculatorInput
            label="Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={100}
            step={0.01}
            placeholder="Enter annual interest rate"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value as typeof compoundingFrequency)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <CalculatorInput
            label="Investment Period (years)"
            value={years}
            onChange={setYears}
            min={0.1}
            max={100}
            step={0.1}
            placeholder="Enter investment period"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.apy)}%
              </div>
              <div className="text-gray-500">Annual Percentage Yield (APY)</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Final Balance"
              value={formatCurrency(results.finalBalance)}
              helpText="Total value after compound interest"
            />
            
            <CalculatorResult
              label="Total Interest"
              value={formatCurrency(results.totalInterest)}
              helpText="Interest earned over the period"
            />
            
            <CalculatorResult
              label="Effective Rate Increase"
              value={`${formatNumber(results.effectiveRate)}%`}
              helpText="Additional yield from compound interest"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Periodic Growth:</h3>
              <div className="max-h-60 overflow-y-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="p-2">Period</th>
                      <th className="p-2">Balance</th>
                      <th className="p-2">Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.periodicInterest
                      .filter((_, index) => index % results.compoundingPeriods === 0)
                      .map((period) => (
                        <tr key={period.period} className="border-t">
                          <td className="p-2">{period.period}</td>
                          <td className="p-2">{formatCurrency(period.balance)}</td>
                          <td className="p-2">{formatCurrency(period.interest)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding APY</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is APY?</h3>
              <p className="text-gray-600">
                Annual Percentage Yield (APY) is the effective annual rate of return taking into 
                account the effect of compounding interest. Unlike simple interest, compound 
                interest is calculated periodically and the accumulated interest earns interest 
                over time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Compounding Frequency</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Daily: 365 times per year</li>
                <li>• Weekly: 52 times per year</li>
                <li>• Monthly: 12 times per year</li>
                <li>• Quarterly: 4 times per year</li>
                <li>• Annually: Once per year</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">APY vs APR</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">APY Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Includes compound interest</li>
                <li>• Higher than APR</li>
                <li>• More accurate yield</li>
                <li>• Used for savings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">APR Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Simple interest only</li>
                <li>• Lower than APY</li>
                <li>• Doesn't show full cost</li>
                <li>• Used for loans</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Differences</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Compounding effect</li>
                <li>• Calculation method</li>
                <li>• Usage scenarios</li>
                <li>• Disclosure requirements</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}