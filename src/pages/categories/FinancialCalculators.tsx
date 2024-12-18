import React from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { categories } from '../../utils/categories';
import { CalculatorCard } from '../../components/Calculator/CalculatorCard';

export function FinancialCalculators() {
  const financialCalculators = categories.find(c => c.title === "Financial Calculators")?.calculators || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <SEO
        title="Financial Calculators | Mortgage, Loan & Investment Tools"
        description="Free financial calculators for mortgages, loans, investments, and retirement planning. Make informed financial decisions with our comprehensive calculator suite."
        keywords={[
          'financial calculator',
          'mortgage calculator',
          'loan calculator',
          'investment calculator',
          'retirement calculator',
          'compound interest calculator'
        ]}
        canonicalUrl="/financial"
      />
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Calculators</h1>
        <p className="text-xl text-gray-600">
          Free calculators for all your financial planning needs
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {financialCalculators.map((calc) => (
          <CalculatorCard
            key={calc.path}
            title={calc.title}
            description={calc.description}
            icon={calc.icon}
            to={calc.path}
          />
        ))}
      </div>
    </div>
  );
}