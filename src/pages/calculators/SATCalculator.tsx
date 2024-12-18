import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateSAT } from '../../utils/calculators/sat/calculate';

export function SATCalculator() {
  const [scores, setScores] = useState({
    readingRaw: 40,
    mathRaw: 44,
    writingRaw: 35
  });

  const [results, setResults] = useState(calculateSAT(scores));

  const handleCalculate = () => {
    setResults(calculateSAT(scores));
  };

  return (
    <CalculatorLayout
      title="SAT Score Calculator"
      description="Calculate your SAT scores and get personalized recommendations."
      icon={<Calculator />}
    >
      <SEO 
        title="SAT Score Calculator | Convert Raw Scores to Final Scores"
        description="Calculate your SAT scores from raw scores. Get section scores, percentiles, and college readiness benchmarks with our free SAT calculator."
        keywords={[
          'sat calculator',
          'sat score conversion',
          'sat percentile calculator',
          'sat college readiness',
          'sat raw score calculator'
        ]}
        canonicalUrl="/sat-calculator"
      />

      <div className="grid gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enter Raw Scores</h2>
          <div className="grid gap-4">
            <CalculatorInput
              label="Reading Raw Score"
              value={scores.readingRaw}
              onChange={(value) => setScores({ ...scores, readingRaw: Number(value) })}
              min={0}
              max={52}
            />
            <CalculatorInput
              label="Math Raw Score"
              value={scores.mathRaw}
              onChange={(value) => setScores({ ...scores, mathRaw: Number(value) })}
              min={0}
              max={58}
            />
            <CalculatorInput
              label="Writing Raw Score"
              value={scores.writingRaw}
              onChange={(value) => setScores({ ...scores, writingRaw: Number(value) })}
              min={0}
              max={44}
            />
          </div>
          <button
            onClick={handleCalculate}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Calculate Scores
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {/* Total Score */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center text-indigo-600">
              Total SAT Score: {results.totalScore}
            </h2>
            <p className="text-center text-gray-600 mt-2">
              Percentile: {results.percentiles.total}th
            </p>
          </div>

          {/* Section Scores */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Evidence-Based Reading and Writing</h3>
              <div className="space-y-2">
                <p>Reading Score: {results.sectionScores.reading}</p>
                <p>Writing Score: {results.sectionScores.writing}</p>
                <p className="font-medium text-indigo-600">
                  Combined: {results.compositeScores.evidenceBasedReading}
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Math</h3>
              <div className="space-y-2">
                <p>Math Score: {results.sectionScores.math}</p>
                <p>Percentile: {results.percentiles.math}th</p>
              </div>
            </div>
          </div>

          {/* College Readiness */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">College Readiness Benchmarks</h3>
            <div className="space-y-4">
              {results.collegeReadiness.map((benchmark, index) => (
                <div key={index} className="border-l-4 border-indigo-600 pl-4">
                  <div className="font-medium">{benchmark.benchmark}</div>
                  <div className={`text-sm ${
                    benchmark.status === 'Met' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    Status: {benchmark.status}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{benchmark.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="grid gap-4">
              {results.recommendations.map((rec, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium text-indigo-600">{rec.category}</div>
                  <p className="text-gray-600 mt-1">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}