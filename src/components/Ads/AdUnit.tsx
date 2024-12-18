import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export function AdUnit() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10);
  const [canClose, setCanClose] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Reset state when location changes
    setIsVisible(false);
    setTimeRemaining(10);
    setCanClose(false);

    // Show ad 7 seconds after navigating to a calculator page
    const initialTimer = setTimeout(() => {
      if (location.pathname !== '/' && location.pathname !== '/all') {
        setIsVisible(true);
      }
    }, 7000);

    // Set up recurring timer (every 2 minutes)
    const recurringTimer = setInterval(() => {
      if (location.pathname !== '/' && location.pathname !== '/all') {
        setIsVisible(true);
        setTimeRemaining(10);
        setCanClose(false);
      }
    }, 120000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(recurringTimer);
    };
  }, [location]);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isVisible && timeRemaining > 0) {
      countdownInterval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full relative overflow-hidden">
        {/* Fixed countdown text */}
        <div className="absolute top-0 left-0 right-0 text-center py-2 bg-gray-100 font-medium text-gray-600">
          Continue in {timeRemaining} seconds
        </div>
        
        {/* Progress bar */}
        <div className="h-1 bg-gray-200">
          <div 
            className="h-full bg-indigo-600 transition-all duration-1000 ease-linear"
            style={{ width: `${(timeRemaining / 10) * 100}%` }}
          />
        </div>

        {canClose && (
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-12 right-2 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        )}

        <div className="p-12">
          <div className="text-center">
            <h3 className="text-3xl font-semibold text-gray-900 mb-6">
              Support Our Free Calculators
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Help us keep these calculators free and ad-free by making a small contribution.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => window.open('https://www.buymeacoffee.com', '_blank')}
                className="w-full px-8 py-4 bg-[#FFDD00] text-gray-900 rounded-md hover:bg-[#FFDD00]/90 font-medium text-xl"
              >
                Buy me a coffee ☕️
              </button>
              {canClose && (
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-full px-8 py-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-xl"
                >
                  Maybe later
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}