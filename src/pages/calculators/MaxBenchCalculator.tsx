import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMaxBench } from '../../utils/calculators/maxBench';
import { formatNumber } from '../../utils/format';

export function MaxBenchCalculator() {
  const [currentBench, setCurrentBench] = useState('225');
  const [bodyweight, setBodyweight] = useState('180');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [experienceYears, setExperienceYears] = useState('2');

  const results = calculateMaxBench(
    parseFloat(currentBench) || 0,
    parseFloat(bodyweight) || 0,
    gender,
    parseFloat(experienceYears) || 0
  );

  return (
    <CalculatorLayout
      title="Max Bench Calculator"
      description="Calculate maximum bench press"
      icon={<Dumbbell />}
    >
      <SEO
        title="Max Bench Calculator | Bench Press Calculator"
        description="Calculate your maximum bench press and get training recommendations. Free bench press calculator with strength level analysis."
        keywords={[
          'max bench calculator',
          'bench press calculator',
          'bench max calculator',
          'strength calculator',
          'powerlifting calculator',
          'chest strength calculator'
        ]}
        canonicalUrl="/max-bench-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Information</h2>

          <CalculatorInput
            label="Current Bench Press (lbs)"
            value={currentBench}
            onChange={setCurrentBench}
            min={0}
            step={5}
            placeholder="Enter your current bench press"
          />

          <CalculatorInput
            label="Body Weight (lbs)"
            value={bodyweight}
            onChange={setBodyweight}
            min={0}
            step={1}
            placeholder="Enter your body weight"
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
            label="Training Experience (years)"
            value={experienceYears}
            onChange={setExperienceYears}
            min={0}
            max={50}
            step={0.5}
            placeholder="Enter years of training"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.maxBench)} lbs
              </div>
              <div className="text-gray-500">Estimated Max Bench</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Strength Level"
              value={results.strengthLevel}
              helpText="Based on bench press to bodyweight ratio"
            />

            <CalculatorResult
              label="Bodyweight Ratio"
              value={formatNumber(results.bodyweightRatio, 2)}
              helpText="Max bench divided by bodyweight"
            />

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Training Percentages:</h3>
              <div className="space-y-3">
                {results.trainingPercentages.map((training, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{training.percentage}% ({training.reps} reps)</div>
                      <div className="text-sm text-gray-600">{training.purpose}</div>
                    </div>
                    <div className="font-medium">{formatNumber(training.weight)} lbs</div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bench Press Technique</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Form Points</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Retract shoulder blades</li>
                <li>• Maintain arch in lower back</li>
                <li>• Keep feet flat on floor</li>
                <li>• Control bar path</li>
                <li>• Full range of motion</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Mistakes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Bouncing bar off chest</li>
                <li>• Excessive arch</li>
                <li>• Uneven bar path</li>
                <li>• Feet moving during lift</li>
                <li>• Loss of tightness</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Programming</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Progressive overload</li>
                <li>• Varied rep ranges</li>
                <li>• Deload weeks</li>
                <li>• Track progress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Assistance Work</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Close-grip bench</li>
                <li>• Dumbbell press</li>
                <li>• Tricep exercises</li>
                <li>• Upper back work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recovery</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Adequate sleep</li>
                <li>• Proper nutrition</li>
                <li>• Mobility work</li>
                <li>• Active recovery</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}