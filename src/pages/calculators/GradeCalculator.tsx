import React, { useState } from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateGrade } from '../../utils/calculators/grade';
import { formatNumber } from '../../utils/format';

export function GradeCalculator() {
  const [assignments, setAssignments] = useState([
    { score: '95', weight: '30' },
    { score: '85', weight: '30' },
    { score: '90', weight: '40' }
  ]);

  const addAssignment = () => {
    setAssignments([...assignments, { score: '0', weight: '0' }]);
  };

  const removeAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const updateAssignment = (index: number, field: 'score' | 'weight', value: string) => {
    const newAssignments = [...assignments];
    newAssignments[index] = { ...newAssignments[index], [field]: value };
    setAssignments(newAssignments);
  };

  const results = calculateGrade(
    assignments.map(a => parseFloat(a.score) || 0),
    assignments.map(a => parseFloat(a.weight) || 0)
  );

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate weighted grades and final scores."
      icon={<GraduationCap />}
    >
      <SEO
        title="Grade Calculator | Weighted Grade Calculator"
        description="Calculate your weighted grades and final scores with our free grade calculator. Track assignments and predict final grades easily."
        keywords={[
          'grade calculator',
          'weighted grade calculator',
          'final grade calculator',
          'assignment grade calculator',
          'class grade calculator',
          'course grade calculator'
        ]}
        canonicalUrl="/grade-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Assignments</h2>
            <button
              onClick={addAssignment}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Assignment
            </button>
          </div>

          {assignments.map((assignment, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Assignment {index + 1}</h3>
                <button
                  onClick={() => removeAssignment(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Score"
                  value={assignment.score}
                  onChange={(value) => updateAssignment(index, 'score', value)}
                  min={0}
                  max={100}
                  step={0.1}
                />
                <CalculatorInput
                  label="Weight (%)"
                  value={assignment.weight}
                  onChange={(value) => updateAssignment(index, 'weight', value)}
                  min={0}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <CalculatorResult
            label="Weighted Average"
            value={formatNumber(results.weightedAverage) + '%'}
            helpText="Your overall grade percentage"
          />
          <CalculatorResult
            label="Letter Grade"
            value={results.letterGrade}
            helpText="Your final letter grade"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Grading Scale:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>A: 90-100%</li>
              <li>B: 80-89%</li>
              <li>C: 70-79%</li>
              <li>D: 60-69%</li>
              <li>F: Below 60%</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Weighted Grades</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              A weighted grade system assigns different levels of importance to different assignments or categories.
              This better reflects the true impact of each assignment on your final grade.
            </p>
            <p className="mt-4">
              For example, if a final exam is worth 40% of your grade and homework is worth 20%,
              scoring 95% on the final exam has more impact than scoring 95% on homework assignments.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Entering Scores</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Enter each assignment's score as a percentage (0-100)</li>
                <li>• Add the weight (importance) of each assignment</li>
                <li>• Ensure weights total 100% for accuracy</li>
                <li>• Use the + button to add more assignments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Reading Results</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Weighted average shows your overall percentage</li>
                <li>• Letter grade is automatically calculated</li>
                <li>• Results update instantly as you enter scores</li>
                <li>• Check the grading scale for reference</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Academic Success</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Grade Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Review syllabus for weight distribution</li>
                <li>• Calculate needed scores for desired grade</li>
                <li>• Focus effort on heavily weighted items</li>
                <li>• Keep track of all assignments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Study Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Create a study schedule</li>
                <li>• Use active recall techniques</li>
                <li>• Form study groups</li>
                <li>• Take practice tests</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Time Management</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Start assignments early</li>
                <li>• Break large projects into tasks</li>
                <li>• Set realistic deadlines</li>
                <li>• Avoid procrastination</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Grade Calculations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Example Scenarios</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Scenario 1:</strong> Three tests worth 20% each and a final worth 40%
                  <br />
                  Test scores: 85, 90, 88; Final: 92
                  <br />
                  Final grade: (85×0.2) + (90×0.2) + (88×0.2) + (92×0.4) = 89.8%
                </p>
                <p>
                  <strong>Scenario 2:</strong> Homework (30%), Midterm (30%), Final (40%)
                  <br />
                  Homework: 95; Midterm: 88; Final: 91
                  <br />
                  Final grade: (95×0.3) + (88×0.3) + (91×0.4) = 91.4%
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Grade Recovery</h3>
              <p className="text-gray-600 mb-4">
                If you're trying to improve your grade, focus on upcoming assignments with higher weights.
                Calculate the scores needed on remaining work to achieve your target grade.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h4 className="font-semibold text-indigo-900 mb-2">Quick Tips:</h4>
                <ul className="text-indigo-700 space-y-1">
                  <li>• Talk to your instructor early if struggling</li>
                  <li>• Look for extra credit opportunities</li>
                  <li>• Don't give up on lower-weighted assignments</li>
                  <li>• Keep track of submission deadlines</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}