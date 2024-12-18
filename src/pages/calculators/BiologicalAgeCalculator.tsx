import React, { useState } from 'react';
import { Activity, Heart, Scale, Clock } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateBiologicalAge } from '../../utils/calculators/biologicalAge/calculate';
import type { BiologicalAgeInput } from '../../utils/calculators/biologicalAge/types';

export function BiologicalAgeCalculator() {
  const [inputs, setInputs] = useState<BiologicalAgeInput>({
    chronologicalAge: 30,
    gender: 'male',
    height: 70,
    weight: 160,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    exerciseHours: 3,
    sleepHours: 7,
    smokingStatus: 'never',
    alcoholDrinksPerWeek: 2,
    chronicConditions: [],
    unit: 'imperial'
  });

  const result = calculateBiologicalAge(inputs);

  return (
    <CalculatorLayout
      title="Biological Age Calculator"
      description="Calculate your biological age based on health and lifestyle factors."
      icon={<Activity />}
    >
      <SEO
        title="Biological Age Calculator | Health Age Assessment"
        description="Calculate your biological age based on health metrics, lifestyle factors, and medical history. Free biological age calculator with personalized recommendations."
        keywords={[
          'biological age calculator',
          'real age calculator',
          'health age calculator',
          'longevity calculator',
          'life expectancy calculator',
          'health assessment calculator'
        ]}
        canonicalUrl="/biological-age-calculator"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorInput
                label="Age (years)"
                value={inputs.chronologicalAge}
                onChange={(value) => setInputs(prev => ({ ...prev, chronologicalAge: Number(value) }))}
                min={18}
                max={100}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <div className="grid grid-cols-2 gap-3">
                  {['male', 'female'].map(gender => (
                    <button
                      key={gender}
                      onClick={() => setInputs(prev => ({ ...prev, gender: gender as 'male' | 'female' }))}
                      className={`px-4 py-2 text-sm rounded-md border-2 transition-colors ${
                        inputs.gender === gender
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <CalculatorInput
                label="Height (inches)"
                value={inputs.height}
                onChange={(value) => setInputs(prev => ({ ...prev, height: Number(value) }))}
                min={48}
                max={96}
              />

              <CalculatorInput
                label="Weight (lbs)"
                value={inputs.weight}
                onChange={(value) => setInputs(prev => ({ ...prev, weight: Number(value) }))}
                min={80}
                max={400}
              />
            </div>
          </div>

          {/* Health Metrics */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Health Metrics</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Systolic BP"
                  value={inputs.bloodPressure.systolic}
                  onChange={(value) => setInputs(prev => ({
                    ...prev,
                    bloodPressure: { ...prev.bloodPressure, systolic: Number(value) }
                  }))}
                  min={80}
                  max={200}
                />
                <CalculatorInput
                  label="Diastolic BP"
                  value={inputs.bloodPressure.diastolic}
                  onChange={(value) => setInputs(prev => ({
                    ...prev,
                    bloodPressure: { ...prev.bloodPressure, diastolic: Number(value) }
                  }))}
                  min={40}
                  max={130}
                />
              </div>

              <CalculatorInput
                label="Exercise (hours/week)"
                value={inputs.exerciseHours}
                onChange={(value) => setInputs(prev => ({ ...prev, exerciseHours: Number(value) }))}
                min={0}
                max={30}
                step={0.5}
              />

              <CalculatorInput
                label="Sleep (hours/day)"
                value={inputs.sleepHours}
                onChange={(value) => setInputs(prev => ({ ...prev, sleepHours: Number(value) }))}
                min={4}
                max={12}
                step={0.5}
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Smoking Status</label>
                <div className="grid grid-cols-3 gap-3">
                  {['never', 'former', 'current'].map(status => (
                    <button
                      key={status}
                      onClick={() => setInputs(prev => ({ 
                        ...prev, 
                        smokingStatus: status as 'never' | 'former' | 'current'
                      }))}
                      className={`px-4 py-2 text-sm rounded-md border-2 transition-colors ${
                        inputs.smokingStatus === status
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <CalculatorInput
                label="Alcoholic Drinks per Week"
                value={inputs.alcoholDrinksPerWeek}
                onChange={(value) => setInputs(prev => ({ 
                  ...prev, 
                  alcoholDrinksPerWeek: Number(value)
                }))}
                min={0}
                max={50}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Results */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Your Results</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="text-center p-6 bg-indigo-50 rounded-lg">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {result.biologicalAge}
                </div>
                <div className="text-sm text-indigo-600 font-medium">
                  Biological Age
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {result.ageDifference > 0 
                    ? `${result.ageDifference} years older than chronological age`
                    : `${Math.abs(result.ageDifference)} years younger than chronological age`
                  }
                </div>
              </div>

              <CalculatorResult
                label="Health Score"
                value={`${result.healthScore}/100`}
                helpText="Overall health assessment based on all factors"
              />

              <CalculatorResult
                label="BMI"
                value={result.metrics.bmi.toFixed(1)}
                helpText="Body Mass Index"
              />

              <CalculatorResult
                label="Blood Pressure Category"
                value={result.metrics.bloodPressureCategory}
                helpText="Based on systolic and diastolic readings"
              />

              <CalculatorResult
                label="Metabolic Age"
                value={result.metrics.metabolicAge}
                helpText="Age of your metabolism based on key health factors"
              />
            </div>
          </div>

          {/* Risk Factors */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Risk Factors</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {result.riskFactors.map((factor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{factor.factor}</div>
                      <div className="text-sm text-gray-500">{factor.description}</div>
                    </div>
                    <div className={`text-sm font-medium ${
                      factor.impact > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {factor.impact > 0 ? '+' : ''}{factor.impact} years
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{rec.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                    <p className="text-sm text-indigo-600 mt-1">
                      Potential improvement: {rec.potentialYearsReduction} years
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Understanding Biological Age</h2>
          </div>
          
          <div className="p-6 prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Biological age, also known as physiological age, measures how well your body is functioning 
              relative to your chronological age. This calculator analyzes various health and lifestyle 
              factors to estimate your biological age and provides insights into potential areas for improvement.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Factors</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Physical Health</h4>
                <p className="text-gray-600">
                  BMI, blood pressure, and chronic conditions significantly impact biological age. 
                  Maintaining healthy ranges through diet and exercise can help reduce biological age.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Lifestyle Choices</h4>
                <p className="text-gray-600">
                  Exercise habits, sleep patterns, smoking status, and alcohol consumption play crucial 
                  roles in determining biological age and overall health outcomes.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Improving Your Score</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Exercise</h4>
                <p className="text-gray-600">
                  Regular physical activity can reduce biological age by improving cardiovascular health, 
                  metabolism, and muscle strength. Aim for at least 150 minutes of moderate exercise weekly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Sleep Quality</h4>
                <p className="text-gray-600">
                  Adequate sleep (7-9 hours) is essential for cellular repair, hormone regulation, and 
                  cognitive function. Poor sleep can accelerate biological aging.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Long-term Benefits</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Increased Longevity:</strong> Lower biological age correlates with increased life expectancy
              </li>
              <li>
                <strong>Better Quality of Life:</strong> Reduced risk of age-related diseases and conditions
              </li>
              <li>
                <strong>Mental Clarity:</strong> Improved cognitive function and mental well-being
              </li>
              <li>
                <strong>Physical Vitality:</strong> Enhanced energy levels and physical capabilities
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Health Optimization Tips</h2>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Nutrition</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Eat a balanced, whole-food diet</li>
                  <li>• Limit processed foods</li>
                  <li>• Stay hydrated</li>
                  <li>• Consider antioxidant-rich foods</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Lifestyle</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Maintain consistent sleep schedule</li>
                  <li>• Manage stress levels</li>
                  <li>• Stay socially active</li>
                  <li>• Engage in mental exercises</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Prevention</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Regular health check-ups</li>
                  <li>• Preventive screenings</li>
                  <li>• Maintain vaccinations</li>
                  <li>• Monitor key health metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}