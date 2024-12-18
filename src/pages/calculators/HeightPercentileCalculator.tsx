import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateHeightPercentile } from '../../utils/calculators/heightPercentile/calculate';

export function HeightPercentileCalculator() {
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [unit, setUnit] = useState<'cm' | 'inches'>('cm');

  const result = calculateHeightPercentile({
    height: parseFloat(height) || 0,
    age: parseFloat(age) || 0,
    gender,
    unit
  });

  return (
    <>
      <SEO 
        title="Height Percentile Calculator | Growth Chart Analysis"
        description="Calculate height percentile and compare to population averages. Understand growth patterns with our comprehensive height analysis tool."
        keywords={[
          'height percentile calculator',
          'growth chart calculator',
          'height comparison',
          'height analysis',
          'growth percentile'
        ]}
        canonicalUrl="/height-percentile-calculator"
      />
      
      <CalculatorLayout
        title="Height Percentile Calculator"
        description="Calculate your height percentile and compare to population averages"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setUnit('cm')}
                  className={`px-4 py-2 rounded-md ${
                    unit === 'cm'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Centimeters
                </button>
                <button
                  onClick={() => setUnit('inches')}
                  className={`px-4 py-2 rounded-md ${
                    unit === 'inches'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Inches
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`px-4 py-2 rounded-md ${
                    gender === 'male'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Male
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`px-4 py-2 rounded-md ${
                    gender === 'female'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Female
                </button>
              </div>
            </div>

            <CalculatorInput
              label="Height"
              value={height}
              onChange={setHeight}
              type="number"
              min={0}
              placeholder={`Enter height in ${unit}`}
            />

            <CalculatorInput
              label="Age"
              value={age}
              onChange={setAge}
              type="number"
              min={0}
              max={120}
              placeholder="Enter age in years"
            />
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Percentile"
              value={`${result.percentile}%`}
              helpText={`You are taller than ${result.comparison.below}% of the population`}
            />
            
            <CalculatorResult
              label="Category"
              value={result.category}
              helpText={`Based on your height percentile`}
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Height Ranges</h3>
            <div className="space-y-3">
              {result.ranges.map((range, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{range.percentile}th Percentile:</span>
                  <span className="font-medium">{range.height} cm</span>
                  <span className="text-gray-500">{range.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900">{rec.category}</h4>
                  <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}