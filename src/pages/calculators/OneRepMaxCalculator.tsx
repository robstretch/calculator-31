import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateOneRepMax } from '../../utils/calculators/oneRepMax';
import { formatNumber } from '../../utils/format';

export function OneRepMaxCalculator() {
  const [weight, setWeight] = useState('225');
  const [reps, setReps] = useState('5');

  const results = calculateOneRepMax(
    parseFloat(weight) || 0,
    parseFloat(reps) || 0
  );

  return (
    <CalculatorLayout
      title="One-Rep Max (1RM) Calculator"
      description="Calculate your one-rep maximum and training percentages based on your performance"
      icon={<Dumbbell />}
    >
      <SEO
        title="One Rep Max Calculator | 1RM Calculator"
        description="Calculate your one rep maximum (1RM) and get personalized training percentages. Free 1RM calculator with multiple calculation methods."
        keywords={[
          'one rep max calculator',
          '1rm calculator',
          'max lift calculator',
          'strength calculator',
          'weightlifting calculator',
          'powerlifting calculator'
        ]}
        canonicalUrl="/one-rep-max-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lift Details</h2>
          
          <CalculatorInput
            label="Weight (lbs)"
            value={weight}
            onChange={setWeight}
            min={0}
            step={5}
            placeholder="Enter weight lifted"
          />
          
          <CalculatorInput
            label="Repetitions"
            value={reps}
            onChange={setReps}
            min={1}
            max={15}
            step={1}
            placeholder="Enter number of reps"
          />

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use a weight you can lift with proper form</li>
              <li>• Best results with 1-10 reps</li>
              <li>• Rest adequately between sets</li>
              <li>• Consider using a spotter</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.oneRepMax)} lbs
              </div>
              <div className="text-gray-500">Estimated One-Rep Max</div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Training Percentages:</h3>
            <div className="grid grid-cols-2 gap-4">
              {results.percentages.map((p) => (
                <div key={p.percentage} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-lg font-semibold text-indigo-600">
                    {formatNumber(p.weight)} lbs
                  </div>
                  <div className="text-sm text-gray-600">
                    {p.percentage}% ({p.reps} reps)
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">Formula Comparison:</h3>
            <div className="space-y-3">
              {results.estimatedMaxes.map((estimate) => (
                <div key={estimate.formula} className="flex justify-between items-center">
                  <span className="text-gray-600">{estimate.formula}:</span>
                  <span className="font-medium">{formatNumber(estimate.max)} lbs</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding One-Rep Max</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is 1RM?</h3>
              <p className="text-gray-600">
                One-Rep Max (1RM) is the maximum weight you can lift for a single repetition of an 
                exercise with proper form. It's used to:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Measure strength progress</li>
                <li>• Calculate training percentages</li>
                <li>• Design workout programs</li>
                <li>• Compare relative strength</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Testing Methods</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Direct testing (actual 1RM)</li>
                <li>• Submaximal testing (estimate)</li>
                <li>• Multiple repetition testing</li>
                <li>• Velocity-based testing</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Training Applications</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Strength Training</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 85-100% 1RM</li>
                <li>• 1-5 reps per set</li>
                <li>• 3-5 minute rest</li>
                <li>• Focus on technique</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Hypertrophy</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 65-85% 1RM</li>
                <li>• 6-12 reps per set</li>
                <li>• 1-2 minute rest</li>
                <li>• Focus on volume</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Endurance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 50-65% 1RM</li>
                <li>• 12+ reps per set</li>
                <li>• 30-60 second rest</li>
                <li>• Focus on form</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Considerations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Before Testing</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Proper warm-up</li>
                <li>• Equipment check</li>
                <li>• Spotter availability</li>
                <li>• Recent injury check</li>
                <li>• Adequate rest</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Form Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Maintain proper technique</li>
                <li>• Control the weight</li>
                <li>• Full range of motion</li>
                <li>• Breathe properly</li>
                <li>• Stop if form breaks down</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}