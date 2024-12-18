import React from 'react';

export function TaxBrackets() {
  return (
    <section className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Tax Brackets (2024)</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Single Filers</h3>
          <div className="space-y-2 text-gray-600">
            <p>• 10%: $0 - $11,600</p>
            <p>• 12%: $11,601 - $47,150</p>
            <p>• 22%: $47,151 - $100,525</p>
            <p>• 24%: $100,526 - $191,950</p>
            <p>• 32%: $191,951 - $243,725</p>
            <p>• 35%: $243,726 - $609,350</p>
            <p>• 37%: Over $609,350</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Married Filing Jointly</h3>
          <div className="space-y-2 text-gray-600">
            <p>• 10%: $0 - $23,200</p>
            <p>• 12%: $23,201 - $94,300</p>
            <p>• 22%: $94,301 - $201,050</p>
            <p>• 24%: $201,051 - $383,900</p>
            <p>• 32%: $383,901 - $487,450</p>
            <p>• 35%: $487,451 - $731,200</p>
            <p>• 37%: Over $731,200</p>
          </div>
        </div>
      </div>
    </section>
  );
}