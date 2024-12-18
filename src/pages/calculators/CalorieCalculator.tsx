import React, { useState } from 'react';
import { Apple } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateCalories } from '../../utils/calculators/calorie';
import { formatNumber } from '../../utils/format';

export function CalorieCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activityLevel, setActivityLevel] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'>('moderate');

  const activityLabels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Light (exercise 1-3 times/week)',
    moderate: 'Moderate (exercise 3-5 times/week)',
    active: 'Active (exercise 6-7 times/week)',
    'very-active': 'Very Active (hard exercise daily)'
  };

  const results = calculateCalories(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    parseFloat(age) || 0,
    gender,
    activityLevel,
    unit
  );

  return (
    <CalculatorLayout
      title="Calorie Calculator"
      description="Calculate your daily caloric needs based on your lifestyle"
      icon={<Apple />}
    >
      <SEO
        title="Calorie Calculator | Daily Caloric Needs Calculator"
        description="Calculate your daily caloric needs for weight loss, maintenance, or gain. Free calorie calculator with personalized meal plans and macro ratios."
        keywords={[
          'calorie calculator',
          'daily calorie calculator',
          'caloric needs calculator',
          'weight loss calculator',
          'diet calculator',
          'meal planning calculator'
        ]}
        canonicalUrl="/calorie-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>

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
              onChange={(e) => setActivityLevel(e.target.value as typeof activityLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.entries(activityLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Calorie Needs</h2>
          <CalculatorResult
            label="Basal Metabolic Rate (BMR)"
            value={formatNumber(results.bmr) + ' calories'}
            helpText="Calories burned at complete rest"
          />
          <CalculatorResult
            label="Maintenance Calories"
            value={formatNumber(results.maintenance) + ' calories'}
            helpText="Calories needed to maintain current weight"
          />
          <CalculatorResult
            label="Weight Loss"
            value={formatNumber(results.weightLoss) + ' calories'}
            helpText="20% calorie deficit for weight loss"
          />
          <CalculatorResult
            label="Weight Gain"
            value={formatNumber(results.weightGain) + ' calories'}
            helpText="20% calorie surplus for weight gain"
          />
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Caloric Needs</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Your daily caloric needs depend on several factors, including your basal metabolic rate (BMR),
              activity level, and fitness goals. Understanding these components helps you make informed
              decisions about your diet and exercise routine.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Basal Metabolic Rate (BMR)</h3>
                <p>BMR represents the calories your body burns to maintain basic life functions:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Breathing and circulation</li>
                  <li>• Cell production and repair</li>
                  <li>• Hormone regulation</li>
                  <li>• Brain function</li>
                  <li>• Temperature regulation</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Activity Multiplier</h3>
                <p>Your activity level increases caloric needs above BMR:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Sedentary: BMR × 1.2</li>
                  <li>• Light Activity: BMR × 1.375</li>
                  <li>• Moderate Activity: BMR × 1.55</li>
                  <li>• Active: BMR × 1.725</li>
                  <li>• Very Active: BMR × 1.9</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Weight Management Goals</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weight Loss</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Create a 20% calorie deficit</li>
                <li>• Aim for 1-2 lbs loss per week</li>
                <li>• Maintain protein intake</li>
                <li>• Include strength training</li>
                <li>• Stay hydrated</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Maintenance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Eat at maintenance calories</li>
                <li>• Monitor weight weekly</li>
                <li>• Adjust as needed</li>
                <li>• Balance macronutrients</li>
                <li>• Stay consistent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Weight Gain</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Create a 20% calorie surplus</li>
                <li>• Focus on lean mass gain</li>
                <li>• Increase protein intake</li>
                <li>• Progressive overload</li>
                <li>• Rest adequately</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Nutrition Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Macronutrient Balance</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Protein:</strong> 10-35% of calories
                  <br />
                  Essential for muscle maintenance and growth
                </p>
                <p>
                  <strong>Carbohydrates:</strong> 45-65% of calories
                  <br />
                  Primary energy source for body and brain
                </p>
                <p>
                  <strong>Fats:</strong> 20-35% of calories
                  <br />
                  Important for hormone production and nutrient absorption
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Healthy Eating Habits</h3>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <ul className="text-indigo-700 space-y-2">
                  <li>• Eat plenty of whole foods</li>
                  <li>• Include variety of fruits and vegetables</li>
                  <li>• Choose lean protein sources</li>
                  <li>• Limit processed foods</li>
                  <li>• Practice portion control</li>
                  <li>• Stay hydrated throughout the day</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Progress</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Measurements</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weekly weigh-ins</li>
                <li>• Body measurements</li>
                <li>• Progress photos</li>
                <li>• Clothing fit</li>
                <li>• Energy levels</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Adjustments</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Monitor progress weekly</li>
                <li>• Adjust calories if needed</li>
                <li>• Update activity level</li>
                <li>• Reassess goals</li>
                <li>• Stay consistent</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Long-term Success</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Set realistic goals</li>
                <li>• Build sustainable habits</li>
                <li>• Focus on health</li>
                <li>• Be patient</li>
                <li>• Celebrate progress</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}