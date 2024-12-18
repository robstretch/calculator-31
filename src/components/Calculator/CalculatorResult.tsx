import React from 'react';
import { CalculatorResultProps } from '../../types/calculator';

export function CalculatorResult({ label, value, helpText }: CalculatorResultProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center">
        <span className="text-gray-600">{label}</span>
        <span className="text-xl font-semibold text-indigo-600">{value}</span>
      </div>
      {helpText && (
        <p className="text-sm text-gray-500 mt-1">{helpText}</p>
      )}
    </div>
  );
}