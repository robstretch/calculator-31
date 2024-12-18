import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { calculatePregnancy } from '../../utils/calculators/pregnancy/calculate';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { SEO } from '../../components/SEO/SEO';

export function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState('28');
  const [firstPregnancy, setFirstPregnancy] = useState(true);
  const [age, setAge] = useState('');
  const [multiples, setMultiples] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof calculatePregnancy>>();

  const handleCalculate = () => {
    const input = {
      lastPeriod: new Date(lastPeriod),
      cycleLength: parseInt(cycleLength),
      firstPregnancy,
      age: parseInt(age),
      multiples
    };
    setResult(calculatePregnancy(input));
  };

  return (
    <>
      <SEO 
        title="Pregnancy Calculator | Due Date and Milestone Calculator"
        description="Calculate your due date, track pregnancy milestones, and get personalized recommendations with our free pregnancy calculator."
        keywords={[
          'pregnancy calculator',
          'due date calculator',
          'pregnancy timeline',
          'pregnancy milestones',
          'pregnancy tracker'
        ]}
        canonicalUrl="/pregnancy-calculator"
      />

      <CalculatorLayout
        title="Pregnancy Calculator"
        description="Calculate your due date and track important pregnancy milestones"
        icon={<Baby />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Period Date</label>
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cycle Length (days)</label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="20"
                  max="45"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Maternal Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  min="15"
                  max="50"
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={firstPregnancy}
                    onChange={(e) => setFirstPregnancy(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">First Pregnancy</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={multiples}
                    onChange={(e) => setMultiples(e.target.checked)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">Multiple Pregnancy</span>
                </label>
              </div>
            </div>
            <button
              onClick={handleCalculate}
              className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Calculate
            </button>
          </div>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Pregnancy Timeline</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-gray-600">Due Date</p>
                    <p className="text-lg font-medium">{result.dueDate.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Current Week</p>
                    <p className="text-lg font-medium">Week {result.currentWeek}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Trimester</p>
                    <p className="text-lg font-medium">{result.currentTrimester} Trimester</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Important Milestones</h2>
                <div className="space-y-4">
                  {result.milestones.map((milestone, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 text-sm text-gray-500">
                        Week {milestone.week}
                      </div>
                      <div>
                        <p className="font-medium">{milestone.event}</p>
                        <p className="text-sm text-gray-600">{milestone.description}</p>
                        <p className="text-xs text-gray-500">{milestone.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Risk Assessment</h2>
                <div className="space-y-4">
                  {result.risks.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-24 font-medium ${
                        risk.level === 'high' ? 'text-red-600' :
                        risk.level === 'moderate' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {risk.level.charAt(0).toUpperCase() + risk.level.slice(1)}
                      </div>
                      <div>
                        <p className="font-medium">{risk.factor}</p>
                        <p className="text-sm text-gray-600">{risk.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recommended Appointments</h2>
                <div className="space-y-4">
                  {result.appointments.map((appointment, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-16 text-sm text-gray-500">
                        Week {appointment.week}
                      </div>
                      <div>
                        <p className="font-medium">{appointment.type}</p>
                        <p className="text-sm text-gray-600">{appointment.description}</p>
                        <p className="text-xs text-gray-500">{appointment.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
}