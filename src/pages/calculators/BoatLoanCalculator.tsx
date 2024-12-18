import React, { useState } from 'react';
import { Anchor } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateBoatLoan } from '../../utils/calculators/boat/calculate';
import { formatCurrency } from '../../utils/format';

export function BoatLoanCalculator() {
  const [boatPrice, setBoatPrice] = useState('50000');
  const [downPayment, setDownPayment] = useState('10000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('10');
  const [showAmortization, setShowAmortization] = useState(false);

  const results = calculateBoatLoan(
    parseFloat(boatPrice) || 0,
    parseFloat(downPayment) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(loanTerm) || 0
  );

  return (
    <CalculatorLayout
      title="Boat Loan Calculator"
      description="Calculate monthly payments and total costs for your boat loan"
      icon={<Anchor />}
    >
      <SEO
        title="Boat Loan Calculator | Marine Financing Calculator"
        description="Calculate boat loan payments, total costs, and amortization schedule with our free boat financing calculator."
        keywords={[
          'boat loan calculator',
          'marine loan calculator',
          'boat financing calculator',
          'yacht loan calculator',
          'boat payment calculator',
          'marine financing'
        ]}
        canonicalUrl="/boat-loan-calculator"
      />
      {/* Rest of the component remains exactly the same */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
          
          <CalculatorInput
            label="Boat Price"
            value={boatPrice}
            onChange={setBoatPrice}
            min={0}
            step={1000}
            placeholder="Enter boat price"
          />
          
          <CalculatorInput
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            step={500}
            placeholder="Enter down payment"
          />
          
          <CalculatorInput
            label="Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.1}
            placeholder="Enter interest rate"
          />
          
          <CalculatorInput
            label="Loan Term (years)"
            value={loanTerm}
            onChange={setLoanTerm}
            min={1}
            max={30}
            step={1}
            placeholder="Enter loan term"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Cost Summary</h2>
          
          <CalculatorResult
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPayment)}
            helpText="Principal and interest only"
          />
          
          <CalculatorResult
            label="Total Loan Payment"
            value={formatCurrency(results.totalPayment)}
            helpText="Total amount paid over loan term"
          />
          
          <CalculatorResult
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            helpText="Total interest paid over loan term"
          />

          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="font-semibold mb-4">Additional Annual Costs:</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance (est.)</span>
                <span className="font-medium">{formatCurrency(results.insuranceEstimate)}/year</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Maintenance (est.)</span>
                <span className="font-medium">{formatCurrency(results.maintenanceEstimate)}/year</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total Cost of Ownership</span>
                  <span>{formatCurrency(results.totalCostOfOwnership)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Includes loan payments, insurance, and maintenance over loan term
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
            </button>

            {showAmortization && (
              <div className="mt-4 bg-white rounded-lg p-4 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-left text-sm font-medium text-gray-500">
                      <th className="p-2">Year</th>
                      <th className="p-2">Payment</th>
                      <th className="p-2">Principal</th>
                      <th className="p-2">Interest</th>
                      <th className="p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.amortizationSchedule
                      .filter((_, index) => index % 12 === 0)
                      .map((payment, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-2">{index + 1}</td>
                          <td className="p-2">{formatCurrency(payment.payment)}</td>
                          <td className="p-2">{formatCurrency(payment.principal)}</td>
                          <td className="p-2">{formatCurrency(payment.interest)}</td>
                          <td className="p-2">{formatCurrency(payment.balance)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Boat Loans</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Down payment requirements (typically 10-20%)</li>
                <li>• Loan terms (usually 5-20 years)</li>
                <li>• Interest rates and APR</li>
                <li>• Credit score impact</li>
                <li>• Collateral requirements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Costs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Insurance premiums</li>
                <li>• Regular maintenance</li>
                <li>• Storage fees</li>
                <li>• Fuel expenses</li>
                <li>• Registration and licenses</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Boat Ownership Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Budget for all costs</li>
                <li>• Consider seasonal expenses</li>
                <li>• Plan for depreciation</li>
                <li>• Emergency fund importance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Maintenance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Regular inspections</li>
                <li>• Winterization</li>
                <li>• Engine servicing</li>
                <li>• Hull maintenance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Insurance</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Coverage types</li>
                <li>• Policy limits</li>
                <li>• Deductibles</li>
                <li>• Additional riders</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}