import React from 'react';

export function HelocRisks() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding HELOC Risks</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Variable Interest Rates</h3>
          <p className="text-gray-600 mb-4">
            HELOCs typically have variable interest rates that can change based on market conditions:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Rates tied to prime rate</li>
            <li>• Monthly payments can increase</li>
            <li>• Budget for rate changes</li>
            <li>• Consider rate caps</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Foreclosure Risk</h3>
          <p className="text-gray-600 mb-4">
            Your home serves as collateral for the HELOC:
          </p>
          <ul className="text-gray-600 space-y-2">
            <li>• Missed payments risk foreclosure</li>
            <li>• Home value fluctuations</li>
            <li>• Market downturn impact</li>
            <li>• Emergency fund importance</li>
          </ul>
        </div>
      </div>
    </section>
  );
}