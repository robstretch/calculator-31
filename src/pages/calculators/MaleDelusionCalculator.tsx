import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMaleDelusion } from '../../utils/calculators/maleDelusion/calculate';
import { DelusionFactors } from '../../utils/calculators/maleDelusion/types';
import { formatNumber } from '../../utils/format';

export function MaleDelusionCalculator() {
  const [factors, setFactors] = useState<DelusionFactors>({
    age: 25,
    height: 178,
    income: 50000,
    physique: 'average',
    socialMedia: 'moderate',
    datingApps: false,
    relationshipHistory: 'some'
  });

  const results = calculateMaleDelusion(factors);

  const updateFactor = <K extends keyof DelusionFactors>(
    factor: K,
    value: DelusionFactors[K]
  ) => {
    setFactors(prev => ({ ...prev, [factor]: value }));
  };

  return (
    <CalculatorLayout
      title="Male Delusion Calculator"
      description="Calculate and analyze dating market expectations vs reality"
      icon={<Brain />}
    >
      <SEO
        title="Male Delusion Calculator | Dating Market Reality Check"
        description="Calculate and analyze dating market expectations versus reality. Free calculator for understanding dating market value and realistic expectations."
        keywords={[
          'male delusion calculator',
          'dating market calculator',
          'dating value calculator',
          'relationship expectations',
          'dating reality check',
          'dating market analysis'
        ]}
        canonicalUrl="/male-delusion-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <CalculatorInput
            label="Age"
            value={factors.age.toString()}
            onChange={(value) => updateFactor('age', parseInt(value) || 0)}
            min={18}
            max={80}
            step={1}
          />

          <CalculatorInput
            label="Height (cm)"
            value={factors.height.toString()}
            onChange={(value) => updateFactor('height', parseInt(value) || 0)}
            min={140}
            max={220}
            step={1}
          />

          <CalculatorInput
            label="Annual Income"
            value={factors.income.toString()}
            onChange={(value) => updateFactor('income', parseInt(value) || 0)}
            min={0}
            step={1000}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Physique
            </label>
            <select
              value={factors.physique}
              onChange={(e) => updateFactor('physique', e.target.value as DelusionFactors['physique'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="poor">Poor</option>
              <option value="average">Average</option>
              <option value="athletic">Athletic</option>
              <option value="excellent">Excellent</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Social Media Usage
            </label>
            <select
              value={factors.socialMedia}
              onChange={(e) => updateFactor('socialMedia', e.target.value as DelusionFactors['socialMedia'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="none">None</option>
              <option value="moderate">Moderate</option>
              <option value="heavy">Heavy</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={factors.datingApps}
                onChange={(e) => updateFactor('datingApps', e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm font-medium text-gray-700">Uses Dating Apps</span>
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship History
            </label>
            <select
              value={factors.relationshipHistory}
              onChange={(e) => updateFactor('relationshipHistory', e.target.value as DelusionFactors['relationshipHistory'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="none">No Experience</option>
              <option value="some">Some Experience</option>
              <option value="extensive">Extensive Experience</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{
                color: results.delusionScore < 20 ? '#10B981' :
                       results.delusionScore < 40 ? '#F59E0B' :
                       results.delusionScore < 60 ? '#EF4444' : '#7C3AED'
              }}>
                {results.category}
              </div>
              <div className="text-gray-500">Delusion Level</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Delusion Score"
              value={`${formatNumber(results.delusionScore)}%`}
              helpText="Higher score indicates more delusion"
            />

            <CalculatorResult
              label="Reality Score"
              value={`${formatNumber(results.realityScore)}%`}
              helpText="Higher score indicates more realistic expectations"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Market Value Analysis:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Actual Value:</span>
                  <span className="font-medium">{formatNumber(results.marketValue.actual)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Perceived Value:</span>
                  <span className="font-medium">{formatNumber(results.marketValue.perceived)}%</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Reality Gap:</span>
                  <span>{formatNumber(results.marketValue.difference)}%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Contributing Factors:</h3>
              <div className="space-y-4">
                {results.factors.map((factor, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">{factor.factor}</div>
                        <div className="text-sm text-gray-600 mt-1">{factor.description}</div>
                      </div>
                      <div className="text-red-600 font-medium">
                        +{factor.impact}%
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Dating Market Reality</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Misconceptions</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Overestimating physical appearance</li>
                <li>• Unrealistic standards from media</li>
                <li>• Dating app selection bias</li>
                <li>• Income expectations</li>
                <li>• Social status perception</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Reality Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Personal development importance</li>
                <li>• Realistic expectations</li>
                <li>• Communication skills</li>
                <li>• Emotional intelligence</li>
                <li>• Life stability</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improving Market Value</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Physical</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular exercise</li>
                <li>• Healthy diet</li>
                <li>• Good grooming</li>
                <li>• Style improvement</li>
                <li>• Physical health</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Mental</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Emotional stability</li>
                <li>• Self-awareness</li>
                <li>• Communication skills</li>
                <li>• Confidence building</li>
                <li>• Social intelligence</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Career development</li>
                <li>• Financial stability</li>
                <li>• Hobbies and interests</li>
                <li>• Social circle</li>
                <li>• Life goals</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}