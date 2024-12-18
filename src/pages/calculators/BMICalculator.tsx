import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBMI } from '../../utils/calculators/bmi';
import { formatNumber } from '../../utils/format';

export function BMICalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');

  const results = calculateBMI(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    unit
  );

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index and check your weight category"
      icon={<Scale />}
    >
      <SEO
        title="BMI Calculator | Calculate Body Mass Index"
        description="Calculate your Body Mass Index (BMI) instantly with our free BMI calculator. Get your weight category and personalized health recommendations."
        keywords={[
          'bmi calculator',
          'body mass index',
          'weight calculator',
          'healthy weight range',
          'obesity calculator',
          'weight category'
        ]}
        canonicalUrl="/bmi-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Measurements</h2>
          
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
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <CalculatorResult
            label="Your BMI"
            value={formatNumber(results.bmi)}
            helpText="Body Mass Index"
          />
          <CalculatorResult
            label="Weight Category"
            value={results.category}
            helpText="Based on WHO guidelines"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">BMI Categories:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>Underweight: Less than 18.5</li>
              <li>Normal weight: 18.5 - 24.9</li>
              <li>Overweight: 25 - 29.9</li>
              <li>Obese: 30 or greater</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding BMI</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Body Mass Index (BMI) is a simple measurement using your weight and height to work out if your weight is healthy.
              The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
            </p>
            <p className="mt-4">
              While BMI is a useful screening tool, it's important to note that it has limitations:
            </p>
            <ul className="mt-4 space-y-2">
              <li>• BMI may overestimate body fat in athletes and muscular individuals</li>
              <li>• BMI may underestimate body fat in older persons and those who have lost muscle</li>
              <li>• BMI doesn't distinguish between fat, muscle, and bone mass</li>
              <li>• BMI doesn't account for where fat is stored in the body</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Implications of BMI Categories</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Underweight (BMI {'<'} 18.5)</h3>
              <p className="text-gray-600 mb-2">Being underweight may indicate:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Malnutrition</li>
                <li>• Eating disorders</li>
                <li>• Hormonal problems</li>
                <li>• Weakened immune system</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Normal Weight (BMI 18.5-24.9)</h3>
              <p className="text-gray-600 mb-2">Benefits include:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Lower risk of heart disease</li>
                <li>• Better blood sugar control</li>
                <li>• Improved mobility</li>
                <li>• Higher energy levels</li>
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Overweight (BMI 25-29.9)</h3>
              <p className="text-gray-600 mb-2">Increased risk of:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Type 2 diabetes</li>
                <li>• High blood pressure</li>
                <li>• Heart disease</li>
                <li>• Joint problems</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Obese (BMI ≥ 30)</h3>
              <p className="text-gray-600 mb-2">High risk of:</p>
              <ul className="text-gray-600 space-y-1">
                <li>• Cardiovascular disease</li>
                <li>• Sleep apnea</li>
                <li>• Certain cancers</li>
                <li>• Mental health issues</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Healthy Weight Management</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Diet</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Eat plenty of fruits and vegetables</li>
                <li>• Choose whole grains</li>
                <li>• Include lean proteins</li>
                <li>• Control portion sizes</li>
                <li>• Stay hydrated</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exercise</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Aim for 150 minutes/week</li>
                <li>• Include cardio activities</li>
                <li>• Add strength training</li>
                <li>• Stay consistent</li>
                <li>• Find activities you enjoy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Get adequate sleep</li>
                <li>• Manage stress</li>
                <li>• Track your progress</li>
                <li>• Set realistic goals</li>
                <li>• Seek support when needed</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Consult a Healthcare Provider</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">General Guidelines</h3>
              <p className="text-gray-600">
                Consider consulting a healthcare provider if:
              </p>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Your BMI is outside the healthy range</li>
                <li>• You experience unexplained weight changes</li>
                <li>• You have other health concerns</li>
                <li>• You're planning significant lifestyle changes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Measurements</h3>
              <p className="text-gray-600">
                Your healthcare provider may use additional measurements:
              </p>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• Waist circumference</li>
                <li>• Body fat percentage</li>
                <li>• Blood pressure</li>
                <li>• Blood sugar levels</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}