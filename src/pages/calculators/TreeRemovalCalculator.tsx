import React, { useState } from 'react';
import { Construction, Ruler, Axe } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateTreeRemoval } from '../../utils/calculators/treeRemoval/calculate';
import type { TreeDetails } from '../../utils/calculators/treeRemoval/types';

export function TreeRemovalCalculator() {
  const [treeDetails, setTreeDetails] = useState<TreeDetails>({
    height: 30,
    diameter: 24,
    location: 'moderate',
    condition: 'healthy',
    species: '',
    nearStructures: false,
    powerLines: false,
    stumpRemoval: true
  });

  const result = calculateTreeRemoval(treeDetails);

  return (
    <CalculatorLayout
      title="Tree Removal Cost Calculator"
      description="Calculate tree removal costs based on size, location, and complexity."
      icon={<Axe />}
    >
      <SEO
        title="Tree Removal Cost Calculator | Estimate Tree Removal Expenses"
        description="Calculate tree removal costs based on tree size, location, and complexity. Get accurate estimates for professional tree removal services."
        keywords={[
          'tree removal calculator',
          'tree removal cost',
          'tree service estimate',
          'stump removal cost',
          'tree cutting cost',
          'arborist calculator'
        ]}
        canonicalUrl="/tree-removal-calculator"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Tree Measurements */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Tree Measurements</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorInput
                label="Tree Height (feet)"
                value={treeDetails.height}
                onChange={(value) => setTreeDetails({
                  ...treeDetails,
                  height: Number(value)
                })}
                min={5}
                max={200}
              />

              <CalculatorInput
                label="Trunk Diameter (inches)"
                value={treeDetails.diameter}
                onChange={(value) => setTreeDetails({
                  ...treeDetails,
                  diameter: Number(value)
                })}
                min={2}
                max={100}
              />
            </div>
          </div>

          {/* Location and Conditions */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Location & Conditions</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Access Difficulty
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={treeDetails.location}
                  onChange={(e) => setTreeDetails({
                    ...treeDetails,
                    location: e.target.value as 'easy' | 'moderate' | 'difficult'
                  })}
                >
                  <option value="easy">Easy Access</option>
                  <option value="moderate">Moderate Access</option>
                  <option value="difficult">Difficult Access</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tree Condition
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={treeDetails.condition}
                  onChange={(e) => setTreeDetails({
                    ...treeDetails,
                    condition: e.target.value as 'healthy' | 'diseased' | 'dead'
                  })}
                >
                  <option value="healthy">Healthy</option>
                  <option value="diseased">Diseased</option>
                  <option value="dead">Dead</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={treeDetails.nearStructures}
                    onChange={(e) => setTreeDetails({
                      ...treeDetails,
                      nearStructures: e.target.checked
                    })}
                  />
                  <span className="ml-2 text-sm text-gray-700">Near Structures</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={treeDetails.powerLines}
                    onChange={(e) => setTreeDetails({
                      ...treeDetails,
                      powerLines: e.target.checked
                    })}
                  />
                  <span className="ml-2 text-sm text-gray-700">Near Power Lines</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    checked={treeDetails.stumpRemoval}
                    onChange={(e) => setTreeDetails({
                      ...treeDetails,
                      stumpRemoval: e.target.checked
                    })}
                  />
                  <span className="ml-2 text-sm text-gray-700">Include Stump Removal</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Cost Breakdown */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Cost Estimate</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorResult
                label="Base Cost"
                value={`$${result.baseCost.toLocaleString()}`}
                helpText="Base removal cost for tree size"
              />

              {result.additionalCosts.map((cost, index) => (
                <CalculatorResult
                  key={index}
                  label={cost.category}
                  value={`$${cost.amount.toLocaleString()}`}
                  helpText={cost.reason}
                />
              ))}

              <div className="border-t pt-4">
                <CalculatorResult
                  label="Total Cost"
                  value={`$${result.totalCost.toLocaleString()}`}
                  helpText="Estimated total including all fees"
                />
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Project Details</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Time Estimate</h3>
                  <p className="text-gray-600">
                    {result.timeEstimate.hours} hours with a {result.timeEstimate.crew}-person crew
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Required Equipment</h3>
                  <ul className="space-y-2">
                    {result.equipment.map((item, index) => (
                      <li key={index} className="text-gray-600">
                        <span className="font-medium">{item.type}</span>: {item.reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {result.permits[0].required && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Permits</h3>
                    <p className="text-gray-600">
                      {result.permits[0].type} - ${result.permits[0].estimatedCost}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Recommendations</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4 py-2">
                    <h3 className="font-medium text-gray-900">{rec.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Understanding Tree Removal Costs</h2>
          </div>
          
          <div className="p-6 prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Tree removal costs can vary significantly based on multiple factors including the tree's 
              size, location, condition, and accessibility. Understanding these factors helps in 
              estimating the total cost and planning for the removal process.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Key Cost Factors</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tree Size</h4>
                <p className="text-gray-600">
                  Height and trunk diameter are primary factors in determining removal costs. Larger 
                  trees require more time, equipment, and crew members to remove safely.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Location and Accessibility</h4>
                <p className="text-gray-600">
                  Trees near structures, power lines, or in difficult-to-access areas require special 
                  equipment and safety measures, increasing the overall cost.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Additional Considerations</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Permits and Regulations</h4>
                <p className="text-gray-600">
                  Many localities require permits for tree removal, especially for large trees or those 
                  in protected areas. Check local regulations before proceeding.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Stump Removal</h4>
                <p className="text-gray-600">
                  Stump removal is often not included in basic tree removal costs. Consider whether 
                  you want the stump ground down or completely removed.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Safety and Insurance</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Professional Assessment:</strong> Have an arborist evaluate the tree's condition 
                and potential risks
              </li>
              <li>
                <strong>Insurance Coverage:</strong> Ensure the tree service has proper liability 
                insurance and worker's compensation
              </li>
              <li>
                <strong>Safety Measures:</strong> Proper equipment and trained professionals are 
                essential for safe removal
              </li>
              <li>
                <strong>Property Protection:</strong> Discuss how surrounding structures and landscaping 
                will be protected
              </li>
            </ul>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}