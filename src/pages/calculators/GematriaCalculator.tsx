import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateGematria } from '../../utils/calculators/gematria/calculate';
import { GematriaType, gematriaTypes } from '../../utils/calculators/gematria/constants';

export function GematriaCalculator() {
  const [text, setText] = useState('');
  const [type, setType] = useState<GematriaType>('hebrew');
  const results = text ? calculateGematria(text, type) : null;

  return (
    <CalculatorLayout
      title="Gematria Calculator"
      description="Calculate gematria values of words"
      icon={<Calculator />}
    >
      <SEO
        title="Gematria Calculator | Hebrew & English Numerology"
        description="Calculate gematria values for Hebrew and English words. Free gematria calculator with detailed numerological analysis."
        keywords={[
          'gematria calculator',
          'hebrew numerology',
          'english gematria',
          'word numerology',
          'kabbalah calculator',
          'biblical numerology'
        ]}
        canonicalUrl="/gematria-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Enter Text</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gematria Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {gematriaTypes.map((gType) => (
                <button
                  key={gType}
                  onClick={() => setType(gType)}
                  className={`px-4 py-2 rounded-md ${
                    type === gType
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {gType.charAt(0).toUpperCase() + gType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text to Calculate
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
              placeholder={`Enter ${type} text...`}
              dir={type === 'hebrew' ? 'rtl' : 'ltr'}
            />
          </div>
        </div>

        {results && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Results</h2>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">
                  {results.total}
                </div>
                <div className="text-gray-500">Total Gematria Value</div>
                <div className="text-sm text-gray-400 mt-1">
                  Reduced: {results.reducedValue}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="font-semibold mb-4">Letter Breakdown:</h3>
              <div className="grid grid-cols-4 gap-2">
                {results.breakdown.map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="text-lg font-medium">{item.letter}</div>
                    <div className="text-sm text-gray-600">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {results.equivalentWords.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="font-semibold mb-4">Equivalent Words:</h3>
                <div className="flex flex-wrap gap-2">
                  {results.equivalentWords.map((word, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Statistics:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {results.wordCount}
                  </div>
                  <div className="text-sm text-gray-600">Words</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    {results.letterCount}
                  </div>
                  <div className="text-sm text-gray-600">Letters</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Gematria</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is Gematria?</h3>
              <p className="text-gray-600">
                Gematria is a system of assigning numerical values to letters to reveal hidden meanings
                and connections between words. It has roots in Hebrew numerology and has been adapted
                to other languages.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Applications</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Biblical interpretation</li>
                <li>• Mystical studies</li>
                <li>• Name analysis</li>
                <li>• Spiritual insights</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Letter Values</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Hebrew Letters</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">א</div>
                  <div className="text-sm text-gray-600">1</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">ב</div>
                  <div className="text-sm text-gray-600">2</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">ג</div>
                  <div className="text-sm text-gray-600">3</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">English Letters</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">A</div>
                  <div className="text-sm text-gray-600">1</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">B</div>
                  <div className="text-sm text-gray-600">2</div>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                  <div className="text-lg">C</div>
                  <div className="text-sm text-gray-600">3</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}