import React, { useState } from 'react';
import { Dna } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculatePeptide } from '../../utils/calculators/peptide/calculate';

export function PeptideCalculator() {
  const [sequence, setSequence] = useState('ACDEFGHIKLMNPQRSTVWY');

  const result = calculatePeptide(sequence.toUpperCase());

  return (
    <>
      <SEO 
        title="Peptide Calculator | Molecular Weight & Properties"
        description="Calculate peptide molecular weight, isoelectric point, and properties. Analyze amino acid composition and get recommendations for handling and storage."
        keywords={[
          'peptide calculator',
          'molecular weight calculator',
          'protein calculator',
          'amino acid sequence',
          'isoelectric point'
        ]}
        canonicalUrl="/peptide-calculator"
      />

      <CalculatorLayout
        title="Peptide Calculator"
        description="Calculate molecular properties of peptide sequences"
        icon={<Dna />}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Sequence Input</h2>
            <CalculatorInput
              label="Amino Acid Sequence"
              value={sequence}
              onChange={setSequence}
              type="text"
              placeholder="Enter sequence using one-letter codes"
            />
            <p className="text-sm text-gray-600 mt-2">
              Use standard one-letter codes (A, C, D, E, F, G, H, I, K, L, M, N, P, Q, R, S, T, V, W, Y)
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Physical Properties</h2>
            <div className="grid gap-4">
              {result.properties.map((prop, index) => (
                <CalculatorResult
                  key={index}
                  label={prop.property}
                  value={prop.value}
                  helpText={prop.description}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Amino Acid Composition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {result.composition.map((aa, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="font-medium">{aa.aminoAcid}</span>
                  <span className="text-gray-600">
                    {aa.count} ({aa.percentage.toFixed(1)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="space-y-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-medium text-gray-900">{rec.category}</h3>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}