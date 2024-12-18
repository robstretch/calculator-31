import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateTip } from '../../utils/calculators/tip';
import { formatCurrency } from '../../utils/format';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('50');
  const [tipPercent, setTipPercent] = useState('15');
  const [numPeople, setNumPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');

  const commonTips = [10, 15, 18, 20, 25];
  const activeTip = customTip || tipPercent;

  const results = calculateTip(
    parseFloat(billAmount) || 0,
    parseFloat(activeTip) || 0,
    parseFloat(numPeople) || 1
  );

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tips and split bills"
      icon={<DollarSign />}
    >
      <SEO
        title="Tip Calculator | Gratuity & Bill Split Calculator"
        description="Calculate tips and split bills easily. Free tip calculator with customizable percentages and bill splitting options."
        keywords={[
          'tip calculator',
          'gratuity calculator',
          'bill split calculator',
          'restaurant tip calculator',
          'tip percentage calculator',
          'bill calculator'
        ]}
        canonicalUrl="/tip-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Bill Details</h2>
          
          <CalculatorInput
            label="Bill Amount"
            value={billAmount}
            onChange={setBillAmount}
            min={0}
            step={0.01}
            placeholder="Enter bill amount"
          />

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tip Percentage
            </label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {commonTips.map((tip) => (
                <button
                  key={tip}
                  onClick={() => {
                    setTipPercent(tip.toString());
                    setCustomTip('');
                  }}
                  className={`px-4 py-2 text-sm font-medium rounded-md ${
                    !customTip && tipPercent === tip.toString()
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tip}%
                </button>
              ))}
            </div>
            <CalculatorInput
              label="Custom Tip %"
              value={customTip}
              onChange={setCustomTip}
              min={0}
              max={100}
              step={0.1}
              placeholder="Enter custom tip percentage"
            />
          </div>

          <CalculatorInput
            label="Number of People"
            value={numPeople}
            onChange={setNumPeople}
            min={1}
            step={1}
            placeholder="Enter number of people"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          
          <CalculatorResult
            label="Tip Amount"
            value={formatCurrency(results.tipAmount)}
            helpText="Total tip to be added"
          />
          
          <CalculatorResult
            label="Total Amount"
            value={formatCurrency(results.totalAmount)}
            helpText="Bill amount including tip"
          />
          
          <CalculatorResult
            label="Per Person"
            value={formatCurrency(results.perPerson)}
            helpText="Total amount per person"
          />
          
          <CalculatorResult
            label="Tip Per Person"
            value={formatCurrency(results.tipPerPerson)}
            helpText="Tip amount per person"
          />
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipping Guidelines</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Tipping is a way to show appreciation for good service. While tipping customs vary 
              by country and situation, here are some general guidelines for the United States:
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Standard Tipping</h3>
                <ul className="space-y-2">
                  <li>• Restaurants: 15-20% of pre-tax bill</li>
                  <li>• Delivery: 10-15% of total order</li>
                  <li>• Bartenders: $1-2 per drink</li>
                  <li>• Taxi/Rideshare: 15-20% of fare</li>
                  <li>• Hair/Beauty: 15-20% of service</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Special Situations</h3>
                <ul className="space-y-2">
                  <li>• Large groups: 18-20% (often automatic)</li>
                  <li>• Buffet: 10% of total bill</li>
                  <li>• Take-out: 0-10% optional</li>
                  <li>• Exceptional service: 20-25%</li>
                  <li>• Poor service: 10% minimum</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Bill Splitting Etiquette</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Equal Splits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Best for similar orders</li>
                <li>• Include tax and tip</li>
                <li>• Round up for simplicity</li>
                <li>• Consider shared items</li>
                <li>• Agree beforehand</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Itemized Splits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Track individual orders</li>
                <li>• Split shared items equally</li>
                <li>• Include individual tax</li>
                <li>• Calculate individual tips</li>
                <li>• Use payment apps</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Group Dynamics</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Communicate clearly</li>
                <li>• Be fair and considerate</li>
                <li>• Handle disputes gracefully</li>
                <li>• Plan ahead for large groups</li>
                <li>• Consider separate checks</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Digital Tipping Tips</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Apps</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Mobile Payment Services</strong>
                  <br />
                  Many apps offer built-in tipping and splitting features
                </p>
                <p>
                  <strong>Digital Receipts</strong>
                  <br />
                  Keep records of tips for expense tracking
                </p>
                <p>
                  <strong>Group Payment Features</strong>
                  <br />
                  Use apps designed for group payments and splitting
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Double-check calculations</li>
                <li>• Verify tip percentages</li>
                <li>• Keep payment receipts</li>
                <li>• Use trusted payment methods</li>
                <li>• Consider service fees</li>
                <li>• Review final amounts</li>
                <li>• Maintain transaction records</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}