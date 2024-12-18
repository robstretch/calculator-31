import React, { useState } from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { calculateVADisability } from '../../utils/calculators/vaDisability/calculate';
import type { DisabilityRating } from '../../utils/calculators/vaDisability/types';
import { formatCurrency } from '../../utils/format';

export function VADisabilityCalculator() {
  const [ratings, setRatings] = useState<DisabilityRating[]>([
    { percentage: 50, description: 'PTSD' }
  ]);

  const result = calculateVADisability(ratings);

  const addRating = () => {
    setRatings([...ratings, { percentage: 0, description: '' }]);
  };

  const removeRating = (index: number) => {
    setRatings(ratings.filter((_, i) => i !== index));
  };

  const updateRating = (index: number, field: keyof DisabilityRating, value: string | number) => {
    const newRatings = [...ratings];
    newRatings[index] = {
      ...newRatings[index],
      [field]: field === 'percentage' ? Number(value) : value
    };
    setRatings(newRatings);
  };

  return (
    <CalculatorLayout
      title="VA Disability Calculator"
      description="Calculate VA disability compensation and combined ratings"
      icon={<Briefcase />}
    >
      <SEO
        title="VA Disability Calculator | Combined Ratings & Benefits"
        description="Calculate your VA disability compensation, combined ratings, and dependent benefits. Free calculator for veterans to estimate monthly payments."
        keywords={[
          'va disability calculator',
          'veterans disability calculator',
          'va rating calculator',
          'va compensation calculator',
          'va disability pay',
          'combined ratings calculator'
        ]}
        canonicalUrl="/va-disability-calculator"
      />

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Disability Ratings</h2>
              <button
                onClick={addRating}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-4 w-4" />
                Add Rating
              </button>
            </div>

            <div className="space-y-4">
              {ratings.map((rating, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <CalculatorInput
                      label="Description"
                      type="text"
                      value={rating.description}
                      onChange={(value) => updateRating(index, 'description', value)}
                      placeholder="e.g., PTSD, Back Injury"
                    />
                  </div>
                  <div className="w-32">
                    <CalculatorInput
                      label="Rating %"
                      type="number"
                      value={rating.percentage}
                      onChange={(value) => updateRating(index, 'percentage', value)}
                      min={0}
                      max={100}
                    />
                  </div>
                  <button
                    onClick={() => removeRating(index)}
                    className="mt-8 text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Combined Rating</h2>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <div className="text-4xl font-bold text-indigo-600">
                {result.combinedRating}%
              </div>
              <div className="text-sm text-indigo-700 mt-1">Combined Rating</div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Compensation</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Payment</span>
                <span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="text-sm font-medium text-gray-700 mb-2">Additional Dependent Rates:</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Spouse</span>
                    <span>{formatCurrency(result.dependentPayments.spouse)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Child Under 18</span>
                    <span>{formatCurrency(result.dependentPayments.childUnder18)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Child in School</span>
                    <span>{formatCurrency(result.dependentPayments.childInSchool)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Dependent Parent</span>
                    <span>{formatCurrency(result.dependentPayments.dependentParent)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Benefits</h2>
            <div className="space-y-4">
              {result.benefits.map((benefit) => (
                <div key={benefit.category} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="font-medium text-gray-900">{benefit.category}</div>
                  <div className="text-sm text-gray-600 mt-1">{benefit.description}</div>
                  <div className={`text-sm mt-1 ${
                    benefit.eligibility.includes('Eligible') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {benefit.eligibility}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How to Use This Calculator</h2>
          <div className="prose max-w-none text-gray-600">
            <p>
              The VA Disability Calculator helps veterans estimate their combined disability rating
              and monthly compensation. Here's how to use it:
            </p>
            
            <ol className="list-decimal pl-4 space-y-2 mt-4">
              <li>Enter each service-connected disability and its rating percentage</li>
              <li>The calculator will automatically compute your combined rating</li>
              <li>View your estimated monthly compensation and dependent rates</li>
              <li>Check additional benefits you may be eligible for</li>
            </ol>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Important Notes</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>VA uses its own method to combine ratings, not simple addition</li>
              <li>Ratings are combined from highest to lowest</li>
              <li>The final percentage is rounded to the nearest 10%</li>
              <li>Additional benefits may vary by state and circumstances</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Additional Resources</h3>
            <ul className="list-disc pl-4 space-y-2">
              <li>Contact your local VA office for official rating decisions</li>
              <li>Consider working with a VSO for claims assistance</li>
              <li>Keep documentation of all service-connected conditions</li>
              <li>Update dependent information with the VA when changes occur</li>
            </ul>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}