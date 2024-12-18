import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateProRata } from '../../utils/calculators/proRata/calculate';
import { formatCurrency, formatNumber } from '../../utils/format';

export function ProRataCalculator() {
  const [inputs, setInputs] = useState({
    totalShares: 1000000,
    newShares: 100000,
    currentHolding: 50000,
    sharePrice: 1.00
  });

  const results = calculateProRata(inputs);

  return (
    <CalculatorLayout
      title="Pro Rata Calculator"
      description="Calculate pro-rata rights, entitlements, and dilution effects for share offerings."
      icon={<Calculator />}
    >
      <SEO 
        title="Pro Rata Calculator | Share Offering Rights Calculator"
        description="Calculate your pro-rata entitlement in share offerings. Determine participation rights, costs, and dilution effects with our free pro rata calculator."
        keywords={[
          'pro rata calculator',
          'share offering calculator',
          'dilution calculator',
          'rights issue calculator',
          'equity dilution'
        ]}
        canonicalUrl="/pro-rata-calculator"
      />

      <div className="grid gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Share Offering Details</h2>
          <div className="grid gap-4">
            <CalculatorInput
              label="Total Existing Shares"
              value={inputs.totalShares}
              onChange={(value) => setInputs({ ...inputs, totalShares: Number(value) })}
              min={0}
            />
            <CalculatorInput
              label="New Shares Being Issued"
              value={inputs.newShares}
              onChange={(value) => setInputs({ ...inputs, newShares: Number(value) })}
              min={0}
            />
            <CalculatorInput
              label="Your Current Shares"
              value={inputs.currentHolding}
              onChange={(value) => setInputs({ ...inputs, currentHolding: Number(value) })}
              min={0}
            />
            <CalculatorInput
              label="Share Price"
              value={inputs.sharePrice}
              onChange={(value) => setInputs({ ...inputs, sharePrice: Number(value) })}
              min={0}
              step={0.01}
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Entitlement and Cost */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Your Pro-Rata Rights</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Pro-Rata Entitlement</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatNumber(results.entitlement, 0)} shares
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Cost to Participate</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(results.cost)}
                </div>
              </div>
            </div>
          </div>

          {/* New Holding Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">After Participation</h3>
            <div className="grid gap-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">New Share Count</div>
                  <div className="text-xl font-semibold">
                    {formatNumber(results.newHolding.shares, 0)}
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">New Percentage</div>
                  <div className="text-xl font-semibold">
                    {formatNumber(results.newHolding.percentage, 2)}%
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">New Value</div>
                  <div className="text-xl font-semibold">
                    {formatCurrency(results.newHolding.value)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Dilution Analysis */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Dilution Analysis</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Without Participation</div>
                <div className="text-xl font-semibold text-red-600">
                  -{formatNumber(results.dilution.withoutParticipation, 2)}%
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">With Participation</div>
                <div className="text-xl font-semibold text-green-600">
                  -{formatNumber(results.dilution.withParticipation, 2)}%
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="grid gap-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-indigo-600">{rec.category}</div>
                  <p className="text-gray-600 mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}