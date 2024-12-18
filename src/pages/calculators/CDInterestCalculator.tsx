import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateCDInterest } from '../../utils/calculators/cdInterest/calculate';
import { CompoundingFrequency } from '../../utils/calculators/cdInterest/types';
import { formatCurrency, formatNumber } from '../../utils/format';

export function CDInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('4.5');
  const [term, setTerm] = useState('1');
  const [compoundingFrequency, setCompoundingFrequency] = useState<CompoundingFrequency>('daily');
  const [showEarlyWithdrawal, setShowEarlyWithdrawal] = useState(false);
  const [earlyWithdrawal, setEarlyWithdrawal] = useState('0.5');

  const results = calculateCDInterest(
    parseFloat(principal) || 0,
    parseFloat(rate) || 0,
    parseFloat(term) || 0,
    compoundingFrequency,
    showEarlyWithdrawal ? parseFloat(earlyWithdrawal) : undefined
  );

  return (
    <CalculatorLayout
      title="CD Interest Calculator"
      description="Calculate returns on Certificates of Deposit with different compounding frequencies"
      icon={<DollarSign />}
    >
      <SEO
        title="CD Interest Calculator | Certificate of Deposit Calculator"
        description="Calculate CD interest earnings, returns, and compare different compounding frequencies with our free CD calculator."
        keywords={[
          'cd interest calculator',
          'certificate of deposit calculator',
          'cd earnings calculator',
          'cd return calculator',
          'compound interest calculator',
          'cd investment calculator'
        ]}
        canonicalUrl="/cd-interest-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">CD Details</h2>
          
          <CalculatorInput
            label="Principal Amount"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={100}
            placeholder="Enter initial deposit"
          />
          
          <CalculatorInput
            label="Interest Rate (%)"
            value={rate}
            onChange={setRate}
            min={0}
            max={20}
            step={0.01}
            placeholder="Enter APR"
          />
          
          <CalculatorInput
            label="Term (years)"
            value={term}
            onChange={setTerm}
            min={0.25}
            max={10}
            step={0.25}
            placeholder="Enter term length"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value as CompoundingFrequency)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showEarlyWithdrawal}
                onChange={(e) => setShowEarlyWithdrawal(e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Calculate Early Withdrawal</span>
            </label>
          </div>

          {showEarlyWithdrawal && (
            <CalculatorInput
              label="Early Withdrawal (years)"
              value={earlyWithdrawal}
              onChange={setEarlyWithdrawal}
              min={0}
              max={parseFloat(term)}
              step={0.25}
              placeholder="Enter withdrawal time"
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">CD Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.finalBalance)}
              </div>
              <div className="text-gray-500">Final Balance at Maturity</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Total Interest"
              value={formatCurrency(results.totalInterest)}
              helpText="Interest earned over full term"
            />
            
            <CalculatorResult
              label="Annual Percentage Yield (APY)"
              value={formatNumber(results.apy, 2) + '%'}
              helpText="Effective annual rate with compounding"
            />

            {showEarlyWithdrawal && results.earlyWithdrawalPenalty && (
              <CalculatorResult
                label="Early Withdrawal Penalty"
                value={formatCurrency(results.earlyWithdrawalPenalty)}
                helpText="Estimated penalty for early withdrawal"
              />
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Yearly Breakdown:</h3>
              <div className="space-y-3">
                {results.yearlyTotals.map((year) => (
                  <div key={year.year} className="flex justify-between">
                    <span className="text-gray-600">Year {year.year}:</span>
                    <div className="text-right">
                      <div>{formatCurrency(year.interest)} interest</div>
                      <div className="text-sm text-gray-500">
                        Balance: {formatCurrency(year.balance)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding CD Interest</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Fixed interest rate</li>
                <li>• FDIC insurance protection</li>
                <li>• Various term lengths</li>
                <li>• Compounding options</li>
                <li>• Early withdrawal penalties</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Guaranteed returns</li>
                <li>• Higher rates than savings</li>
                <li>• Low risk investment</li>
                <li>• Predictable earnings</li>
                <li>• No market volatility</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CD Strategies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">CD Laddering</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Stagger maturity dates</li>
                <li>• Spread interest rate risk</li>
                <li>• Maintain liquidity</li>
                <li>• Reinvest at intervals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Term Selection</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Match financial goals</li>
                <li>• Consider rate environment</li>
                <li>• Balance liquidity needs</li>
                <li>• Compare bank offers</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Stay within FDIC limits</li>
                <li>• Understand penalties</li>
                <li>• Consider inflation</li>
                <li>• Plan for emergencies</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}