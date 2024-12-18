import React from 'react';

export function HelocTips() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">HELOC Management Tips</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Smart Borrowing</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Borrow only what's needed</li>
            <li>• Create a repayment plan</li>
            <li>• Monitor interest rates</li>
            <li>• Track draw period end date</li>
            <li>• Consider fixed-rate options</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Strategies</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Pay more than minimum</li>
            <li>• Make principal payments</li>
            <li>• Set up automatic payments</li>
            <li>• Budget for rate increases</li>
            <li>• Consider refinancing options</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Long-term Planning</h3>
          <ul className="text-gray-600 space-y-2">
            <li>• Monitor home value</li>
            <li>• Review terms annually</li>
            <li>• Plan for repayment period</li>
            <li>• Maintain emergency fund</li>
            <li>• Consider tax implications</li>
          </ul>
        </div>
      </div>
    </section>
  );
}