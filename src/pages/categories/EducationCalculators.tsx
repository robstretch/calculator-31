import React from 'react';
import { GraduationCap } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function EducationCalculators() {
  const educationCalculators = categories.find(c => c.title === "Education")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Education Calculators | GPA & Grade Tools"
        description="Free education calculators for GPA, grades, and academic planning. Track your academic progress and calculate weighted grades easily."
        keywords={[
          'education calculator',
          'gpa calculator',
          'grade calculator',
          'weighted grade calculator',
          'academic calculator',
          'student calculator'
        ]}
        canonicalUrl="/education"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Education Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators to help you track and plan your academic success
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {educationCalculators.map((calc) => (
          <CalculatorCard
            key={calc.path}
            title={calc.title}
            description={calc.description}
            icon={calc.icon}
            to={calc.path}
          />
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Education Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Grade Tracking</h3>
            <p className="text-indigo-700">
              Keep track of your academic performance with precise grade and GPA calculations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Goal Setting</h3>
            <p className="text-indigo-700">
              Calculate the scores needed to achieve your target grades and GPA.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Academic Planning</h3>
            <p className="text-indigo-700">
              Plan your academic journey with tools that help you understand grade requirements.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Academic Success Tips</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Grade Management</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Track assignments and due dates</li>
              <li>• Calculate weighted grades accurately</li>
              <li>• Monitor progress throughout the semester</li>
              <li>• Identify areas needing improvement</li>
              <li>• Set realistic academic goals</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">GPA Strategies</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Understand GPA impact on opportunities</li>
              <li>• Plan course load strategically</li>
              <li>• Consider grade replacement options</li>
              <li>• Balance academic commitments</li>
              <li>• Maintain scholarship requirements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}