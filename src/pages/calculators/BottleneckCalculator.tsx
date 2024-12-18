import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBottleneck } from '../../utils/calculators/bottleneck/calculate';
import { Component } from '../../utils/calculators/bottleneck/types';
import { formatNumber } from '../../utils/format';

export function BottleneckCalculator() {
  const [components, setComponents] = useState<Component[]>([
    { name: 'CPU', score: 10000, type: 'cpu' },
    { name: 'GPU', score: 12000, type: 'gpu' },
    { name: 'RAM', score: 8000, type: 'ram' },
    { name: 'Storage', score: 6000, type: 'storage' }
  ]);

  const results = calculateBottleneck(components);

  const updateComponent = (index: number, score: number) => {
    const newComponents = [...components];
    newComponents[index] = { ...newComponents[index], score };
    setComponents(newComponents);
  };

  return (
    <CalculatorLayout
      title="PC Bottleneck Calculator"
      description="Calculate PC component bottlenecks"
      icon={<Cpu />}
    >
      <SEO
        title="PC Bottleneck Calculator | System Performance Analysis"
        description="Calculate and analyze PC component bottlenecks. Free bottleneck calculator to optimize your computer system performance."
        keywords={[
          'bottleneck calculator',
          'pc performance calculator',
          'system bottleneck',
          'component compatibility',
          'pc builder tool',
          'hardware analyzer'
        ]}
        canonicalUrl="/bottleneck-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Component Scores</h2>
          
          {components.map((component, index) => (
            <div key={index} className="mb-4">
              <CalculatorInput
                label={`${component.name} Score`}
                value={component.score.toString()}
                onChange={(value) => updateComponent(index, parseInt(value) || 0)}
                min={0}
                step={100}
                placeholder={`Enter ${component.name.toLowerCase()} benchmark score`}
              />
            </div>
          ))}

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• Use benchmark scores from reliable sources</li>
              <li>• Higher scores indicate better performance</li>
              <li>• Consider real-world usage scenarios</li>
              <li>• Update scores after hardware changes</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.bottleneckPercentage)}%
              </div>
              <div className="text-gray-500">Bottleneck Percentage</div>
              <div className="text-sm text-gray-400 mt-1">
                Primary Bottleneck: {results.bottleneckComponent}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-4">Component Analysis:</h3>
            <div className="space-y-4">
              {results.componentAnalysis.map((analysis, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>{analysis.component}</span>
                    <span>{formatNumber(analysis.utilization)}%</span>
                  </div>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${analysis.utilization}%` }}
                        className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                          analysis.status === 'bottleneck' ? 'bg-red-500' :
                          analysis.status === 'underutilized' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {results.recommendations.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.component}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.reason}</div>
                    <div className="text-sm text-indigo-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold mb-4">System Balance Score:</h3>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    {formatNumber(results.balanceScore)}/100
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{ width: `${results.balanceScore}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Bottlenecks</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is a Bottleneck?</h3>
              <p className="text-gray-600">
                A bottleneck occurs when one component limits the performance of the entire system.
                Like a traffic jam, the slowest component can prevent other components from reaching
                their full potential.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Causes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Mismatched component performance levels</li>
                <li>• Outdated hardware</li>
                <li>• Insufficient cooling</li>
                <li>• Resource-intensive applications</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Component Relationships</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">CPU-GPU Balance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Gaming performance</li>
                <li>• Rendering tasks</li>
                <li>• Workload distribution</li>
                <li>• Resolution scaling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Memory Impact</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• RAM capacity</li>
                <li>• Memory speed</li>
                <li>• Dual channel benefits</li>
                <li>• Cache hierarchy</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Storage Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• SSD vs HDD</li>
                <li>• NVMe benefits</li>
                <li>• Load times</li>
                <li>• System responsiveness</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}