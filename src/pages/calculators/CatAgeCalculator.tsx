import React, { useState } from 'react';
import { Cat } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateCatAge } from '../../utils/calculators/catAge';
import { formatNumber } from '../../utils/format';

export function CatAgeCalculator() {
  const [catAge, setCatAge] = useState('2');

  const results = calculateCatAge(parseFloat(catAge) || 0);

  return (
    <CalculatorLayout
      title="Cat Age Calculator"
      description="Calculate your cat's age in human years and get care recommendations"
      icon={<Cat />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cat Information</h2>
          
          <CalculatorInput
            label="Cat's Age (years)"
            value={catAge}
            onChange={setCatAge}
            min={0}
            max={30}
            step={0.5}
            placeholder="Enter your cat's age"
          />

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Age Input Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use decimal points for months (e.g., 1.5 for 1 year 6 months)</li>
              <li>• For kittens under 1 year, use fractions (e.g., 0.5 for 6 months)</li>
              <li>• Maximum recorded cat age is around 30 years</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Age Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.humanAge)} years
              </div>
              <div className="text-gray-500">Human Age Equivalent</div>
              <div className="text-sm text-gray-400 mt-1">
                Life Stage: {results.stage}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Life Stage"
              value={results.stage}
              helpText={results.description}
            />

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Age Milestones:</h3>
              <div className="space-y-3">
                {results.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{milestone.catAge} cat years</div>
                      <div className="text-sm text-gray-600">{milestone.description}</div>
                    </div>
                    <div className="text-indigo-600 font-medium">
                      {milestone.humanAge} human years
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Care Recommendations:</h3>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Cat Ages</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Life Stages</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Kitten (0-6 months)</li>
                <li>• Junior (6-12 months)</li>
                <li>• Adult (1-7 years)</li>
                <li>• Mature (7-11 years)</li>
                <li>• Senior (11-15 years)</li>
                <li>• Geriatric (15+ years)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Aging Signs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Changes in activity level</li>
                <li>• Dietary preferences</li>
                <li>• Sleep patterns</li>
                <li>• Grooming habits</li>
                <li>• Social behavior</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cat Care Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutrition</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Age-appropriate food</li>
                <li>• Fresh water daily</li>
                <li>• Portion control</li>
                <li>• Regular feeding times</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular vet visits</li>
                <li>• Dental care</li>
                <li>• Vaccinations</li>
                <li>• Parasite prevention</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Environment</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Clean litter box</li>
                <li>• Scratching posts</li>
                <li>• Comfortable bedding</li>
                <li>• Safe play areas</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}