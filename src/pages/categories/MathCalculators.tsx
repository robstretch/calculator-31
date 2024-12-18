import React from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function MathCalculators() {
  const mathCalculators = categories.find(c => c.title === "Math")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Math Calculators | Advanced Mathematical Tools"
        description="Free math calculators for fractions, calculus, statistics, and more. Solve complex mathematical problems with step-by-step solutions."
        keywords={[
          'math calculator',
          'fraction calculator',
          'calculus calculator',
          'statistics calculator',
          'algebra calculator',
          'geometry calculator'
        ]}
        canonicalUrl="/math"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Math Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators to help you solve mathematical problems with ease
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {mathCalculators.map((calc) => (
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
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Math Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Step-by-Step Solutions</h3>
            <p className="text-indigo-700">
              See detailed explanations and steps for solving mathematical problems.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Results</h3>
            <p className="text-indigo-700">
              Get precise calculations for fractions, time conversions, and more.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Learning Tools</h3>
            <p className="text-indigo-700">
              Use our calculators as educational tools to understand mathematical concepts.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Math Learning Resources</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Fraction Tips</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Understanding proper and improper fractions</li>
              <li>• Converting between fractions and decimals</li>
              <li>• Finding common denominators</li>
              <li>• Simplifying complex fractions</li>
              <li>• Working with mixed numbers</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Time Calculation Tips</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Converting between time formats</li>
              <li>• Understanding time zones</li>
              <li>• Calculating time differences</li>
              <li>• Working with time intervals</li>
              <li>• Managing international schedules</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}