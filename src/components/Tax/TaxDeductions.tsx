import React from 'react';

export function TaxDeductions() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Deductions and Credits</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Standard Deduction</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Single: $14,600 (2024)</li>
            <li>• Married Filing Jointly: $29,200</li>
            <li>• Head of Household: $21,900</li>
            <li>• Automatic qualification</li>
            <li>• No itemization required</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Itemized Deductions</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Mortgage interest</li>
            <li>• State and local taxes</li>
            <li>• Charitable contributions</li>
            <li>• Medical expenses</li>
            <li>• Investment expenses</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Popular Tax Credits</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Child Tax Credit</li>
            <li>• Earned Income Credit</li>
            <li>• Education credits</li>
            <li>• Energy efficiency credits</li>
            <li>• Retirement savings credit</li>
          </ul>
        </div>
      </div>
    </section>
  );
}