import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CalculatorCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

export function CalculatorCard({ title, description, icon, to }: CalculatorCardProps) {
  return (
    <Link 
      to={to}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 bg-indigo-100 rounded-lg">
            {icon}
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </div>
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-xs md:text-sm text-gray-600">{description}</p>
      </div>
    </Link>
  );
}