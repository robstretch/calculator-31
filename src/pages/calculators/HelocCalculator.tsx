import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { HelocBasics } from '../../components/Heloc/HelocBasics';
import { HelocQualification } from '../../components/Heloc/HelocQualification';
import { HelocRisks } from '../../components/Heloc/HelocRisks';
import { HelocTips } from '../../components/Heloc/HelocTips';
import { calculateHeloc } from '../../utils/calculators/heloc';
import { formatCurrency, formatNumber } from '../../utils/format';

export function HelocCalculator() {
  const [homeValue, setHomeValue] = useState('400000');
  const [mortgageBalance, setMortgageBalance] = useState('250000');
  const [creditScore, setCreditScore] = useState('720');
  const [interestRate, setInterestRate] = useState('8.5');
  const [monthlyDrawAmount, setMonthlyDrawAmount] = useState('50000');
  const [monthlyPayment, setMonthlyPayment] = useState('500');

  const results = calculateHeloc(
    parseFloat(homeValue) || 0,
    parseFloat(mortgageBalance) || 0,
    parseFloat(creditScore) || 0,
    parseFloat(interestRate) || 0,
    parseFloat(monthlyDrawAmount) || 0,
    parseFloat(monthlyPayment) || 0
  );

  return (
    <CalculatorLayout
      title="HELOC Calculator"
      description="Calculate your potential home equity line of credit and estimate payments"
      icon={<Home />}
    >
      <SEO
        title="HELOC Calculator | Home Equity Line of Credit Calculator"
        description="Calculate your potential HELOC amount, estimate payments, and understand borrowing power with our free home equity line of credit calculator."
        keywords={[
          'heloc calculator',
          'home equity calculator',
          'home equity line of credit',
          'heloc payment calculator',
          'home equity loan calculator',
          'home equity calculator'
        ]}
        canonicalUrl="/heloc-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Property Details</h2>
          
          <CalculatorInput
            label="Home Value"
            value={homeValue}
            onChange={setHomeValue}
            min={0}
            step={1000}
            placeholder="Enter your home's current value"
          />
          
          <CalculatorInput
            label="Mortgage Balance"
            value={mortgageBalance}
            onChange={setMortgageBalance}
            min={0}
            step={1000}
            placeholder="Enter remaining mortgage balance"
          />
          
          <CalculatorInput
            label="Credit Score"
            value={creditScore}
            onChange={setCreditScore}
            min={300}
            max={850}
            step={1}
            placeholder="Enter your credit score"
          />
          
          <CalculatorInput
            label="Interest Rate (%)"
            value={interestRate}
            onChange={setInterestRate}
            min={0}
            max={30}
            step={0.1}
            placeholder="Enter HELOC interest rate"
          />
          
          <CalculatorInput
            label="Amount to Borrow"
            value={monthlyDrawAmount}
            onChange={setMonthlyDrawAmount}
            min={0}
            step={1000}
            placeholder="Enter amount you want to borrow"
          />
          
          <CalculatorInput
            label="Monthly Payment"
            value={monthlyPayment}
            onChange={setMonthlyPayment}
            min={0}
            step={50}
            placeholder="Enter planned monthly payment"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">HELOC Summary</h2>
          
          <CalculatorResult
            label="Available Equity"
            value={formatCurrency(results.availableEquity)}
            helpText="Total equity available based on 80% LTV"
          />
          
          <CalculatorResult
            label="Maximum Credit Line"
            value={formatCurrency(results.maxCreditLine)}
            helpText="Maximum HELOC amount based on credit score"
          />
          
          <CalculatorResult
            label="Monthly Payment"
            value={formatCurrency(results.monthlyPayment)}
            helpText="Your specified monthly payment amount"
          />
          
          <CalculatorResult
            label="Total Interest"
            value={formatCurrency(results.totalInterest)}
            helpText="Total interest paid over the life of the HELOC"
          />
          
          <CalculatorResult
            label="Time to Pay Off"
            value={`${formatNumber(Math.ceil(results.payoffTime / 12))} years ${results.payoffTime % 12} months`}
            helpText="Estimated time to pay off the borrowed amount"
          />
          
          <div className="bg-indigo-50 p-4 rounded-lg mt-6">
            <h3 className="text-sm font-semibold text-indigo-800 mb-2">Important Notes:</h3>
            <ul className="text-sm text-indigo-700 space-y-1">
              <li>• HELOC rates are typically variable and may change over time</li>
              <li>• Most lenders require at least 20% equity remaining in your home</li>
              <li>• Your credit score significantly impacts available credit and rates</li>
              <li>• Consider closing costs and annual fees when planning a HELOC</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="mt-12 space-y-12">
        <HelocBasics />
        <HelocQualification />
        <HelocRisks />
        <HelocTips />
      </div>
    </CalculatorLayout>
  );
}