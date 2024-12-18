import React, { useState } from 'react';
import { Construction, Ruler, DollarSign, Settings } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculatePaver } from '../../utils/calculators/paver/calculate';
import type { PaverInput } from '../../utils/calculators/paver/types';

export function PaverCalculator() {
  const [inputs, setInputs] = useState<PaverInput>({
    length: 20,
    width: 20,
    paverLength: 12,
    paverWidth: 6,
    paverHeight: 2.375,
    pattern: 'running-bond',
    edging: true
  });

  const result = calculatePaver(inputs);

  return (
    <CalculatorLayout
      title="Paver Calculator"
      description="Calculate paver quantities, materials, and layout patterns for your hardscaping project."
      icon={<Construction />}
    >
      <SEO
        title="Paver Calculator | Hardscape Material Calculator"
        description="Calculate paver quantities, sand, gravel, and layout patterns. Free paver calculator for patios, walkways, and driveways."
        keywords={[
          'paver calculator',
          'hardscape calculator',
          'patio calculator',
          'paver pattern calculator',
          'landscaping calculator',
          'construction calculator'
        ]}
        canonicalUrl="/paver-calculator"
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          {/* Area Dimensions */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Ruler className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Project Dimensions</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorInput
                label="Area Length (feet)"
                value={inputs.length}
                onChange={(value) => setInputs(prev => ({ ...prev, length: Number(value) }))}
                min={0}
                step={0.5}
              />
              <CalculatorInput
                label="Area Width (feet)"
                value={inputs.width}
                onChange={(value) => setInputs(prev => ({ ...prev, width: Number(value) }))}
                min={0}
                step={0.5}
              />
              <CalculatorInput
                label="Slope (%)"
                value={inputs.slopePercent || 0}
                onChange={(value) => setInputs(prev => ({ ...prev, slopePercent: Number(value) }))}
                min={0}
                max={15}
                step={0.5}
              />
            </div>
          </div>

          {/* Paver Specifications */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Paver Details</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorInput
                label="Paver Length (inches)"
                value={inputs.paverLength}
                onChange={(value) => setInputs(prev => ({ ...prev, paverLength: Number(value) }))}
                min={0}
                step={0.125}
              />
              <CalculatorInput
                label="Paver Width (inches)"
                value={inputs.paverWidth}
                onChange={(value) => setInputs(prev => ({ ...prev, paverWidth: Number(value) }))}
                min={0}
                step={0.125}
              />
              <CalculatorInput
                label="Paver Height (inches)"
                value={inputs.paverHeight}
                onChange={(value) => setInputs(prev => ({ ...prev, paverHeight: Number(value) }))}
                min={0}
                step={0.125}
              />
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pattern Style
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['running-bond', 'herringbone', 'basketweave', 'stack-bond'].map(pattern => (
                    <button
                      key={pattern}
                      onClick={() => setInputs(prev => ({ ...prev, pattern: pattern as PaverInput['pattern'] }))}
                      className={`px-4 py-2 text-sm rounded-md border-2 transition-colors ${
                        inputs.pattern === pattern
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      {pattern.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="edging"
                  checked={inputs.edging}
                  onChange={(e) => setInputs(prev => ({ ...prev, edging: e.target.checked }))}
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300"
                />
                <label htmlFor="edging" className="text-sm font-medium text-gray-700">
                  Include Edge Restraints
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Material Requirements */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <Construction className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Material Requirements</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorResult
                label="Total Area"
                value={`${result.totalArea.toFixed(1)} sq ft`}
                helpText="Total area including slope adjustment"
              />
              <CalculatorResult
                label="Pavers Needed"
                value={result.paversNeeded}
                helpText={`Including ${result.wastageRecommended}% recommended wastage`}
              />
              <CalculatorResult
                label="Base Gravel"
                value={`${result.gravelNeeded.toFixed(1)} cu yd`}
                helpText="6-inch depth of compacted gravel base"
              />
              <CalculatorResult
                label="Bedding Sand"
                value={`${result.sandNeeded.bedding.toFixed(1)} cu yd`}
                helpText="1-inch layer of leveling sand"
              />
              {inputs.edging && (
                <CalculatorResult
                  label="Edge Restraint"
                  value={`${result.edgingNeeded?.toFixed(1)} linear ft`}
                  helpText="Plastic or metal edge restraints"
                />
              )}
            </div>
          </div>

          {/* Cost Estimate */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-900">Cost Estimate</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <CalculatorResult
                label="Pavers"
                value={`$${result.estimatedCost.pavers.toLocaleString()}`}
                helpText="Cost of paver materials"
              />
              <CalculatorResult
                label="Sand & Gravel"
                value={`$${(result.estimatedCost.sand + result.estimatedCost.gravel).toLocaleString()}`}
                helpText="Cost of base materials and sand"
              />
              {inputs.edging && result.estimatedCost.edging && (
                <CalculatorResult
                  label="Edge Restraints"
                  value={`$${result.estimatedCost.edging.toLocaleString()}`}
                  helpText="Cost of edging materials"
                />
              )}
              <div className="border-t pt-4">
                <CalculatorResult
                  label="Total Estimated Cost"
                  value={`$${result.estimatedCost.total.toLocaleString()}`}
                  helpText="Materials only, excluding labor"
                />
              </div>
            </div>
          </div>

          {/* Pattern Details */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
              <h2 className="text-xl font-semibold text-gray-900">Pattern Details</h2>
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
            <h2 className="text-2xl font-bold text-gray-900">Understanding Paver Installation</h2>
          </div>
          
          <div className="p-6 prose max-w-none">
            <p className="text-gray-600 leading-relaxed">
              Proper paver installation requires careful planning and preparation. This calculator helps you determine 
              the materials needed for your hardscaping project, including pavers, base materials, and edge restraints. 
              Understanding the layers and components ensures a long-lasting, professional result.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Installation Layers</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Base Materials</h4>
                <p className="text-gray-600">
                  The foundation consists of compacted gravel (6 inches) and bedding sand (1 inch). These layers 
                  provide stability, drainage, and a level surface for the pavers.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Surface Materials</h4>
                <p className="text-gray-600">
                  Pavers are laid in your chosen pattern with joint sand filling the gaps. Edge restraints contain 
                  the pavers and prevent shifting.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Pattern Selection</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Running Bond</h4>
                <p className="text-gray-600">
                  A classic brick-like pattern that's easy to install and provides good structural integrity. 
                  Ideal for driveways and high-traffic areas.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Herringbone</h4>
                <p className="text-gray-600">
                  Creates an interlocking pattern that's excellent for vehicular areas. More complex to install 
                  but provides superior interlock.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Important Considerations</h3>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li>
                <strong>Slope and Drainage:</strong> Ensure proper slope (1-2%) away from structures for drainage
              </li>
              <li>
                <strong>Base Preparation:</strong> Thoroughly compact each layer of base material
              </li>
              <li>
                <strong>Edge Restraints:</strong> Essential for preventing lateral movement of pavers
              </li>
              <li>
                <strong>Joint Sand:</strong> Use polymeric sand for better joint stability
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-indigo-50 px-6 py-4 border-b border-indigo-100">
            <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Planning</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Check local building codes</li>
                  <li>• Mark utilities before digging</li>
                  <li>• Plan for proper drainage</li>
                  <li>• Consider future maintenance</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Installation</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use proper base materials</li>
                  <li>• Ensure adequate compaction</li>
                  <li>• Maintain consistent joint width</li>
                  <li>• Install edge restraints properly</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Maintenance</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clean surface regularly</li>
                  <li>• Resand joints as needed</li>
                  <li>• Address settling promptly</li>
                  <li>• Seal pavers periodically</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}