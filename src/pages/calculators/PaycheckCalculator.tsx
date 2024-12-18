import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculatePaycheck } from '../../utils/calculators/paycheck';
import { formatCurrency } from '../../utils/format';

export function PaycheckCalculator() {
  const [salary, setSalary] = useState('50000');
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly' | 'monthly'>('biweekly');
  const [taxRate, setTaxRate] = useState('22');
  const [deductions, setDeductions] = useState('200');

  const results = calculatePaycheck(
    parseFloat(salary) || 0,
    payPeriod,
    parseFloat(taxRate) || 0,
    parseFloat(deductions) || 0
  );

  return (
    <CalculatorLayout
      title="Paycheck Calculator"
      description="Calculate your take-home pay after taxes and deductions."
      icon={<DollarSign />}
    >
      <SEO
        title="Paycheck Calculator | Take-Home Pay Calculator"
        description="Calculate your take-home pay after taxes and deductions. Free paycheck calculator with detailed breakdown of withholdings."
        keywords={[
          'paycheck calculator',
          'salary calculator',
          'take home pay calculator',
          'net pay calculator',
          'income tax calculator',
          'wage calculator'
        ]}
        canonicalUrl="/paycheck-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Income Details</h2>
          
          <CalculatorInput
            label="Annual Salary"
            value={salary}
            onChange={setSalary}
            min={0}
            step={1000}
            placeholder="Enter annual salary"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Pay Period</label>
            <div className="grid grid-cols-3 gap-2">
              {(['weekly', 'biweekly', 'monthly'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setPayPeriod(period)}
                  className={`px-4 py-2 rounded-md ${
                    payPeriod === period
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <CalculatorInput
            label="Tax Rate (%)"
            value={taxRate}
            onChange={setTaxRate}
            min={0}
            max={100}
            step={0.1}
            placeholder="Enter tax rate"
          />

          <CalculatorInput
            label="Other Deductions"
            value={deductions}
            onChange={setDeductions}
            min={0}
            step={10}
            placeholder="Enter other deductions"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Paycheck Breakdown</h2>
          <CalculatorResult
            label="Gross Pay"
            value={formatCurrency(results.grossPay)}
            helpText={`Per ${payPeriod} period before deductions`}
          />
          <CalculatorResult
            label="Tax Withheld"
            value={formatCurrency(results.taxWithheld)}
            helpText="Estimated tax withholding"
          />
          <CalculatorResult
            label="Other Deductions"
            value={formatCurrency(results.totalDeductions)}
            helpText="Additional deductions per period"
          />
          <CalculatorResult
            label="Net Pay"
            value={formatCurrency(results.netPay)}
            helpText="Your take-home pay"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Note:</h3>
            <p className="text-sm text-indigo-700">
              This is a simplified calculation. Actual take-home pay may vary based on 
              local tax laws, filing status, and additional deductions or benefits.
            </p>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Your Paycheck</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              Your paycheck consists of several components that affect your final take-home pay.
              Understanding these elements helps you better plan your finances and ensure you're
              properly managing your income.
            </p>
            <div className="mt-6 grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Pre-tax Deductions</h3>
                <ul className="space-y-2">
                  <li>• 401(k) contributions</li>
                  <li>• Health insurance premiums</li>
                  <li>• Health Savings Account (HSA)</li>
                  <li>• Flexible Spending Account (FSA)</li>
                  <li>• Commuter benefits</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Post-tax Deductions</h3>
                <ul className="space-y-2">
                  <li>• Roth 401(k) contributions</li>
                  <li>• Life insurance premiums</li>
                  <li>• Disability insurance</li>
                  <li>• Union dues</li>
                  <li>• Wage garnishments</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tax Withholdings Explained</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Federal Taxes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Based on W-4 information</li>
                <li>• Progressive tax brackets</li>
                <li>• Standard deduction consideration</li>
                <li>• Tax credits impact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">State Taxes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Varies by state</li>
                <li>• Some states have no income tax</li>
                <li>• Local taxes may apply</li>
                <li>• Different brackets by state</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">FICA Taxes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Social Security (6.2%)</li>
                <li>• Medicare (1.45%)</li>
                <li>• Additional Medicare above threshold</li>
                <li>• Employer matches contribution</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pay Period Types</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Pay Frequencies</h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  <strong>Weekly (52 pay periods):</strong>
                  <br />
                  Paid every week, typically on the same day
                </p>
                <p>
                  <strong>Biweekly (26 pay periods):</strong>
                  <br />
                  Paid every two weeks, most common in the US
                </p>
                <p>
                  <strong>Semi-monthly (24 pay periods):</strong>
                  <br />
                  Paid twice per month, often 1st and 15th
                </p>
                <p>
                  <strong>Monthly (12 pay periods):</strong>
                  <br />
                  Paid once per month, typically same date
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Budgeting Tips</h3>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <ul className="text-indigo-700 space-y-2">
                  <li>• Base monthly budget on lowest paycheck</li>
                  <li>• Account for months with extra paychecks</li>
                  <li>• Set up automatic savings transfers</li>
                  <li>• Plan for irregular expenses</li>
                  <li>• Consider tax implications of bonuses</li>
                  <li>• Review withholdings annually</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Maximizing Your Take-Home Pay</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tax Strategies</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Review W-4 withholdings</li>
                <li>• Contribute to pre-tax accounts</li>
                <li>• Understand tax brackets</li>
                <li>• Claim eligible deductions</li>
                <li>• Consider tax credits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Benefits Optimization</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Maximize employer match</li>
                <li>• Use FSA/HSA accounts</li>
                <li>• Compare benefit options</li>
                <li>• Review insurance needs</li>
                <li>• Consider voluntary benefits</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Long-term Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Set retirement goals</li>
                <li>• Build emergency fund</li>
                <li>• Plan for major expenses</li>
                <li>• Review investments</li>
                <li>• Consider career growth</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}