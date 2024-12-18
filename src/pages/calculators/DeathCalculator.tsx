import React, { useState } from 'react';
import { Skull } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDeathEstimate } from '../../utils/calculators/death/calculate';
import { HealthFactors } from '../../utils/calculators/death/types';
import { formatNumber } from '../../utils/format';

export function DeathCalculator() {
  const [factors, setFactors] = useState<HealthFactors>({
    age: 30,
    gender: 'male',
    height: 170,
    weight: 70,
    smokingStatus: 'never',
    exerciseLevel: 'moderate',
    sleepHours: 7,
    alcoholConsumption: 'moderate',
    diet: 'average',
    familyHistory: {
      heartDisease: false,
      cancer: false,
      diabetes: false
    },
    chronicConditions: [],
    stressLevel: 'medium'
  });

  const results = calculateDeathEstimate(factors);

  const updateFactor = <K extends keyof HealthFactors>(
    factor: K,
    value: HealthFactors[K]
  ) => {
    setFactors(prev => ({ ...prev, [factor]: value }));
  };

  return (
    <CalculatorLayout
      title="AI Death Calculator"
      description="Calculate life expectancy based on factors"
      icon={<Skull />}
    >
      <SEO
        title="Death Calculator | Life Expectancy Calculator"
        description="Calculate life expectancy based on health and lifestyle factors. Free death calculator with personalized recommendations."
        keywords={[
          'death calculator',
          'life expectancy calculator',
          'longevity calculator',
          'mortality calculator',
          'lifespan calculator',
          'death age calculator'
        ]}
        canonicalUrl="/death-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <div className="grid grid-cols-2 gap-2">
              {['male', 'female'].map((gender) => (
                <button
                  key={gender}
                  onClick={() => updateFactor('gender', gender as 'male' | 'female')}
                  className={`px-4 py-2 rounded-md ${
                    factors.gender === gender
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <CalculatorInput
            label="Age"
            value={factors.age.toString()}
            onChange={(value) => updateFactor('age', parseInt(value) || 0)}
            min={0}
            max={120}
            step={1}
          />

          <CalculatorInput
            label="Height (cm)"
            value={factors.height.toString()}
            onChange={(value) => updateFactor('height', parseFloat(value) || 0)}
            min={0}
            step={1}
          />

          <CalculatorInput
            label="Weight (kg)"
            value={factors.weight.toString()}
            onChange={(value) => updateFactor('weight', parseFloat(value) || 0)}
            min={0}
            step={0.1}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Smoking Status
            </label>
            <select
              value={factors.smokingStatus}
              onChange={(e) => updateFactor('smokingStatus', e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="never">Never Smoked</option>
              <option value="former">Former Smoker</option>
              <option value="current">Current Smoker</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Exercise Level
            </label>
            <select
              value={factors.exerciseLevel}
              onChange={(e) => updateFactor('exerciseLevel', e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
            </select>
          </div>

          <CalculatorInput
            label="Sleep Hours"
            value={factors.sleepHours.toString()}
            onChange={(value) => updateFactor('sleepHours', parseFloat(value) || 0)}
            min={0}
            max={24}
            step={0.5}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Life Expectancy Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.yearsRemaining}
              </div>
              <div className="text-gray-500">Years Remaining</div>
              <div className="text-sm text-gray-400 mt-1">
                Expected age: {results.estimatedAge} years
              </div>
              <div className="text-sm text-gray-400">
                Range: {results.confidenceInterval.low}-{results.confidenceInterval.high} years
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Risk Factors:</h3>
            <div className="space-y-3">
              {results.riskFactors.map((factor, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{factor.factor}</div>
                    <div className="text-sm text-gray-600">{factor.description}</div>
                  </div>
                  <div className={`font-medium ${
                    factor.impact > 0 ? 'text-green-600' : 
                    factor.impact < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {factor.impact > 0 ? '+' : ''}{factor.impact} years
                  </div>
                </div>
              ))}
            </div>
          </div>

          {results.recommendations.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-indigo-50 p-4 rounded-lg">
                    <div className="font-medium text-indigo-900">{rec.category}</div>
                    <div className="text-sm text-indigo-700 mt-1">{rec.action}</div>
                    <div className="text-sm text-indigo-600 mt-1">
                      Potential gain: +{rec.potentialYearsGained} years
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Quality of Life Score:</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    {results.qualityOfLife}/100
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${results.qualityOfLife}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Life Expectancy</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Genetics and family history</li>
                <li>• Lifestyle choices</li>
                <li>• Environmental factors</li>
                <li>• Access to healthcare</li>
                <li>• Socioeconomic status</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Modifiable Risk Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Smoking and alcohol consumption</li>
                <li>• Diet and exercise habits</li>
                <li>• Sleep patterns</li>
                <li>• Stress management</li>
                <li>• Preventive healthcare</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Improving Life Expectancy</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lifestyle Changes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular exercise</li>
                <li>• Balanced diet</li>
                <li>• Adequate sleep</li>
                <li>• Stress reduction</li>
                <li>• Social connections</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health Monitoring</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular check-ups</li>
                <li>• Health screenings</li>
                <li>• Mental health care</li>
                <li>• Preventive care</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Environmental Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Air quality</li>
                <li>• Water safety</li>
                <li>• Workplace safety</li>
                <li>• Living conditions</li>
                <li>• Community support</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}