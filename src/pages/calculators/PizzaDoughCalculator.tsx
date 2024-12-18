import React, { useState } from 'react';
import { Apple } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculatePizzaDough } from '../../utils/calculators/pizzaDough/calculate';
import type { PizzaSpecs } from '../../utils/calculators/pizzaDough/types';

export function PizzaDoughCalculator() {
  const [specs, setSpecs] = useState<PizzaSpecs>({
    pizzaCount: 2,
    pizzaSize: 12,
    doughStyle: 'neapolitan',
    proofTime: 240,
    roomTemp: 72
  });

  const result = calculatePizzaDough(specs);

  return (
    <CalculatorLayout
      title="Pizza Dough Calculator"
      description="Calculate perfect pizza dough ingredients and timing"
      icon={<Apple />}
    >
      <SEO
        title="Pizza Dough Calculator | Perfect Pizza Dough Recipe"
        description="Calculate exact pizza dough ingredients, hydration, and timing. Get perfect results for Neapolitan, NY-style, thin crust, and deep dish pizza."
        keywords={[
          'pizza dough calculator',
          'pizza recipe calculator',
          'dough hydration calculator',
          'pizza ingredients calculator',
          'neapolitan pizza dough',
          'ny style pizza dough'
        ]}
        canonicalUrl="/pizza-dough-calculator"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dough Specifications</h2>
            
            <div className="space-y-4">
              <CalculatorInput
                label="Number of Pizzas"
                value={specs.pizzaCount}
                onChange={(value) => setSpecs({ ...specs, pizzaCount: Number(value) })}
                min={1}
                max={10}
              />

              <CalculatorInput
                label="Pizza Size (inches)"
                value={specs.pizzaSize}
                onChange={(value) => setSpecs({ ...specs, pizzaSize: Number(value) })}
                min={8}
                max={18}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dough Style
                </label>
                <select
                  value={specs.doughStyle}
                  onChange={(e) => setSpecs({ ...specs, doughStyle: e.target.value as PizzaSpecs['doughStyle'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="neapolitan">Neapolitan</option>
                  <option value="ny-style">New York Style</option>
                  <option value="thin-crust">Thin Crust</option>
                  <option value="deep-dish">Deep Dish</option>
                </select>
              </div>

              <CalculatorInput
                label="Proof Time (minutes)"
                value={specs.proofTime}
                onChange={(value) => setSpecs({ ...specs, proofTime: Number(value) })}
                min={60}
                max={1440}
              />

              <CalculatorInput
                label="Room Temperature (°F)"
                value={specs.roomTemp}
                onChange={(value) => setSpecs({ ...specs, roomTemp: Number(value) })}
                min={65}
                max={85}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ingredients</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Flour</span>
                <span className="font-medium">{result.ingredients.flour}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Water</span>
                <span className="font-medium">{result.ingredients.water}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Salt</span>
                <span className="font-medium">{result.ingredients.salt}g</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Yeast</span>
                <span className="font-medium">{result.ingredients.yeast}g</span>
              </div>
              {result.ingredients.oliveOil && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Olive Oil</span>
                  <span className="font-medium">{result.ingredients.oliveOil}g</span>
                </div>
              )}
              {result.ingredients.sugar && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Sugar</span>
                  <span className="font-medium">{result.ingredients.sugar}g</span>
                </div>
              )}
              <div className="pt-2 mt-2 border-t">
                <div className="flex justify-between text-indigo-600 font-medium">
                  <span>Hydration</span>
                  <span>{result.hydration}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="space-y-4">
              {result.instructions.map((instruction, index) => (
                <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="font-medium text-gray-900">{instruction.step}</div>
                  <div className="text-sm text-gray-600 mt-1">{instruction.description}</div>
                  {instruction.duration && (
                    <div className="text-sm text-indigo-600 mt-1">
                      {instruction.duration} minutes
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Tips & Techniques</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {result.tips.map((tip, index) => (
              <div key={index} className="border-b last:border-0 pb-3 last:pb-0">
                <div className="font-medium text-gray-900">{tip.category}</div>
                <div className="text-sm text-gray-600 mt-1">{tip.suggestion}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              The Pizza Dough Calculator helps you create the perfect pizza dough by calculating exact 
              ingredients and timing based on your specifications. Here's how to use it:
            </p>
            
            <ol className="list-decimal pl-4 space-y-2 mt-4">
              <li>Select the number of pizzas you want to make</li>
              <li>Choose your desired pizza size (in inches)</li>
              <li>Pick your preferred dough style</li>
              <li>Set the total proofing time</li>
              <li>Enter your room temperature for accurate timing</li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Understanding Dough Styles</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Neapolitan:</strong> Traditional Italian style with high heat and minimal ingredients</li>
              <li><strong>New York Style:</strong> Chewy, foldable crust with olive oil and sugar</li>
              <li><strong>Thin Crust:</strong> Crispy texture with lower hydration</li>
              <li><strong>Deep Dish:</strong> Thick, rich dough with higher hydration</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Key Concepts</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li><strong>Hydration:</strong> The ratio of water to flour, affecting texture and chewiness</li>
              <li><strong>Proofing:</strong> The fermentation time that develops flavor and texture</li>
              <li><strong>Room Temperature:</strong> Affects fermentation speed and timing</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}