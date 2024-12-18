import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateNumerology } from '../../utils/calculators/numerology';

export function NumerologyCalculator() {
  const [fullName, setFullName] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const results = fullName && birthdate ? calculateNumerology(fullName, birthdate) : null;

  return (
    <CalculatorLayout
      title="Numerology Calculator"
      description="Calculate numerological significance"
      icon={<Sparkles />}
    >
      <SEO
        title="Numerology Calculator | Name & Birth Date Analysis"
        description="Calculate your numerology numbers and discover their meanings. Free numerology calculator with detailed interpretations."
        keywords={[
          'numerology calculator',
          'name numerology',
          'birth date numerology',
          'life path calculator',
          'destiny number calculator',
          'numerological analysis'
        ]}
        canonicalUrl="/numerology-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          
          <CalculatorInput
            label="Full Name (as given at birth)"
            value={fullName}
            onChange={setFullName}
            type="text"
            placeholder="Enter your full name"
          />
          
          <CalculatorInput
            label="Birth Date"
            value={birthdate}
            onChange={setBirthdate}
            type="date"
            placeholder="Select your birth date"
          />

          <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Important Notes:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use your full name as given at birth</li>
              <li>• Include middle name(s) if any</li>
              <li>• Birth date should be accurate</li>
              <li>• Results are based on Pythagorean numerology</li>
            </ul>
          </div>
        </div>

        {results && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Numerology Profile</h2>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Life Path Number</h3>
                  <span className="text-2xl font-bold text-indigo-600">{results.lifePathNumber}</span>
                </div>
                <p className="text-gray-600 text-sm">{results.interpretation.lifePath}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Destiny Number</h3>
                  <span className="text-2xl font-bold text-indigo-600">{results.destinyNumber}</span>
                </div>
                <p className="text-gray-600 text-sm">{results.interpretation.destiny}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Soul Urge Number</h3>
                  <span className="text-2xl font-bold text-indigo-600">{results.soulUrgeNumber}</span>
                </div>
                <p className="text-gray-600 text-sm">{results.interpretation.soulUrge}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Personality Number</h3>
                  <span className="text-2xl font-bold text-indigo-600">{results.personalityNumber}</span>
                </div>
                <p className="text-gray-600 text-sm">{results.interpretation.personality}</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-700">Expression Number</h3>
                  <span className="text-2xl font-bold text-indigo-600">{results.expressionNumber}</span>
                </div>
                <p className="text-gray-600 text-sm">{results.interpretation.expression}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Numerology Numbers</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Life Path Number</h3>
              <p className="text-gray-600">
                Your Life Path Number is derived from your birth date and represents your life's purpose 
                and the path you're destined to follow. It reveals your natural talents, abilities, and 
                the opportunities you're likely to encounter.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Destiny Number</h3>
              <p className="text-gray-600">
                Also known as the Expression Number, this is calculated from all the letters in your full 
                name. It indicates your natural abilities, personal goals, and the qualities you'll develop 
                throughout life.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Numbers Explained</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Soul Urge Number</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Inner desires and motivations</li>
                <li>• What your heart yearns for</li>
                <li>• Emotional needs and wants</li>
                <li>• Based on name's vowels</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Personality Number</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• External personality traits</li>
                <li>• How others see you</li>
                <li>• First impressions</li>
                <li>• Based on name's consonants</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Expression Number</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Natural abilities and talents</li>
                <li>• Life goals and ambitions</li>
                <li>• Personal potential</li>
                <li>• Based on full name</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}