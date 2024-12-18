import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { calculateBloodType } from '../../utils/calculators/bloodType/calculate';

const BLOOD_TYPES = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export function BloodTypeCalculator() {
  const [childBloodType, setChildBloodType] = useState('');
  const [parent1BloodType, setParent1BloodType] = useState('');
  const [parent2BloodType, setParent2BloodType] = useState('');

  const result = calculateBloodType({
    childBloodType: childBloodType || undefined,
    parent1BloodType: parent1BloodType || undefined,
    parent2BloodType: parent2BloodType || undefined
  });

  return (
    <>
      <SEO 
        title="Blood Type Calculator | Inheritance and Compatibility"
        description="Calculate blood type inheritance patterns, compatibility for transfusions, and learn about blood type genetics."
        keywords={[
          'blood type calculator',
          'blood type compatibility',
          'blood type inheritance',
          'blood donation',
          'blood type genetics'
        ]}
        canonicalUrl="/blood-type-calculator"
      />

      <CalculatorLayout
        title="Blood Type Calculator"
        description="Calculate blood type inheritance patterns and compatibility"
        icon={<Activity />}
      >
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Blood Type Information</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Child's Blood Type (Optional)
                </label>
                <select
                  value={childBloodType}
                  onChange={(e) => setChildBloodType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Blood Type</option>
                  {BLOOD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent 1's Blood Type (Optional)
                </label>
                <select
                  value={parent1BloodType}
                  onChange={(e) => setParent1BloodType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Blood Type</option>
                  {BLOOD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Parent 2's Blood Type (Optional)
                </label>
                <select
                  value={parent2BloodType}
                  onChange={(e) => setParent2BloodType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select Blood Type</option>
                  {BLOOD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {(childBloodType || (parent1BloodType && parent2BloodType)) && (
            <>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <div className="space-y-4">
                  {result.possibleTypes.length > 0 && (
                    <div>
                      <h3 className="font-medium text-gray-900">Possible Blood Types</h3>
                      <p className="text-gray-600">{result.possibleTypes.join(', ')}</p>
                    </div>
                  )}
                  
                  {result.childPossibilities && (
                    <div>
                      <h3 className="font-medium text-gray-900">Possible Child Blood Types</h3>
                      <p className="text-gray-600">{result.childPossibilities.join(', ')}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-900">Compatibility</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Can donate to: </span>
                        {result.compatibility.canDonateTo.join(', ')}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Can receive from: </span>
                        {result.compatibility.canReceiveFrom.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Rarity</h3>
                    <p className="text-gray-600">
                      {result.rarity.type}: {result.rarity.percentage}% of population
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
                <div className="grid gap-4">
                  {result.recommendations.map((rec, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4">
                      <p className="font-medium">{rec.category}</p>
                      <p className="text-gray-600">{rec.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CalculatorLayout>
    </>
  );
}