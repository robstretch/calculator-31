import React, { useState } from 'react';
import { LayoutDashboard, Plus, Trash2 } from 'lucide-react';
import { SEO } from '../../components/SEO/SEO';
import { CalculatorInput } from '../../components/Calculator/CalculatorInput';
import { CalculatorResult } from '../../components/Calculator/CalculatorResult';
import { CalculatorLayout } from '../../components/Calculator/Layout';
import { calculateSquareFootage, Room } from '../../utils/calculators/squareFootage';
import { formatNumber, formatCurrency } from '../../utils/format';

export function SquareFootageCalculator() {
  const [rooms, setRooms] = useState<Room[]>([
    { 
      name: 'Living Room',
      shape: 'rectangular',
      dimensions: { length: 20, width: 15 }
    }
  ]);

  const addRoom = () => {
    setRooms([...rooms, {
      name: `Room ${rooms.length + 1}`,
      shape: 'rectangular',
      dimensions: { length: 0, width: 0 }
    }]);
  };

  const removeRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const updateRoom = (index: number, updates: Partial<Room>) => {
    const newRooms = [...rooms];
    newRooms[index] = { ...newRooms[index], ...updates };
    setRooms(newRooms);
  };

  const updateDimension = (index: number, dimension: string, value: string) => {
    const newRooms = [...rooms];
    newRooms[index].dimensions = {
      ...newRooms[index].dimensions,
      [dimension]: parseFloat(value) || 0
    };
    setRooms(newRooms);
  };

  const results = calculateSquareFootage(rooms);

  return (
    <CalculatorLayout
      title="Square Footage Calculator"
      description="Calculate area and material requirements"
      icon={<LayoutDashboard />}
    >
      <SEO
        title="Square Footage Calculator | Area Calculator"
        description="Calculate square footage, room dimensions, and material requirements. Free square footage calculator for construction and remodeling projects."
        keywords={[
          'square footage calculator',
          'area calculator',
          'room size calculator',
          'flooring calculator',
          'paint calculator',
          'construction calculator'
        ]}
        canonicalUrl="/square-footage-calculator"
      />
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Rooms</h2>
              <button
                onClick={addRoom}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <Plus className="h-4 w-4" />
                Add Room
              </button>
            </div>

            {rooms.map((room, index) => (
              <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <input
                    type="text"
                    value={room.name}
                    onChange={(e) => updateRoom(index, { name: e.target.value })}
                    className="text-lg font-medium bg-transparent border-b border-gray-300 focus:border-indigo-500 focus:outline-none"
                    placeholder="Room name"
                  />
                  {rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room Shape
                  </label>
                  <select
                    value={room.shape}
                    onChange={(e) => updateRoom(index, { 
                      shape: e.target.value as Room['shape'],
                      dimensions: {} // Reset dimensions when shape changes
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="rectangular">Rectangular</option>
                    <option value="circular">Circular</option>
                    <option value="triangular">Triangular</option>
                    <option value="l-shaped">L-Shaped</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {room.shape === 'rectangular' && (
                    <div className="grid grid-cols-2 gap-4">
                      <CalculatorInput
                        label="Length (ft)"
                        value={room.dimensions.length?.toString() || ''}
                        onChange={(value) => updateDimension(index, 'length', value)}
                        min={0}
                        step={0.1}
                      />
                      <CalculatorInput
                        label="Width (ft)"
                        value={room.dimensions.width?.toString() || ''}
                        onChange={(value) => updateDimension(index, 'width', value)}
                        min={0}
                        step={0.1}
                      />
                    </div>
                  )}

                  {room.shape === 'circular' && (
                    <CalculatorInput
                      label="Radius (ft)"
                      value={room.dimensions.radius?.toString() || ''}
                      onChange={(value) => updateDimension(index, 'radius', value)}
                      min={0}
                      step={0.1}
                    />
                  )}

                  {room.shape === 'triangular' && (
                    <div className="grid grid-cols-2 gap-4">
                      <CalculatorInput
                        label="Base (ft)"
                        value={room.dimensions.base?.toString() || ''}
                        onChange={(value) => updateDimension(index, 'base', value)}
                        min={0}
                        step={0.1}
                      />
                      <CalculatorInput
                        label="Height (ft)"
                        value={room.dimensions.height?.toString() || ''}
                        onChange={(value) => updateDimension(index, 'height', value)}
                        min={0}
                        step={0.1}
                      />
                    </div>
                  )}

                  {room.shape === 'l-shaped' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <CalculatorInput
                          label="Main Length (ft)"
                          value={room.dimensions.mainLength?.toString() || ''}
                          onChange={(value) => updateDimension(index, 'mainLength', value)}
                          min={0}
                          step={0.1}
                        />
                        <CalculatorInput
                          label="Main Width (ft)"
                          value={room.dimensions.mainWidth?.toString() || ''}
                          onChange={(value) => updateDimension(index, 'mainWidth', value)}
                          min={0}
                          step={0.1}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <CalculatorInput
                          label="Extension Length (ft)"
                          value={room.dimensions.extensionLength?.toString() || ''}
                          onChange={(value) => updateDimension(index, 'extensionLength', value)}
                          min={0}
                          step={0.1}
                        />
                        <CalculatorInput
                          label="Extension Width (ft)"
                          value={room.dimensions.extensionWidth?.toString() || ''}
                          onChange={(value) => updateDimension(index, 'extensionWidth', value)}
                          min={0}
                          step={0.1}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Results</h2>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">
                {formatNumber(results.totalArea)} ft²
              </div>
              <div className="text-gray-500">Total Square Footage</div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Room Breakdown:</h3>
              <div className="space-y-3">
                {results.roomAreas.map((room, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-600">{room.name}:</span>
                    <span className="font-medium">{formatNumber(room.area)} ft²</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Material Estimates:</h3>
              <div className="space-y-3">
                <CalculatorResult
                  label="Paint Needed"
                  value={`${results.paintNeeded} gallons`}
                  helpText="Based on 8ft ceiling height"
                />
                <CalculatorResult
                  label="Flooring Needed"
                  value={`${formatNumber(results.flooringNeeded)} ft²`}
                  helpText="Includes 10% extra for waste"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-4">Cost Estimates:</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Paint:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.paint)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flooring:</span>
                  <span className="font-medium">{formatCurrency(results.estimatedCost.flooring)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatCurrency(results.estimatedCost.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Content */}
      <div className="mt-12 space-y-12">
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Square Footage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Measurement Tips</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Measure wall-to-wall</li>
                <li>• Include closets and nooks</li>
                <li>• Exclude unfinished spaces</li>
                <li>• Round to nearest inch</li>
                <li>• Double-check measurements</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Common Uses</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Real estate listings</li>
                <li>• Flooring installation</li>
                <li>• Paint estimation</li>
                <li>• Room planning</li>
                <li>• Property tax assessment</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Material Planning</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Paint</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• One gallon ≈ 400 sq ft</li>
                <li>• Two coats recommended</li>
                <li>• Account for trim</li>
                <li>• Consider primer</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Flooring</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Add 10% for waste</li>
                <li>• Consider patterns</li>
                <li>• Account for transitions</li>
                <li>• Plan for baseboards</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Cost Factors</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Material quality</li>
                <li>• Labor costs</li>
                <li>• Room complexity</li>
                <li>• Regional pricing</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </CalculatorLayout>
  );
}