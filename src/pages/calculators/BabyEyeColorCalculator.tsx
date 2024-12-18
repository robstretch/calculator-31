import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { calculateBabyEyeColor } from '../../utils/calculators/babyEyeColor/calculate';
import type { ParentEyeColor } from '../../utils/calculators/babyEyeColor/types';

export function BabyEyeColorCalculator() {
  const [parent1, setParent1] = useState<ParentEyeColor>({ color: 'brown' });
  const [parent2, setParent2] = useState<ParentEyeColor>({ color: 'brown' });
  const [results, setResults] = useState(calculateBabyEyeColor(parent1, parent2));

  const handleCalculate = () => {
    setResults(calculateBabyEyeColor(parent1, parent2));
  };

  return (
    <CalculatorLayout
      title="Baby Eye Color Calculator"
      description="Calculate the probability of your baby's eye color based on parent genetics."
      icon={<Calculator />}
    >
      <SEO 
        title="Baby Eye Color Calculator | Predict Your Baby's Eye Color"
        description="Calculate the probability of your baby's eye color based on parent genetics. Free online baby eye color predictor using genetic inheritance patterns."
        keywords={[
          'baby eye color calculator',
          'eye color genetics',
          'eye color inheritance',
          'baby eye color prediction',
          'genetic calculator'
        ]}
        canonicalUrl="/baby-eye-color-calculator"
      />

      <div className="grid gap-8">
        {/* Parent Inputs */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Parent 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Parent 1</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eye Color
                </label>
                <select
                  value={parent1.color}
                  onChange={(e) => setParent1({ ...parent1, color: e.target.value as ParentEyeColor['color'] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="brown">Brown</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="hazel">Hazel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genetics
                </label>
                <select
                  value={parent1.genetics}
                  onChange={(e) => setParent1({ ...parent1, genetics: e.target.value as ParentEyeColor['genetics'] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="heterozygous">Mixed Genes</option>
                  <option value="homozygous">Pure Genes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Parent 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Parent 2</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Eye Color
                </label>
                <select
                  value={parent2.color}
                  onChange={(e) => setParent2({ ...parent2, color: e.target.value as ParentEyeColor['color'] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="brown">Brown</option>
                  <option value="green">Green</option>
                  <option value="blue">Blue</option>
                  <option value="hazel">Hazel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Genetics
                </label>
                <select
                  value={parent2.genetics}
                  onChange={(e) => setParent2({ ...parent2, genetics: e.target.value as ParentEyeColor['genetics'] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="heterozygous">Mixed Genes</option>
                  <option value="homozygous">Pure Genes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Calculate Probabilities
        </button>

        {/* Results */}
        <div className="space-y-8">
          {/* Probabilities */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Eye Color Probabilities</h3>
            <div className="space-y-4">
              {results.probabilities.map(prob => (
                <div key={prob.color} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium capitalize">{prob.color}</span>
                    <p className="text-sm text-gray-600">{prob.description}</p>
                  </div>
                  <div className="text-lg font-semibold text-indigo-600">
                    {prob.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Genetics */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Genetic Inheritance</h3>
            <div className="space-y-4">
              {results.inheritance.map(item => (
                <div key={item.pattern} className="border-b pb-4 last:border-0 last:pb-0">
                  <div className="font-medium">{item.pattern}</div>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <div className="text-sm text-indigo-600 mt-1">
                    Probability: {Math.round(item.probability * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Important Notes</h3>
            <div className="grid gap-4">
              {results.recommendations.map(rec => (
                <div key={rec.category} className="border-l-4 border-indigo-600 pl-4">
                  <div className="font-medium">{rec.category}</div>
                  <p className="text-sm text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Eye Color Genetics</h2>
          <div className="prose max-w-none">
            <p>
              Eye color inheritance is a complex trait determined by multiple genes. The two main genes 
              involved are OCA2 and HERC2, which influence the amount and type of melanin in the iris.
            </p>
            
            <h3 className="text-xl font-semibold mt-6 mb-3">Key Facts About Baby Eye Color</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Most babies are born with blue or gray eyes</li>
              <li>Eye color typically stabilizes by age 3</li>
              <li>Brown is the most dominant eye color gene</li>
              <li>Blue is a recessive trait</li>
              <li>Green and hazel are variations of brown and blue interactions</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Inheritance Patterns</h3>
            <div className="bg-white p-4 rounded-lg">
              <ul className="space-y-4">
                <li>
                  <strong>Dominant Brown:</strong>
                  <p className="text-sm text-gray-600">
                    One brown-eyed parent can pass dominant genes to children
                  </p>
                </li>
                <li>
                  <strong>Recessive Blue:</strong>
                  <p className="text-sm text-gray-600">
                    Both parents must carry blue eye genes for blue-eyed children
                  </p>
                </li>
                <li>
                  <strong>Complex Green/Hazel:</strong>
                  <p className="text-sm text-gray-600">
                    Results from interactions between brown and blue genes
                  </p>
                </li>
              </ul>
            </div>

            <h3 className="text-xl font-semibold mt-6 mb-3">Factors Affecting Eye Color</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Genetic Factors</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Multiple gene interactions</li>
                  <li>Parental genetic makeup</li>
                  <li>Ancestral inheritance</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-medium mb-2">Environmental Factors</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Age-related changes</li>
                  <li>Sun exposure</li>
                  <li>Medical conditions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}