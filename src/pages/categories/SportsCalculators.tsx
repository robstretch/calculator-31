import React from 'react';
import { Target } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function SportsCalculators() {
  const sportsCalculators = categories.find(c => c.title === "Sports & Gaming")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Sports & Gaming Calculators | Betting & Stats Tools"
        description="Free sports and gaming calculators for betting odds, statistics, and performance metrics. Make informed decisions with accurate calculations."
        keywords={[
          'sports calculator',
          'betting calculator',
          'odds calculator',
          'parlay calculator',
          'sports statistics',
          'gaming calculator'
        ]}
        canonicalUrl="/sports"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Target className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sports & Gaming Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators for sports betting and gaming analysis
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sportsCalculators.map((calc) => (
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
        <h2 className="text-2xl font-bold text-indigo-900 mb-4">Why Use Our Sports Calculators?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Accurate Results</h3>
            <p className="text-indigo-700">
              Get precise calculations for your sports betting and gaming analysis.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Easy to Use</h3>
            <p className="text-indigo-700">
              Simple interfaces make calculations quick and effortless.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Educational Content</h3>
            <p className="text-indigo-700">
              Learn about betting strategies and gaming concepts with detailed explanations.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Sports Betting Tips</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Responsible Betting</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Set and stick to a budget</li>
              <li>• Never chase losses</li>
              <li>• Keep detailed records</li>
              <li>• Understand the odds</li>
              <li>• Research before betting</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Strategy Development</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Study statistics and trends</li>
              <li>• Manage your bankroll</li>
              <li>• Shop for best odds</li>
              <li>• Focus on value bets</li>
              <li>• Stay disciplined</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}