import React from 'react';
import { FeedbackForm } from './FeedbackForm';
import { EmbedWidget } from './EmbedWidget';
// import { AdUnit } from '../Ads/AdUnit';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export function CalculatorLayout({ children, title, description, icon }: CalculatorLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-indigo-100 rounded-full">
            {React.cloneElement(icon as React.ReactElement, { className: 'h-8 w-8 text-indigo-600' })}
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      {children}

      <div className="mt-12">
        <EmbedWidget calculatorPath={window.location.pathname} />
      </div>
      
      <FeedbackForm calculatorName={title} />
      {/* <AdUnit /> */}

      {/* Simple Analytics Tracking */}
      <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
    </div>
  );
}