import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { calculateVorici } from '../../utils/calculators/vorici/calculate';
import { VoriciInput } from '../../utils/calculators/vorici/types';

export function VoriciCalculator() {
  const [input, setInput] = useState<VoriciInput>({
    requiredColors: {
      red: 0,
      green: 0,
      blue: 0
    },
    itemLevel: 1,
    itemType: 'body',
    attributeRequirements: {}
  });

  const result = calculateVorici(input);

  return (
    <>
      <SEO 
        title="Vorici Calculator | Path of Exile Socket Colors"
        description="Calculate the most efficient way to color sockets in Path of Exile using Vorici calculator. Compare chromatic orb costs vs bench crafting."
        keywords={[
          'path of exile',
          'vorici calculator',
          'socket colors',
          'chromatic orbs',
          'poe crafting',
          'socket crafting'
        ]}
        canonicalUrl="/vorici-calculator"
      />

      <CalculatorLayout
        title="Vorici Socket Calculator"
        description="Calculate the most efficient method to color item sockets in Path of Exile"
        icon={<Calculator />}
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Required Colors</h2>
              <div className="grid gap-4">
                <CalculatorInput
                  label="Red Sockets"
                  value={input.requiredColors.red}
                  onChange={(value) => setInput({
                    ...input,
                    requiredColors: {
                      ...input.requiredColors,
                      red: parseInt(value) || 0
                    }
                  })}
                  min={0}
                  max={6}
                />
                <CalculatorInput
                  label="Green Sockets"
                  value={input.requiredColors.green}
                  onChange={(value) => setInput({
                    ...input,
                    requiredColors: {
                      ...input.requiredColors,
                      green: parseInt(value) || 0
                    }
                  })}
                  min={0}
                  max={6}
                />
                <CalculatorInput
                  label="Blue Sockets"
                  value={input.requiredColors.blue}
                  onChange={(value) => setInput({
                    ...input,
                    requiredColors: {
                      ...input.requiredColors,
                      blue: parseInt(value) || 0
                    }
                  })}
                  min={0}
                  max={6}
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Item Properties</h2>
              <div className="grid gap-4">
                <CalculatorInput
                  label="Item Level"
                  value={input.itemLevel}
                  onChange={(value) => setInput({
                    ...input,
                    itemLevel: parseInt(value) || 1
                  })}
                  min={1}
                  max={100}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Item Type
                  </label>
                  <select
                    value={input.itemType}
                    onChange={(e) => setInput({
                      ...input,
                      itemType: e.target.value as VoriciInput['itemType']
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="body">Body Armour</option>
                    <option value="gloves">Gloves</option>
                    <option value="boots">Boots</option>
                    <option value="helmet">Helmet</option>
                    <option value="shield">Shield</option>
                    <option value="weapon">Weapon</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Attribute Requirements</h2>
              <div className="grid gap-4">
                <CalculatorInput
                  label="Strength Requirement"
                  value={input.attributeRequirements.strength || 0}
                  onChange={(value) => setInput({
                    ...input,
                    attributeRequirements: {
                      ...input.attributeRequirements,
                      strength: parseInt(value) || 0
                    }
                  })}
                  min={0}
                />
                <CalculatorInput
                  label="Dexterity Requirement"
                  value={input.attributeRequirements.dexterity || 0}
                  onChange={(value) => setInput({
                    ...input,
                    attributeRequirements: {
                      ...input.attributeRequirements,
                      dexterity: parseInt(value) || 0
                    }
                  })}
                  min={0}
                />
                <CalculatorInput
                  label="Intelligence Requirement"
                  value={input.attributeRequirements.intelligence || 0}
                  onChange={(value) => setInput({
                    ...input,
                    attributeRequirements: {
                      ...input.attributeRequirements,
                      intelligence: parseInt(value) || 0
                    }
                  })}
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Best Method</h2>
              <CalculatorResult
                label="Recommended Method"
                value={result.bestMethod.method}
                helpText={`Average cost: ${Math.round(result.bestMethod.averageCost)} chaos`}
              />
              <CalculatorResult
                label="Success Rate"
                value={`${(result.bestMethod.successRate * 100).toFixed(2)}%`}
                helpText="Probability of success per attempt"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Color Probabilities</h2>
              {result.probabilities.map((prob) => (
                <CalculatorResult
                  key={prob.color}
                  label={`${prob.color} Socket`}
                  value={`${prob.chance.toFixed(2)}%`}
                  helpText={`Weight factor: ${prob.weightFactor.toFixed(2)}`}
                />
              ))}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
              <div className="space-y-4">
                {result.recommendations.map((rec, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4">
                    <h3 className="font-medium text-gray-900">{rec.category}</h3>
                    <p className="text-gray-600 text-sm mt-1">{rec.suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Understanding Socket Colors</h2>
          <div className="prose max-w-none">
            <p>
              Socket colors in Path of Exile are influenced by the item's attribute requirements.
              Higher strength requirements favor red sockets, dexterity favors green, and
              intelligence favors blue.
            </p>
            <ul className="mt-4 space-y-2">
              <li>Red sockets are more common on high-strength items</li>
              <li>Green sockets are more common on high-dexterity items</li>
              <li>Blue sockets are more common on high-intelligence items</li>
              <li>Off-color sockets become increasingly expensive</li>
            </ul>
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}