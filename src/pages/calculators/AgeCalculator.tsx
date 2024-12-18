import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateAge } from '../../utils/calculators/age';

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);
  const results = calculateAge(new Date(birthDate));

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate exact age and important dates"
      icon={<Calculator />}
    >
      <SEO
        title="Age Calculator | Calculate Exact Age & Important Dates"
        description="Calculate your exact age in years, months, and days. Free age calculator with zodiac signs and important milestones."
        keywords={[
          'age calculator',
          'exact age calculator',
          'date of birth calculator',
          'age difference calculator',
          'zodiac calculator',
          'birthday calculator'
        ]}
        canonicalUrl="/age-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Birth Information</h2>
          
          <CalculatorInput
            label="Birth Date"
            value={birthDate}
            onChange={setBirthDate}
            type="date"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Age Breakdown</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.years}
              </div>
              <div className="text-gray-500">Years Old</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Exact Age"
              value={`${results.years} years, ${results.months} months, ${results.days} days`}
              helpText="Your precise age"
            />
            
            <CalculatorResult
              label="Total Days"
              value={results.totalDays.toLocaleString()}
              helpText="Total number of days you've been alive"
            />
            
            <CalculatorResult
              label="Next Birthday"
              value={`In ${results.daysUntilBirthday} days`}
              helpText={results.nextBirthday.toLocaleDateString()}
            />
            
            <CalculatorResult
              label="Zodiac Sign"
              value={results.zodiacSign}
              helpText="Western astrological sign"
            />
            
            <CalculatorResult
              label="Chinese Zodiac"
              value={results.chineseZodiac}
              helpText="Chinese zodiac animal"
            />
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Age Calculations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Exact Age</h3>
              <p className="text-gray-600">
                Your exact age is calculated by comparing your birth date to today's date, 
                taking into account:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Years completed</li>
                <li>• Additional months</li>
                <li>• Extra days</li>
                <li>• Leap years</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Zodiac Signs</h3>
              <p className="text-gray-600">
                Your zodiac signs are determined by:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Western: Month and day of birth</li>
                <li>• Chinese: Year of birth</li>
                <li>• Constellation positions</li>
                <li>• Traditional calendars</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Age Milestones</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal Ages</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Voting: 18 years</li>
                <li>• Driving: 16-18 years</li>
                <li>• Retirement: 65-67 years</li>
                <li>• Legal adult: 18 years</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Development</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Childhood: 0-12 years</li>
                <li>• Adolescence: 13-19 years</li>
                <li>• Young adult: 20-39 years</li>
                <li>• Middle age: 40-59 years</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Health</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular check-ups</li>
                <li>• Age-specific screenings</li>
                <li>• Vaccination schedules</li>
                <li>• Preventive care</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}