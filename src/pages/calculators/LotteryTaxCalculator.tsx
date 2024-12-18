import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateLotteryTax, PaymentOption } from '../../utils/calculators/lotteryTax';
import { formatCurrency, formatNumber } from '../../utils/format';

export function LotteryTaxCalculator() {
  const [winnings, setWinnings] = useState('1000000');
  const [stateRate, setStateRate] = useState('5');
  const [paymentType, setPaymentType] = useState<'lump' | 'annuity'>('lump');
  const [annuityYears, setAnnuityYears] = useState('30');
  const [showBreakdown, setShowBreakdown] = useState(false);

  const paymentOption: PaymentOption = {
    type: paymentType,
    years: paymentType === 'annuity' ? parseInt(annuityYears) : undefined
  };

  const results = calculateLotteryTax(
    parseFloat(winnings) || 0,
    parseFloat(stateRate) || 0,
    paymentOption
  );

  return (
    <CalculatorLayout
      title="Lottery Tax Calculator"
      description="Calculate taxes on lottery winnings"
      icon={<DollarSign />}
    >
      <SEO
        title="Lottery Tax Calculator | Lottery Winnings Calculator"
        description="Calculate taxes on lottery winnings and compare lump sum vs. annuity options. Free lottery tax calculator with state tax analysis."
        keywords={[
          'lottery tax calculator',
          'lottery winnings calculator',
          'gambling tax calculator',
          'lottery payout calculator',
          'prize money tax',
          'jackpot tax calculator'
        ]}
        canonicalUrl="/lottery-tax-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Lottery Details</h2>
          
          <CalculatorInput
            label="Lottery Winnings"
            value={winnings}
            onChange={setWinnings}
            min={0}
            step={1000}
            placeholder="Enter lottery winnings"
          />
          
          <CalculatorInput
            label="State Tax Rate (%)"
            value={stateRate}
            onChange={setStateRate}
            min={0}
            max={15}
            step={0.1}
            placeholder="Enter state tax rate"
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Option</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setPaymentType('lump')}
                className={`px-4 py-2 rounded-md ${
                  paymentType === 'lump'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Lump Sum
              </button>
              <button
                onClick={() => setPaymentType('annuity')}
                className={`px-4 py-2 rounded-md ${
                  paymentType === 'annuity'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Annuity
              </button>
            </div>
          </div>

          {paymentType === 'annuity' && (
            <CalculatorInput
              label="Years of Payments"
              value={annuityYears}
              onChange={setAnnuityYears}
              min={20}
              max={40}
              step={1}
              placeholder="Enter number of years"
            />
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatCurrency(results.netWinnings)}
              </div>
              <div className="text-gray-500">After-Tax Winnings</div>
              {paymentType === 'annuity' && results.monthlyPayment && (
                <div className="text-sm text-gray-400 mt-1">
                  {formatCurrency(results.monthlyPayment)}/month
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <CalculatorResult
              label="Gross Winnings"
              value={formatCurrency(results.grossWinnings)}
              helpText={paymentType === 'lump' ? '60% of advertised jackpot' : 'Full jackpot amount'}
            />
            
            <CalculatorResult
              label="Federal Tax"
              value={formatCurrency(results.federalTax)}
              helpText="37% federal tax rate"
            />
            
            <CalculatorResult
              label="State Tax"
              value={formatCurrency(results.stateTax)}
              helpText={`${stateRate}% state tax rate`}
            />
            
            <CalculatorResult
              label="Total Tax"
              value={formatCurrency(results.totalTax)}
              helpText={`${formatNumber(results.effectiveTaxRate)}% effective tax rate`}
            />

            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {showBreakdown ? 'Hide' : 'Show'} Payment Breakdown
            </button>

            {showBreakdown && (
              <div className="bg-white p-6 rounded-lg shadow-md mt-4">
                <h3 className="font-semibold mb-4">Payment Schedule:</h3>
                <div className="max-h-96 overflow-y-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-left text-sm font-medium text-gray-500">
                        <th className="p-2">Year</th>
                        <th className="p-2">Payment</th>
                        <th className="p-2">Taxes</th>
                        <th className="p-2">Net</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyBreakdown.map((year) => (
                        <tr key={year.year} className="border-t">
                          <td className="p-2">{year.year}</td>
                          <td className="p-2">{formatCurrency(year.payment)}</td>
                          <td className="p-2">{formatCurrency(year.federalTax + year.stateTax)}</td>
                          <td className="p-2">{formatCurrency(year.netPayment)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Lottery Taxes</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Payment Options</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Lump Sum: ~60% of advertised jackpot</li>
                <li>• Annuity: Full amount over 20-40 years</li>
                <li>• Both options subject to taxes</li>
                <li>• Consider time value of money</li>
                <li>• Investment opportunities vary</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tax Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Federal tax rate: 37% for large winnings</li>
                <li>• State taxes vary by location</li>
                <li>• Withholding may be required</li>
                <li>• Tax brackets may change</li>
                <li>• Consider estate planning</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Planning Tips</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Immediate Steps</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Secure the ticket</li>
                <li>• Contact legal advisor</li>
                <li>• Plan for taxes</li>
                <li>• Consider anonymity</li>
                <li>• Set up security</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Long-term Planning</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Investment strategy</li>
                <li>• Estate planning</li>
                <li>• Tax planning</li>
                <li>• Charitable giving</li>
                <li>• Retirement planning</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Mistakes</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Overspending early</li>
                <li>• Ignoring taxes</li>
                <li>• Poor investment choices</li>
                <li>• Neglecting security</li>
                <li>• Failing to plan</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}