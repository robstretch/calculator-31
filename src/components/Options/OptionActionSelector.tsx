import React from 'react';
import { OptionPosition } from '../../utils/calculators/options';

interface OptionActionSelectorProps {
  position: OptionPosition;
  onChange: (position: OptionPosition) => void;
}

export function OptionActionSelector({ position, onChange }: OptionActionSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange({ ...position, action: 'buy' })}
          className={`px-4 py-2 rounded-md ${
            position.action === 'buy'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Buy
        </button>
        <button
          onClick={() => onChange({ ...position, action: 'sell' })}
          className={`px-4 py-2 rounded-md ${
            position.action === 'sell'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Sell
        </button>
      </div>
    </div>
  );
}