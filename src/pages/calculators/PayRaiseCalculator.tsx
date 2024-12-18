import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePayRaise } from '../../utils/calculators/payRaise';
import { formatCurrency, formatNumber } from '../../utils/format';

export function PayRaiseCalculator() {
  const [currentSalary, setCurrentSalary] = useState('50000');
  const [raiseAmount, setRaiseAmount] = useState('5');
  const [raiseType, setRaiseType] = useState<'percentage' | 'amount'>('percentage');
  const [taxRate, setTaxRate] = useState('22');

  const results = calculatePayRaise(
    parseFloat(currentSalary) || 0,
    parseFloat(raiseAmount) || 0,
    raiseType,
    parseFloat(taxRate) || 22
  );

  return (
    <CalculatorLayout
      title="Pay Raise Calculator"
      description="Calculate the impact of a salary increase on your earnings"
      icon={<TrendingUp />}
    >
      <SEO
        title="Pay Raise Calculator | Salary Increase Calculator"
        description="Calculate the impact of a salary increase on your take-home pay, taxes, and benefits with our free pay raise calculator."
        keywords={[
          'pay raise calculator',
          'salary increase calculator',
          'wage increase calculator',
          'promotion calculator',
          'salary change calculator',
          'income increase calculator'
        ]}
        canonicalUrl="/pay-raise-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Salary Information</h2>

          <CalculatorInput
            label="Current Annual Salary"
            value={currentSalary}
            onChange={setCurrentSalary}
            min={0}
            step={1000}
            placeholder="Enter current salary"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Raise Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRaiseType('percentage')}
                className={`px-4 py-2 rounded-md ${
                  raiseType === 'percentage'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Percentage
              </button>
              <button
                onClick={() => setRaiseType('amount')}
                className={`px-4 py-2 rounded-md ${
                  raiseType === 'amount'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Fixed Amount
              </button>
            </div>
          </div>

          <CalculatorInput
            label={raiseType === 'percentage' ? 'Raise Percentage (%)' : 'Raise Amount ($)'}
            value={raiseAmount}
            onChange={setRaiseAmount}
            min={0}
            step={raiseType === 'percentage' ? 0.1 : 100}
            placeholder={`Enter raise ${raiseType === 'percentage' ? 'percentage' : 'amount'}`}
          />

          <CalculatorInput
            label="Estimated Tax Rate (%)"
            value={taxRate}
            onChange={setTaxRate}
            min={0}
            max={100}
            step={0.1}
            placeholder="Enter estimated tax rate"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Raise Impact</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.newSalary)}
              </div>
              <div className="text-gray-500">New Annual Salary</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Annual Increase"
              value={formatCurrency(results.difference)}
              helpText="Additional annual earnings"
            />

            <CalculatorResult
              label="Percentage Increase"
              value={`${formatNumber(results.percentageIncrease)}%`}
              helpText="Relative salary increase"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Pay Increase Breakdown:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly:</span>
                  <span className="font-medium">{formatCurrency(results.monthlyIncrease)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bi-weekly:</span>
                  <span className="font-medium">{formatCurrency(results.biweeklyIncrease)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weekly:</span>
                  <span className="font-medium">{formatCurrency(results.weeklyIncrease)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hourly:</span>
                  <span className="font-medium">{formatCurrency(results.hourlyIncrease)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Tax Impact:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Tax:</span>
                  <span className="font-medium">{formatCurrency(results.taxImpact.oldTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New Tax:</span>
                  <span className="font-medium">{formatCurrency(results.taxImpact.newTax)}</span>
                </div>
                <div className="flex justify-between text-indigo-600 font-medium">
                  <span>Additional Tax:</span>
                  <span>{formatCurrency(results.taxImpact.difference)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Raise</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Types of Raises</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Merit-based increases</li>
                <li>• Cost of living adjustments</li>
                <li>• Promotion-related raises</li>
                <li>• Market adjustments</li>
                <li>• Performance bonuses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Tax bracket changes</li>
                <li>• Benefit implications</li>
                <li>• Retirement contributions</li>
                <li>• Take-home pay impact</li>
                <li>• Long-term growth</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Making the Most of Your Raise</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Increase savings rate</li>
                <li>• Build emergency fund</li>
                <li>• Pay down debt</li>
                <li>• Review budget</li>
                <li>• Set new goals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Options</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Boost 401(k) contributions</li>
                <li>• Open/fund IRA</li>
                <li>• Start HSA if eligible</li>
                <li>• Consider taxable accounts</li>
                <li>• Diversify investments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle Balance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Avoid lifestyle inflation</li>
                <li>• Prioritize needs</li>
                <li>• Plan for future</li>
                <li>• Maintain perspective</li>
                <li>• Celebrate responsibly</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}