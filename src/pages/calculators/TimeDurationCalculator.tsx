import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculateTimeDuration } from '../../utils/calculators/timeDuration/calculate';

export function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [excludeBreaks, setExcludeBreaks] = useState(false);
  const [breaks, setBreaks] = useState<{ start: string; end: string; }[]>([]);

  const result = calculateTimeDuration({
    startTime,
    endTime,
    excludeBreaks,
    breaks
  });

  return (
    <>
      <SEO 
        title="Time Duration Calculator | Calculate Time Intervals"
        description="Calculate the duration between times, including breaks and overnight periods. Perfect for work hours, project timing, and event planning."
        keywords={[
          'time duration calculator',
          'time interval calculator',
          'work hours calculator',
          'time difference calculator',
          'break time calculator'
        ]}
        canonicalUrl="/time-duration-calculator"
      />

      <CalculatorLayout
        title="Time Duration Calculator"
        description="Calculate the duration between two times with support for breaks and overnight periods"
        icon={<Clock />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                label="Start Time"
                type="text"
                value={startTime}
                onChange={setStartTime}
                placeholder="HH:MM or HH:MM:SS"
              />
              <CalculatorInput
                label="End Time"
                type="text"
                value={endTime}
                onChange={setEndTime}
                placeholder="HH:MM or HH:MM:SS"
              />
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={excludeBreaks}
                  onChange={(e) => setExcludeBreaks(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label className="text-sm text-gray-600">Exclude breaks</label>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Results</h3>
              <div className="space-y-4">
                <div className="text-3xl font-bold text-indigo-600">
                  {result.formattedDuration}
                </div>
                {result.breakTime && (
                  <div className="text-sm text-gray-600">
                    Break time: {result.breakTime.hours}h {result.breakTime.minutes}m
                  </div>
                )}
                <div className="border-t pt-4">
                  {result.analysis.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{item.category}:</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md prose max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Time Duration</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Basic Concepts</h3>
                <p className="text-gray-600">
                  Time duration calculations are essential for many applications, from tracking work hours 
                  to planning events. Understanding how to properly calculate time intervals helps ensure 
                  accurate scheduling and time management.
                </p>
                <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Components</h4>
                  <ul className="list-disc pl-4 space-y-2 text-gray-600">
                    <li>Start time and end time</li>
                    <li>Break periods (optional)</li>
                    <li>Overnight duration handling</li>
                    <li>Time format consistency</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Common Applications</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Work Hours</h4>
                    <p className="text-gray-600">Track employee work hours, including breaks and overtime</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Project Timing</h4>
                    <p className="text-gray-600">Calculate project durations and milestone intervals</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Event Planning</h4>
                    <p className="text-gray-600">Plan event schedules and session durations</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Time Calculation Tips</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Format Consistency</h4>
                  <p className="text-gray-600">Use consistent time formats (24-hour or 12-hour)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Break Management</h4>
                  <p className="text-gray-600">Account for breaks and non-working periods</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Overnight Periods</h4>
                  <p className="text-gray-600">Consider shifts that span multiple days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}