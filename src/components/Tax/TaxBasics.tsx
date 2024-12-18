import React from 'react';

export function TaxBasics() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Income Tax Basics</h2>
      <div className="prose max-w-none text-gray-600">
        <p>
          Income tax is a percentage of your income that you pay to the government. The U.S. uses a 
          progressive tax system, meaning tax rates increase as your income rises. Understanding how 
          tax brackets work is key to managing your tax liability.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Concepts</h3>
            <ul className="space-y-2">
              <li>• Progressive tax brackets</li>
              <li>• Marginal vs. effective tax rates</li>
              <li>• Taxable vs. non-taxable income</li>
              <li>• Deductions and credits</li>
              <li>• Filing status implications</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Income Types</h3>
            <ul className="space-y-2">
              <li>• Earned income (wages, salary)</li>
              <li>• Investment income</li>
              <li>• Self-employment income</li>
              <li>• Rental income</li>
              <li>• Retirement distributions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}