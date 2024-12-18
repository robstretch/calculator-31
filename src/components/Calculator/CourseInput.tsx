import React from 'react';
import { Trash2 } from 'lucide-react';
import { CalculatorInput } from './CalculatorInput';
import { gradePoints } from '../../utils/calculators/gpa';

interface CourseInputProps {
  index: number;
  name: string;
  grade: string;
  credits: string;
  onUpdate: (index: number, field: 'name' | 'grade' | 'credits', value: string) => void;
  onRemove: (index: number) => void;
}

export function CourseInput({ 
  index, 
  name, 
  grade, 
  credits, 
  onUpdate, 
  onRemove 
}: CourseInputProps) {
  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Course {index + 1}</h3>
        <button
          onClick={() => onRemove(index)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
      <div className="space-y-3">
        <CalculatorInput
          label="Course Name"
          value={name}
          onChange={(value) => onUpdate(index, 'name', value)}
          type="text"
          placeholder="Enter course name"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => onUpdate(index, 'grade', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.keys(gradePoints).map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
          </div>
          <CalculatorInput
            label="Credits"
            value={credits}
            onChange={(value) => onUpdate(index, 'credits', value)}
            min={0}
            step={0.5}
            placeholder="Credits"
          />
        </div>
      </div>
    </div>
  );
}