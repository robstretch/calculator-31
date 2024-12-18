import React from 'react';

export function TaxTips() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Planning Strategies</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Income Strategies</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Maximize pre-tax contributions</li>
            <li>• Time income recognition</li>
            <li>• Consider Roth conversions</li>
            <li>• Harvest investment losses</li>
            <li>• Bundle deductible expenses</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Retirement Planning</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Max out 401(k) contributions</li>
            <li>• Consider IRA options</li>
            <li>• HSA contributions</li>
            <li>• Catch-up contributions</li>
            <li>• Required minimum distributions</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Year-End Planning</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Review withholdings</li>
            <li>• Charitable giving</li>
            <li>• Business purchases</li>
            <li>• Education expenses</li>
            <li>• Document organization</li>
          </ul>
        </div>
      </div>
    </section>
  );
}