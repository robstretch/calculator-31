import React, { useState } from 'react';
import { Home, Calendar } from 'lucide-react';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateMortgagePayoff } from '../../utils/calculators/mortgagePayoff';
import { formatCurrency } from '../../utils/format';

export function MortgagePayoffCalculator() {
  const [principal, setPrincipal] = useState('250000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [monthlyPayment, setMonthlyPayment] = useState('1500');
  const [extraMonthly, setExtraMonthly] = useState('100');
  const [extraYearly, setExtraYearly] = useState('1000');
  const [oneTimePayment, setOneTimePayment] = useState('10000');
  const [oneTimeMonth, setOneTimeMonth] = useState('1');
  const [oneTimeYear, setOneTimeYear] = useState(new Date().getFullYear().toString());
  const [showAmortization, setShowAmortization] = useState(false);

  const results = calculateMortgagePayoff(
    parseFloat(principal) || 0,
    parseFloat(interestRate) || 0,
    new Date(),
    parseFloat(monthlyPayment) || 0,
    parseFloat(extraMonthly) || 0,
    parseFloat(extraYearly) || 0,
    parseFloat(oneTimePayment) || 0,
    parseInt(oneTimeMonth) || 1,
    parseInt(oneTimeYear) || new Date().getFullYear()
  );

  return (
    <CalculatorLayout
      title="Mortgage Payoff Calculator"
      description="Calculate how quickly you can pay off your mortgage with extra payments"
      icon={<Home />}
    >
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mortgage Details</h2>
          
          <CalculatorInput
            label="Current Principal Balance"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={1000}
            placeholder="Enter remaining principal"
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
            label="Current Monthly Payment"
            value={monthlyPayment}
            onChange={setMonthlyPayment}
            min={0}
            step={100}
            placeholder="Enter monthly payment"
          />

          <h3 className="text-lg font-semibold mt-6 mb-4">Extra Payments</h3>
          
          <CalculatorInput
            label="Extra Monthly Payment"
            value={extraMonthly}
            onChange={setExtraMonthly}
            min={0}
            step={50}
            placeholder="Enter extra monthly payment"
          />
          
          <CalculatorInput
            label="Extra Yearly Payment"
            value={extraYearly}
            onChange={setExtraYearly}
            min={0}
            step={500}
            placeholder="Enter extra yearly payment"
          />
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">One-Time Extra Payment</h3>
            <div className="grid grid-cols-2 gap-4">
              <CalculatorInput
                label="Amount"
                value={oneTimePayment}
                onChange={setOneTimePayment}
                min={0}
                step={1000}
                placeholder="Enter one-time payment"
              />
              <div className="grid grid-cols-2 gap-2">
                <CalculatorInput
                  label="Month"
                  value={oneTimeMonth}
                  onChange={setOneTimeMonth}
                  min={1}
                  max={12}
                  step={1}
                  placeholder="Month"
                />
                <CalculatorInput
                  label="Year"
                  value={oneTimeYear}
                  onChange={setOneTimeYear}
                  min={new Date().getFullYear()}
                  max={new Date().getFullYear() + 30}
                  step={1}
                  placeholder="Year"
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Payoff Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Original Payoff Date</p>
                <p className="text-lg font-semibold">
                  {results.originalPayoffDate.toLocaleDateString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-gray-400" />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New Payoff Date</p>
                <p className="text-lg font-semibold text-green-600">
                  {results.newPayoffDate.toLocaleDateString()}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-green-400" />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <CalculatorResult
              label="Time Saved"
              value={`${Math.floor(results.monthsSaved / 12)} years, ${results.monthsSaved % 12} months`}
              helpText="Time saved with extra payments"
            />
            
            <CalculatorResult
              label="Interest Saved"
              value={formatCurrency(results.interestSaved)}
              helpText="Total interest saved with extra payments"
            />
            
            <CalculatorResult
              label="Total Interest (Original)"
              value={formatCurrency(results.totalInterestOriginal)}
              helpText="Total interest without extra payments"
            />
            
            <CalculatorResult
              label="Total Interest (New)"
              value={formatCurrency(results.totalInterestNew)}
              helpText="Total interest with extra payments"
            />
          </div>

          <button
            onClick={() => setShowAmortization(!showAmortization)}
            className="w-full mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {showAmortization ? 'Hide' : 'Show'} Amortization Schedule
          </button>

          {showAmortization && (
            <div className="mt-4 bg-gray-50 rounded-lg p-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="text-left text-sm font-medium text-gray-500">
                    <th className="p-2">Date</th>
                    <th className="p-2">Payment</th>
                    <th className="p-2">Extra</th>
                    <th className="p-2">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.map((payment, index) => (
                    index % 12 === 0 && (
                      <tr key={index} className="border-t">
                        <td className="p-2">{payment.month.toLocaleDateString()}</td>
                        <td className="p-2">{formatCurrency(payment.payment)}</td>
                        <td className="p-2">{formatCurrency(payment.extraPayment)}</td>
                        <td className="p-2">{formatCurrency(payment.remainingBalance)}</td>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Mortgage Payoff Strategies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Extra Payment Benefits</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Reduce total interest paid</li>
                <li>• Shorten loan term</li>
                <li>• Build equity faster</li>
                <li>• Flexible payment options</li>
                <li>• No prepayment penalties (usually)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Make bi-weekly payments</li>
                <li>• Round up monthly payments</li>
                <li>• Apply tax refunds</li>
                <li>• Use work bonuses</li>
                <li>• Set up automatic extra payments</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Considerations Before Making Extra Payments</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Financial Priorities</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Emergency fund status</li>
                <li>• High-interest debt</li>
                <li>• Retirement savings</li>
                <li>• Investment opportunities</li>
                <li>• Tax implications</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Loan Terms</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Prepayment penalties</li>
                <li>• Interest rate</li>
                <li>• Loan type</li>
                <li>• Remaining term</li>
                <li>• Payment allocation</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Other Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Housing market</li>
                <li>• Future plans</li>
                <li>• Income stability</li>
                <li>• Inflation rate</li>
                <li>• Opportunity cost</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}