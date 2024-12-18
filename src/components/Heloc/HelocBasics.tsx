import React from 'react';

export function HelocBasics() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Home Equity Lines of Credit</h2>
      <div className="prose max-w-none text-gray-600">
        <p>
          A Home Equity Line of Credit (HELOC) is a revolving credit line secured by your home's equity. 
          Unlike a traditional home equity loan, a HELOC allows you to borrow money as needed, up to a 
          predetermined credit limit, similar to a credit card.
        </p>
        <div className="mt-6 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
            <ul className="space-y-2">
              <li>• Variable interest rates that adjust with market conditions</li>
              <li>• Draw period typically lasting 5-10 years</li>
              <li>• Flexible borrowing and repayment options</li>
              <li>• Interest may be tax-deductible (consult tax advisor)</li>
              <li>• Secured by your home's equity</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Uses</h3>
            <ul className="space-y-2">
              <li>• Home improvements and renovations</li>
              <li>• Debt consolidation</li>
              <li>• Emergency expenses</li>
              <li>• Education costs</li>
              <li>• Major purchases</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}