import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateHeight } from '../../utils/calculators/height';
import { formatNumber } from '../../utils/format';

export function HeightCalculator() {
  const [currentHeight, setCurrentHeight] = useState('170');
  const [age, setAge] = useState('14');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [parentHeight1, setParentHeight1] = useState('175');
  const [parentHeight2, setParentHeight2] = useState('162');

  const results = calculateHeight(
    parseFloat(currentHeight) || 0,
    parseFloat(age) || 0,
    gender,
    parseFloat(parentHeight1) || 0,
    parseFloat(parentHeight2) || 0
  );

  return (
    <CalculatorLayout
      title="Height Calculator"
      description="Calculate predicted adult height and track growth development"
      icon={<Ruler />}
    >
      <SEO
        title="Height Calculator | Adult Height Predictor"
        description="Calculate predicted adult height based on current height, age, and genetics. Free height calculator with growth tracking."
        keywords={[
          'height calculator',
          'adult height predictor',
          'height prediction calculator',
          'growth calculator',
          'final height calculator',
          'child height calculator'
        ]}
        canonicalUrl="/height-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <CalculatorInput
            label="Current Height (cm)"
            value={currentHeight}
            onChange={setCurrentHeight}
            min={0}
            step={0.1}
            placeholder="Enter current height"
          />

          <CalculatorInput
            label="Age"
            value={age}
            onChange={setAge}
            min={0}
            max={20}
            step={1}
            placeholder="Enter age"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
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
            label="Parent 1 Height (cm)"
            value={parentHeight1}
            onChange={setParentHeight1}
            min={0}
            step={0.1}
            placeholder="Enter first parent's height"
          />

          <CalculatorInput
            label="Parent 2 Height (cm)"
            value={parentHeight2}
            onChange={setParentHeight2}
            min={0}
            step={0.1}
            placeholder="Enter second parent's height"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Height Prediction</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.adultHeight)} cm
              </div>
              <div className="text-gray-500">Predicted Adult Height</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Height Range"
              value={`${formatNumber(results.heightRange.min)} - ${formatNumber(results.heightRange.max)} cm`}
              helpText="Expected adult height range based on genetics"
            />

            <CalculatorResult
              label="Height Percentile"
              value={`${formatNumber(results.percentile)}th`}
              helpText="Current height percentile for age and gender"
            />

            <CalculatorResult
              label="Growth Status"
              value={results.growthStatus}
              helpText="Current growth status assessment"
            />

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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Height Growth</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growth Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Genetics (accounts for ~80%)</li>
                <li>• Nutrition and diet</li>
                <li>• Sleep patterns</li>
                <li>• Physical activity</li>
                <li>• Overall health</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Growth Periods</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Infancy (0-2 years)</li>
                <li>• Childhood (2-12 years)</li>
                <li>• Puberty growth spurt</li>
                <li>• Final height (16-18 years)</li>
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
                <li>• Adequate protein intake</li>
                <li>• Calcium-rich foods</li>
                <li>• Vitamin D sources</li>
                <li>• Balanced diet</li>
                <li>• Regular meals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular exercise</li>
                <li>• Adequate sleep</li>
                <li>• Good posture</li>
                <li>• Stress management</li>
                <li>• Regular check-ups</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">When to Consult</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Slow growth rate</li>
                <li>• Delayed puberty</li>
                <li>• Significant height difference</li>
                <li>• Growth plate injuries</li>
                <li>• Chronic conditions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}