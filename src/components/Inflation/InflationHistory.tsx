import React from 'react';

export function InflationHistory() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Historical Inflation Perspective</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Notable Periods</h3>
          <div className="space-y-3 text-gray-600">
            <div>
              <strong>1970s Stagflation</strong>
              <p>High inflation combined with economic stagnation</p>
            </div>
            <div>
              <strong>1980s Disinflation</strong>
              <p>Period of declining inflation rates</p>
            </div>
            <div>
              <strong>2008 Financial Crisis</strong>
              <p>Deflationary pressures and monetary policy response</p>
            </div>
            <div>
              <strong>2020s Inflation Surge</strong>
              <p>Post-pandemic supply chain disruptions and stimulus effects</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Price Comparison Over Time</h3>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-indigo-900 mb-2">Example: $100 in 1970</p>
            <ul className="text-indigo-700 space-y-1">
              <li>• 1980: $216</li>
              <li>• 1990: $319</li>
              <li>• 2000: $432</li>
              <li>• 2010: $566</li>
              <li>• 2020: $672</li>
              <li>• 2024: $747</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}