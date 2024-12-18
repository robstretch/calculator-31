import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBMR } from '../../utils/calculators/bmr/calculate';
import { formatNumber } from '../../utils/format';

export function BMRCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const results = calculateBMR(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    parseFloat(age) || 0,
    gender,
    unit
  );

  return (
    <CalculatorLayout
      title="BMR Calculator"
      description="Calculate your Basal Metabolic Rate and caloric needs"
      icon={<Scale />}
    >
      <SEO
        title="BMR Calculator | Basal Metabolic Rate Calculator"
        description="Calculate your Basal Metabolic Rate (BMR) and daily caloric needs. Free BMR calculator with detailed nutritional recommendations."
        keywords={[
          'bmr calculator',
          'basal metabolic rate',
          'calorie calculator',
          'metabolism calculator',
          'daily calorie needs',
          'caloric requirement calculator'
        ]}
        canonicalUrl="/bmr-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'metric'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'imperial'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="flex space-x-4">
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
            label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            value={weight}
            onChange={setWeight}
            min={0}
            step={0.1}
            placeholder="Enter weight"
          />

          <CalculatorInput
            label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            value={height}
            onChange={setHeight}
            min={0}
            step={0.1}
            placeholder="Enter height"
          />

          <CalculatorInput
            label="Age"
            value={age}
            onChange={setAge}
            min={0}
            max={120}
            step={1}
            placeholder="Enter age"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.bmr)} calories
              </div>
              <div className="text-gray-500">Basal Metabolic Rate</div>
              <div className="text-sm text-gray-400 mt-1">
                {results.methodUsed}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Daily Caloric Needs:</h3>
            <div className="space-y-3">
              {Object.entries(results.dailyCalories).map(([level, calories]) => (
                <div key={level} className="flex justify-between items-center">
                  <span className="text-gray-600 capitalize">{level} Activity:</span>
                  <span className="font-medium">{formatNumber(calories)} calories</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Recommended Macro Ranges:</h3>
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-1">Protein:</div>
                <div className="font-medium">
                  {results.macroBreakdown.protein.min} - {results.macroBreakdown.protein.max}g
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Carbohydrates:</div>
                <div className="font-medium">
                  {results.macroBreakdown.carbs.min} - {results.macroBreakdown.carbs.max}g
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Fats:</div>
                <div className="font-medium">
                  {results.macroBreakdown.fats.min} - {results.macroBreakdown.fats.max}g
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding BMR</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is BMR?</h3>
              <p className="text-gray-600">
                Basal Metabolic Rate (BMR) is the number of calories your body burns while performing
                basic life-sustaining functions, including:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Breathing</li>
                <li>• Blood circulation</li>
                <li>• Cell production</li>
                <li>• Nutrient processing</li>
                <li>• Hormone regulation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Factors Affecting BMR</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Age (decreases with age)</li>
                <li>• Gender (typically higher in males)</li>
                <li>• Body composition</li>
                <li>• Genetics</li>
                <li>• Hormonal factors</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Using Your BMR</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weight Loss</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Create caloric deficit</li>
                <li>• Track daily intake</li>
                <li>• Adjust activity level</li>
                <li>• Monitor progress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weight Gain</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Increase caloric intake</li>
                <li>• Focus on nutrition</li>
                <li>• Progressive overload</li>
                <li>• Track measurements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Maintenance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Balance intake/output</li>
                <li>• Regular exercise</li>
                <li>• Consistent meals</li>
                <li>• Weekly weigh-ins</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}