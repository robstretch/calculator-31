import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateWeddingGift } from '../../utils/calculators/weddingCashGift/calculate';
import type { WeddingGiftInput } from '../../utils/calculators/weddingCashGift/types';
import { formatCurrency } from '../../utils/format';

export function WeddingCashGiftCalculator() {
  const [inputs, setInputs] = useState<WeddingGiftInput>({
    relationship: 'friend',
    attending: true,
    plusOne: false,
    location: 'local',
    weddingType: 'semiformal',
    region: 'midwest'
  });

  const result = calculateWeddingGift(inputs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Wedding Cash Gift Calculator | Appropriate Wedding Gift Amount"
        description="Calculate appropriate wedding cash gift amounts based on relationship, location, and wedding type. Get personalized gift recommendations and etiquette guidelines."
        keywords={[
          'wedding gift calculator',
          'wedding cash gift',
          'how much to give at wedding',
          'wedding gift amount',
          'wedding gift etiquette'
        ]}
        canonicalUrl="/wedding-cash-gift-calculator"
      />

      <CalculatorLayout
        title="Wedding Cash Gift Calculator"
        description="Calculate an appropriate cash gift amount for a wedding based on your relationship and circumstances."
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Relationship to Couple
              </label>
              <select
                value={inputs.relationship}
                onChange={(e) => setInputs({ ...inputs, relationship: e.target.value as WeddingGiftInput['relationship'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="immediate-family">Immediate Family</option>
                <option value="relative">Relative</option>
                <option value="close-friend">Close Friend</option>
                <option value="friend">Friend</option>
                <option value="coworker">Coworker</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Wedding Type
              </label>
              <select
                value={inputs.weddingType}
                onChange={(e) => setInputs({ ...inputs, weddingType: e.target.value as WeddingGiftInput['weddingType'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="formal">Formal</option>
                <option value="semiformal">Semi-Formal</option>
                <option value="casual">Casual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <select
                value={inputs.region}
                onChange={(e) => setInputs({ ...inputs, region: e.target.value as WeddingGiftInput['region'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="northeast">Northeast</option>
                <option value="midwest">Midwest</option>
                <option value="south">South</option>
                <option value="west">West</option>
                <option value="international">International</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Type
              </label>
              <select
                value={inputs.location}
                onChange={(e) => setInputs({ ...inputs, location: e.target.value as WeddingGiftInput['location'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="local">Local Wedding</option>
                <option value="destination">Destination Wedding</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.attending}
                  onChange={(e) => setInputs({ ...inputs, attending: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Attending Wedding</span>
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={inputs.plusOne}
                  onChange={(e) => setInputs({ ...inputs, plusOne: e.target.checked })}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Bringing Plus One</span>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Gift Amount</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Minimum</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(result.recommendedAmount.min)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Average</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(result.recommendedAmount.average)}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-600">Maximum</div>
                <div className="text-2xl font-bold text-indigo-600">
                  {formatCurrency(result.recommendedAmount.max)}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contributing Factors</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.factors.map((factor, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{factor.factor}</div>
                  <div className="text-sm text-gray-600 mt-1">{factor.description}</div>
                  <div className="text-indigo-600 mt-2">
                    Impact: {factor.impact > 0 ? '+' : ''}{factor.impact}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Gift Etiquette</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.etiquette.map((rule, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rule.rule}</div>
                  <div className="text-sm text-gray-600 mt-1">{rule.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-gray-900">{rec.category}</div>
                  <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Wedding Gift Etiquette</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600">
              Wedding gift etiquette can vary based on several factors including your relationship to the couple,
              the formality of the wedding, and regional customs. Here are some general guidelines to consider:
            </p>
            
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Key Considerations</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• Your relationship to the couple</li>
                  <li>• Wedding location and type</li>
                  <li>• Your attendance status</li>
                  <li>• Regional customs and expectations</li>
                  <li>• Your personal budget constraints</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Common Questions</h3>
                <ul className="mt-2 space-y-2 text-gray-600">
                  <li>• When should I give the gift?</li>
                  <li>• How to present a cash gift?</li>
                  <li>• What if I'm not attending?</li>
                  <li>• Should I adjust for plus ones?</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Regional Considerations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Urban vs. Rural</h3>
              <p className="mt-2 text-gray-600">
                Gift expectations often vary between urban and rural areas, with urban weddings typically 
                commanding higher gift amounts due to increased costs of living and wedding expenses.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Cultural Factors</h3>
              <p className="mt-2 text-gray-600">
                Different cultures may have varying traditions regarding wedding gifts. Some cultures have specific 
                customs about gift amounts or presentation methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}