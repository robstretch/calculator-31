import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateRothIra } from '../../utils/calculators/rothIra';
import { formatCurrency, formatNumber } from '../../utils/format';

export function RothIraCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [initialBalance, setInitialBalance] = useState('10000');
  const [annualContribution, setAnnualContribution] = useState('6000');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [inflationRate, setInflationRate] = useState('2.5');
  const [currentTaxRate, setCurrentTaxRate] = useState('22');

  const results = calculateRothIra(
    parseInt(currentAge) || 0,
    parseInt(retirementAge) || 0,
    parseFloat(initialBalance) || 0,
    parseFloat(annualContribution) || 0,
    parseFloat(expectedReturn) || 0,
    parseFloat(inflationRate) || 0,
    parseFloat(currentTaxRate) || 0
  );

  return (
    <CalculatorLayout
      title="Roth IRA Calculator"
      description="Calculate your potential Roth IRA growth and retirement savings"
      icon={<DollarSign />}
    >
      <SEO
        title="Roth IRA Calculator | Retirement Savings Calculator"
        description="Calculate your potential Roth IRA growth, tax savings, and retirement income with our free Roth IRA calculator."
        keywords={[
          'roth ira calculator',
          'retirement calculator',
          'ira calculator',
          'retirement savings calculator',
          'investment calculator',
          'tax-free growth calculator'
        ]}
        canonicalUrl="/roth-ira-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Investment Details</h2>
          
          <CalculatorInput
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={100}
            step={1}
            placeholder="Enter your current age"
          />
          
          <CalculatorInput
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={parseInt(currentAge) + 1}
            max={100}
            step={1}
            placeholder="Enter retirement age"
          />
          
          <CalculatorInput
            label="Initial Balance"
            value={initialBalance}
            onChange={setInitialBalance}
            min={0}
            step={100}
            placeholder="Enter initial balance"
          />
          
          <CalculatorInput
            label="Annual Contribution"
            value={annualContribution}
            onChange={setAnnualContribution}
            min={0}
            max={6500}
            step={100}
            placeholder="Enter annual contribution"
          />
          
          <CalculatorInput
            label="Expected Return (%)"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={0}
            max={20}
            step={0.1}
            placeholder="Enter expected return rate"
          />
          
          <CalculatorInput
            label="Inflation Rate (%)"
            value={inflationRate}
            onChange={setInflationRate}
            min={0}
            max={10}
            step={0.1}
            placeholder="Enter inflation rate"
          />
          
          <CalculatorInput
            label="Current Tax Rate (%)"
            value={currentTaxRate}
            onChange={setCurrentTaxRate}
            min={0}
            max={50}
            step={1}
            placeholder="Enter current tax rate"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Investment Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.finalBalance)}
              </div>
              <div className="text-gray-500">Final Balance at Retirement</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Total Contributions"
              value={formatCurrency(results.totalContributions)}
              helpText="Amount you'll contribute over time"
            />
            
            <CalculatorResult
              label="Total Earnings"
              value={formatCurrency(results.totalEarnings)}
              helpText="Investment returns earned"
            />
            
            <CalculatorResult
              label="Tax Savings"
              value={formatCurrency(results.taxSavings)}
              helpText="Tax savings compared to traditional IRA"
            />
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Withdrawal Projections:</h3>
              <div className="space-y-3">
                {results.withdrawalProjections
                  .filter(proj => proj.age % 5 === 0)
                  .map((projection, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">Age {projection.age}:</span>
                      <span className="font-medium">
                        {formatCurrency(projection.amount)}/year
                      </span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Roth IRAs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Benefits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Tax-free growth</li>
                <li>• Tax-free qualified withdrawals</li>
                <li>• No required minimum distributions</li>
                <li>• Flexible withdrawal options</li>
                <li>• Estate planning advantages</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Contribution Rules</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 2024 limit: $7,000 ($8,000 if 50+)</li>
                <li>• Income limits apply</li>
                <li>• Must have earned income</li>
                <li>• Can contribute at any age</li>
                <li>• 5-year rule for earnings</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Investment Strategy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Asset Allocation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Diversify investments</li>
                <li>• Consider time horizon</li>
                <li>• Adjust risk tolerance</li>
                <li>• Regular rebalancing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growth Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Maximize contributions</li>
                <li>• Start early</li>
                <li>• Consistent investing</li>
                <li>• Long-term focus</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tax Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Compare with Traditional IRA</li>
                <li>• Consider tax brackets</li>
                <li>• Plan withdrawals</li>
                <li>• Estate tax benefits</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}