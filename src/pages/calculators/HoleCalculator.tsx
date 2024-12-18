import React, { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { Ruler } from 'lucide-react';
import { calculateHole } from '../../utils/calculators/hole/calculate';
import type { HoleResult } from '../../utils/calculators/hole/types';

export function HoleCalculator() {
  const [diameter, setDiameter] = useState('');
  const [depth, setDepth] = useState('');
  const [unit, setUnit] = useState('feet');
  const [soilType, setSoilType] = useState('average');
  const [purpose, setPurpose] = useState('post');
  const [result, setResult] = useState<HoleResult | null>(null);

  const handleCalculate = () => {
    const input = {
      diameter: parseFloat(diameter),
      depth: parseFloat(depth),
      unit: unit as 'inches' | 'feet' | 'meters',
      soilType: soilType as 'loose' | 'average' | 'dense' | 'rocky',
      purpose: purpose as 'post' | 'planting' | 'foundation' | 'utility'
    };

    if (!isNaN(input.diameter) && !isNaN(input.depth)) {
      setResult(calculateHole(input));
    }
  };

  return (
    <>
      <SEO
        title="Hole Calculator | Excavation Volume & Materials"
        description="Calculate hole volume, required materials, and cost estimates for post holes, planting holes, and excavation projects."
        keywords={[
          'hole calculator',
          'excavation calculator',
          'post hole',
          'digging calculator',
          'soil volume'
        ]}
        canonicalUrl="/hole-calculator"
      />

      <CalculatorLayout
        title="Hole Calculator"
        description="Calculate hole volume, materials needed, and cost estimates for your digging project."
        icon={<Ruler />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CalculatorInput
              label="Diameter"
              value={diameter}
              onChange={setDiameter}
              placeholder="Enter diameter"
              min={0}
            />
            <CalculatorInput
              label="Depth"
              value={depth}
              onChange={setDepth}
              placeholder="Enter depth"
              min={0}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="inches">Inches</option>
                <option value="feet">Feet</option>
                <option value="meters">Meters</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Soil Type
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="loose">Loose Soil</option>
                <option value="average">Average Soil</option>
                <option value="dense">Dense Soil</option>
                <option value="rocky">Rocky Soil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purpose
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="post">Post Hole</option>
                <option value="planting">Planting Hole</option>
                <option value="foundation">Foundation</option>
                <option value="utility">Utility</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Calculate
          </button>

          {result && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CalculatorResult
                  label="Volume (Cu. Yards)"
                  value={result.volume.cubicYards.toFixed(2)}
                />
                <CalculatorResult
                  label="Volume (Cu. Feet)"
                  value={result.volume.cubicFeet.toFixed(2)}
                />
                <CalculatorResult
                  label="Volume (Gallons)"
                  value={result.volume.gallons.toString()}
                />
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Excavation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Time Estimate</p>
                    <p className="font-medium">{result.excavation.timeEstimate} hours</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Recommended Method</p>
                    <p className="font-medium">{result.excavation.methodRecommended}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Cost Estimate</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Labor</p>
                    <p className="font-medium">${result.estimatedCost.labor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Materials</p>
                    <p className="font-medium">${result.estimatedCost.materials}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Equipment</p>
                    <p className="font-medium">${result.estimatedCost.equipment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-medium">${result.estimatedCost.total}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec, index) => (
                    <div key={index}>
                      <p className="font-medium">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">About the Hole Calculator</h2>
          <p className="text-gray-600">
            The hole calculator helps you determine the volume, materials, and cost estimates for various types of excavation projects. Whether you're digging post holes, planting trees, or working on foundations, this calculator provides comprehensive information to plan your project effectively.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Enter the hole diameter</li>
            <li>Enter the depth</li>
            <li>Select the measurement unit</li>
            <li>Choose the soil type</li>
            <li>Select the purpose of the hole</li>
            <li>Click "Calculate" to see results</li>
          </ol>

          <h3 className="text-xl font-semibold text-gray-900 mt-6">Understanding Results</h3>
          <div className="space-y-4 text-gray-600">
            <p>The calculator provides:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Volume calculations in cubic yards, cubic feet, and gallons</li>
              <li>Excavation time estimates based on soil conditions</li>
              <li>Required materials for backfill and stabilization</li>
              <li>Cost estimates for labor, materials, and equipment</li>
              <li>Safety and method recommendations</li>
            </ul>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg mt-6">
            <h3 className="text-xl font-semibold text-indigo-900">Safety First</h3>
            <div className="space-y-2 text-indigo-800">
              <p>Always remember to:</p>
              <ul className="list-disc list-inside">
                <li>Call 811 before digging to locate utilities</li>
                <li>Ensure proper shoring for deep holes</li>
                <li>Wear appropriate safety equipment</li>
                <li>Follow local building codes and regulations</li>
              </ul>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}