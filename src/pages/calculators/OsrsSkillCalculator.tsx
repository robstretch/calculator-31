import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { CalculatorLayout } from '../../components/Calculator/CalculatorLayout';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { SEO } from '../../components/SEO/SEO';
import { calculateOsrs } from '../../utils/calculators/osrs/calculate';

const SKILLS = [
  'Attack', 'Defence', 'Strength', 'Hitpoints', 'Ranged', 'Prayer', 'Magic',
  'Cooking', 'Woodcutting', 'Fletching', 'Fishing', 'Firemaking', 'Crafting',
  'Smithing', 'Mining', 'Herblore', 'Agility', 'Thieving', 'Slayer', 'Farming',
  'Runecrafting', 'Hunter', 'Construction'
];

export function OsrsSkillCalculator() {
  const [skill, setSkill] = useState('Attack');
  const [currentLevel, setCurrentLevel] = useState('1');
  const [currentXp, setCurrentXp] = useState('0');
  const [targetLevel, setTargetLevel] = useState('99');
  const [actionXp, setActionXp] = useState('100');
  const [actionCost, setActionCost] = useState('0');

  const result = calculateOsrs(
    {
      name: skill,
      currentLevel: parseInt(currentLevel),
      currentXp: parseInt(currentXp),
      targetLevel: parseInt(targetLevel)
    },
    {
      name: 'Custom Action',
      xpPerAction: parseInt(actionXp),
      levelRequired: parseInt(currentLevel),
      cost: parseInt(actionCost)
    }
  );

  return (
    <>
      <SEO 
        title="OSRS Skill Calculator | Training Requirements & XP"
        description="Calculate Old School RuneScape skill training requirements, XP needed, and time estimates. Plan your OSRS skill training efficiently."
        keywords={[
          'osrs calculator',
          'runescape calculator',
          'osrs xp calculator',
          'osrs training calculator',
          'runescape skill calculator'
        ]}
        canonicalUrl="/osrs-skill-calculator"
      />

      <CalculatorLayout
        title="OSRS Skill Calculator"
        description="Calculate training requirements and XP needed for OSRS skills"
        icon={<Calculator />}
      >
        <div className="grid gap-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skill
                </label>
                <select
                  value={skill}
                  onChange={(e) => setSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {SKILLS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              
              <CalculatorInput
                label="Current Level"
                value={currentLevel}
                onChange={setCurrentLevel}
                type="number"
                min="1"
                max="98"
              />
              
              <CalculatorInput
                label="Current XP"
                value={currentXp}
                onChange={setCurrentXp}
                type="number"
                min="0"
              />
            </div>

            <div className="space-y-4">
              <CalculatorInput
                label="Target Level"
                value={targetLevel}
                onChange={setTargetLevel}
                type="number"
                min="2"
                max="99"
              />
              
              <CalculatorInput
                label="XP per Action"
                value={actionXp}
                onChange={setActionXp}
                type="number"
                min="1"
              />
              
              <CalculatorInput
                label="Cost per Action (gp)"
                value={actionCost}
                onChange={setActionCost}
                type="number"
              />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Training Summary</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">XP Required</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {result.xpNeeded.toLocaleString()}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Actions Needed</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {result.actionsNeeded.toLocaleString()}
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="font-medium text-indigo-900 mb-2">Time Estimate</h3>
                  <div className="text-2xl font-bold text-indigo-600">
                    {result.timeEstimate.hours}h {result.timeEstimate.minutes}m
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Level Milestones</h2>
              
              <div className="grid gap-4">
                {result.levelMilestones.map((milestone, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Level {milestone.level}</span>
                      <span className="text-gray-600">{milestone.xpRequired.toLocaleString()} XP needed</span>
                      <span className="text-gray-600">{milestone.actionsRemaining.toLocaleString()} actions</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Training Efficiency</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">XP per Hour</h3>
                  <div className="text-xl font-bold text-indigo-600">
                    {result.efficiency.xpPerHour.toLocaleString()}
                  </div>
                </div>

                {result.efficiency.costPerXp !== undefined && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Cost per XP</h3>
                    <div className="text-xl font-bold text-indigo-600">
                      {result.efficiency.costPerXp.toFixed(2)} gp
                    </div>
                  </div>
                )}

                {result.estimatedCost !== undefined && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Total Cost</h3>
                    <div className="text-xl font-bold text-indigo-600">
                      {result.estimatedCost.toLocaleString()} gp
                    </div>
                  </div>
                )}
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
          </div>
        </div>
      </CalculatorLayout>
    </>
  );
}