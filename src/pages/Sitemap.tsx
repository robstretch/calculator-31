import React from 'react';
import { Calculator } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../utils/categories';

export function Sitemap() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-indigo-100 rounded-full">
            <Calculator className="h-8 w-8 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Calculator Directory</h1>
        <p className="text-xl text-gray-600">
          Browse our comprehensive collection of free online calculators
        </p>
      </div>

      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.title} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 bg-indigo-600">
              <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {category.calculators.map((calculator) => (
                  <Link
                    key={calculator.path}
                    to={calculator.path}
                    className="block p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <div className="flex items-center mb-3">
                      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600 mr-3">
                        {calculator.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {calculator.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {calculator.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-indigo-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-indigo-900 mb-4">About Our Calculators</h2>
        <p className="text-indigo-700">
          Our calculators are designed to be accurate, easy to use, and completely free. 
          Each calculator includes detailed explanations and helpful tips to ensure you get 
          the most accurate results for your calculations.
        </p>
      </div>
    </div>
  );
}