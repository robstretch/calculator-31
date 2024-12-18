import React from 'react';

export function HelocQualification() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">HELOC Qualification Requirements</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Credit Score</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Minimum 620 typically required</li>
            <li>• 700+ for best rates</li>
            <li>• Higher scores = larger credit lines</li>
            <li>• Recent credit history important</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Home Equity</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• 15-20% equity minimum</li>
            <li>• Based on current appraisal</li>
            <li>• Combined LTV typically 80-85%</li>
            <li>• Consider home value trends</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Income Requirements</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Stable employment history</li>
            <li>• Debt-to-income ratio under 43%</li>
            <li>• Verifiable income sources</li>
            <li>• Payment history review</li>
          </ul>
        </div>
      </div>
    </section>
  );
}