import React, { useState } from 'react';
import { GraduationCap, Plus } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CourseInput } from '../../components/Calculator/CourseInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateGPA } from '../../utils/calculators/gpa';
import { formatNumber } from '../../utils/format';

interface Course {
  name: string;
  grade: string;
  credits: string;
}

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { name: 'Course 1', grade: 'A', credits: '3' },
    { name: 'Course 2', grade: 'B+', credits: '3' },
    { name: 'Course 3', grade: 'A-', credits: '4' }
  ]);
  const [previousGPA, setPreviousGPA] = useState('0');
  const [previousCredits, setPreviousCredits] = useState('0');

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: 'A', credits: '3' }]);
  };

  const removeCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const updateCourse = (index: number, field: keyof Course, value: string) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const results = calculateGPA(courses, previousGPA, previousCredits);

  return (
    <CalculatorLayout
      title="GPA Calculator"
      description="Calculate your Grade Point Average"
      icon={<GraduationCap />}
    >
      <SEO
        title="GPA Calculator | Grade Point Average Calculator"
        description="Calculate your Grade Point Average (GPA) with our free GPA calculator. Track your academic progress and calculate cumulative GPA easily."
        keywords={[
          'gpa calculator',
          'grade point average calculator',
          'college gpa calculator',
          'cumulative gpa calculator',
          'semester gpa calculator',
          'academic calculator'
        ]}
        canonicalUrl="/gpa-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold mb-4">Previous Academic Record</h2>
            <CalculatorInput
              label="Previous Cumulative GPA"
              value={previousGPA}
              onChange={setPreviousGPA}
              min={0}
              max={4}
              step={0.01}
              placeholder="Enter previous GPA"
            />
            <CalculatorInput
              label="Previous Total Credits"
              value={previousCredits}
              onChange={setPreviousCredits}
              min={0}
              step={1}
              placeholder="Enter total credits"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Courses</h2>
              <button
                onClick={addCourse}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Course
              </button>
            </div>

            {courses.map((course, index) => (
              <CourseInput
                key={index}
                index={index}
                name={course.name}
                grade={course.grade}
                credits={course.credits}
                onUpdate={updateCourse}
                onRemove={removeCourse}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <CalculatorResult
            label="Semester GPA"
            value={formatNumber(results.semesterGPA, 2)}
            helpText="GPA for current semester only"
          />
          <CalculatorResult
            label="Cumulative GPA"
            value={formatNumber(results.cumulativeGPA, 2)}
            helpText="Overall GPA including previous credits"
          />
          <CalculatorResult
            label="Total Credits"
            value={results.totalCredits}
            helpText="Sum of all credits earned"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">GPA Scale:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm text-indigo-700">
              <div>
                <p>A/A+ = 4.0</p>
                <p>A- = 3.7</p>
                <p>B+ = 3.3</p>
                <p>B = 3.0</p>
                <p>B- = 2.7</p>
              </div>
              <div>
                <p>C+ = 2.3</p>
                <p>C = 2.0</p>
                <p>C- = 1.7</p>
                <p>D = 1.0</p>
                <p>F = 0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}