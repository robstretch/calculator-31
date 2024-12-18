import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateAutoLoan } from '../../utils/calculators/auto';
import { formatCurrency } from '../../utils/format';

export function AutoLoanCalculator() {
  const [carPrice, setCarPrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanTerm, setLoanTerm] = useState('5');

  const results = calculateAutoLoan(
    parseFloat(carPrice) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(loanTerm) || 0,
    parseFloat(downPayment) || 0
  );

  return (
    <CalculatorLayout
      title="Auto Loan Calculator"
      description="Calculate monthly car payments and total costs."
      icon={<Car />}
    >
      <SEO
        title="Auto Loan Calculator | Car Payment Calculator"
        description="Calculate your monthly car payments, total interest, and loan amortization schedule with our free auto loan calculator."
        keywords={[
          'auto loan calculator',
          'car payment calculator',
          'vehicle loan calculator',
          'car loan payment',
          'auto loan amortization',
          'car financing calculator'
        ]}
        canonicalUrl="/auto-loan-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
          <CalculatorInput
            label="Car Price"
            value={carPrice}
            onChange={setCarPrice}
            min={0}
            step={1000}
            placeholder="Enter car price"
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
            max={100}
            step={0.1}
            placeholder="Enter interest rate"
          />
          <CalculatorInput
            label="Loan Term (years)"
            value={loanTerm}
            onChange={setLoanTerm}
            min={1}
            max={10}
            step={1}
            placeholder="Enter loan term"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
          <CalculatorResult
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPayment)}
            helpText="Principal and interest only"
          />
          <CalculatorResult
            label="Total Payment"
            value={formatCurrency(results.totalPayment)}
            helpText="Total amount you will pay over the loan term"
          />
          <CalculatorResult
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            helpText="Total interest paid over loan term"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Note:</h3>
            <p className="text-sm text-indigo-700">
              This calculation is an estimate. Additional costs like taxes, registration, 
              and insurance are not included in this calculation.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Auto Loan Terms</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              When financing a car, your monthly payment consists of several components:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Principal:</strong> The amount you're borrowing (car price minus down payment)</li>
              <li><strong>Interest:</strong> The cost of borrowing, expressed as an annual percentage rate (APR)</li>
              <li><strong>Term Length:</strong> The duration of your loan, typically 3-7 years</li>
              <li><strong>Additional Costs:</strong> Sales tax, registration, insurance (not included in loan payment)</li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Affect Your Car Payment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Down Payment</h3>
              <p className="text-gray-600">
                A larger down payment offers several advantages:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Lower monthly payments</li>
                <li>• Less interest paid overall</li>
                <li>• Better chance of approval</li>
                <li>• Protection against depreciation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Loan Term</h3>
              <p className="text-gray-600">
                The length of your loan affects:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Monthly payment amount</li>
                <li>• Total interest paid</li>
                <li>• Risk of being "upside down"</li>
                <li>• Available interest rates</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Getting the Best Auto Loan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Check Your Credit</h3>
              <p className="text-gray-600">
                Before applying:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Review your credit report</li>
                <li>• Dispute any errors</li>
                <li>• Pay down existing debt</li>
                <li>• Avoid new credit applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Shop Around</h3>
              <p className="text-gray-600">
                Compare offers from:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Banks</li>
                <li>• Credit unions</li>
                <li>• Online lenders</li>
                <li>• Dealership financing</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Negotiate Terms</h3>
              <p className="text-gray-600">
                Focus on:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Total price, not monthly payment</li>
                <li>• Interest rate</li>
                <li>• Loan term</li>
                <li>• Additional fees</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Auto Loan Terms Explained</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-800">Annual Percentage Rate (APR)</dt>
                  <dd className="text-gray-600">The yearly cost of the loan, including interest and fees, expressed as a percentage.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Gap Insurance</dt>
                  <dd className="text-gray-600">Coverage that pays the difference between what you owe and what your car is worth if it's totaled.</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-800">Upside Down</dt>
                  <dd className="text-gray-600">When you owe more on your car than it's worth, often due to depreciation.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Pre-approval</dt>
                  <dd className="text-gray-600">Getting approved for a loan before shopping for a car, giving you a better negotiating position.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}