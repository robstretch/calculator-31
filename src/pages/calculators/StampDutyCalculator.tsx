import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateStampDuty } from '../../utils/calculators/stampDuty/calculate';
import type { StampDutyInput } from '../../utils/calculators/stampDuty/types';
import { formatCurrency } from '../../utils/format';

export function StampDutyCalculator() {
  const [inputs, setInputs] = useState<StampDutyInput>({
    propertyPrice: 300000,
    buyerType: 'next-home',
    propertyType: 'residential',
    country: 'england'
  });

  const result = calculateStampDuty(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Stamp Duty Calculator | Property Tax Calculator"
        description="Calculate stamp duty land tax (SDLT) on property purchases. Get instant results for residential and commercial properties."
        keywords={[
          'stamp duty calculator',
          'SDLT calculator',
          'property tax calculator',
          'first time buyer stamp duty',
          'house purchase tax'
        ]}
        canonicalUrl="/stamp-duty-calculator"
      />

      <CalculatorLayout
        title="Stamp Duty Calculator"
        description="Calculate stamp duty land tax (SDLT) for property purchases in the UK."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Property Price"
              value={inputs.propertyPrice}
              onChange={(value) => setInputs({ ...inputs, propertyPrice: parseFloat(value) })}
              min={0}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Buyer Type
              </label>
              <select
                value={inputs.buyerType}
                onChange={(e) => setInputs({ ...inputs, buyerType: e.target.value as StampDutyInput['buyerType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="first-time">First Time Buyer</option>
                <option value="next-home">Home Mover</option>
                <option value="additional">Additional Property</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property Type
              </label>
              <select
                value={inputs.propertyType}
                onChange={(e) => setInputs({ ...inputs, propertyType: e.target.value as StampDutyInput['propertyType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <select
                value={inputs.country}
                onChange={(e) => setInputs({ ...inputs, country: e.target.value as StampDutyInput['country'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="england">England</option>
                <option value="scotland">Scotland</option>
                <option value="wales">Wales</option>
                <option value="northern-ireland">Northern Ireland</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Stamp Duty Summary</h3>
            <div className="space-y-4">
              <CalculatorResult
                label="Total Stamp Duty"
                value={formatCurrency(result.totalTax)}
                helpText="Total tax payable"
              />
              <CalculatorResult
                label="Effective Tax Rate"
                value={`${result.effectiveRate}%`}
                helpText="Average tax rate on property value"
              />
              <CalculatorResult
                label="Total Cost"
                value={formatCurrency(result.breakdown.netCost)}
                helpText="Property price plus stamp duty"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Band Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Band</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.bands.map((band, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(band.threshold)}+
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {band.rate}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(band.taxAmount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {result.savings && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">First-Time Buyer Savings</h3>
              <div className="space-y-4">
                <CalculatorResult
                  label="Standard Rate Tax"
                  value={formatCurrency(result.savings.normalRate)}
                  helpText="Tax without first-time buyer relief"
                />
                <CalculatorResult
                  label="First-Time Buyer Tax"
                  value={formatCurrency(result.savings.firstTimeBuyer)}
                  helpText="Tax with first-time buyer relief"
                />
                <CalculatorResult
                  label="Total Savings"
                  value={formatCurrency(result.savings.saved)}
                  helpText="Amount saved with relief"
                />
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="font-medium text-gray-700">{rec.category}:</div>
                  <div className="text-gray-600">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </div>
  );
}