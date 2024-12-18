import React, { useState } from 'react';
import { Bike } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMotorcycleLoan } from '../../utils/calculators/motorcycleLoan/calculate';
import { formatCurrency } from '../../utils/format';

export function MotorcycleLoanCalculator() {
  const [price, setPrice] = useState('15000');
  const [downPayment, setDownPayment] = useState('3000');
  const [loanTerm, setLoanTerm] = useState('3');
  const [interestRate, setInterestRate] = useState('5.99');
  const [creditScore, setCreditScore] = useState('700');
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const result = calculateMotorcycleLoan({
    price: parseFloat(price) || 0,
    downPayment: parseFloat(downPayment) || 0,
    loanTerm: parseFloat(loanTerm) || 0,
    interestRate: parseFloat(interestRate) || 0,
    creditScore: parseFloat(creditScore) || undefined,
    includeInsurance
  });

  return (
    <>
      <SEO 
        title="Motorcycle Loan Calculator | Payment and Cost Estimator"
        description="Calculate motorcycle loan payments, total costs, and get personalized recommendations. Includes insurance, maintenance, and registration estimates."
        keywords={[
          'motorcycle loan calculator',
          'bike financing',
          'motorcycle payment calculator',
          'motorcycle insurance calculator',
          'motorcycle cost calculator'
        ]}
        canonicalUrl="/motorcycle-loan-calculator"
      />

      <CalculatorLayout
        title="Motorcycle Loan Calculator"
        description="Calculate monthly payments and total costs of motorcycle ownership"
        icon={<Bike />}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Loan Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <CalculatorInput
                label="Motorcycle Price"
                value={price}
                onChange={setPrice}
                type="number"
                min={0}
                placeholder="Enter motorcycle price"
              />
              <CalculatorInput
                label="Down Payment"
                value={downPayment}
                onChange={setDownPayment}
                type="number"
                min={0}
                placeholder="Enter down payment"
              />
              <CalculatorInput
                label="Loan Term (years)"
                value={loanTerm}
                onChange={setLoanTerm}
                type="number"
                min={1}
                max={7}
                placeholder="Enter loan term"
              />
              <CalculatorInput
                label="Interest Rate (%)"
                value={interestRate}
                onChange={setInterestRate}
                type="number"
                min={0}
                step={0.01}
                placeholder="Enter interest rate"
              />
              <CalculatorInput
                label="Credit Score (optional)"
                value={creditScore}
                onChange={setCreditScore}
                type="number"
                min={300}
                max={850}
                placeholder="Enter credit score"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Include Insurance Estimate
                </label>
                <input
                  type="checkbox"
                  checked={includeInsurance}
                  onChange={(e) => setIncludeInsurance(e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Loan Summary</h2>
            <div className="grid gap-4">
              <CalculatorResult
                label="Monthly Payment"
                value={formatCurrency(result.monthlyPayment)}
                helpText="Principal and interest payment"
              />
              <CalculatorResult
                label="Total Loan Cost"
                value={formatCurrency(result.totalPayment)}
                helpText="Total of all payments over loan term"
              />
              <CalculatorResult
                label="Total Interest"
                value={formatCurrency(result.totalInterest)}
                helpText="Total interest paid over loan term"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Additional Costs</h2>
            <div className="grid gap-4">
              {result.costs.insurance && (
                <CalculatorResult
                  label="Annual Insurance"
                  value={formatCurrency(result.costs.insurance)}
                  helpText="Estimated annual insurance premium"
                />
              )}
              <CalculatorResult
                label="Registration"
                value={formatCurrency(result.costs.registration)}
                helpText="Estimated registration and fees"
              />
              <CalculatorResult
                label="Annual Maintenance"
                value={formatCurrency(result.costs.maintenance)}
                helpText="Estimated yearly maintenance cost"
              />
              <CalculatorResult
                label="Total Annual Costs"
                value={formatCurrency(result.costs.total)}
                helpText="Total estimated yearly ownership costs"
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
            <div className="grid gap-4">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-medium text-gray-900">{rec.category}</h3>
                  <p className="text-gray-600">{rec.suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}