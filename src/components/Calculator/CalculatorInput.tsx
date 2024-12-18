import React from 'react';
import { CalculatorInputProps } from '../../types/calculator';

export function CalculatorInput({
  label,
  value,
  onChange,
  type = 'number',
  placeholder,
  min,
  max,
  step
}: CalculatorInputProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm md:text-base border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}