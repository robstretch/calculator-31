import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Calculator.info</h3>
            <p className="text-sm">
              Providing accurate, reliable, and user-friendly calculators for all your needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/sitemap" className="hover:text-white">All Calculators</Link></li>
              <li><Link to="/financial" className="hover:text-white">Financial Calculators</Link></li>
              <li><a href="https://calculator.info/calculator-sitemap.xml" className="hover:text-white">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Calculators</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/mortgage-calculator" className="hover:text-white">Mortgage Calculator</Link></li>
              <li><Link to="/bmi-calculator" className="hover:text-white">BMI Calculator</Link></li>
              <li><Link to="/tax-calculator" className="hover:text-white">Tax Calculator</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          © {new Date().getFullYear()} Calculator.info. All rights reserved.
        </div>
      </div>
    </footer>
  );
}