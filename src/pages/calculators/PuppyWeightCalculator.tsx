import React, { useState } from 'react';
import { Dog } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePuppyWeight } from '../../utils/calculators/puppyWeight';
import { formatNumber } from '../../utils/format';

export function PuppyWeightCalculator() {
  const [currentWeight, setCurrentWeight] = useState('10');
  const [ageInWeeks, setAgeInWeeks] = useState('12');
  const [breedSize, setBreedSize] = useState<'small' | 'medium' | 'large' | 'giant'>('medium');

  const results = calculatePuppyWeight(
    parseFloat(currentWeight) || 0,
    parseFloat(ageInWeeks) || 0,
    breedSize
  );

  return (
    <CalculatorLayout
      title="Puppy Weight Calculator"
      description="Calculate adult weight predictions"
      icon={<Dog />}
    >
      <SEO
        title="Puppy Weight Calculator | Adult Dog Weight Predictor"
        description="Calculate your puppy's predicted adult weight based on current weight and breed size. Free puppy growth calculator with detailed predictions."
        keywords={[
          'puppy weight calculator',
          'dog weight predictor',
          'adult dog weight',
          'puppy growth calculator',
          'dog size calculator',
          'puppy development'
        ]}
        canonicalUrl="/puppy-weight-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Puppy Information</h2>
          
          <CalculatorInput
            label="Current Weight (lbs)"
            value={currentWeight}
            onChange={setCurrentWeight}
            min={0}
            step={0.1}
            placeholder="Enter current weight"
          />
          
          <CalculatorInput
            label="Age (weeks)"
            value={ageInWeeks}
            onChange={setAgeInWeeks}
            min={0}
            max={52}
            step={1}
            placeholder="Enter age in weeks"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Breed Size</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'small', label: 'Small (< 20 lbs)' },
                { value: 'medium', label: 'Medium (20-50 lbs)' },
                { value: 'large', label: 'Large (50-100 lbs)' },
                { value: 'giant', label: 'Giant (> 100 lbs)' }
              ].map((size) => (
                <button
                  key={size.value}
                  onClick={() => setBreedSize(size.value as typeof breedSize)}
                  className={`px-4 py-2 text-sm rounded-md ${
                    breedSize === size.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Growth Projection</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.adultWeight)} lbs
              </div>
              <div className="text-gray-500">Estimated Adult Weight</div>
              <div className="text-sm text-gray-400 mt-1">
                Range: {formatNumber(results.weightRange.min)} - {formatNumber(results.weightRange.max)} lbs
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Growth Stage"
              value={results.growthStage}
              helpText="Current developmental period"
            />
            
            <CalculatorResult
              label="Growth Progress"
              value={`${formatNumber(results.growthPercentage)}%`}
              helpText="Percentage of adult weight reached"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Monthly Weight Estimates:</h3>
              <div className="grid grid-cols-2 gap-4">
                {results.monthlyEstimates.map((estimate) => (
                  <div key={estimate.month} className="flex justify-between text-sm">
                    <span className="text-gray-600">Month {estimate.month}:</span>
                    <span className="font-medium">{formatNumber(estimate.weight)} lbs</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Puppy Growth</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growth Stages</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Neonatal (0-2 weeks): Rapid early growth</li>
                <li>• Nursing (2-8 weeks): Steady weight gain</li>
                <li>• Socialization (8-12 weeks): Key development period</li>
                <li>• Juvenile (3-6 months): Growth rate varies by breed</li>
                <li>• Adolescent (6-12 months): Gradual maturation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growth Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Genetics and breed size</li>
                <li>• Nutrition and diet</li>
                <li>• Exercise levels</li>
                <li>• Health status</li>
                <li>• Spaying/neutering timing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Healthy Growth Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Nutrition</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Feed puppy-specific food</li>
                <li>• Multiple meals daily</li>
                <li>• Monitor portion sizes</li>
                <li>• Fresh water always</li>
                <li>• Avoid overfeeding</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exercise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Age-appropriate activity</li>
                <li>• Avoid overexertion</li>
                <li>• Regular playtime</li>
                <li>• Mental stimulation</li>
                <li>• Rest periods</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Care</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular vet check-ups</li>
                <li>• Vaccination schedule</li>
                <li>• Parasite prevention</li>
                <li>• Weight monitoring</li>
                <li>• Growth tracking</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}