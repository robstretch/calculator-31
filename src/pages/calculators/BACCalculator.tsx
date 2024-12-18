import React, { useState } from 'react';
import { Beer } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBAC } from '../../utils/calculators/bac';
import { formatNumber } from '../../utils/format';

export function BACCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState('180');
  const [drinks, setDrinks] = useState('2');
  const [hours, setHours] = useState('2');
  const [abv, setAbv] = useState('5');
  const [volume, setVolume] = useState('12');

  const results = calculateBAC(
    gender,
    parseFloat(weight) || 0,
    parseFloat(drinks) || 0,
    parseFloat(hours) || 0,
    parseFloat(abv) || 5,
    parseFloat(volume) || 12
  );

  return (
    <CalculatorLayout
      title="BAC Calculator"
      description="Calculate blood alcohol content estimation"
      icon={<Beer />}
    >
      <SEO
        title="BAC Calculator | Blood Alcohol Content Calculator"
        description="Calculate your estimated blood alcohol content (BAC) based on drinks consumed. Free BAC calculator with safety recommendations."
        keywords={[
          'bac calculator',
          'blood alcohol calculator',
          'alcohol content calculator',
          'drunk driving calculator',
          'alcohol level calculator',
          'drink limit calculator'
        ]}
        canonicalUrl="/bac-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

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
            label="Weight (lbs)"
            value={weight}
            onChange={setWeight}
            min={0}
            step={1}
            placeholder="Enter weight"
          />

          <h2 className="text-xl font-semibold mt-6 mb-4">Alcohol Consumption</h2>

          <CalculatorInput
            label="Number of Drinks"
            value={drinks}
            onChange={setDrinks}
            min={0}
            step={1}
            placeholder="Enter number of drinks"
          />

          <CalculatorInput
            label="Time Since First Drink (hours)"
            value={hours}
            onChange={setHours}
            min={0}
            step={0.5}
            placeholder="Enter time elapsed"
          />

          <CalculatorInput
            label="Alcohol by Volume (%)"
            value={abv}
            onChange={setAbv}
            min={0}
            max={100}
            step={0.1}
            placeholder="Enter ABV percentage"
          />

          <CalculatorInput
            label="Drink Volume (oz)"
            value={volume}
            onChange={setVolume}
            min={0}
            step={0.5}
            placeholder="Enter drink volume"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">BAC Estimate</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2" style={{
                color: results.bac >= 0.08 ? '#EF4444' : 
                       results.bac >= 0.04 ? '#F59E0B' : '#10B981'
              }}>
                {formatNumber(results.bac * 100, 3)}%
              </div>
              <div className="text-lg font-medium text-gray-600">
                {results.category}
              </div>
              <div className={`text-sm mt-2 ${
                results.bac >= 0.08 ? 'text-red-600' : 'text-green-600'
              }`}>
                {results.legalStatus}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-3">Estimated Effects:</h3>
            <ul className="space-y-2 text-gray-600">
              {results.effects.map((effect, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{effect}</span>
                </li>
              ))}
            </ul>
          </div>

          <CalculatorResult
            label="Time Until Sober"
            value={`${results.timeToSober} hours`}
            helpText="Estimated time until BAC returns to 0.00%"
          />

          <div className="bg-red-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Important Notice:</h3>
            <p className="text-sm text-red-700">
              This calculator provides rough estimates only. Actual BAC can vary significantly based on many factors. 
              Never drink and drive, regardless of estimated BAC. Always have a designated driver or use a ride service.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding BAC</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What Affects BAC</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Body weight and composition</li>
                <li>• Gender differences in metabolism</li>
                <li>• Rate of consumption</li>
                <li>• Food in stomach</li>
                <li>• Type and strength of alcohol</li>
                <li>• Individual tolerance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Standard Drink Sizes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Beer (12 oz, 5% ABV)</li>
                <li>• Wine (5 oz, 12% ABV)</li>
                <li>• Spirits (1.5 oz, 40% ABV)</li>
                <li>• Malt Liquor (8-9 oz, 7% ABV)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Information</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Limits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 0.08% - Most US states</li>
                <li>• 0.05% - Some countries</li>
                <li>• 0.02% - "Zero tolerance"</li>
                <li>• Commercial drivers: 0.04%</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Safe Drinking</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Pace your drinks</li>
                <li>• Stay hydrated</li>
                <li>• Eat before drinking</li>
                <li>• Know your limits</li>
                <li>• Plan transportation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Emergency Signs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Confusion</li>
                <li>• Vomiting</li>
                <li>• Seizures</li>
                <li>• Slow breathing</li>
                <li>• Unconsciousness</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}