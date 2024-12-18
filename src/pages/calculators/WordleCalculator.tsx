import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { analyzeWordle } from '../../utils/calculators/wordle/analyze';
import { WordPattern } from '../../utils/calculators/wordle/types';

export function WordleCalculator() {
  const [knownLetters, setKnownLetters] = useState<{ [key: number]: string }>({});
  const [presentLetters, setPresentLetters] = useState<string>('');
  const [absentLetters, setAbsentLetters] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const handleAnalyze = () => {
    const pattern: WordPattern = {
      pattern: '*****', // 5-letter word pattern
      knownLetters,
      presentLetters: presentLetters.toLowerCase().split(''),
      absentLetters: absentLetters.toLowerCase().split('')
    };

    const analysis = analyzeWordle(pattern);
    setResults(analysis);
  };

  return (
    <CalculatorLayout
      title="Wordle Calculator"
      description="Analyze word patterns and get suggestions for Wordle"
      icon={<Brain />}
    >
      <SEO
        title="Wordle Calculator | Word Pattern Analyzer"
        description="Get help solving Wordle puzzles with our pattern analyzer. Find possible words based on known letters and patterns."
        keywords={[
          'wordle calculator',
          'word pattern analyzer',
          'wordle solver',
          'word game helper',
          'letter pattern calculator',
          'wordle assistant'
        ]}
        canonicalUrl="/wordle-calculator"
      />

      <div className="space-y-6">
        {/* Known Letters Input */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map(position => (
            <input
              key={position}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              value={knownLetters[position] || ''}
              onChange={(e) => {
                const value = e.target.value.toLowerCase();
                if (value === '') {
                  const newKnown = { ...knownLetters };
                  delete newKnown[position];
                  setKnownLetters(newKnown);
                } else if (value.match(/[a-z]/i)) {
                  setKnownLetters({ ...knownLetters, [position]: value });
                }
              }}
            />
          ))}
        </div>

        {/* Present Letters Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Yellow Letters (present but wrong position)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            value={presentLetters}
            onChange={(e) => setPresentLetters(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          />
        </div>

        {/* Absent Letters Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Gray Letters (not in word)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            value={absentLetters}
            onChange={(e) => setAbsentLetters(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          />
        </div>

        <button
          onClick={handleAnalyze}
          className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Analyze Pattern
        </button>

        {results && (
          <div className="space-y-6">
            {/* Suggestions */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Possible Words</h3>
              <div className="flex flex-wrap gap-2">
                {results.suggestions.map((word: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Letter Frequencies */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Letter Frequencies</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.letterFrequencies.slice(0, 8).map((freq: any) => (
                  <div key={freq.letter} className="text-center">
                    <div className="text-2xl font-bold text-indigo-600">{freq.letter}</div>
                    <div className="text-sm text-gray-500">
                      {freq.percentage.toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statistics */}
            <CalculatorResult
              label="Total Possible Words"
              value={results.statistics.totalWords}
              helpText="Number of words matching your pattern"
            />
          </div>
        )}
      </div>

      <div className="mt-12 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Use the Wordle Calculator</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Enter Known Letters (Green)</h3>
              <p className="text-gray-600">
                Use the five boxes at the top to enter letters you know are in the correct position (green letters in Wordle). 
                Leave boxes empty for unknown positions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Enter Yellow Letters</h3>
              <p className="text-gray-600">
                In the "Yellow Letters" field, enter any letters that you know are in the word but in the wrong position. 
                These are letters that appear in yellow in your Wordle game.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Enter Gray Letters</h3>
              <p className="text-gray-600">
                In the "Gray Letters" field, enter any letters that you know are not in the word. 
                These are letters that appear in gray in your Wordle game.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Analyze Results</h3>
              <p className="text-gray-600">
                After clicking "Analyze Pattern", you'll see:
              </p>
              <ul className="mt-2 space-y-2 text-gray-600">
                <li>• <strong>Possible Words:</strong> A list of words that match your pattern</li>
                <li>• <strong>Letter Frequencies:</strong> Most common letters in the remaining possible words</li>
                <li>• <strong>Total Possible Words:</strong> Number of words that match your criteria</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">Tips for Better Results</h2>
          
          <div className="space-y-4 text-indigo-700">
            <p>
              • Start with common vowels (A, E, I, O, U) and frequent consonants (S, T, R, N, L)
            </p>
            <p>
              • Use the letter frequencies to make educated guesses about remaining letters
            </p>
            <p>
              • Update the calculator after each Wordle guess to narrow down possibilities
            </p>
            <p>
              • Remember that Wordle words are common English words - very obscure words are unlikely
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding the Results</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              The calculator provides several tools to help you solve the Wordle puzzle:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Word Suggestions</h3>
                <p className="text-gray-600">
                  The suggested words are sorted by probability, with the most likely solutions appearing first. 
                  These words match all your known constraints from green, yellow, and gray letters.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Letter Analysis</h3>
                <p className="text-gray-600">
                  The letter frequencies show which letters appear most often in the remaining possible words. 
                  Use this information to make strategic guesses that will reveal the most information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}