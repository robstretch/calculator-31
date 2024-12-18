import React from 'react';
import { Scale } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function HealthCalculators() {
  const healthCalculators = categories.find(c => c.title === "Health & Fitness")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Health & Fitness Calculators | BMI, BMR & Nutrition Tools"
        description="Free health and fitness calculators for BMI, BMR, calories, macros, and more. Track your health metrics and achieve your fitness goals."
        keywords={[
          'health calculator',
          'fitness calculator',
          'bmi calculator',
          'bmr calculator',
          'calorie calculator',
          'macro calculator'
        ]}
        canonicalUrl="/health"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Scale className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Health & Fitness Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators to help you track and improve your health
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {healthCalculators.map((calc) => (
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
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Health Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Results</h3>
            <p className="text-indigo-700">
              Our calculators use scientifically validated formulas to provide reliable health metrics.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Easy to Use</h3>
            <p className="text-indigo-700">
              Simple interfaces make it quick and easy to calculate important health measurements.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Educational Content</h3>
            <p className="text-indigo-700">
              Learn about health metrics and get actionable insights to improve your wellbeing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}