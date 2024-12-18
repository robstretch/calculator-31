import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculateCreditCard } from '../../utils/calculators/creditCard/calculate';
import { formatCurrency } from '../../utils/format';

export function CreditCardCalculator() {
  const [balance, setBalance] = useState('5000');
  const [interestRate, setInterestRate] = useState('18.9');
  const [minimumPayment, setMinimumPayment] = useState('2');
  const [additionalPayment, setAdditionalPayment] = useState('100');
  const [newPurchases, setNewPurchases] = useState('0');

  const result = calculateCreditCard({
    balance: parseFloat(balance),
    interestRate: parseFloat(interestRate),
    minimumPayment: parseFloat(minimumPayment),
    additionalPayment: parseFloat(additionalPayment),
    newPurchases: parseFloat(newPurchases)
  });

  return (
    <>
      <SEO 
        title="Credit Card Interest Calculator | Payment & Payoff Planning"
        description="Calculate credit card payoff time, total interest, and create a debt repayment plan. Compare different payment strategies and see the impact of additional payments."
        keywords={[
          'credit card calculator',
          'credit card interest',
          'debt payoff calculator',
          'minimum payment calculator',
          'credit card payoff time'
        ]}
        canonicalUrl="/credit-card-calculator"
      />

      <CalculatorLayout
        title="Credit Card Interest Calculator"
        description="Plan your credit card payoff strategy and calculate total interest"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                label="Current Balance"
                value={balance}
                onChange={setBalance}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Annual Interest Rate (%)"
                value={interestRate}
                onChange={setInterestRate}
                type="number"
                min="0"
                max="100"
              />
              <CalculatorInput
                label="Minimum Payment Rate (%)"
                value={minimumPayment}
                onChange={setMinimumPayment}
                type="number"
                min="1"
                max="100"
              />
            </div>
            <div className="space-y-4">
              <CalculatorInput
                label="Additional Monthly Payment"
                value={additionalPayment}
                onChange={setAdditionalPayment}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Monthly New Purchases"
                value={newPurchases}
                onChange={setNewPurchases}
                type="number"
                min="0"
              />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payoff Summary</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Time to Pay Off</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {result.payoffTime.years > 0 ? 
                      `${result.payoffTime.years}y ${result.payoffTime.months % 12}m` :
                      `${result.payoffTime.months}m`}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Total Interest</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(result.totalInterest)}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Total Payment</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(result.totalPayment)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Comparison</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">With Extra Payments</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-800">Time to Pay Off:</span>
                      <span className="font-medium">
                        {Math.floor(result.comparison.withExtra.months / 12)}y {result.comparison.withExtra.months % 12}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-800">Total Interest:</span>
                      <span className="font-medium">
                        {formatCurrency(result.comparison.withExtra.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-red-900 mb-2">Minimum Payments Only</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-red-800">Time to Pay Off:</span>
                      <span className="font-medium">
                        {Math.floor(result.comparison.withoutExtra.months / 12)}y {result.comparison.withoutExtra.months % 12}m
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-800">Total Interest:</span>
                      <span className="font-medium">
                        {formatCurrency(result.comparison.withoutExtra.totalInterest)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recommendations</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-indigo-900 mb-2">{rec.category}</h3>
                    <p className="text-gray-600">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Understanding Credit Card Interest</h2>
              
              <div className="grid md:grid-cols-3 gap-4 text-indigo-700">
                <div>
                  <h3 className="font-medium mb-2">APR vs. Daily Rate</h3>
                  <p className="text-sm">
                    Credit card APR is divided by 365 to calculate daily interest charges. Interest compounds daily on most cards.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Minimum Payments</h3>
                  <p className="text-sm">
                    Paying only the minimum extends repayment time and increases total interest paid significantly.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Grace Period</h3>
                  <p className="text-sm">
                    Most cards offer a grace period on new purchases if you pay your balance in full each month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}