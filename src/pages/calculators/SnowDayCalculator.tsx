import React, { useState } from 'react';
import { Snowflake } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { SitemapLink } from '../../components/Calculator/SitemapLink';
import { calculateSnowDayProbability, SnowDayFactors } from '../../utils/calculators/snow';
import { formatNumber } from '../../utils/format';

export function SnowDayCalculator() {
  const [factors, setFactors] = useState<SnowDayFactors>({
    snowfall: 4,
    temperature: 28,
    windSpeed: 15,
    existingSnow: 2,
    timeOfDay: 'overnight',
    roadConditions: 'snow-covered',
    schoolType: 'suburban'
  });

  const results = calculateSnowDayProbability(factors);

  const updateFactor = <K extends keyof SnowDayFactors>(
    factor: K,
    value: SnowDayFactors[K]
  ) => {
    setFactors(prev => ({ ...prev, [factor]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <SEO
        title="Snow Day Calculator | School Cancellation Predictor"
        description="Calculate the probability of a snow day based on weather conditions. Free snow day calculator with detailed analysis."
        keywords={[
          'snow day calculator',
          'school cancellation calculator',
          'snow day predictor',
          'weather calculator',
          'school closing calculator',
          'winter weather calculator'
        ]}
        canonicalUrl="/snow-day-calculator"
      />
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Snowflake className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Snow Day Calculator</h1>
        <p className="text-gray-600">
          Calculate the probability of a snow day based on weather conditions and other factors
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Weather Conditions</h2>
          
          <CalculatorInput
            label="Expected Snowfall (inches)"
            value={factors.snowfall.toString()}
            onChange={(value) => updateFactor('snowfall', parseFloat(value) || 0)}
            min={0}
            max={24}
            step={0.5}
          />
          
          <CalculatorInput
            label="Temperature (°F)"
            value={factors.temperature.toString()}
            onChange={(value) => updateFactor('temperature', parseFloat(value) || 0)}
            min={-20}
            max={40}
            step={1}
          />
          
          <CalculatorInput
            label="Wind Speed (mph)"
            value={factors.windSpeed.toString()}
            onChange={(value) => updateFactor('windSpeed', parseFloat(value) || 0)}
            min={0}
            max={50}
            step={1}
          />
          
          <CalculatorInput
            label="Existing Snow on Ground (inches)"
            value={factors.existingSnow.toString()}
            onChange={(value) => updateFactor('existingSnow', parseFloat(value) || 0)}
            min={0}
            max={24}
            step={0.5}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Time of Snowfall
            </label>
            <select
              value={factors.timeOfDay}
              onChange={(e) => updateFactor('timeOfDay', e.target.value as SnowDayFactors['timeOfDay'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="overnight">Overnight</option>
              <option value="morning">Morning</option>
              <option value="midday">Midday</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Road Conditions
            </label>
            <select
              value={factors.roadConditions}
              onChange={(e) => updateFactor('roadConditions', e.target.value as SnowDayFactors['roadConditions'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="clear">Clear</option>
              <option value="wet">Wet</option>
              <option value="icy">Icy</option>
              <option value="snow-covered">Snow Covered</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School District Type
            </label>
            <select
              value={factors.schoolType}
              onChange={(e) => updateFactor('schoolType', e.target.value as SnowDayFactors['schoolType'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="urban">Urban</option>
              <option value="suburban">Suburban</option>
              <option value="rural">Rural</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Snow Day Prediction</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">Probability of a Snow Day</div>
              <div className="text-4xl font-bold mb-2" style={{
                color: results.riskLevel === 'low' ? '#10B981' :
                       results.riskLevel === 'moderate' ? '#F59E0B' :
                       results.riskLevel === 'high' ? '#EF4444' : '#7C3AED'
              }}>
                {results.probability}%
              </div>
              <div className="text-sm font-medium" style={{
                color: results.riskLevel === 'low' ? '#059669' :
                       results.riskLevel === 'moderate' ? '#D97706' :
                       results.riskLevel === 'high' ? '#DC2626' : '#6D28D9'
              }}>
                {results.riskLevel.replace('-', ' ').toUpperCase()} RISK
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-3">Recommendation:</h3>
            <p className="text-gray-700">{results.recommendation}</p>
          </div>

          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-indigo-900 mb-4">Contributing Factors:</h3>
            <div className="space-y-3">
              {results.factors.map((factor) => (
                <div key={factor.factor} className="flex items-center justify-between">
                  <div className="text-indigo-700">
                    <div className="font-medium">{factor.factor}</div>
                    <div className="text-sm">{factor.description}</div>
                  </div>
                  <div className="text-indigo-600 font-medium">
                    +{formatNumber(factor.impact)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">About Snow Day Predictions</h2>
        <div className="prose text-gray-600">
          <p>
            This calculator uses multiple factors to estimate the likelihood of a snow day, 
            including expected snowfall, temperature, wind conditions, and existing snow coverage. 
            The calculation also considers timing, road conditions, and school district characteristics.
          </p>
          <p className="mt-4">
            While this tool provides an educated estimate, the final decision always rests with 
            school administrators who must consider additional local factors and safety concerns.
          </p>
        </div>
      </div>

      <SitemapLink />
    </div>
  );
}