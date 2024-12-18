import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculate401k } from '../../utils/calculators/401k/calculate';
import { formatCurrency } from '../../utils/format';

export function FourOhOneKCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSalary, setCurrentSalary] = useState('75000');
  const [contributionPercent, setContributionPercent] = useState('6');
  const [employerMatch, setEmployerMatch] = useState('50');
  const [employerMatchLimit, setEmployerMatchLimit] = useState('6');
  const [currentBalance, setCurrentBalance] = useState('50000');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [annualRaise, setAnnualRaise] = useState('2');

  const result = calculate401k({
    currentAge: parseInt(currentAge),
    retirementAge: parseInt(retirementAge),
    currentSalary: parseFloat(currentSalary),
    contributionPercent: parseFloat(contributionPercent),
    employerMatch: parseFloat(employerMatch),
    employerMatchLimit: parseFloat(employerMatchLimit),
    currentBalance: parseFloat(currentBalance),
    annualReturn: parseFloat(annualReturn),
    annualRaise: parseFloat(annualRaise)
  });

  return (
    <>
      <SEO 
        title="401(k) Calculator | Retirement Planning Tool"
        description="Calculate your 401(k) retirement savings with employer match. Plan your contributions and estimate your retirement nest egg."
        keywords={[
          '401k calculator',
          'retirement calculator',
          'employer match',
          'retirement planning',
          'retirement savings'
        ]}
        canonicalUrl="/401k-calculator"
      />

      <CalculatorLayout
        title="401(k) Calculator"
        description="Plan your retirement savings and maximize employer match"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <CalculatorInput
                label="Current Age"
                value={currentAge}
                onChange={setCurrentAge}
                type="number"
                min="18"
                max="80"
              />
              <CalculatorInput
                label="Retirement Age"
                value={retirementAge}
                onChange={setRetirementAge}
                type="number"
                min="50"
                max="80"
              />
              <CalculatorInput
                label="Current Annual Salary"
                value={currentSalary}
                onChange={setCurrentSalary}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Your Contribution (%)"
                value={contributionPercent}
                onChange={setContributionPercent}
                type="number"
                min="0"
                max="100"
              />
            </div>

            <div className="space-y-4">
              <CalculatorInput
                label="Employer Match (%)"
                value={employerMatch}
                onChange={setEmployerMatch}
                type="number"
                min="0"
                max="100"
              />
              <CalculatorInput
                label="Employer Match Limit (%)"
                value={employerMatchLimit}
                onChange={setEmployerMatchLimit}
                type="number"
                min="0"
                max="100"
              />
              <CalculatorInput
                label="Current 401(k) Balance"
                value={currentBalance}
                onChange={setCurrentBalance}
                type="number"
                min="0"
              />
              <CalculatorInput
                label="Expected Annual Return (%)"
                value={annualReturn}
                onChange={setAnnualReturn}
                type="number"
                min="0"
                max="20"
              />
              <CalculatorInput
                label="Expected Annual Raise (%)"
                value={annualRaise}
                onChange={setAnnualRaise}
                type="number"
                min="0"
                max="10"
              />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Results</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Projected Balance</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(result.projectedBalance)}
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    At retirement age {retirementAge}
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Monthly Income</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(result.metrics.projectedIncome / 12)}
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    Based on 4% withdrawal rule
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Income Replacement</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {Math.round(result.metrics.replacementRatio)}%
                  </div>
                  <p className="text-sm text-indigo-700 mt-1">
                    Of current salary
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contribution Analysis</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Contributions</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Contribution:</span>
                      <span className="font-medium">
                        {formatCurrency(result.yearlyBreakdown[0].employeeContribution)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Contributions:</span>
                      <span className="font-medium">
                        {formatCurrency(result.totalContributions.employee)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Employer Match</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Match:</span>
                      <span className="font-medium">
                        {formatCurrency(result.yearlyBreakdown[0].employerContribution)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Match:</span>
                      <span className="font-medium">
                        {formatCurrency(result.totalContributions.employer)}
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
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Important Notes</h2>
              
              <div className="grid md:grid-cols-3 gap-4 text-indigo-700">
                <div>
                  <h3 className="font-medium mb-2">Contribution Limits</h3>
                  <p className="text-sm">
                    2024 employee contribution limit: $23,000 (under 50)<br />
                    Catch-up contribution: $7,500 (age 50+)
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Tax Benefits</h3>
                  <p className="text-sm">
                    Contributions are pre-tax, reducing your taxable income<br />
                    Growth is tax-deferred until withdrawal
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Early Withdrawal</h3>
                  <p className="text-sm">
                    10% penalty on withdrawals before age 59½<br />
                    Required minimum distributions start at 73
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