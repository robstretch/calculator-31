import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateOvulation } from '../../utils/calculators/ovulation';

export function OvulationCalculator() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState('28');
  const [lutealPhase, setLutealPhase] = useState('14');

  const results = calculateOvulation(
    new Date(lastPeriod),
    parseInt(cycleLength),
    parseInt(lutealPhase)
  );

  return (
    <CalculatorLayout
      title="Ovulation Calculator"
      description="Track ovulation and fertile days"
      icon={<Calendar />}
    >
      <SEO
        title="Ovulation Calculator | Fertility Calendar"
        description="Calculate your ovulation dates and fertile window. Free ovulation calculator with menstrual cycle tracking."
        keywords={[
          'ovulation calculator',
          'fertility calculator',
          'period calculator',
          'menstrual cycle calculator',
          'fertile days calculator',
          'conception calculator'
        ]}
        canonicalUrl="/ovulation-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Cycle Information</h2>
          
          <CalculatorInput
            label="First Day of Last Period"
            value={lastPeriod}
            onChange={setLastPeriod}
            type="date"
            max={new Date().toISOString().split('T')[0]}
          />
          
          <CalculatorInput
            label="Average Cycle Length (days)"
            value={cycleLength}
            onChange={setCycleLength}
            min={21}
            max={35}
            step={1}
            placeholder="Enter cycle length"
          />
          
          <CalculatorInput
            label="Luteal Phase Length (days)"
            value={lutealPhase}
            onChange={setLutealPhase}
            min={10}
            max={16}
            step={1}
            placeholder="Enter luteal phase length"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Fertility Window</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.currentPhase}
              </div>
              <div className="text-gray-500">Current Cycle Phase</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Ovulation Date"
              value={results.ovulationDate.toLocaleDateString()}
              helpText="Estimated day of ovulation"
            />
            
            <CalculatorResult
              label="Fertile Window"
              value={`${results.fertileWindow.start.toLocaleDateString()} - ${results.fertileWindow.end.toLocaleDateString()}`}
              helpText="Days with highest chance of conception"
            />
            
            <CalculatorResult
              label="Next Period"
              value={results.nextPeriod.toLocaleDateString()}
              helpText="Expected start of next cycle"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Cycle Phases:</h3>
              <div className="space-y-4">
                {results.cycleDetails.map((phase, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{phase.phase}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      {phase.startDate.toLocaleDateString()} - {phase.endDate.toLocaleDateString()}
                    </div>
                    <div className="text-sm text-indigo-600 mt-1">{phase.description}</div>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Cycle</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Menstrual Cycle Phases</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Menstrual Phase (Days 1-5)</li>
                <li>• Follicular Phase (Days 1-13)</li>
                <li>• Ovulation (Day 14)</li>
                <li>• Luteal Phase (Days 15-28)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Fertility Signs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Cervical mucus changes</li>
                <li>• Basal body temperature</li>
                <li>• Ovulation pain</li>
                <li>• Cervical position</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tracking Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cycle Tracking</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Record period dates</li>
                <li>• Note cycle length</li>
                <li>• Track symptoms</li>
                <li>• Monitor changes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Conception Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Time intercourse</li>
                <li>• Track fertile days</li>
                <li>• Maintain healthy habits</li>
                <li>• Reduce stress</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">When to Consult</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Irregular cycles</li>
                <li>• Severe symptoms</li>
                <li>• Fertility concerns</li>
                <li>• Unusual changes</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}