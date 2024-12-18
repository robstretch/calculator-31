import React from 'react';

export function InflationProtection() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Protecting Against Inflation</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Investment Strategies</h3>
          <div className="space-y-4 text-gray-600">
            <p>
              <strong>TIPS (Treasury Inflation-Protected Securities)</strong>
              <br />
              Government bonds that adjust principal based on inflation
            </p>
            <p>
              <strong>I Bonds</strong>
              <br />
              Savings bonds with inflation-adjusted interest rates
            </p>
            <p>
              <strong>Real Estate</strong>
              <br />
              Property values and rents tend to rise with inflation
            </p>
            <p>
              <strong>Commodities</strong>
              <br />
              Raw materials often increase in price with inflation
            </p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Planning</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Diversify investments</li>
            <li>• Adjust savings rate</li>
            <li>• Review fixed expenses</li>
            <li>• Consider variable rate debt</li>
            <li>• Negotiate salary increases</li>
            <li>• Build emergency reserves</li>
            <li>• Monitor inflation trends</li>
            <li>• Update financial goals</li>
          </ul>
        </div>
      </div>
    </section>
  );
}