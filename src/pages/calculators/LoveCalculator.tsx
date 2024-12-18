import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateLove } from '../../utils/calculators/love/calculate';
import type { LoveInput } from '../../utils/calculators/love/types';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
];

export function LoveCalculator() {
  const [input, setInput] = useState<LoveInput>({
    name1: '',
    name2: '',
    birthdate1: '',
    birthdate2: '',
    zodiacSign1: 'Aries',
    zodiacSign2: 'Aries'
  });

  const result = input.name1 && input.name2 && input.birthdate1 && input.birthdate2
    ? calculateLove(input)
    : null;

  return (
    <CalculatorLayout
      title="Love Calculator"
      description="Calculate compatibility and relationship potential"
      icon={<Heart />}
    >
      <SEO
        title="Love Calculator | Relationship Compatibility Test"
        description="Calculate love compatibility, relationship potential, and get personalized insights with our free love calculator."
        keywords={[
          'love calculator',
          'relationship compatibility',
          'zodiac compatibility',
          'numerology compatibility',
          'relationship test',
          'love test'
        ]}
        canonicalUrl="/love-calculator"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Person 1</h2>
            <div className="space-y-4">
              <CalculatorInput
                label="Name"
                value={input.name1}
                onChange={(value) => setInput({ ...input, name1: value })}
                type="text"
              />
              <CalculatorInput
                label="Birthdate"
                value={input.birthdate1}
                onChange={(value) => setInput({ ...input, birthdate1: value })}
                type="date"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zodiac Sign
                </label>
                <select
                  value={input.zodiacSign1}
                  onChange={(e) => setInput({ ...input, zodiacSign1: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {zodiacSigns.map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Person 2</h2>
            <div className="space-y-4">
              <CalculatorInput
                label="Name"
                value={input.name2}
                onChange={(value) => setInput({ ...input, name2: value })}
                type="text"
              />
              <CalculatorInput
                label="Birthdate"
                value={input.birthdate2}
                onChange={(value) => setInput({ ...input, birthdate2: value })}
                type="date"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Zodiac Sign
                </label>
                <select
                  value={input.zodiacSign2}
                  onChange={(e) => setInput({ ...input, zodiacSign2: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {zodiacSigns.map(sign => (
                    <option key={sign} value={sign}>{sign}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Compatibility Results</h2>
              
              <div className="mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">
                    {result.compatibilityScore}%
                  </div>
                  <div className="text-gray-600">Overall Compatibility</div>
                </div>
              </div>

              <div className="space-y-4">
                {Object.entries(result.categories).map(([category, score]) => (
                  <div key={category} className="relative pt-1">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium text-gray-700 capitalize">
                        {category}
                      </div>
                      <div className="text-sm font-medium text-indigo-600">{score}%</div>
                    </div>
                    <div className="overflow-hidden h-2 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-indigo-600 rounded"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Detailed Analysis</h2>
              <div className="space-y-4">
                {result.analysis.map((item, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="font-medium text-gray-900">{item.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Numerology Insight</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {result.numerology.lifePathNumber1}
                    </div>
                    <div className="text-sm text-gray-600">Person 1's Life Path</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">
                      {result.numerology.lifePathNumber2}
                    </div>
                    <div className="text-sm text-gray-600">Person 2's Life Path</div>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <div className="text-sm text-gray-600">{result.numerology.compatibility}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                The Love Calculator uses a combination of numerology, astrology, and name compatibility 
                to analyze relationship potential. Here's how to use it:
              </p>
              
              <ol className="list-decimal pl-4 space-y-2 mt-4">
                <li>Enter both people's full names</li>
                <li>Input birthdates for numerological analysis</li>
                <li>Select zodiac signs for astrological compatibility</li>
                <li>Review the comprehensive compatibility analysis</li>
              </ol>

              <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Understanding Results</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li><strong>Overall Score:</strong> General compatibility percentage</li>
                <li><strong>Category Scores:</strong> Detailed breakdown of different aspects</li>
                <li><strong>Analysis:</strong> In-depth interpretation of compatibility factors</li>
                <li><strong>Recommendations:</strong> Suggestions for relationship growth</li>
              </ul>

              <p className="mt-4 text-sm text-gray-500">
                Note: This calculator is for entertainment purposes. Real relationships depend on many 
                factors including communication, trust, and mutual respect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}