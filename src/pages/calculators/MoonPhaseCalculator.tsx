import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMoonPhase } from '../../utils/calculators/moonPhase/calculate';

export function MoonPhaseCalculator() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const result = calculateMoonPhase({ date });

  return (
    <>
      <SEO 
        title="Moon Phase Calculator | Lunar Phase and Illumination"
        description="Calculate current moon phase, illumination percentage, and upcoming lunar events. Get accurate moon phase predictions and astronomical data."
        keywords={[
          'moon phase calculator',
          'lunar phase',
          'moon illumination',
          'lunar cycle',
          'astronomical calculator',
          'moon calendar'
        ]}
        canonicalUrl="/moon-phase-calculator"
      />

      <CalculatorLayout
        title="Moon Phase Calculator"
        description="Calculate moon phases, illumination percentage, and upcoming lunar events"
        icon={<Moon />}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Select Date</h2>
              <CalculatorInput
                label="Date"
                type="date"
                value={date}
                onChange={setDate}
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Current Phase</h2>
              <CalculatorResult
                label="Moon Phase"
                value={result.phase}
                helpText={`${result.illumination}% illuminated`}
              />
              <CalculatorResult
                label="Lunar Age"
                value={`${result.age} days`}
                helpText="Days since last new moon"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Upcoming Phases</h2>
              <div className="space-y-4">
                {result.nextPhases.map((phase, index) => (
                  <CalculatorResult
                    key={index}
                    label={phase.phase}
                    value={phase.date}
                    helpText={`In ${phase.daysUntil} days`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Characteristics</h2>
              <div className="space-y-4">
                {result.characteristics.map((char, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-medium text-gray-900">{char.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{char.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Understanding Moon Phases</h2>
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-4">
              The Moon's appearance changes throughout its monthly cycle as it orbits Earth. 
              These changes, called phases, occur because we see different amounts of the 
              Moon's sunlit surface from Earth.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Main Moon Phases</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>New Moon: Moon between Earth and Sun, dark side facing Earth</li>
                  <li>First Quarter: Right half illuminated from Earth's perspective</li>
                  <li>Full Moon: Moon's entire visible surface illuminated</li>
                  <li>Last Quarter: Left half illuminated from Earth's perspective</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Lunar Effects</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Ocean Tides: Strongest during New and Full Moons</li>
                  <li>Night Sky Brightness: Full Moon provides significant illumination</li>
                  <li>Best Viewing Times: Varies by phase and location</li>
                  <li>Cultural Significance: Important in many calendars and traditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}