import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateA1C } from '../../utils/calculators/a1c';
import { formatNumber } from '../../utils/format';

export function A1CCalculator() {
  const [bloodSugar, setBloodSugar] = useState('5.7');
  const [measurementType, setMeasurementType] = useState<'a1c' | 'glucose'>('a1c');

  const results = calculateA1C(parseFloat(bloodSugar) || 0, measurementType);

  return (
    <CalculatorLayout
      title="A1C Calculator"
      description="Calculate A1C levels and estimated average blood glucose"
      icon={<Activity />}
    >
      <SEO
        title="A1C Calculator | Blood Glucose & HbA1c Conversion"
        description="Calculate your A1C levels and estimated average blood glucose. Free online A1C calculator with detailed explanations and recommendations."
        keywords={[
          'a1c calculator',
          'blood glucose calculator',
          'diabetes management',
          'blood sugar conversion',
          'glycated hemoglobin',
          'hba1c'
        ]}
        canonicalUrl="/a1c-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blood Sugar Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Measurement Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMeasurementType('a1c')}
                className={`px-4 py-2 rounded-md ${
                  measurementType === 'a1c'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                A1C (%)
              </button>
              <button
                onClick={() => setMeasurementType('glucose')}
                className={`px-4 py-2 rounded-md ${
                  measurementType === 'glucose'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Blood Glucose
              </button>
            </div>
          </div>

          <CalculatorInput
            label={measurementType === 'a1c' ? 'A1C Level (%)' : 'Average Blood Glucose (mg/dL)'}
            value={bloodSugar}
            onChange={setBloodSugar}
            min={measurementType === 'a1c' ? 3 : 50}
            max={measurementType === 'a1c' ? 20 : 400}
            step={measurementType === 'a1c' ? 0.1 : 1}
            placeholder={`Enter ${measurementType === 'a1c' ? 'A1C' : 'blood glucose'} level`}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{
                color: results.riskLevel === 'low' ? '#10B981' :
                       results.riskLevel === 'moderate' ? '#F59E0B' :
                       results.riskLevel === 'high' ? '#EF4444' : '#7C3AED'
              }}>
                {formatNumber(results.a1c, 1)}%
              </div>
              <div className="text-gray-500">A1C Level</div>
              <div className="text-sm font-medium mt-1" style={{
                color: results.riskLevel === 'low' ? '#059669' :
                       results.riskLevel === 'moderate' ? '#D97706' :
                       results.riskLevel === 'high' ? '#DC2626' : '#6D28D9'
              }}>
                {results.range}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Average Blood Sugar"
              value={`${formatNumber(results.averageBloodSugar)} mg/dL`}
              helpText="Estimated average glucose level"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Target Blood Sugar Ranges:</h3>
              <div className="space-y-3">
                {results.dailyReadings.map((reading, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{reading.time}:</span>
                    <span className="font-medium">
                      {reading.targetRange.min}-{reading.targetRange.max} mg/dL
                    </span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding A1C</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is A1C?</h3>
              <p className="text-gray-600">
                A1C (glycated hemoglobin) is a blood test that measures your average blood sugar 
                levels over the past 2-3 months. It's used to diagnose diabetes and monitor how 
                well diabetes is being managed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Target Ranges</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Normal: Below 5.7%</li>
                <li>• Prediabetes: 5.7% to 6.4%</li>
                <li>• Diabetes: 6.5% or above</li>
                <li>• Target for most diabetics: Below 7%</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Blood Sugar</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Diet</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Monitor carbohydrates</li>
                <li>• Choose whole grains</li>
                <li>• Eat regular meals</li>
                <li>• Control portions</li>
                <li>• Stay hydrated</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exercise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular physical activity</li>
                <li>• Mix cardio and strength</li>
                <li>• Monitor blood sugar</li>
                <li>• Stay consistent</li>
                <li>• Start gradually</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular testing</li>
                <li>• Stress management</li>
                <li>• Adequate sleep</li>
                <li>• Regular check-ups</li>
                <li>• Support system</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}