import React, { useState } from 'react';
import { Building2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBAH, locations } from '../../utils/calculators/bah';
import { formatCurrency } from '../../utils/format';

export function BAHCalculator() {
  const [rank, setRank] = useState('E-5');
  const [hasDependents, setHasDependents] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const results = calculateBAH(rank, hasDependents, selectedLocation);

  const ranks = [
    'E-1', 'E-2', 'E-3', 'E-4', 'E-5', 'E-6', 'E-7', 'E-8', 'E-9',
    'W-1', 'W-2', 'W-3', 'W-4', 'W-5',
    'O-1E', 'O-2E', 'O-3E',
    'O-1', 'O-2', 'O-3', 'O-4', 'O-5', 'O-6', 'O-7'
  ];

  return (
    <CalculatorLayout
      title="BAH Calculator"
      description="Calculate Basic Allowance for Housing"
      icon={<Building2 />}
    >
      <SEO
        title="BAH Calculator | Basic Allowance for Housing Calculator"
        description="Calculate your Basic Allowance for Housing (BAH) based on rank, location, and dependency status. Free BAH calculator for military members."
        keywords={[
          'bah calculator',
          'military housing allowance',
          'basic allowance for housing',
          'military bah rates',
          'housing allowance calculator',
          'military benefits'
        ]}
        canonicalUrl="/bah-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Service Member Information</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {ranks.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dependency Status</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setHasDependents(true)}
                className={`px-4 py-2 rounded-md ${
                  hasDependents
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                With Dependents
              </button>
              <button
                onClick={() => setHasDependents(false)}
                className={`px-4 py-2 rounded-md ${
                  !hasDependents
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Without Dependents
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Duty Location</label>
            <select
              value={selectedLocation.zip}
              onChange={(e) => setSelectedLocation(
                locations.find(loc => loc.zip === e.target.value) || locations[0]
              )}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {locations.map((location) => (
                <option key={location.zip} value={location.zip}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">BAH Allowance</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.monthlyAllowance)}
              </div>
              <div className="text-gray-500">Monthly Allowance</div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Annual Allowance"
              value={formatCurrency(results.annualAllowance)}
              helpText="Total BAH for the year"
            />

            <CalculatorResult
              label="Recommended Housing Type"
              value={results.housingType}
              helpText="Based on allowance amount"
            />

            <CalculatorResult
              label="Utility Allowance"
              value={formatCurrency(results.utilities)}
              helpText="Estimated monthly utilities portion"
            />

            <CalculatorResult
              label="Maximum Rent"
              value={formatCurrency(results.rentCap)}
              helpText="Recommended maximum monthly rent"
            />

            <CalculatorResult
              label="Location Adjustment"
              value={`${results.costOfLivingAdjustment}%`}
              helpText="Cost of living adjustment for location"
            />
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding BAH</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is BAH?</h3>
              <p className="text-gray-600">
                Basic Allowance for Housing (BAH) is a U.S. military benefit that provides uniformed 
                service members equitable housing compensation based on housing costs in local 
                civilian housing markets when government quarters are not provided.
              </p>
              <ul className="mt-4 text-gray-600 space-y-2">
                <li>• Tax-free monthly housing allowance</li>
                <li>• Based on local rental market</li>
                <li>• Varies by location and rank</li>
                <li>• Adjusted for dependents</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Duty location ZIP code</li>
                <li>• Pay grade/rank</li>
                <li>• Dependency status</li>
                <li>• Local housing costs</li>
                <li>• Utility costs</li>
                <li>• Renter's insurance</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">BAH Policies</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Rate Protection</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Grandfathered rates</li>
                <li>• Annual adjustments</li>
                <li>• No rate decreases</li>
                <li>• PCS implications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Eligibility</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Active duty service</li>
                <li>• Reserve/Guard status</li>
                <li>• Dependency changes</li>
                <li>• Location requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Situations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Dual-military couples</li>
                <li>• Partial BAH</li>
                <li>• Transit housing</li>
                <li>• Overseas housing</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}