import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateRREF, Matrix } from '../../utils/calculators/rref';

export function RREFCalculator() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(4);
  const [matrix, setMatrix] = useState<number[][]>(
    Array(3).fill(0).map(() => Array(4).fill(0))
  );
  const [result, setResult] = useState<ReturnType<typeof calculateRREF> | null>(null);

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const newMatrix = matrix.map(r => [...r]);
    newMatrix[row][col] = parseFloat(value) || 0;
    setMatrix(newMatrix);
  };

  const handleDimensionChange = (newRows: number, newCols: number) => {
    const newMatrix = Array(newRows).fill(0).map(() => Array(newCols).fill(0));
    // Copy existing values
    for (let i = 0; i < Math.min(rows, newRows); i++) {
      for (let j = 0; j < Math.min(cols, newCols); j++) {
        newMatrix[i][j] = matrix[i][j];
      }
    }
    setRows(newRows);
    setCols(newCols);
    setMatrix(newMatrix);
  };

  const calculateResult = () => {
    const input: Matrix = {
      rows,
      cols,
      values: matrix
    };
    setResult(calculateRREF(input));
  };

  const formatNumber = (num: number): string => {
    if (Math.abs(num) < 1e-10) return '0';
    return num.toFixed(4).replace(/\.?0+$/, '');
  };

  return (
    <CalculatorLayout
      title="RREF Calculator"
      description="Calculate Row Reduced Echelon Form of matrices"
      icon={<Calculator />}
    >
      <SEO
        title="RREF Calculator | Row Reduced Echelon Form Calculator"
        description="Calculate the Row Reduced Echelon Form (RREF) of matrices with step-by-step solutions. Free matrix calculator for linear algebra."
        keywords={[
          'rref calculator',
          'row reduced echelon form',
          'matrix calculator',
          'linear algebra calculator',
          'gaussian elimination',
          'matrix operations'
        ]}
        canonicalUrl="/rref-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Matrix Input</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rows
              </label>
              <input
                type="number"
                min={1}
                max={6}
                value={rows}
                onChange={(e) => handleDimensionChange(parseInt(e.target.value) || 1, cols)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Columns
              </label>
              <input
                type="number"
                min={1}
                max={8}
                value={cols}
                onChange={(e) => handleDimensionChange(rows, parseInt(e.target.value) || 1)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <tbody>
                {matrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="p-1">
                        <input
                          type="number"
                          value={cell || ''}
                          onChange={(e) => handleMatrixChange(i, j, e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md"
                          step="any"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={calculateResult}
            className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Calculate RREF
          </button>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Solution Steps</h2>
          
          {result && (
            <div className="space-y-6">
              {result.steps.map((step, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-gray-700 mb-2">{step.description}</p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <tbody>
                        {step.matrix.map((row, i) => (
                          <tr key={i}>
                            {row.map((cell, j) => (
                              <td key={j} className="p-2 text-center">
                                {formatNumber(cell)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-indigo-800 mb-2">Results:</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Matrix Rank: {result.rank}</li>
                  {result.isConsistent !== undefined && (
                    <li>
                      • System is {result.isConsistent ? 'consistent' : 'inconsistent'}
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding RREF</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Row Reduced Echelon Form (RREF) is a standardized form of a matrix that makes it easier 
              to solve systems of linear equations and understand the relationships between variables.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Properties of RREF</h3>
                <ul className="space-y-2">
                  <li>• Leading 1 in each non-zero row</li>
                  <li>• All entries above and below leading 1s are 0</li>
                  <li>• Each leading 1 is the only nonzero entry in its column</li>
                  <li>• All zero rows are at the bottom</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
                <ul className="space-y-2">
                  <li>• Solving linear equations</li>
                  <li>• Finding matrix rank</li>
                  <li>• Determining linear independence</li>
                  <li>• Computing matrix inverse</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Matrix Operations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Elementary Row Operations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Swap two rows</li>
                <li>• Multiply row by scalar</li>
                <li>• Add multiple of one row to another</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Matrix Properties</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Rank</li>
                <li>• Linear independence</li>
                <li>• Solution existence</li>
                <li>• Solution uniqueness</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">System Analysis</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Consistent vs inconsistent</li>
                <li>• Unique vs infinite solutions</li>
                <li>• Free variables</li>
                <li>• Parameter relationships</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}