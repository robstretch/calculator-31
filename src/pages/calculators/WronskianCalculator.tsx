import React, { useState } from 'react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { Calculator } from 'lucide-react';
import { calculateWronskian } from '../../utils/calculators/wronskian/calculate';

export function WronskianCalculator() {
  const [functions, setFunctions] = useState<string[]>(['x', 'x^2']);
  const [point, setPoint] = useState<string>('0');
  const [result, setResult] = useState<any>(null);

  const handleAddFunction = () => {
    setFunctions([...functions, '']);
  };

  const handleRemoveFunction = (index: number) => {
    setFunctions(functions.filter((_, i) => i !== index));
  };

  const handleFunctionChange = (index: number, value: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = value;
    setFunctions(newFunctions);
  };

  const handleCalculate = () => {
    const input = {
      functions,
      variable: 'x',
      point: parseFloat(point)
    };
    setResult(calculateWronskian(input));
  };

  return (
    <>
      <SEO
        title="Wronskian Calculator | Linear Independence"
        description="Calculate the Wronskian determinant to determine linear independence of functions. Free online calculator with step-by-step solutions."
        keywords={[
          'wronskian calculator',
          'linear independence',
          'differential equations',
          'determinant calculator',
          'function calculator'
        ]}
        canonicalUrl="/wronskian-calculator"
      />

      <CalculatorLayout
        title="Wronskian Calculator"
        description="Calculate the Wronskian determinant to determine linear independence of functions"
        icon={<Calculator />}
      >
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Enter Functions</h3>
            {functions.map((func, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={func}
                  onChange={(e) => handleFunctionChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border rounded"
                  placeholder={`f${index + 1}(x)`}
                />
                <button
                  onClick={() => handleRemoveFunction(index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleAddFunction}
              className="mt-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200"
            >
              Add Function
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Evaluation Point</h3>
            <input
              type="number"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter point of evaluation"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Calculate Wronskian
          </button>

          {result && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Result</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Wronskian Determinant</p>
                    <p className="text-xl font-medium">{result.determinant.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Linear Independence</p>
                    <p className="text-xl font-medium">
                      {result.isIndependent ? 'Independent' : 'Dependent'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Steps</h3>
                <div className="space-y-3">
                  {result.steps.map((step: any, index: number) => (
                    <div key={index} className="border-b pb-3">
                      <p className="font-medium">{step.step}</p>
                      <p className="text-gray-600">{step.description}</p>
                      <p className="text-sm font-mono mt-1">{step.result}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Properties</h3>
                <div className="space-y-3">
                  {result.properties.map((prop: any, index: number) => (
                    <div key={index}>
                      <p className="font-medium">{prop.property}</p>
                      <p className="text-gray-600">{prop.description}</p>
                      <p className="text-sm font-mono">{prop.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
                <div className="space-y-3">
                  {result.recommendations.map((rec: any, index: number) => (
                    <div key={index}>
                      <p className="font-medium">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Understanding the Wronskian</h2>
          
          <div className="text-gray-600 space-y-4">
            <p>
              The Wronskian is a determinant used in mathematics to determine the linear independence 
              of a set of differentiable functions. It plays a crucial role in the study of differential 
              equations and linear algebra.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">How to Use the Calculator</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Enter your functions using standard notation (e.g., x^2, sin(x))</li>
              <li>Add or remove functions as needed</li>
              <li>Specify the point at which to evaluate the Wronskian</li>
              <li>Click "Calculate" to see results</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-900 mt-6">Interpreting Results</h3>
            <div className="space-y-4">
              <p>The calculator provides:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Wronskian determinant value</li>
                <li>Linear independence determination</li>
                <li>Step-by-step calculation process</li>
                <li>Properties of the function set</li>
                <li>Recommendations for further analysis</li>
              </ul>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg mt-6">
              <h3 className="text-xl font-semibold text-indigo-900">Key Concepts</h3>
              <dl className="mt-4 space-y-4 text-indigo-800">
                <div>
                  <dt className="font-semibold">Linear Independence</dt>
                  <dd>Functions are linearly independent if the Wronskian is non-zero</dd>
                </div>
                <div>
                  <dt className="font-semibold">Determinant</dt>
                  <dd>The Wronskian is calculated as a determinant of derivatives</dd>
                </div>
                <div>
                  <dt className="font-semibold">Applications</dt>
                  <dd>Used in solving differential equations and analyzing function sets</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}