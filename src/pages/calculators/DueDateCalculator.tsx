import React, { useState } from 'react';
import { Baby } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateDueDate } from '../../utils/calculators/dueDate';

export function DueDateCalculator() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState('28');

  const results = calculateDueDate(new Date(lastPeriod), parseInt(cycleLength));

  return (
    <CalculatorLayout
      title="Due Date Calculator"
      description="Calculate pregnancy due date and milestones"
      icon={<Baby />}
    >
      <SEO
        title="Due Date Calculator | Pregnancy Calculator"
        description="Calculate your pregnancy due date and track important milestones. Free due date calculator with detailed pregnancy timeline."
        keywords={[
          'due date calculator',
          'pregnancy calculator',
          'conception calculator',
          'pregnancy due date',
          'pregnancy timeline',
          'pregnancy week calculator'
        ]}
        canonicalUrl="/due-date-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Pregnancy Information</h2>
          
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
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Due Date Information</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.dueDate.toLocaleDateString()}
              </div>
              <div className="text-gray-500">Estimated Due Date</div>
              <div className="mt-2 text-sm text-gray-600">
                {results.daysUntilDue} days to go
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Current Progress"
              value={`${results.weeksPregant} weeks`}
              helpText="Based on last menstrual period"
            />
            
            <CalculatorResult
              label="Conception Date"
              value={results.conceptionDate.toLocaleDateString()}
              helpText="Estimated date of conception"
            />
            
            <CalculatorResult
              label="First Trimester Ends"
              value={results.firstTrimester.toLocaleDateString()}
              helpText="Week 13"
            />
            
            <CalculatorResult
              label="Second Trimester Ends"
              value={results.secondTrimester.toLocaleDateString()}
              helpText="Week 26"
            />
            
            <CalculatorResult
              label="Third Trimester Begins"
              value={results.thirdTrimester.toLocaleDateString()}
              helpText="Week 27 until birth"
            />
          </div>
        </div>
      </div>

      {/* Pregnancy Timeline */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Pregnancy Timeline</h2>
        <div className="space-y-4">
          {results.milestones.map((milestone, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <div className="font-medium">Week {milestone.week}</div>
                <div className="text-sm text-gray-600">{milestone.description}</div>
              </div>
              <div className="text-gray-500">
                {milestone.date.toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Due Date Calculation</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Naegele's Rule</h3>
              <p className="text-gray-600">
                The due date is calculated using Naegele's rule, which:
              </p>
              <ul className="mt-2 text-gray-600 space-y-2">
                <li>• Adds 280 days to LMP</li>
                <li>• Adjusts for cycle length</li>
                <li>• Assumes 14-day ovulation</li>
                <li>• Estimates 40-week pregnancy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Notes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Only 5% deliver on due date</li>
                <li>• Normal range: 37-42 weeks</li>
                <li>• Regular prenatal care is vital</li>
                <li>• Dates may be adjusted by ultrasound</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pregnancy Stages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">First Trimester</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weeks 1-13</li>
                <li>• Major organ development</li>
                <li>• Morning sickness common</li>
                <li>• Frequent prenatal visits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Second Trimester</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weeks 14-26</li>
                <li>• Baby movement felt</li>
                <li>• Gender can be determined</li>
                <li>• More energy typically</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Third Trimester</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weeks 27-40</li>
                <li>• Rapid baby growth</li>
                <li>• More frequent check-ups</li>
                <li>• Birth preparation</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}