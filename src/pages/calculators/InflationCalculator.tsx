import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { InflationBasics } from '../../components/Inflation/InflationBasics';
import { InflationImpact } from '../../components/Inflation/InflationImpact';
import { InflationProtection } from '../../components/Inflation/InflationProtection';
import { InflationHistory } from '../../components/Inflation/InflationHistory';
import { calculateInflation } from '../../utils/calculators/inflation';
import { formatCurrency, formatNumber } from '../../utils/format';

export function InflationCalculator() {
  const currentYear = new Date().getFullYear();
  const [amount, setAmount] = useState('100');
  const [startYear, setStartYear] = useState(currentYear.toString());
  const [endYear, setEndYear] = useState((currentYear + 10).toString());
  const [inflationRate, setInflationRate] = useState('2.5');

  const results = calculateInflation(
    parseFloat(amount) || 0,
    parseInt(startYear) || currentYear,
    parseInt(endYear) || currentYear + 10,
    parseFloat(inflationRate) || 2.5
  );

  return (
    <CalculatorLayout
      title="Inflation Calculator"
      description="Calculate how inflation affects the purchasing power of money over time"
      icon={<TrendingUp />}
    >
      <SEO
        title="Inflation Calculator | Purchasing Power Calculator"
        description="Calculate the effects of inflation on purchasing power over time. See how the value of money changes with our free inflation calculator."
        keywords={[
          'inflation calculator',
          'purchasing power calculator',
          'cost of living calculator',
          'value of money calculator',
          'inflation rate calculator',
          'price increase calculator'
        ]}
        canonicalUrl="/inflation-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Calculate Future Value</h2>
          
          <CalculatorInput
            label="Amount"
            value={amount}
            onChange={setAmount}
            min={0}
            step={1}
            placeholder="Enter amount"
          />
          
          <CalculatorInput
            label="Start Year"
            value={startYear}
            onChange={setStartYear}
            min={1900}
            max={parseInt(endYear)}
            step={1}
            placeholder="Enter start year"
          />
          
          <CalculatorInput
            label="End Year"
            value={endYear}
            onChange={setEndYear}
            min={parseInt(startYear)}
            max={2100}
            step={1}
            placeholder="Enter end year"
          />
          
          <CalculatorInput
            label="Average Inflation Rate (%)"
            value={inflationRate}
            onChange={setInflationRate}
            min={-20}
            max={20}
            step={0.1}
            placeholder="Enter inflation rate"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">
                {formatCurrency(parseFloat(amount))} in {startYear} is worth
              </div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {formatCurrency(results.futureValue)}
              </div>
              <div className="text-sm text-gray-500">
                in {endYear}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Total Change"
              value={formatCurrency(results.totalChange)}
              helpText="Absolute change in value"
            />
            <CalculatorResult
              label="Percentage Change"
              value={formatNumber(results.percentageChange) + '%'}
              helpText="Relative change in value"
            />
            <CalculatorResult
              label="Average Annual Rate"
              value={formatNumber(results.averageRate) + '%'}
              helpText="Compound annual growth rate"
            />
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg mt-6">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Year by Year Breakdown:</h3>
            <div className="space-y-2">
              {results.yearlyBreakdown.map((year) => (
                <div key={year.year} className="flex justify-between text-sm text-indigo-700">
                  <span>{year.year}:</span>
                  <span className="font-medium">{formatCurrency(year.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <InflationBasics />
        <InflationImpact />
        <InflationProtection />
        <InflationHistory />
      </div>
    </CalculatorLayout>
  );
}