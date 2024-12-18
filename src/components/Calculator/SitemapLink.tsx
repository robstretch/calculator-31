import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export function SitemapLink() {
  return (
    <div className="mt-12 text-center">
      <Link 
        to="/all" 
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors"
      >
        <Calculator className="h-5 w-5" />
        <span>View All Calculators</span>
      </Link>
    </div>
  );
}