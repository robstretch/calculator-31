import React from 'react';

export function InflationBasics() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Inflation</h2>
      <div className="prose max-w-none text-gray-600">
        <p>
          Inflation is the rate at which the general level of prices for goods and services rises, 
          consequently decreasing purchasing power over time. Understanding inflation helps you make 
          better financial decisions and plan for the future.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Concepts</h3>
            <ul className="space-y-2">
              <li>• Consumer Price Index (CPI)</li>
              <li>• Purchasing power</li>
              <li>• Cost of living adjustments</li>
              <li>• Real vs. nominal values</li>
              <li>• Inflation expectations</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Types of Inflation</h3>
            <ul className="space-y-2">
              <li>• Demand-pull inflation</li>
              <li>• Cost-push inflation</li>
              <li>• Built-in inflation</li>
              <li>• Hyperinflation</li>
              <li>• Stagflation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}