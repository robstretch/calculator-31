import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateCD } from '../../utils/calculators/cd';
import { formatCurrency, formatNumber } from '../../utils/format';

export function CDCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('4.5');
  const [years, setYears] = useState('5');
  const [compoundingFrequency, setCompoundingFrequency] = useState<'daily' | 'monthly' | 'quarterly' | 'annually'>('daily');

  const results = calculateCD(
    parseFloat(principal) || 0,
    parseFloat(rate) || 0,
    parseFloat(years) || 0,
    compoundingFrequency
  );

  return (
    <CalculatorLayout
      title="CD Calculator"
      description="Calculate returns on Certificates of Deposit with different compounding frequencies"
      icon={<DollarSign />}
    >
      <SEO
        title="CD Calculator | Certificate of Deposit Calculator"
        description="Calculate CD returns, interest earnings, and compare different compounding frequencies with our free Certificate of Deposit calculator."
        keywords={[
          'cd calculator',
          'certificate of deposit calculator',
          'cd interest calculator',
          'cd rate calculator',
          'cd investment calculator',
          'compound interest calculator'
        ]}
        canonicalUrl="/cd-calculator"
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
            label="Term (Years)"
            value={years}
            onChange={setYears}
            min={0.25}
            max={30}
            step={0.25}
            placeholder="Enter term length"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Compounding Frequency
            </label>
            <select
              value={compoundingFrequency}
              onChange={(e) => setCompoundingFrequency(e.target.value as typeof compoundingFrequency)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="annually">Annually</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">CD Summary</h2>
          
          <CalculatorResult
            label="Final Balance"
            value={formatCurrency(results.finalBalance)}
            helpText="Total value at maturity"
          />
          
          <CalculatorResult
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            helpText="Total interest earned"
          />
          
          <CalculatorResult
            label="Annual Percentage Yield (APY)"
            value={formatNumber(results.apy, 2) + '%'}
            helpText="Effective annual rate with compounding"
          />

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Yearly Breakdown:</h3>
            <div className="space-y-2">
              {results.yearlyTotals.map((year) => (
                <div key={year.year} className="flex justify-between text-sm text-indigo-700">
                  <span>Year {year.year}:</span>
                  <div className="text-right">
                    <div>{formatCurrency(year.interest)} interest</div>
                    <div className="text-xs">Balance: {formatCurrency(year.balance)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding CDs</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              A Certificate of Deposit (CD) is a time deposit that offers a guaranteed return over a fixed term. 
              CDs typically offer higher interest rates than regular savings accounts in exchange for keeping 
              your money deposited for a set period.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li>• Fixed interest rate</li>
                  <li>• Guaranteed returns</li>
                  <li>• FDIC insurance up to $250,000</li>
                  <li>• Various term lengths</li>
                  <li>• Different compounding options</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Terms</h3>
                <ul className="space-y-2">
                  <li>• Principal: Initial deposit amount</li>
                  <li>• APY: Annual Percentage Yield</li>
                  <li>• Term: Length of deposit</li>
                  <li>• Maturity date: When CD term ends</li>
                  <li>• Early withdrawal penalty</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">CD Investment Strategies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">CD Ladder</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Spread investments across terms</li>
                <li>• Regular maturity intervals</li>
                <li>• Flexibility to reinvest</li>
                <li>• Average higher rates</li>
                <li>• Maintain liquidity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Term Selection</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Consider interest rate trends</li>
                <li>• Match financial goals</li>
                <li>• Balance risk and return</li>
                <li>• Review early withdrawal terms</li>
                <li>• Compare different banks</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Rate Shopping</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Compare multiple banks</li>
                <li>• Check online banks</li>
                <li>• Look for promotions</li>
                <li>• Verify FDIC insurance</li>
                <li>• Read all terms carefully</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}