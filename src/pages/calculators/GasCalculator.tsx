import React, { useState } from 'react';
import { Fuel } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateGas } from '../../utils/calculators/gas/calculate';
import { formatCurrency, formatNumber } from '../../utils/format';

export function GasCalculator() {
  const [distance, setDistance] = useState('100');
  const [mpg, setMpg] = useState('25');
  const [gasPrice, setGasPrice] = useState('3.50');
  const [commuteDays, setCommuteDays] = useState('20');

  const results = calculateGas(
    parseFloat(distance) || 0,
    parseFloat(mpg) || 0,
    parseFloat(gasPrice) || 0,
    parseFloat(commuteDays) || 0
  );

  return (
    <CalculatorLayout
      title="Gas Calculator"
      description="Calculate fuel costs and mileage"
      icon={<Fuel />}
    >
      <SEO
        title="Gas Calculator | Fuel Cost Calculator"
        description="Calculate fuel costs for trips and commutes. Free gas calculator with mileage and cost estimates."
        keywords={[
          'gas calculator',
          'fuel calculator',
          'mileage calculator',
          'gas cost calculator',
          'fuel cost estimator',
          'commute cost calculator'
        ]}
        canonicalUrl="/gas-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trip Details</h2>
          
          <CalculatorInput
            label="Distance (miles)"
            value={distance}
            onChange={setDistance}
            min={0}
            step={1}
            placeholder="Enter trip distance"
          />
          
          <CalculatorInput
            label="Vehicle MPG"
            value={mpg}
            onChange={setMpg}
            min={0}
            step={0.1}
            placeholder="Enter vehicle MPG"
          />
          
          <CalculatorInput
            label="Gas Price (per gallon)"
            value={gasPrice}
            onChange={setGasPrice}
            min={0}
            step={0.01}
            placeholder="Enter gas price"
          />
          
          <CalculatorInput
            label="Commute Days per Month (optional)"
            value={commuteDays}
            onChange={setCommuteDays}
            min={0}
            max={31}
            step={1}
            placeholder="Enter commute days"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Cost Analysis</h2>
          
          <CalculatorResult
            label="Trip Cost"
            value={formatCurrency(results.tripCost)}
            helpText="Cost for one-way trip"
          />
          
          <CalculatorResult
            label="Cost per Mile"
            value={formatCurrency(results.costPerMile)}
            helpText="Average cost per mile"
          />
          
          <CalculatorResult
            label="Gallons Needed"
            value={formatNumber(results.gallonsNeeded, 2)}
            helpText="Fuel required for trip"
          />

          {results.monthlyCommuteCost > 0 && (
            <>
              <CalculatorResult
                label="Monthly Commute Cost"
                value={formatCurrency(results.monthlyCommuteCost)}
                helpText="Total cost for monthly round-trip commute"
              />
              
              <CalculatorResult
                label="Yearly Commute Cost"
                value={formatCurrency(results.yearlyCommuteCost)}
                helpText="Total cost for yearly round-trip commute"
              />
            </>
          )}
          
          <CalculatorResult
            label="CO2 Emissions"
            value={`${formatNumber(results.co2Emissions, 1)} lbs`}
            helpText="Estimated carbon dioxide emissions"
          />
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Fuel Costs</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Factors Affecting MPG</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Vehicle type and size</li>
                <li>• Driving habits</li>
                <li>• Road conditions</li>
                <li>• Weather conditions</li>
                <li>• Vehicle maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cost Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regional gas prices</li>
                <li>• Seasonal price changes</li>
                <li>• Alternative routes</li>
                <li>• Carpooling options</li>
                <li>• Public transportation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fuel Efficiency Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Driving Habits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Maintain steady speed</li>
                <li>• Avoid rapid acceleration</li>
                <li>• Use cruise control</li>
                <li>• Reduce idle time</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Maintenance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular tune-ups</li>
                <li>• Proper tire pressure</li>
                <li>• Clean air filters</li>
                <li>• Quality fuel</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Combine trips</li>
                <li>• Avoid peak traffic</li>
                <li>• Plan efficient routes</li>
                <li>• Check traffic updates</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}