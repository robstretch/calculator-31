import React, { useState } from 'react';
import { Dog } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDogPregnancy } from '../../utils/calculators/dogPregnancy';

export function DogPregnancyCalculator() {
  const [matingDate, setMatingDate] = useState(new Date().toISOString().split('T')[0]);
  const [breedSize, setBreedSize] = useState<'small' | 'medium' | 'large'>('medium');

  const results = calculateDogPregnancy(new Date(matingDate), breedSize);

  return (
    <CalculatorLayout
      title="Dog Pregnancy Calculator"
      description="Calculate dog pregnancy timeline"
      icon={<Dog />}
    >
      <SEO
        title="Dog Pregnancy Calculator | Canine Gestation Calculator"
        description="Calculate your dog's pregnancy timeline and due date. Free dog pregnancy calculator with detailed milestones and care recommendations."
        keywords={[
          'dog pregnancy calculator',
          'canine gestation calculator',
          'dog due date calculator',
          'whelping calculator',
          'dog breeding calculator',
          'puppy due date'
        ]}
        canonicalUrl="/dog-pregnancy-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pregnancy Information</h2>
          
          <CalculatorInput
            label="Mating Date"
            value={matingDate}
            onChange={setMatingDate}
            type="date"
            max={new Date().toISOString().split('T')[0]}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed Size</label>
            <div className="grid grid-cols-3 gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setBreedSize(size)}
                  className={`px-4 py-2 rounded-md ${
                    breedSize === size
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pregnancy Timeline</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.dueDate.toLocaleDateString()}
              </div>
              <div className="text-gray-500">Expected Due Date</div>
              <div className="text-sm text-gray-400 mt-1">
                {results.daysUntilDue} days to go
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Current Stage"
              value={results.stage}
              helpText={`Week ${results.currentWeek} of pregnancy`}
            />

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Pregnancy Milestones:</h3>
              <div className="space-y-4">
                {results.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-none w-16 text-sm text-gray-500">
                      Week {milestone.week}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">{milestone.description}</div>
                      <div className="text-xs text-gray-400">
                        {milestone.date.toLocaleDateString()}
                      </div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Dog Pregnancy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Pregnancy Signs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Decreased appetite initially</li>
                <li>• Increased nipple size</li>
                <li>• Behavioral changes</li>
                <li>• Weight gain</li>
                <li>• Enlarged abdomen</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Gestation Period</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Small breeds: ~61 days</li>
                <li>• Medium breeds: ~63 days</li>
                <li>• Large breeds: ~65 days</li>
                <li>• Can vary by individual</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pregnancy Care Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutrition</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• High-quality dog food</li>
                <li>• Increased portions</li>
                <li>• Fresh water always</li>
                <li>• Supplements if needed</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exercise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Gentle walks</li>
                <li>• Avoid strenuous activity</li>
                <li>• Regular movement</li>
                <li>• Monitor fatigue</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Preparation</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Whelping box</li>
                <li>• Quiet space</li>
                <li>• Clean bedding</li>
                <li>• Emergency contacts</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}