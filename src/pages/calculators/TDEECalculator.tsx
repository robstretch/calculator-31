import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateTDEE, ActivityLevel } from '../../utils/calculators/tdee';
import { formatNumber } from '../../utils/format';

export function TDEECalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');

  const results = calculateTDEE(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    parseFloat(age) || 0,
    gender,
    activityLevel,
    unit
  );

  return (
    <CalculatorLayout
      title="TDEE Calculator"
      description="Calculate your Total Daily Energy Expenditure and macro recommendations"
      icon={<Scale />}
    >
      <SEO
        title="TDEE Calculator | Total Daily Energy Expenditure Calculator"
        description="Calculate your Total Daily Energy Expenditure (TDEE) and daily caloric needs based on activity level. Free TDEE calculator with macro breakdowns."
        keywords={[
          'tdee calculator',
          'total daily energy expenditure',
          'maintenance calories',
          'calorie calculator',
          'activity level calculator',
          'daily calorie needs'
        ]}
        canonicalUrl="/tdee-calculator"
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
            <select
              value={activityLevel}
              onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="sedentary">Sedentary (little or no exercise)</option>
              <option value="light">Light (exercise 1-3 times/week)</option>
              <option value="moderate">Moderate (exercise 3-5 times/week)</option>
              <option value="active">Active (exercise 6-7 times/week)</option>
              <option value="veryActive">Very Active (hard exercise daily)</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Energy Requirements</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.tdee)} calories
              </div>
              <div className="text-gray-500">Daily Energy Expenditure</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Basal Metabolic Rate (BMR)"
              value={`${formatNumber(results.bmr)} calories`}
              helpText="Calories burned at complete rest"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Calorie Goals:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Loss:</span>
                  <span className="font-medium">
                    {formatNumber(results.goals.weightLoss.min)} - {formatNumber(results.goals.weightLoss.max)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maintenance:</span>
                  <span className="font-medium">{formatNumber(results.goals.maintenance)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Gain:</span>
                  <span className="font-medium">
                    {formatNumber(results.goals.weightGain.min)} - {formatNumber(results.goals.weightGain.max)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Recommended Macros (g/day):</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein:</span>
                  <span className="font-medium">
                    {results.macroBreakdown.protein.min} - {results.macroBreakdown.protein.max}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbohydrates:</span>
                  <span className="font-medium">
                    {results.macroBreakdown.carbs.min} - {results.macroBreakdown.carbs.max}g
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fats:</span>
                  <span className="font-medium">
                    {results.macroBreakdown.fats.min} - {results.macroBreakdown.fats.max}g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding TDEE</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is TDEE?</h3>
              <p className="text-gray-600">
                Total Daily Energy Expenditure (TDEE) is the total number of calories your body burns in a day, including:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Basal Metabolic Rate (BMR)</li>
                <li>• Physical Activity</li>
                <li>• Thermic Effect of Food</li>
                <li>• Non-exercise Activity</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Using Your TDEE</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weight Loss: Eat below TDEE</li>
                <li>• Maintenance: Eat at TDEE</li>
                <li>• Weight Gain: Eat above TDEE</li>
                <li>• Adjust based on results</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Macronutrient Guidelines</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Protein</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Muscle maintenance</li>
                <li>• Recovery support</li>
                <li>• Satiety promotion</li>
                <li>• 4 calories per gram</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Carbohydrates</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Energy source</li>
                <li>• Exercise performance</li>
                <li>• Brain function</li>
                <li>• 4 calories per gram</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fats</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Hormone production</li>
                <li>• Nutrient absorption</li>
                <li>• Brain health</li>
                <li>• 9 calories per gram</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}