import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { SitemapLink } from '../../components/Calculator/SitemapLink';
import {
  calculateTimeDifference,
  addTimes,
  subtractTimes,
  convertTimeZone
} from '../../utils/calculators/time';

type CalculationType = 'difference' | 'add' | 'subtract' | 'timezone';

export function TimeCalculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('difference');
  const [time1, setTime1] = useState('09:00:00');
  const [time2, setTime2] = useState('17:30:00');
  const [fromOffset, setFromOffset] = useState('0');
  const [toOffset, setToOffset] = useState('0');

  const calculateResult = () => {
    switch (calculationType) {
      case 'difference':
        return calculateTimeDifference(time1, time2);
      case 'add':
        return addTimes(time1, time2);
      case 'subtract':
        return subtractTimes(time1, time2);
      case 'timezone':
        return convertTimeZone(time1, parseFloat(fromOffset), parseFloat(toOffset));
    }
  };

  const results = calculateResult();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Time Calculator | Time Duration Calculator"
        description="Calculate time differences, add or subtract times, and convert between time zones. Free time calculator for all your scheduling needs."
        keywords={[
          'time calculator',
          'time difference calculator',
          'duration calculator',
          'time zone converter',
          'time addition calculator',
          'time subtraction calculator'
        ]}
        canonicalUrl="/time-calculator"
      />
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Clock className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Time Calculator</h1>
        <p className="text-gray-600">
          Calculate time differences, add or subtract times, and convert between time zones
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Time Calculation</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calculation Type
            </label>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {[
                { value: 'difference', label: 'Time Difference' },
                { value: 'add', label: 'Add Times' },
                { value: 'subtract', label: 'Subtract Times' },
                { value: 'timezone', label: 'Time Zone' }
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => setCalculationType(type.value as CalculationType)}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    calculationType === type.value
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {calculationType === 'timezone' ? (
            <>
              <CalculatorInput
                label="Time"
                value={time1}
                onChange={setTime1}
                type="text"
                placeholder="HH:MM:SS"
              />
              <CalculatorInput
                label="From UTC Offset"
                value={fromOffset}
                onChange={setFromOffset}
                type="number"
                min={-12}
                max={14}
                step={0.5}
                placeholder="Enter UTC offset (e.g., -5 for EST)"
              />
              <CalculatorInput
                label="To UTC Offset"
                value={toOffset}
                onChange={setToOffset}
                type="number"
                min={-12}
                max={14}
                step={0.5}
                placeholder="Enter UTC offset (e.g., 1 for CET)"
              />
            </>
          ) : (
            <>
              <CalculatorInput
                label={calculationType === 'difference' ? 'Start Time' : 'First Time'}
                value={time1}
                onChange={setTime1}
                type="text"
                placeholder="HH:MM:SS"
              />
              <CalculatorInput
                label={calculationType === 'difference' ? 'End Time' : 'Second Time'}
                value={time2}
                onChange={setTime2}
                type="text"
                placeholder="HH:MM:SS"
              />
            </>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {results.formattedTime}
              </div>
              <div className="text-gray-500">
                {calculationType === 'difference' && 'isNegative' in results && results.isNegative
                  ? 'Time 2 is earlier than Time 1'
                  : ''}
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Breakdown:</h3>
            <div className="space-y-2 text-indigo-700">
              <div className="flex justify-between">
                <span>Hours:</span>
                <span>{results.hours}</span>
              </div>
              <div className="flex justify-between">
                <span>Minutes:</span>
                <span>{results.minutes}</span>
              </div>
              <div className="flex justify-between">
                <span>Seconds:</span>
                <span>{results.seconds}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Seconds:</span>
                <span>{results.totalSeconds}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SitemapLink />
    </div>
  );
}