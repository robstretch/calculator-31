import React, { useState } from 'react';
import { Wine } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateWeddingAlcohol } from '../../utils/calculators/weddingAlcohol';
import { formatNumber, formatCurrency } from '../../utils/format';

export function WeddingAlcoholCalculator() {
  const [guestCount, setGuestCount] = useState('100');
  const [hours, setHours] = useState('4');
  const [drinkingGuests, setDrinkingGuests] = useState('80');
  const [beerRatio, setBeerRatio] = useState('40');
  const [wineRatio, setWineRatio] = useState('40');
  const [spiritsRatio, setSpiritsRatio] = useState('20');

  const results = calculateWeddingAlcohol(
    parseInt(guestCount) || 0,
    parseInt(hours) || 4,
    parseInt(drinkingGuests) / 100,
    parseInt(beerRatio) / 100,
    parseInt(wineRatio) / 100,
    parseInt(spiritsRatio) / 100
  );

  return (
    <CalculatorLayout
      title="Wedding Alcohol Calculator"
      description="Calculate alcohol for wedding reception"
      icon={<Wine />}
    >
      <SEO
        title="Wedding Alcohol Calculator | Reception Drink Calculator"
        description="Calculate alcohol quantities and costs for your wedding reception. Free wedding drink calculator with detailed beverage planning recommendations."
        keywords={[
          'wedding alcohol calculator',
          'wedding drink calculator',
          'reception bar calculator',
          'wedding beverage calculator',
          'wedding planning calculator',
          'wedding bar planning'
        ]}
        canonicalUrl="/wedding-alcohol-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Event Details</h2>
          
          <CalculatorInput
            label="Number of Guests"
            value={guestCount}
            onChange={setGuestCount}
            min={1}
            step={1}
            placeholder="Enter total guest count"
          />
          
          <CalculatorInput
            label="Reception Duration (hours)"
            value={hours}
            onChange={setHours}
            min={1}
            max={12}
            step={0.5}
            placeholder="Enter reception duration"
          />
          
          <CalculatorInput
            label="Drinking Guests (%)"
            value={drinkingGuests}
            onChange={setDrinkingGuests}
            min={0}
            max={100}
            step={5}
            placeholder="Enter percentage of drinking guests"
          />

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Drink Distribution</h3>
            <div className="space-y-4">
              <CalculatorInput
                label="Beer (%)"
                value={beerRatio}
                onChange={setBeerRatio}
                min={0}
                max={100}
                step={5}
              />
              
              <CalculatorInput
                label="Wine (%)"
                value={wineRatio}
                onChange={setWineRatio}
                min={0}
                max={100}
                step={5}
              />
              
              <CalculatorInput
                label="Spirits (%)"
                value={spiritsRatio}
                onChange={setSpiritsRatio}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Alcohol Quantities</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.totalDrinks)}
              </div>
              <div className="text-gray-500">Total Drinks Needed</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Beer:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Cases:</span>
                  <span className="font-medium">{results.beer.cases}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bottles/Cans:</span>
                  <span className="font-medium">{results.beer.bottles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Kegs:</span>
                  <span className="font-medium">{results.beer.kegs}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Wine:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bottles:</span>
                  <span className="font-medium">{results.wine.bottles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cases:</span>
                  <span className="font-medium">{results.wine.cases}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Spirits:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bottles:</span>
                  <span className="font-medium">{results.spirits.bottles}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cases:</span>
                  <span className="font-medium">{results.spirits.cases}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Estimated Costs:</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Beer:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.beer)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Wine:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.wine)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Spirits:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.spirits)}</span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>{formatCurrency(results.estimatedCost.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Planning Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">General Guidelines</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Plan for 1 drink per person per hour</li>
                <li>• Add 20% buffer for safety</li>
                <li>• Consider time of day</li>
                <li>• Account for seasonal factors</li>
                <li>• Know your crowd's preferences</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Service Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• 1 bartender per 75 guests</li>
                <li>• Set up multiple bar stations</li>
                <li>• Offer water stations</li>
                <li>• Consider drink tickets</li>
                <li>• Have backup supplies</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Additional Considerations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Supplies Needed</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Ice (1 lb per guest)</li>
                <li>• Mixers and garnishes</li>
                <li>• Glassware or cups</li>
                <li>• Bar tools</li>
                <li>• Coolers/refrigeration</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Safety Measures</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Designated drivers</li>
                <li>• Ride service information</li>
                <li>• Last call timing</li>
                <li>• Monitoring service</li>
                <li>• Insurance coverage</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cost Saving Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Buy in bulk</li>
                <li>• Return unopened bottles</li>
                <li>• Limited bar menu</li>
                <li>• House wines</li>
                <li>• Seasonal specials</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}