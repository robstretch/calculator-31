import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateAlimony } from '../../utils/calculators/alimony/calculate';

export function AlimonyCalculator() {
  const [input, setInput] = useState({
    income1: 100000,
    income2: 40000,
    marriageLength: 10,
    state: 'CA',
    hasChildren: false,
    custodialParent: 'income2'
  });

  const result = calculateAlimony(input);

  return (
    <>
      <SEO 
        title="Alimony Calculator | Estimate Spousal Support Payments"
        description="Calculate estimated alimony payments based on income, marriage length, and state guidelines. Free alimony calculator with tax implications."
        keywords={[
          'alimony calculator',
          'spousal support calculator',
          'divorce calculator',
          'alimony payments',
          'spousal maintenance'
        ]}
      />

      <CalculatorLayout
        title="Alimony Calculator"
        description="Calculate estimated alimony payments and duration"
        icon={<Calculator />}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <CalculatorInput
              label="Higher Income (Annual)"
              value={input.income1}
              onChange={(value) => setInput(prev => ({ ...prev, income1: parseFloat(value) || 0 }))}
              min={0}
              step={1000}
            />

            <CalculatorInput
              label="Lower Income (Annual)"
              value={input.income2}
              onChange={(value) => setInput(prev => ({ ...prev, income2: parseFloat(value) || 0 }))}
              min={0}
              step={1000}
            />

            <CalculatorInput
              label="Length of Marriage (Years)"
              value={input.marriageLength}
              onChange={(value) => setInput(prev => ({ ...prev, marriageLength: parseFloat(value) || 0 }))}
              min={0}
              step={1}
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">State</label>
              <select
                value={input.state}
                onChange={(e) => setInput(prev => ({ ...prev, state: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="CA">California</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={input.hasChildren}
                  onChange={(e) => setInput(prev => ({ ...prev, hasChildren: e.target.checked }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Has Children</span>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Payments</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Payment:</span>
                  <span className="font-medium">{result.monthlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Yearly Payment:</span>
                  <span className="font-medium">{result.yearlyPayment.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{result.duration.years} years, {result.duration.months} months</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Implications</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Payer</h4>
                  <div className="text-sm text-gray-600">
                    Monthly Tax Savings: {result.taxImplications.payer.monthlyTaxSavings.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Recipient</h4>
                  <div className="text-sm text-gray-600">
                    Monthly Taxable Income: {result.taxImplications.recipient.monthlyTaxable.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-3">
                {result.recommendations.map((rec, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-gray-900">{rec.category}</h4>
                    <p className="text-sm text-gray-600">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}