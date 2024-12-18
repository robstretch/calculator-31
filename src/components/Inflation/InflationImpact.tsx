import React from 'react';

export function InflationImpact() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">How Inflation Affects Your Money</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Savings Impact</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Reduced purchasing power</li>
            <li>• Lower real returns</li>
            <li>• Emergency fund value</li>
            <li>• Cash holdings risk</li>
            <li>• Interest rate effects</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Impact</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Bond value changes</li>
            <li>• Stock market effects</li>
            <li>• Real estate appreciation</li>
            <li>• Commodity prices</li>
            <li>• Portfolio adjustments</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Income Impact</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Wage adjustments</li>
            <li>• Fixed income challenges</li>
            <li>• Social Security benefits</li>
            <li>• Retirement planning</li>
            <li>• Purchasing power parity</li>
          </ul>
        </div>
      </div>
    </section>
  );
}