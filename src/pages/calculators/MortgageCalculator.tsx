import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMortgage } from '../../utils/calculators/mortgage';
import { formatCurrency } from '../../utils/format';

export function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('3.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [downPayment, setDownPayment] = useState('60000');

  const results = calculateMortgage(
    parseFloat(loanAmount) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(loanTerm) || 0,
    parseFloat(downPayment) || 0
  );

  return (
    <>
      <Helmet>
        <title>Mortgage Calculator | Payment & Amortization Calculator</title>
        <meta name="description" content="Calculate your monthly mortgage payments, total interest, and view complete amortization schedule with our free mortgage calculator." />
        <meta name="keywords" content="mortgage calculator, home loan calculator, mortgage payment calculator, house payment calculator, loan amortization calculator, monthly mortgage payment" />
        <link rel="canonical" href="/mortgage-calculator" />
      </Helmet>
      <CalculatorLayout
        title="Mortgage Calculator"
        description="Calculate your monthly mortgage payments and see a detailed breakdown of your loan."
        icon={<DollarSign />}
      >
      <SEO
        title="Mortgage Calculator | Payment & Amortization Calculator"
        description="Calculate your monthly mortgage payments, total interest, and view complete amortization schedule with our free mortgage calculator."
        keywords={[
          'mortgage calculator',
          'home loan calculator',
          'mortgage payment calculator',
          'house payment calculator',
          'loan amortization calculator',
          'monthly mortgage payment'
        ]}
        canonicalUrl="/mortgage-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
          <CalculatorInput
            label="Home Price"
            value={loanAmount}
            onChange={setLoanAmount}
            min={0}
            step={1000}
            placeholder="Enter home price"
          />
          <CalculatorInput
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            min={0}
            step={1000}
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
            max={50}
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
              This calculation is an estimate. Additional costs like property taxes, 
              insurance, and PMI are not included in this calculation.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Mortgage Payment</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Your monthly mortgage payment typically consists of four main components, often referred to as PITI:
            </p>
            <ul className="mt-4 space-y-2">
              <li><strong>Principal:</strong> The portion of your payment that goes toward paying off your loan balance.</li>
              <li><strong>Interest:</strong> The cost of borrowing money, calculated as a percentage of your loan balance.</li>
              <li><strong>Taxes:</strong> Property taxes are often collected monthly and held in escrow.</li>
              <li><strong>Insurance:</strong> Both homeowners insurance and, if required, private mortgage insurance (PMI).</li>
            </ul>
            <p className="mt-4">
              Our calculator focuses on principal and interest payments. Remember to budget for taxes and insurance separately.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Factors That Affect Your Monthly Payment</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Down Payment</h3>
              <p className="text-gray-600">
                A larger down payment reduces your loan amount and monthly payments. A down payment of 20% or more helps you:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Avoid private mortgage insurance (PMI)</li>
                <li>• Get better interest rates</li>
                <li>• Build instant equity in your home</li>
                <li>• Have lower monthly payments</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Interest Rate</h3>
              <p className="text-gray-600">
                Your interest rate has a significant impact on your monthly payment. Rates depend on:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Your credit score</li>
                <li>• Market conditions</li>
                <li>• Loan term</li>
                <li>• Down payment amount</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Lower Monthly Payments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Improve Your Credit Score</h3>
              <p className="text-gray-600">
                A higher credit score can help you qualify for lower interest rates. Focus on:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Paying bills on time</li>
                <li>• Reducing credit utilization</li>
                <li>• Checking for errors</li>
                <li>• Limiting new credit applications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Save for Down Payment</h3>
              <p className="text-gray-600">
                A larger down payment offers several benefits:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Lower monthly payments</li>
                <li>• Better interest rates</li>
                <li>• No PMI requirement</li>
                <li>• More equity upfront</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Compare Lenders</h3>
              <p className="text-gray-600">
                Shop around for the best mortgage terms:
              </p>
              <ul className="mt-2 space-y-1 text-gray-600">
                <li>• Compare multiple offers</li>
                <li>• Check different loan types</li>
                <li>• Review all fees</li>
                <li>• Consider local lenders</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Mortgage Terms Explained</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-800">Annual Percentage Rate (APR)</dt>
                  <dd className="text-gray-600">The total yearly cost of your mortgage, including interest and fees, expressed as a percentage.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Amortization</dt>
                  <dd className="text-gray-600">The gradual repayment of your loan through regular monthly payments of principal and interest.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Escrow</dt>
                  <dd className="text-gray-600">An account where funds are held for property taxes and insurance payments.</dd>
                </div>
              </dl>
            </div>
            <div>
              <dl className="space-y-4">
                <div>
                  <dt className="font-semibold text-gray-800">Private Mortgage Insurance (PMI)</dt>
                  <dd className="text-gray-600">Insurance required when your down payment is less than 20%, protecting the lender against default.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Points</dt>
                  <dd className="text-gray-600">Upfront fees paid to lower your interest rate, with one point equal to 1% of your loan amount.</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-800">Loan-to-Value Ratio (LTV)</dt>
                  <dd className="text-gray-600">The percentage of your home's value that you're borrowing through your mortgage.</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
    </>
  );
}