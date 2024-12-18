import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateCooking } from '../../utils/calculators/cooking/calculate';

export function CookingCalculator() {
  const [inputs, setInputs] = useState({
    servings: 4,
    originalServings: 4,
    temperature: {
      value: 350,
      unit: 'F' as const
    },
    time: {
      hours: 1,
      minutes: 30
    },
    weight: {
      value: 2,
      unit: 'lbs' as const
    }
  });

  const results = calculateCooking(inputs);

  return (
    <CalculatorLayout
      title="Cooking Calculator"
      description="Scale recipes, convert measurements, and adjust cooking times."
      icon={<Calculator />}
    >
      <SEO 
        title="Cooking Calculator | Recipe Scaling & Conversion Tool"
        description="Free cooking calculator for scaling recipes, converting measurements, and adjusting cooking times. Perfect for home cooks and professional chefs."
        keywords={[
          'cooking calculator',
          'recipe converter',
          'kitchen calculator',
          'measurement converter',
          'recipe scaling'
        ]}
        canonicalUrl="/cooking-calculator"
      />

      <div className="grid gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recipe Details</h2>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <CalculatorInput
                label="Original Servings"
                value={inputs.originalServings}
                onChange={(value) => setInputs({ ...inputs, originalServings: Number(value) })}
                min={1}
              />
              <CalculatorInput
                label="Desired Servings"
                value={inputs.servings}
                onChange={(value) => setInputs({ ...inputs, servings: Number(value) })}
                min={1}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <CalculatorInput
                label="Temperature"
                value={inputs.temperature.value}
                onChange={(value) => setInputs({
                  ...inputs,
                  temperature: { ...inputs.temperature, value: Number(value) }
                })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temperature Unit
                </label>
                <select
                  value={inputs.temperature.unit}
                  onChange={(e) => setInputs({
                    ...inputs,
                    temperature: { ...inputs.temperature, unit: e.target.value as 'F' | 'C' }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="F">Fahrenheit</option>
                  <option value="C">Celsius</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Scaled Ingredients */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Scaled Ingredients</h3>
            <div className="space-y-2">
              {results.ingredients.map((ing, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">{ing.name}</span>
                  <span className="font-medium">
                    {ing.scaled} {ing.unit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conversions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Conversions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {results.conversions.map((conv, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">{conv.category}</div>
                  <div className="font-medium">
                    {conv.original} → {conv.converted}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Cooking Tips</h3>
            <div className="grid gap-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-indigo-600">{rec.category}</div>
                  <p className="text-gray-600 mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}