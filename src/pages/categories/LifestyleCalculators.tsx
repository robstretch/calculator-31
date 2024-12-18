import React from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function LifestyleCalculators() {
  const lifestyleCalculators = categories.find(c => c.title === "Lifestyle")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Lifestyle Calculators | Personal & Daily Life Tools"
        description="Free lifestyle calculators for everyday decisions and planning. Calculate age, tips, gas costs, and more with our comprehensive tools."
        keywords={[
          'lifestyle calculator',
          'age calculator',
          'tip calculator',
          'gas calculator',
          'daily life calculator',
          'personal calculator'
        ]}
        canonicalUrl="/lifestyle"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Lifestyle Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators to help you make informed decisions in your daily life
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {lifestyleCalculators.map((calc) => (
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
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Lifestyle Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Results</h3>
            <p className="text-indigo-700">
              Get precise calculations for important life decisions and planning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Easy to Use</h3>
            <p className="text-indigo-700">
              Simple interfaces make it quick and easy to get the information you need.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Comprehensive Tools</h3>
            <p className="text-indigo-700">
              From age calculation to life planning, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Life Planning Tips</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Event Planning</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Set clear goals and timelines</li>
              <li>• Create detailed budgets</li>
              <li>• Consider all variables</li>
              <li>• Plan for contingencies</li>
              <li>• Track progress regularly</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Decision Making</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Gather relevant information</li>
              <li>• Consider multiple scenarios</li>
              <li>• Use data to guide choices</li>
              <li>• Review outcomes</li>
              <li>• Adjust plans as needed</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Making the Most of Our Calculators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Accurate Input</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Double-check your numbers</li>
              <li>• Use precise measurements</li>
              <li>• Update information regularly</li>
              <li>• Consider all factors</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Understanding Results</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Read all explanations</li>
              <li>• Consider context</li>
              <li>• Compare scenarios</li>
              <li>• Track changes over time</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Taking Action</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Create action plans</li>
              <li>• Set realistic goals</li>
              <li>• Monitor progress</li>
              <li>• Adjust as needed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}