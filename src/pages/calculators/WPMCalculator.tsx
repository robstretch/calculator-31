import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateWPM } from '../../utils/calculators/wpm/calculate';

export function WPMCalculator() {
  const [words, setWords] = useState('100');
  const [minutes, setMinutes] = useState('1');
  const [seconds, setSeconds] = useState('0');
  const [errors, setErrors] = useState('0');

  const result = calculateWPM({
    words: parseInt(words),
    time: {
      minutes: parseInt(minutes),
      seconds: parseInt(seconds)
    },
    errors: parseInt(errors)
  });

  return (
    <>
      <SEO
        title="Words Per Minute (WPM) Calculator | Typing Speed Test"
        description="Calculate your typing speed in words per minute (WPM). Measure typing accuracy, net WPM, and get personalized recommendations to improve."
        keywords={[
          'wpm calculator',
          'typing speed',
          'words per minute',
          'typing test',
          'typing accuracy',
          'net wpm'
        ]}
        canonicalUrl="/wpm-calculator"
      />

      <CalculatorLayout
        title="Words Per Minute Calculator"
        description="Calculate your typing speed and accuracy"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CalculatorInput
                label="Number of Words"
                value={words}
                onChange={setWords}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Number of Errors"
                value={errors}
                onChange={setErrors}
                type="number"
                min="0"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Minutes"
                value={minutes}
                onChange={setMinutes}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Seconds"
                value={seconds}
                onChange={setSeconds}
                type="number"
                min="0"
                max="59"
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Results</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {result.statistics.map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600">{stat.metric}</div>
                  <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-indigo-600">{stat.rating}</div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-gray-600 text-sm mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}