import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateASQ } from '../../utils/calculators/asq/calculate';

export function ASQCalculator() {
  const [lotSize, setLotSize] = useState('1000');
  const [aql, setAQL] = useState('2.5');
  const [sampleSize, setSampleSize] = useState('100');
  const [acceptanceNumber, setAcceptanceNumber] = useState('2');

  const result = calculateASQ({
    lotSize: Number(lotSize),
    acceptableQualityLevel: Number(aql),
    sampleSize: Number(sampleSize),
    acceptanceNumber: Number(acceptanceNumber)
  });

  return (
    <>
      <SEO
        title="ASQ Calculator | Acceptance Sampling Quality"
        description="Calculate acceptance sampling plans, operating characteristic curves, and quality metrics for statistical quality control."
        keywords={[
          'ASQ calculator',
          'acceptance sampling',
          'quality control',
          'statistical sampling',
          'operating characteristic curve',
          'quality assurance'
        ]}
      />
      
      <CalculatorLayout
        title="ASQ Calculator"
        description="Calculate acceptance sampling plans and analyze quality control metrics"
        icon={<Calculator />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <CalculatorInput
              label="Lot Size"
              value={lotSize}
              onChange={setLotSize}
              min={1}
            />
            <CalculatorInput
              label="Acceptable Quality Level (%)"
              value={aql}
              onChange={setAQL}
              min={0}
              max={100}
              step={0.1}
            />
            <CalculatorInput
              label="Sample Size"
              value={sampleSize}
              onChange={setSampleSize}
              min={1}
            />
            <CalculatorInput
              label="Acceptance Number"
              value={acceptanceNumber}
              onChange={setAcceptanceNumber}
              min={0}
            />
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Probability of Acceptance"
              value={`${(result.probabilityAcceptance * 100).toFixed(2)}%`}
            />
            <CalculatorResult
              label="Producer's Risk"
              value={`${(result.risks.producerRisk * 100).toFixed(2)}%`}
            />
            <CalculatorResult
              label="Consumer's Risk"
              value={`${(result.risks.consumerRisk * 100).toFixed(2)}%`}
            />
            <CalculatorResult
              label="Effectiveness Index"
              value={`${result.metrics.effectivenessIndex.toFixed(1)}%`}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding ASQ Calculations</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Concepts</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Acceptance sampling determines lot quality based on sample inspection</li>
                <li>Operating Characteristic (OC) curve shows acceptance probability</li>
                <li>AQL defines acceptable quality level for producer's risk</li>
                <li>Sample size affects discrimination power of sampling plan</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2">Quality Metrics</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Producer's Risk (α): Probability of rejecting good lots</li>
                <li>Consumer's Risk (β): Probability of accepting bad lots</li>
                <li>Average Outgoing Quality (AOQ): Expected quality after inspection</li>
                <li>Effectiveness Index: Overall sampling plan performance</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-indigo-50 rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {result.recommendations.map((rec, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-indigo-600">{rec.category}</h4>
                <p className="text-gray-600 mt-1">{rec.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}