import React from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO/SEO';
import { 
  DollarSign, 
  Car, 
  Scale, 
  GraduationCap, 
  Briefcase, 
  Apple,
  Calculator,
  Home,
  Code
} from 'lucide-react';
import { getCalculatorCount } from '../utils/calculatorCount';

const calculators = [
  {
    title: 'Mortgage Calculator',
    description: 'Calculate monthly mortgage payments, total interest, and loan details.',
    icon: <Home className="h-6 w-6 text-indigo-600" />,
    to: '/mortgage-calculator'
  },
  {
    title: 'Auto Loan Calculator',
    description: 'Calculate monthly car payments, total interest, and loan amortization.',
    icon: <Car className="h-6 w-6 text-indigo-600" />,
    to: '/auto-loan-calculator'
  },
  {
    title: 'BMI Calculator',
    description: 'Check your Body Mass Index and understand your weight category.',
    icon: <Scale className="h-6 w-6 text-indigo-600" />,
    to: '/bmi-calculator'
  },
  {
    title: 'Grade Calculator',
    description: 'Calculate weighted averages and final grades for your courses.',
    icon: <GraduationCap className="h-6 w-6 text-indigo-600" />,
    to: '/grade-calculator'
  },
  {
    title: 'Paycheck Calculator',
    description: 'Estimate your take-home pay after taxes and deductions.',
    icon: <Briefcase className="h-6 w-6 text-indigo-600" />,
    to: '/paycheck-calculator'
  },
  {
    title: 'Calorie Calculator',
    description: 'Determine your daily caloric needs based on your lifestyle.',
    icon: <Apple className="h-6 w-6 text-indigo-600" />,
    to: '/calorie-calculator'
  }
];

export function HomePage() {
  const calculatorCount = getCalculatorCount();

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Free Online Calculators | Calculator.info"
        description="Free online calculators for finance, health, education, math, and more. Make informed decisions with our comprehensive suite of calculation tools."
        keywords={[
          'online calculator',
          'financial calculator',
          'math calculator',
          'health calculator',
          'mortgage calculator',
          'bmi calculator'
        ]}
        canonicalUrl="/"
      />
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Calculator className="h-16 w-16" />
            </div>
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              Calculator.info
            </h1>
            <p className="mt-4 text-xl text-indigo-100">
              Free, accurate calculators for all your needs
            </p>
            <Link 
              to="/all"
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
            >
              {calculatorCount} beautiful calculators and counting
            </Link>
          </div>
        </div>
      </div>

      {/* Calculators Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((calc) => (
            <Link
              key={calc.title}
              to={calc.to}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    {calc.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {calc.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {calc.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom Calculator Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-indigo-100 rounded-full">
                <Code className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need a Calculator Built?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're building free calculators for websites! Submit your request and we'll create a 
              custom calculator that you can embed on your site - completely free.
            </p>
          </div>

          <div className="bg-indigo-50 rounded-lg p-8 max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 rounded-full bg-indigo-600 items-center justify-center">
                    <span className="text-white font-medium">1</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Submit Your Request</h3>
                  <p className="mt-1 text-gray-600">
                    Use our feedback form to describe the calculator you need.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 rounded-full bg-indigo-600 items-center justify-center">
                    <span className="text-white font-medium">2</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Development</h3>
                  <p className="mt-1 text-gray-600">
                    We'll build your calculator with a beautiful, responsive design
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 rounded-full bg-indigo-600 items-center justify-center">
                    <span className="text-white font-medium">3</span>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Integration</h3>
                  <p className="mt-1 text-gray-600">
                    Get a simple embed code to add the calculator to your website.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => document.querySelector('.feedback-button')?.click()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Request Your Free Calculator
              </button>
              <p className="mt-2 text-sm text-gray-600">
                First come, first served. Limited availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Calculators?
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
              <p className="text-gray-600">
                Our calculators use precise formulas and are regularly tested for accuracy.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
              <p className="text-gray-600">
                Simple, intuitive interfaces make calculations quick and effortless.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full">
                  <Calculator className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Always Free</h3>
              <p className="text-gray-600">
                Access all our calculators without any cost or registration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}