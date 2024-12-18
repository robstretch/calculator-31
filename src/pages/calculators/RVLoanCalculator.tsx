import React, { useState } from 'react';
import { Car } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateRVLoan } from '../../utils/calculators/rvLoan';
import { formatCurrency } from '../../utils/format';

export function RVLoanCalculator() {
  const [rvPrice, setRVPrice] = useState('50000');
  const [downPayment, setDownPayment] = useState('10000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('15');
  const [showAmortization, setShowAmortization] = useState(false);

  const results = calculateRVLoan(
    parseFloat(rvPrice) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(loanTerm) || 0,
    parseFloat(downPayment) || 0
  );

  return (
    <CalculatorLayout
      title="RV Loan Calculator"
      description="Calculate monthly payments and total costs for your recreational vehicle loan"
      icon={<Car />}
    >
      <SEO
        title="RV Loan Calculator | Recreational Vehicle Loan Calculator"
        description="Calculate RV loan payments, total costs, and amortization schedule with our free recreational vehicle loan calculator."
        keywords={[
          'rv loan calculator',
          'recreational vehicle loan',
          'camper loan calculator',
          'motorhome financing',
          'rv payment calculator',
          'rv financing calculator'
        ]}
        canonicalUrl="/rv-loan-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
          
          <CalculatorInput
            label="RV Price"
            value={rvPrice}
            onChange={setRVPrice}
            min={0}
            step={1000}
            placeholder="Enter RV price"
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
            max={20}
            step={1}
            placeholder="Enter loan term"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
          
          <CalculatorResult
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPayment)}
            helpText="Principal and interest only"
          />
          
          <CalculatorResult
            label="Total of Payments"
            value={formatCurrency(results.totalPayment)}
            helpText="Total amount you will pay over the loan term"
          />
          
          <CalculatorResult
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            helpText="Total interest paid over loan term"
          />

          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
          </button>

          {showAmortization && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500">
                    <th className="p-2">Payment</th>
                    <th className="p-2">Principal</th>
                    <th className="p-2">Interest</th>
                    <th className="p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.amortizationSchedule.map((payment, index) => (
                    index % 12 === 0 && (
                      <tr key={index} className="border-t">
                        <td className="p-2">Year {index/12 + 1}</td>
                        <td className="p-2">{formatCurrency(payment.principal)}</td>
                        <td className="p-2">{formatCurrency(payment.interest)}</td>
                        <td className="p-2">{formatCurrency(payment.balance)}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding RV Loans</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              An RV loan is a specialized vehicle loan designed for purchasing recreational vehicles. 
              These loans often have different terms and considerations compared to standard auto loans 
              due to the higher costs and longer useful life of RVs.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
                <ul className="space-y-2">
                  <li>• Longer loan terms (up to 20 years)</li>
                  <li>• Higher loan amounts</li>
                  <li>• Potentially tax-deductible interest</li>
                  <li>• Different down payment requirements</li>
                  <li>• Specialized insurance needs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Loan Types</h3>
                <ul className="space-y-2">
                  <li>• Fixed-rate loans</li>
                  <li>• Variable-rate loans</li>
                  <li>• Secured loans</li>
                  <li>• Unsecured loans</li>
                  <li>• Home equity options</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">RV Loan Considerations</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Down Payment</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Typically 10-20% required</li>
                <li>• Larger down = lower payments</li>
                <li>• Affects interest rates</li>
                <li>• Reduces depreciation impact</li>
                <li>• May affect loan approval</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Additional Costs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Insurance premiums</li>
                <li>• Maintenance expenses</li>
                <li>• Storage fees</li>
                <li>• Campground costs</li>
                <li>• Fuel expenses</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Loan Terms</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Interest rate options</li>
                <li>• Repayment flexibility</li>
                <li>• Prepayment penalties</li>
                <li>• Term length impact</li>
                <li>• Credit requirements</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for RV Financing</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Before Applying</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Check your credit score</li>
                <li>• Research current rates</li>
                <li>• Compare multiple lenders</li>
                <li>• Consider total ownership costs</li>
                <li>• Understand loan terms</li>
                <li>• Calculate affordable payment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Smart Borrowing</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Choose appropriate loan term</li>
                <li>• Make larger down payment</li>
                <li>• Consider seasonal use</li>
                <li>• Plan for depreciation</li>
                <li>• Include insurance costs</li>
                <li>• Budget for maintenance</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}