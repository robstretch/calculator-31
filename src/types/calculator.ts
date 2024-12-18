export interface CalculatorInputProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'number';
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
}

export interface CalculatorResultProps {
  label: string;
  value: string | number;
  helpText?: string;
}