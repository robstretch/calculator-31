import React, { useState } from 'react';
import { Clock, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateTimeClock, TimeEntry } from '../../utils/calculators/timeClock';
import { formatCurrency, formatNumber } from '../../utils/format';

export function TimeClockCalculator() {
  const [entries, setEntries] = useState<TimeEntry[]>([{
    date: new Date().toISOString().split('T')[0],
    clockIn: '09:00',
    clockOut: '17:00',
    breakDuration: 60
  }]);
  const [hourlyRate, setHourlyRate] = useState('15');
  const [overtimeRate, setOvertimeRate] = useState('1.5');
  const [regularHours, setRegularHours] = useState('40');

  const addEntry = () => {
    setEntries([...entries, {
      date: new Date().toISOString().split('T')[0],
      clockIn: '09:00',
      clockOut: '17:00',
      breakDuration: 60
    }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof TimeEntry, value: string | number) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const results = calculateTimeClock(
    entries,
    parseFloat(hourlyRate) || 0,
    parseFloat(overtimeRate) || 1.5,
    parseFloat(regularHours) || 40
  );

  return (
    <CalculatorLayout
      title="Time Clock Calculator"
      description="Track work hours and calculate regular and overtime pay"
      icon={<Clock />}
    >
      <SEO
        title="Time Clock Calculator | Work Hours & Overtime Calculator"
        description="Track work hours, calculate regular and overtime pay, and manage employee time with our free time clock calculator."
        keywords={[
          'time clock calculator',
          'work hours calculator',
          'overtime calculator',
          'payroll hours calculator',
          'employee timesheet',
          'time card calculator'
        ]}
        canonicalUrl="/time-clock-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Time Entries</h2>
              <button
                onClick={addEntry}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Entry
              </button>
            </div>

            {entries.map((entry, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Entry {index + 1}</h3>
                  {entries.length > 1 && (
                    <button
                      onClick={() => removeEntry(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <CalculatorInput
                    label="Date"
                    value={entry.date}
                    onChange={(value) => updateEntry(index, 'date', value)}
                    type="date"
                  />
                  <CalculatorInput
                    label="Break Duration (minutes)"
                    value={entry.breakDuration.toString()}
                    onChange={(value) => updateEntry(index, 'breakDuration', parseInt(value) || 0)}
                    min={0}
                    step={15}
                  />
                  <CalculatorInput
                    label="Clock In"
                    value={entry.clockIn}
                    onChange={(value) => updateEntry(index, 'clockIn', value)}
                    type="time"
                  />
                  <CalculatorInput
                    label="Clock Out"
                    value={entry.clockOut}
                    onChange={(value) => updateEntry(index, 'clockOut', value)}
                    type="time"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Pay Settings</h2>
            
            <CalculatorInput
              label="Hourly Rate"
              value={hourlyRate}
              onChange={setHourlyRate}
              min={0}
              step={0.25}
              placeholder="Enter hourly rate"
            />
            
            <CalculatorInput
              label="Overtime Rate Multiplier"
              value={overtimeRate}
              onChange={setOvertimeRate}
              min={1}
              step={0.1}
              placeholder="Enter overtime multiplier"
            />
            
            <CalculatorInput
              label="Regular Hours per Week"
              value={regularHours}
              onChange={setRegularHours}
              min={0}
              step={1}
              placeholder="Enter regular hours threshold"
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Pay Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.totalPay)}
              </div>
              <div className="text-gray-500">Total Pay</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Regular Hours"
              value={`${formatNumber(results.regularHours)} hours`}
              helpText={`at ${formatCurrency(parseFloat(hourlyRate))} per hour`}
            />
            
            <CalculatorResult
              label="Overtime Hours"
              value={`${formatNumber(results.overtimeHours)} hours`}
              helpText={`at ${formatCurrency(parseFloat(hourlyRate) * parseFloat(overtimeRate))} per hour`}
            />
            
            <CalculatorResult
              label="Regular Pay"
              value={formatCurrency(results.regularPay)}
              helpText="Pay for regular hours"
            />
            
            <CalculatorResult
              label="Overtime Pay"
              value={formatCurrency(results.overtimePay)}
              helpText="Pay for overtime hours"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Daily Breakdown:</h3>
              <div className="space-y-3">
                {results.hoursPerDay.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{new Date(day.date).toLocaleDateString()}</div>
                      <div className="text-sm text-gray-600">
                        {formatNumber(day.hours + day.overtime)} hours
                        {day.overtime > 0 && ` (${formatNumber(day.overtime)} OT)`}
                      </div>
                    </div>
                    <div className="font-medium">{formatCurrency(day.pay)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Summary Statistics:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Hours/Day:</span>
                  <span className="font-medium">{formatNumber(results.averageHoursPerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Break Time:</span>
                  <span className="font-medium">{results.totalBreakTime} minutes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Time Clock Calculations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Regular Hours</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• First 40 hours per week</li>
                <li>• Calculated at base pay rate</li>
                <li>• Includes paid breaks</li>
                <li>• Weekly reset period</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Overtime Hours</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Hours beyond 40 per week</li>
                <li>• Higher pay rate (typically 1.5x)</li>
                <li>• Based on FLSA regulations</li>
                <li>• May vary by state/country</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Time Clock Best Practices</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Record Keeping</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Clock in/out consistently</li>
                <li>• Document break times</li>
                <li>• Keep accurate records</li>
                <li>• Review weekly totals</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Break Rules</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Required break periods</li>
                <li>• Meal break duration</li>
                <li>• Rest period frequency</li>
                <li>• State regulations</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Compliance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Overtime regulations</li>
                <li>• Minimum wage laws</li>
                <li>• Break requirements</li>
                <li>• Record retention</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}