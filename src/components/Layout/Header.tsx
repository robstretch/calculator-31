import React, { useState, useRef, useEffect } from 'react';
import { Calculator, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../utils/categories';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-indigo-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8" />
            <span className="text-xl font-bold">Calculator.info</span>
          </Link>
          
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-indigo-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <span className="text-xl">☰</span>
            )}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center space-x-1 text-sm hover:text-indigo-200"
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isCategoryDropdownOpen && (
                <div className="absolute z-10 left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {categories.map(category => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                      onClick={() => setIsCategoryDropdownOpen(false)}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/all" 
              className="text-sm hover:text-indigo-200"
            >
              All Calculators
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <div className="border-b border-indigo-500 pb-2 mb-2">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="flex items-center justify-between w-full py-2 px-4 text-sm"
              >
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="pl-8 space-y-2 mt-2">
                  {categories.map(category => (
                    <Link
                      key={category.path}
                      to={category.path}
                      className="block py-2 text-sm hover:text-indigo-200"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/all"
              className="block py-2 px-4 text-sm hover:text-indigo-200"
              onClick={() => setIsMenuOpen(false)}
            >
              All Calculators
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}