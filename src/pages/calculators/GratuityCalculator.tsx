import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateGratuity, serviceTypes } from '../../utils/calculators/gratuity/calculate';
import { formatCurrency, formatNumber } from '../../utils/format';

export function GratuityCalculator() {
  const [amount, setAmount] = useState('100');
  const [serviceType, setServiceType] = useState('restaurant');
  const [serviceQuality, setServiceQuality] = useState<'poor' | 'fair' | 'good' | 'excellent'>('good');
  const [splitBetween, setSplitBetween] = useState('1');

  const results = calculateGratuity(
    parseFloat(amount) || 0,
    serviceType,
    serviceQuality,
    parseInt(splitBetween) || 1
  );

  return (
    <CalculatorLayout
      title="Gratuity Calculator"
      description="Calculate appropriate gratuity for various services"
      icon={<DollarSign />}
    >
      <SEO
        title="Gratuity Calculator | Tip Calculator"
        description="Calculate appropriate gratuity amounts for various services. Free tip calculator with industry standards and recommendations."
        keywords={[
          'gratuity calculator',
          'tip calculator',
          'service tip calculator',
          'restaurant tip calculator',
          'tipping guide',
          'tip percentage calculator'
        ]}
        canonicalUrl="/gratuity-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Service Details</h2>
          
          <CalculatorInput
            label="Bill Amount"
            value={amount}
            onChange={setAmount}
            min={0}
            step={0.01}
            placeholder="Enter bill amount"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Type
            </label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {Object.entries(serviceTypes).map(([key, service]) => (
                <option key={key} value={key}>{service.category}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Service Quality
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['poor', 'fair', 'good', 'excellent'] as const).map((quality) => (
                <button
                  key={quality}
                  onClick={() => setServiceQuality(quality)}
                  className={`px-4 py-2 rounded-md ${
                    serviceQuality === quality
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <CalculatorInput
            label="Split Between"
            value={splitBetween}
            onChange={setSplitBetween}
            min={1}
            step={1}
            placeholder="Enter number of people"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Gratuity Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.suggestedTip)}
              </div>
              <div className="text-gray-500">Suggested Gratuity</div>
              <div className="text-sm text-gray-400 mt-1">
                {formatNumber(results.tipPercentage)}% of bill
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Bill Amount"
              value={formatCurrency(results.baseAmount)}
              helpText="Pre-gratuity amount"
            />
            
            <CalculatorResult
              label="Total Amount"
              value={formatCurrency(results.totalAmount)}
              helpText="Including gratuity"
            />
            
            {results.splitAmount && (
              <CalculatorResult
                label="Amount Per Person"
                value={formatCurrency(results.splitAmount)}
                helpText={`Split between ${splitBetween} people`}
              />
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Industry Standards:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Minimum:</span>
                  <span className="font-medium">{formatNumber(results.industryStandard.minimum)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average:</span>
                  <span className="font-medium">{formatNumber(results.industryStandard.average)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Exceptional:</span>
                  <span className="font-medium">{formatNumber(results.industryStandard.exceptional)}%</span>
                </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Gratuity</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Industries</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Restaurants: 15-22% standard</li>
                <li>• Hair/Beauty: 15-25% of service</li>
                <li>• Transportation: 10-20% of fare</li>
                <li>• Delivery: 10-20% of order</li>
                <li>• Hotel Services: $2-5 per service</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Factors to Consider</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Service quality</li>
                <li>• Local customs</li>
                <li>• Group size</li>
                <li>• Service complexity</li>
                <li>• Special requests</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipping Etiquette</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Do's</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Tip on pre-tax amount</li>
                <li>• Consider extra effort</li>
                <li>• Be consistent</li>
                <li>• Show appreciation</li>
                <li>• Round up when possible</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Don'ts</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Skip tipping entirely</li>
                <li>• Base on personal bias</li>
                <li>• Forget included gratuity</li>
                <li>• Under-tip large groups</li>
                <li>• Punish for kitchen errors</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Cases</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Large groups</li>
                <li>• Holiday season</li>
                <li>• Difficult requests</li>
                <li>• Extended service time</li>
                <li>• Regular service providers</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}