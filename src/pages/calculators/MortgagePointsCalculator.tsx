import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateMortgagePoints } from '../../utils/calculators/mortgagePoints/calculate';

export function MortgagePointsCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [points, setPoints] = useState('2');
  const [loanTerm, setLoanTerm] = useState('30');
  const [pointCost, setPointCost] = useState('1');

  const result = calculateMortgagePoints({
    loanAmount: parseFloat(loanAmount),
    interestRate: parseFloat(interestRate),
    points: parseFloat(points),
    loanTerm: parseFloat(loanTerm),
    pointCost: parseFloat(pointCost)
  });

  return (
    <>
      <SEO
        title="Mortgage Points Calculator | Discount Point Cost Analysis"
        description="Calculate if buying mortgage points is worth it. Compare monthly payments, find break-even period, and analyze total savings with our mortgage points calculator."
        keywords={[
          'mortgage points calculator',
          'discount points',
          'mortgage rate buydown',
          'points vs rate',
          'mortgage break-even calculator'
        ]}
        canonicalUrl="/mortgage-points-calculator"
      />

      <CalculatorLayout
        title="Mortgage Points Calculator"
        description="Calculate if buying mortgage points is worth it and determine your break-even period"
        icon={<Calculator />}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <CalculatorInput
              label="Loan Amount ($)"
              value={loanAmount}
              onChange={setLoanAmount}
              min={0}
              step={1000}
            />
            <CalculatorInput
              label="Interest Rate (%)"
              value={interestRate}
              onChange={setInterestRate}
              min={0}
              step={0.125}
            />
            <CalculatorInput
              label="Points"
              value={points}
              onChange={setPoints}
              min={0}
              max={6}
              step={0.125}
            />
            <CalculatorInput
              label="Loan Term (years)"
              value={loanTerm}
              onChange={setLoanTerm}
              min={1}
              max={30}
            />
            <CalculatorInput
              label="Point Cost (%)"
              value={pointCost}
              onChange={setPointCost}
              min={0}
              step={0.125}
            />
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Monthly Payment with Points"
              value={`$${result.monthlyPaymentWithPoints.toFixed(2)}`}
            />
            <CalculatorResult
              label="Monthly Payment without Points"
              value={`$${result.monthlyPaymentWithoutPoints.toFixed(2)}`}
            />
            <CalculatorResult
              label="Monthly Savings"
              value={`$${result.monthlySavings.toFixed(2)}`}
            />
            <CalculatorResult
              label="Total Points Cost"
              value={`$${result.totalPointsCost.toFixed(2)}`}
            />
            <CalculatorResult
              label="Break-even Period"
              value={`${result.breakEvenMonths} months`}
            />
            <CalculatorResult
              label="Lifetime Savings"
              value={`$${result.lifetimeSavings.toFixed(2)}`}
            />
          </div>
        </div>

        <div className="mt-12 prose max-w-none">
          <h2 className="text-2xl font-bold text-gray-900">Understanding Mortgage Points</h2>
          
          <p className="text-gray-600">
            Mortgage points, also known as discount points, are fees paid directly to the lender at closing 
            in exchange for a reduced interest rate. One point costs 1% of your mortgage amount and typically 
            reduces your interest rate by 0.25%. This calculator helps you determine if buying points is 
            financially beneficial based on your specific situation.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">When to Buy Points</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>You plan to keep the loan for a long time</li>
                <li>You have extra cash available at closing</li>
                <li>The break-even period aligns with your plans</li>
                <li>You want to lower your monthly payments</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800">When to Skip Points</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>You plan to sell or refinance soon</li>
                <li>Cash is tight for closing costs</li>
                <li>Interest rates are already low</li>
                <li>You might move before breaking even</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Break-even Analysis</h3>
          <p className="text-gray-600">
            The break-even period is the time it takes for the monthly payment savings to exceed the upfront 
            cost of buying points. For example, if points cost $3,000 and save you $50 per month, you'll 
            break even in 60 months (5 years). Consider your expected time in the home when deciding if 
            points are worth it.
          </p>

          <h3 className="text-xl font-semibold text-gray-800 mt-8">Tax Considerations</h3>
          <p className="text-gray-600">
            Mortgage points are typically tax-deductible in the year you pay them if you itemize deductions. 
            However, if you're using the mortgage to buy your main home and the points meet certain 
            requirements, you may be able to deduct them all at once. Consult a tax professional for advice 
            specific to your situation.
          </p>
        </div>
      </CalculatorLayout>
    </>
  );
}