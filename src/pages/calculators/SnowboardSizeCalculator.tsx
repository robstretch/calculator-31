import React, { useState } from 'react';
import { Snowflake } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateSnowboardSize } from '../../utils/calculators/snowboard/calculate';
import { RiderStyle } from '../../utils/calculators/snowboard/types';
import { formatNumber } from '../../utils/format';

export function SnowboardSizeCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('imperial');
  const [weight, setWeight] = useState('150');
  const [height, setHeight] = useState('68');
  const [shoeSize, setShoeSize] = useState('10');
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [style, setStyle] = useState<RiderStyle>('all-mountain');

  const results = calculateSnowboardSize(
    parseFloat(weight) || 0,
    parseFloat(height) || 0,
    parseFloat(shoeSize) || 0,
    experience,
    style,
    unit
  );

  return (
    <CalculatorLayout
      title="Snowboard Size Calculator"
      description="Calculate your ideal snowboard size and specs"
      icon={<Snowflake />}
    >
      <SEO
        title="Snowboard Size Calculator | Board Length Calculator"
        description="Calculate your ideal snowboard size based on height, weight, and riding style. Free snowboard calculator with detailed recommendations."
        keywords={[
          'snowboard size calculator',
          'snowboard length calculator',
          'board size calculator',
          'snowboard fit calculator',
          'snowboard sizing guide',
          'winter sports calculator'
        ]}
        canonicalUrl="/snowboard-size-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Rider Details</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit System</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUnit('metric')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'metric'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Metric
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`px-4 py-2 rounded-md ${
                  unit === 'imperial'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Imperial
              </button>
            </div>
          </div>

          <CalculatorInput
            label={unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
            value={weight}
            onChange={setWeight}
            min={0}
            step={0.1}
            placeholder="Enter weight"
          />

          <CalculatorInput
            label={unit === 'metric' ? 'Height (cm)' : 'Height (inches)'}
            value={height}
            onChange={setHeight}
            min={0}
            step={0.1}
            placeholder="Enter height"
          />

          <CalculatorInput
            label="Boot Size (US)"
            value={shoeSize}
            onChange={setShoeSize}
            min={4}
            max={15}
            step={0.5}
            placeholder="Enter boot size"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setExperience(level)}
                  className={`px-4 py-2 rounded-md ${
                    experience === level
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Riding Style</label>
            <div className="grid grid-cols-2 gap-2">
              {(['all-mountain', 'freestyle', 'freeride', 'powder'] as RiderStyle[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={`px-4 py-2 rounded-md ${
                    style === s
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {s.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Board Recommendations</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {results.recommendedLength.ideal} cm
              </div>
              <div className="text-gray-500">Ideal Board Length</div>
              <div className="text-sm text-gray-400 mt-1">
                Range: {results.recommendedLength.min}-{results.recommendedLength.max} cm
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Width"
              value={results.widthRecommendation}
              helpText="Based on boot size"
            />

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Board Characteristics:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Flex:</span>
                  <span className="font-medium">{results.styleCharacteristics.flex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shape:</span>
                  <span className="font-medium">{results.styleCharacteristics.shape}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stance:</span>
                  <span className="font-medium">{results.styleCharacteristics.setback}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Recommendations:</h3>
              <div className="space-y-4">
                {results.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="font-medium text-gray-900">{rec.category}</div>
                    <div className="text-sm text-gray-600 mt-1">{rec.suggestion}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Snowboard Sizing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Rider weight is most important</li>
                <li>• Height provides general range</li>
                <li>• Boot size determines width</li>
                <li>• Riding style affects length</li>
                <li>• Experience level matters</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">General Guidelines</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Board should reach chin to nose</li>
                <li>• Shorter for freestyle/tricks</li>
                <li>• Longer for powder/speed</li>
                <li>• Width prevents toe/heel drag</li>
                <li>• Consider terrain type</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Riding Styles Explained</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">All-Mountain</h3>
              <p className="text-gray-600">
                Versatile boards designed for all terrain types. Good for riders who want to explore 
                the entire mountain and try different styles. Medium flex and directional twin shape 
                provide balance between stability and maneuverability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Freestyle</h3>
              <p className="text-gray-600">
                Shorter, more flexible boards ideal for tricks, jumps, and park riding. True twin 
                shape allows for switch riding. Typically lighter and more maneuverable for spins 
                and technical maneuvers.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Freeride</h3>
              <p className="text-gray-600">
                Longer boards with directional shape for high-speed carving and backcountry terrain. 
                Stiffer flex provides stability at speed and in variable conditions. Often features 
                setback stance for better float.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Powder</h3>
              <p className="text-gray-600">
                Specialized boards for deep snow conditions. Features like wider nose, tapered tail, 
                and significant setback stance provide maximum float. Often longer than standard 
                boards for better surface area.
              </p>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}