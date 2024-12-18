import React, { useState } from 'react';
import { Calculator, Cog, Zap } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateFactorio } from '../../utils/calculators/factorio/calculate';
import type { Recipe } from '../../utils/calculators/factorio/types';

const SAMPLE_RECIPES: Recipe[] = [
  {
    name: 'Electronic Circuit',
    ingredients: [
      { item: 'Iron Plate', amount: 1 },
      { item: 'Copper Cable', amount: 3 }
    ],
    craftingTime: 0.5,
    output: 1,
    machineType: 'assembler'
  },
  {
    name: 'Advanced Circuit',
    ingredients: [
      { item: 'Electronic Circuit', amount: 2 },
      { item: 'Plastic Bar', amount: 2 },
      { item: 'Copper Cable', amount: 4 }
    ],
    craftingTime: 6,
    output: 1,
    machineType: 'assembler'
  }
];

export function FactorioCalculator() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(SAMPLE_RECIPES[0]);
  const [targetOutput, setTargetOutput] = useState(60); // Items per minute
  const [machineSpeed, setMachineSpeed] = useState(1);
  const [speedModules, setSpeedModules] = useState(0);
  const [productivityModules, setProductivityModules] = useState(0);

  const result = calculateFactorio({
    recipe: selectedRecipe,
    targetOutput: targetOutput / 60, // Convert to items per second
    machineSpeed,
    speedModules,
    productivityModules
  });

  return (
    <CalculatorLayout
      title="Factorio Calculator"
      description="Calculate production ratios and factory requirements for Factorio."
      icon={<Calculator />}
    >
      <SEO
        title="Factorio Calculator | Production Ratio Calculator"
        description="Calculate production ratios, machine requirements, and factory layouts for Factorio. Optimize your factory with our free calculator."
        keywords={[
          'factorio calculator',
          'production ratio calculator',
          'factory planner',
          'factorio production',
          'factorio optimization',
          'factorio machines'
        ]}
        canonicalUrl="/factorio-calculator"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Recipe Selection */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Cog className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Recipe Settings</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Recipe</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedRecipe.name}
                  onChange={(e) => setSelectedRecipe(
                    SAMPLE_RECIPES.find(r => r.name === e.target.value)!
                  )}
                >
                  {SAMPLE_RECIPES.map(recipe => (
                    <option key={recipe.name} value={recipe.name}>
                      {recipe.name}
                    </option>
                  ))}
                </select>
              </div>

              <CalculatorInput
                label="Target Output (items/minute)"
                value={targetOutput}
                onChange={(value) => setTargetOutput(Number(value))}
                min={1}
                max={1000}
              />

              <CalculatorInput
                label="Machine Speed"
                value={machineSpeed}
                onChange={(value) => setMachineSpeed(Number(value))}
                min={0.5}
                max={2}
                step={0.25}
              />

              <div className="grid grid-cols-2 gap-4">
                <CalculatorInput
                  label="Speed Modules"
                  value={speedModules}
                  onChange={(value) => setSpeedModules(Number(value))}
                  min={0}
                  max={4}
                />

                <CalculatorInput
                  label="Productivity Modules"
                  value={productivityModules}
                  onChange={(value) => setProductivityModules(Number(value))}
                  min={0}
                  max={4}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Results */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Production Results</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorResult
                label="Machines Required"
                value={result.machinesNeeded}
                helpText="Number of machines needed for target output"
              />

              <CalculatorResult
                label="Actual Output"
                value={`${(result.actualOutput * 60).toFixed(1)} items/min`}
                helpText="Actual production rate with given setup"
              />

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Resource Requirements</h3>
                <div className="space-y-2">
                  {result.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{ingredient.item}</span>
                      <span className="font-medium text-gray-900">
                        {ingredient.amountPerMinute.toFixed(1)}/min
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-2">Module Effects</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Speed Multiplier</span>
                    <span className="font-medium text-gray-900">
                      {(result.modules.impact.speed * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Productivity Bonus</span>
                    <span className="font-medium text-gray-900">
                      {((result.modules.impact.productivity - 1) * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Energy Usage</span>
                    <span className="font-medium text-gray-900">
                      {(result.modules.impact.energy * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Optimization Tips</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{rec.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Understanding Production Ratios</h2>
          </div>
          
          <div className="p-6 prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Optimizing production in Factorio requires careful planning of machine ratios, resource 
              throughput, and module configurations. This calculator helps you determine the optimal 
              setup for your factory by considering crafting times, machine speeds, and module effects.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Concepts</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Machine Speed</h4>
                <p className="text-gray-600">
                  Different machine tiers have varying crafting speeds. Assembling Machine 1 has a 
                  speed of 0.5, while Assembling Machine 3 reaches 1.25, significantly impacting 
                  production rates.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Module Effects</h4>
                <p className="text-gray-600">
                  Modules can enhance production through speed bonuses or productivity increases, but 
                  often come with tradeoffs in energy consumption or pollution generation.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Optimization Strategies</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Balancing Resources</h4>
                <p className="text-gray-600">
                  Ensure input materials are supplied at the correct ratios to prevent bottlenecks. 
                  Consider using splitters and priority inputs to maintain steady production.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Module Selection</h4>
                <p className="text-gray-600">
                  Choose modules based on your priorities: speed modules for space efficiency, 
                  productivity modules for resource efficiency, or a combination for balanced production.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Advanced Tips</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Beacon Setup:</strong> Use beacons with speed modules to boost production while minimizing machine count
              </li>
              <li>
                <strong>Belt Throughput:</strong> Consider belt capacity when planning high-volume production lines
              </li>
              <li>
                <strong>Power Management:</strong> Plan power infrastructure to handle increased consumption from modules
              </li>
              <li>
                <strong>Space Efficiency:</strong> Organize machines to minimize resource travel distance
              </li>
            </ul>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}