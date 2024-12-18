import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateGraduation } from '../../utils/calculators/graduationYear/calculate';
import type { StudentInfo } from '../../utils/calculators/graduationYear/types';

export function GraduationYearCalculator() {
  const [info, setInfo] = useState<StudentInfo>({
    currentGrade: 9,
    startMonth: new Date().getMonth() + 1,
    startYear: new Date().getFullYear(),
    programType: 'k12',
    creditsCompleted: 0,
    creditsRequired: 120,
    partTime: false
  });

  const result = calculateGraduation(info);

  return (
    <CalculatorLayout
      title="Graduation Year Calculator"
      description="Calculate your expected graduation date and academic milestones"
      icon={<GraduationCap />}
    >
      <SEO
        title="Graduation Year Calculator | Academic Timeline Planning"
        description="Calculate your expected graduation date, track academic progress, and plan educational milestones with our free graduation year calculator."
        keywords={[
          'graduation calculator',
          'graduation date calculator',
          'academic planning',
          'college graduation',
          'high school graduation',
          'education timeline'
        ]}
        canonicalUrl="/graduation-year-calculator"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Program Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program Type
                </label>
                <select
                  value={info.programType}
                  onChange={(e) => setInfo({ ...info, programType: e.target.value as StudentInfo['programType'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="k12">K-12 Education</option>
                  <option value="college-2year">2-Year College</option>
                  <option value="college-4year">4-Year College</option>
                  <option value="graduate">Graduate School</option>
                </select>
              </div>

              {info.programType === 'k12' ? (
                <CalculatorInput
                  label="Current Grade"
                  value={info.currentGrade}
                  onChange={(value) => setInfo({ ...info, currentGrade: Number(value) })}
                  min={1}
                  max={12}
                />
              ) : (
                <>
                  <CalculatorInput
                    label="Credits Completed"
                    value={info.creditsCompleted}
                    onChange={(value) => setInfo({ ...info, creditsCompleted: Number(value) })}
                    min={0}
                  />
                  <CalculatorInput
                    label="Credits Required"
                    value={info.creditsRequired}
                    onChange={(value) => setInfo({ ...info, creditsRequired: Number(value) })}
                    min={1}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={info.partTime}
                      onChange={(e) => setInfo({ ...info, partTime: e.target.checked })}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">
                      Part-time Student
                    </label>
                  </div>
                </>
              )}

              <CalculatorInput
                label="Start Month"
                value={info.startMonth}
                onChange={(value) => setInfo({ ...info, startMonth: Number(value) })}
                min={1}
                max={12}
              />

              <CalculatorInput
                label="Start Year"
                value={info.startYear}
                onChange={(value) => setInfo({ ...info, startYear: Number(value) })}
                min={2000}
                max={2050}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Graduation Timeline</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Expected Graduation</span>
                <span className="font-medium">{result.academicProgress.estimatedGradTerm}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Time Remaining</span>
                <span className="font-medium">
                  {result.remainingTime.years} years, {result.remainingTime.months} months
                </span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-gray-600">Remaining Semesters</span>
                <span className="font-medium">{result.remainingTime.semesters}</span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600">Progress Complete</span>
                <span className="font-medium">
                  {Math.round(result.academicProgress.percentageComplete)}%
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Academic Milestones</h2>
            <div className="space-y-4">
              {result.milestones.map((milestone, index) => (
                <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="font-medium text-gray-900">{milestone.event}</div>
                  <div className="text-sm text-gray-600">
                    {milestone.date.toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-indigo-600 mt-1">
                    {milestone.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                <div className="font-medium text-gray-900">{rec.category}</div>
                <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              The Graduation Year Calculator helps you plan your academic journey by calculating your 
              expected graduation date and important milestones. Here's how to use it:
            </p>
            
            <ol className="list-decimal pl-4 space-y-2 mt-4">
              <li>Select your program type (K-12, college, or graduate school)</li>
              <li>Enter your current academic progress (grade or credits)</li>
              <li>Specify your start date</li>
              <li>Indicate if you're a part-time student (for college/graduate programs)</li>
              <li>Review your graduation timeline and milestones</li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Understanding Results</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Expected Graduation:</strong> Your projected graduation term and year</li>
              <li><strong>Time Remaining:</strong> Time until graduation in years and months</li>
              <li><strong>Progress:</strong> Percentage of program requirements completed</li>
              <li><strong>Milestones:</strong> Key academic events and deadlines</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}