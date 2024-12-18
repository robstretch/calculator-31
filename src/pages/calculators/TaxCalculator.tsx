import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { TaxBasics } from '../../components/Tax/TaxBasics';
import { TaxDeductions } from '../../components/Tax/TaxDeductions';
import { TaxBrackets } from '../../components/Tax/TaxBrackets';
import { TaxTips } from '../../components/Tax/TaxTips';
import { calculateTax, deductions2024 } from '../../utils/calculators/tax';
import { formatCurrency, formatNumber } from '../../utils/format';

export function TaxCalculator() {
  const [income, setIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'head'>('single');
  const [stateRate, setStateRate] = useState('5');
  const [deductions, setDeductions] = useState('');

  const results = calculateTax(
    parseFloat(income) || 0,
    filingStatus,
    parseFloat(deductions) || undefined,
    parseFloat(stateRate) || 0
  );

  return (
    <CalculatorLayout
      title="Income Tax Calculator"
      description="Calculate your federal and state income tax based on your income and filing status"
      icon={<DollarSign />}
    >
      <SEO
        title="Income Tax Calculator | Tax Bracket Calculator"
        description="Calculate your federal and state income tax, understand tax brackets, and estimate your take-home pay with our free tax calculator."
        keywords={[
          'tax calculator',
          'income tax calculator',
          'tax bracket calculator',
          'federal tax calculator',
          'state tax calculator',
          'take home pay calculator'
        ]}
        canonicalUrl="/tax-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tax Information</h2>
          
          <CalculatorInput
            label="Annual Income"
            value={income}
            onChange={setIncome}
            min={0}
            step={1000}
            placeholder="Enter your annual income"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFilingStatus('single')}
                className={`px-4 py-2 rounded-md ${
                  filingStatus === 'single'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setFilingStatus('married')}
                className={`px-4 py-2 rounded-md ${
                  filingStatus === 'married'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Married
              </button>
              <button
                onClick={() => setFilingStatus('head')}
                className={`px-4 py-2 rounded-md ${
                  filingStatus === 'head'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Head
              </button>
            </div>
          </div>

          <CalculatorInput
            label="State Tax Rate (%)"
            value={stateRate}
            onChange={setStateRate}
            min={0}
            max={15}
            step={0.1}
            placeholder="Enter state tax rate"
          />

          <CalculatorInput
            label="Deductions (Optional)"
            value={deductions}
            onChange={setDeductions}
            min={0}
            step={100}
            placeholder={`Standard deduction: ${formatCurrency(deductions2024.standard[filingStatus])}`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
          <CalculatorResult
            label="Taxable Income"
            value={formatCurrency(results.taxableIncome)}
            helpText="Income after deductions"
          />
          <CalculatorResult
            label="Total Tax"
            value={formatCurrency(results.totalTax)}
            helpText="Combined federal and state tax"
          />
          <CalculatorResult
            label="Take-Home Income"
            value={formatCurrency(results.takeHomeIncome)}
            helpText="After-tax income"
          />
          <CalculatorResult
            label="Effective Tax Rate"
            value={formatNumber(results.effectiveRate) + '%'}
            helpText="Average tax rate on total income"
          />
          <CalculatorResult
            label="Marginal Tax Rate"
            value={formatNumber(results.marginalRate) + '%'}
            helpText="Tax rate on next dollar earned"
          />

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Tax Breakdown:</h3>
            <div className="space-y-2">
              {results.brackets.map((bracket, index) => (
                <div key={index} className="flex justify-between text-sm text-indigo-700">
                  <span>{bracket.rate}% Tax Bracket:</span>
                  <span>{formatCurrency(bracket.amount)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <TaxBasics />
        <TaxDeductions />
        <TaxBrackets />
        <TaxTips />
      </div>
    </CalculatorLayout>
  );
}