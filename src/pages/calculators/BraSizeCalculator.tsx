import React, { useState } from 'react';
import { Ruler } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBraSize } from '../../utils/calculators/braSize';

export function BraSizeCalculator() {
  const [underBust, setUnderBust] = useState('32');
  const [bustMeasurement, setBustMeasurement] = useState('36');
  const [measurementSystem, setMeasurementSystem] = useState<'inches' | 'cm'>('inches');

  const results = calculateBraSize(
    parseFloat(underBust) || 0,
    parseFloat(bustMeasurement) || 0,
    measurementSystem
  );

  return (
    <CalculatorLayout
      title="Bra Size Calculator"
      description="Calculate your bra size and find your perfect fit"
      icon={<Ruler />}
    >
      <SEO
        title="Bra Size Calculator | Find Your Perfect Fit"
        description="Calculate your bra size and get personalized fitting recommendations. Free bra size calculator with sister size suggestions."
        keywords={[
          'bra size calculator',
          'cup size calculator',
          'bra fitting calculator',
          'sister size calculator',
          'bra measurement calculator',
          'bra sizing guide'
        ]}
        canonicalUrl="/bra-size-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Measurements</h2>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Measurement System
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMeasurementSystem('inches')}
                className={`px-4 py-2 rounded-md ${
                  measurementSystem === 'inches'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inches
              </button>
              <button
                onClick={() => setMeasurementSystem('cm')}
                className={`px-4 py-2 rounded-md ${
                  measurementSystem === 'cm'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Centimeters
              </button>
            </div>
          </div>

          <CalculatorInput
            label={`Underbust Measurement (${measurementSystem})`}
            value={underBust}
            onChange={setUnderBust}
            min={0}
            step={0.5}
            placeholder="Enter underbust measurement"
          />

          <CalculatorInput
            label={`Full Bust Measurement (${measurementSystem})`}
            value={bustMeasurement}
            onChange={setBustMeasurement}
            min={0}
            step={0.5}
            placeholder="Enter full bust measurement"
          />

          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Measuring Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-2">
              <li>• Wear an unpadded bra or no bra</li>
              <li>• Keep measuring tape parallel to the ground</li>
              <li>• Measure snugly but not too tight</li>
              <li>• Take measurements while standing straight</li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Size</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600 mb-2">
                {results.bandSize}{results.cupSize}
              </div>
              <p className="text-gray-600">Recommended Bra Size</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="font-semibold mb-3">Sister Sizes</h3>
            <p className="text-sm text-gray-600 mb-3">
              Sister sizes have the same cup volume but different band sizes:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {results.sisterSizes.map((size, index) => (
                <div
                  key={index}
                  className="text-center p-2 bg-gray-50 rounded-md"
                >
                  {size.bandSize}{size.cupSize}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Fit Tips:</h3>
            <ul className="text-sm text-indigo-700 space-y-2">
              {results.fitTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Bra Sizing</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Bra sizing consists of two components: the band size (number) and cup size (letter). 
              The band size is based on your underbust measurement, while the cup size is determined 
              by the difference between your full bust and underbust measurements.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Band Size</h3>
                <ul className="space-y-2">
                  <li>• Measured around ribcage</li>
                  <li>• Should be snug but not tight</li>
                  <li>• Provides 80% of support</li>
                  <li>• Usually an even number</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Cup Size</h3>
                <ul className="space-y-2">
                  <li>• Based on bust-underbust difference</li>
                  <li>• Increases with each inch difference</li>
                  <li>• Same letter can vary by band size</li>
                  <li>• Should contain all breast tissue</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Signs of a Good Fit</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Band Fit</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Parallel to ground</li>
                <li>• Stays in place</li>
                <li>• Two finger test</li>
                <li>• No riding up</li>
                <li>• Snug on loosest hook</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cup Fit</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• No spillage</li>
                <li>• No gaping</li>
                <li>• Smooth transition</li>
                <li>• Underwire flat against body</li>
                <li>• No double-busting</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Strap Fit</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Stay in place</li>
                <li>• No digging</li>
                <li>• Adjustable length</li>
                <li>• Not carrying weight</li>
                <li>• Comfortable all day</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Fitting Issues</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Band Issues</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Riding Up:</strong>
                  <br />
                  Band too loose, try smaller band size
                </p>
                <p>
                  <strong>Too Tight:</strong>
                  <br />
                  Try sister size with larger band
                </p>
                <p>
                  <strong>Rolling Up:</strong>
                  <br />
                  Band might be too small or worn out
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cup Issues</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Spillage:</strong>
                  <br />
                  Cup too small, try larger cup size
                </p>
                <p>
                  <strong>Gaping:</strong>
                  <br />
                  Cup too large or wrong style
                </p>
                <p>
                  <strong>Underwire Discomfort:</strong>
                  <br />
                  Wrong size or style for shape
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}