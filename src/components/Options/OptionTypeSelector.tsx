import React from 'react';
import { OptionPosition } from '../../utils/calculators/options';

interface OptionTypeSelectorProps {
  position: OptionPosition;
  onChange: (position: OptionPosition) => void;
}

export function OptionTypeSelector({ position, onChange }: OptionTypeSelectorProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Option Type</label>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange({ ...position, type: 'call' })}
          className={`px-4 py-2 rounded-md ${
            position.type === 'call'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Call
        </button>
        <button
          onClick={() => onChange({ ...position, type: 'put' })}
          className={`px-4 py-2 rounded-md ${
            position.type === 'put'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Put
        </button>
      </div>
    </div>
  );
}