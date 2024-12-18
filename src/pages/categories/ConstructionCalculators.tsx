import React from 'react';
import { Construction } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function ConstructionCalculators() {
  const constructionCalculators = categories.find(c => c.title === "Construction")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Construction Calculators | Building & Material Tools"
        description="Free construction calculators for materials, measurements, and cost estimation. Plan your construction projects with accurate calculations."
        keywords={[
          'construction calculator',
          'building calculator',
          'material calculator',
          'concrete calculator',
          'lumber calculator',
          'square footage calculator'
        ]}
        canonicalUrl="/construction"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Construction className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Construction Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators to help you plan and estimate construction projects
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {constructionCalculators.map((calc) => (
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
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Construction Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Estimates</h3>
            <p className="text-indigo-700">
              Get precise material calculations and cost estimates for your construction projects.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Project Planning</h3>
            <p className="text-indigo-700">
              Plan your construction projects with confidence using our detailed calculators.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Cost Savings</h3>
            <p className="text-indigo-700">
              Avoid over-ordering materials and optimize your construction budget.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Construction Planning Tips</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Material Estimation</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Calculate materials accurately</li>
              <li>• Account for waste factor</li>
              <li>• Consider material alternatives</li>
              <li>• Plan for delivery logistics</li>
              <li>• Track material costs</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Management</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Create detailed project timelines</li>
              <li>• Coordinate with suppliers</li>
              <li>• Monitor weather conditions</li>
              <li>• Schedule equipment rentals</li>
              <li>• Maintain safety standards</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Construction Best Practices</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Quality Control</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Follow building codes</li>
              <li>• Use proper techniques</li>
              <li>• Verify measurements</li>
              <li>• Document progress</li>
              <li>• Inspect materials</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Cost Management</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Compare material prices</li>
              <li>• Track labor costs</li>
              <li>• Monitor equipment expenses</li>
              <li>• Plan for contingencies</li>
              <li>• Review estimates regularly</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Considerations</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Use proper PPE</li>
              <li>• Follow safety protocols</li>
              <li>• Maintain clean workspace</li>
              <li>• Train workers properly</li>
              <li>• Have emergency plans</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}